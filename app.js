/* ════════════════════════════════════════════════════════════════
   Telco Hub — Lógica de la aplicación
   Depende de data.js (cargado antes)
═══════════════════════════════════════════════════════════════ */

/* STATE */
let CURRENT_COUNTRY = 'es';
let CURRENT_PAGE = 'home';
let NEW_FIELDS = new Set();

const fmt = (n, d=1) => n.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d });
const fmtInt = n => n.toLocaleString('es-ES', { maximumFractionDigits: 0 });
const ICON_CAL = '<svg width="11" height="11" viewBox="0 0 16 16" fill="none" style="flex-shrink:0"><rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" stroke-width="1.3"/><path d="M2 6h12M5.5 2v2M10.5 2v2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>';

/* ────────────────────────────────────────────────
   Tooltips de KPIs
──────────────────────────────────────────────── */
const KPI_TOOLTIPS = {
  total_mobile_lines: 'Número total de líneas móviles activas en el país. Incluye voz pospago, prepago y M2M propias. Fuente: regulador (CNMC/ANACOM).',
  total_ftth_lines: 'Líneas de fibra óptica hasta el hogar (FTTH). Excluye HFC/cable y DSL. Motor principal del crecimiento de banda ancha.',
  total_bb_lines: 'Banda ancha fija total: FTTH + HFC + DSL + otras. En España >91% es ya FTTH.',
  top3_share: 'Cuota agregada de los 3 mayores operadores en líneas móviles. Indica concentración del mercado.',
  top4_share: 'Cuota agregada de los 4 operadores foco (incluyendo DIGI).',
  mobile_lines_op: 'Líneas móviles del operador, incluyendo OMV propios y M2M propios.',
  ftth_lines_op: 'Líneas FTTH minoristas del operador según el regulador.',
  tv_subs_op: 'Suscriptores activos del servicio de TV de pago propietario del operador.',
  channels_count_op: 'Número aproximado de canales lineales disponibles en la oferta TV principal.',
  arpu: 'Average Revenue Per User · Ingreso medio por usuario convergente. Estimación.',
  ott_price: 'Precio mensual del servicio OTT contratable sin necesidad de fibra del operador.',
  ott_subs: 'Suscriptores estimados de la OTT libre. No siempre comunicado oficialmente.',
  unique_channels: 'Canales únicos analizados en la matriz cruzada entre operadores foco.',
  common_channels: 'Canales presentes simultáneamente en todos los operadores foco.',
  exclusive_channels: 'Canales que solo se encuentran en este operador. Diferenciación competitiva.',
  paramount_avail: 'Disponibilidad del canal por operador (número de operadores que lo distribuyen).',
  paramount_dials: 'Diales conocidos del canal en cada operador.'
};

/* ────────────────────────────────────────────────
   Estado y accesores
──────────────────────────────────────────────── */
function getOperators() { return CURRENT_COUNTRY === 'pt' ? OPERATORS_PT : OPERATORS_ES; }
function getParamountChannels() { return CURRENT_COUNTRY === 'pt' ? PARAMOUNT_CHANNELS_PT : PARAMOUNT_CHANNELS_ES; }
function getContentGroups() { return CURRENT_COUNTRY === 'pt' ? CONTENT_GROUPS_PT : CONTENT_GROUPS_ES; }
function getMarket() { return MARKET[CURRENT_COUNTRY]; }

/* ────────────────────────────────────────────────
   KPI helper
──────────────────────────────────────────────── */
function kpi({ label, value, unit, accent, trend, date, tipKey, fieldId, subtitle, sourceUrl }) {
  const tip = tipKey && KPI_TOOLTIPS[tipKey] ? KPI_TOOLTIPS[tipKey] : '';
  const isNew = fieldId && NEW_FIELDS.has(fieldId);
  const hasActions = tip || sourceUrl;
  return `
    <div class="kpi">
      <span class="kpi-accent ${accent||''}"></span>
      <div class="kpi-head">
        <div class="kpi-label">${label}${isNew ? '<span class="new-badge">NEW</span>' : ''}</div>
        ${hasActions ? `<div class="kpi-actions">
          ${tip ? `<span class="kpi-info" data-tip="${tip.replace(/"/g,'&quot;')}">i</span>` : ''}
          ${sourceUrl ? `<a class="kpi-source" href="${sourceUrl}" target="_blank" rel="noopener noreferrer" data-tip="Ver fuente original (abre en nueva pestaña)" title="Ver fuente"><svg viewBox="0 0 12 12" fill="none"><path d="M4 2H2v8h8V8M7 2h3v3M5 7l5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>` : ''}
        </div>` : ''}
      </div>
      <div class="kpi-value">${value}${unit ? `<span class="kpi-unit">${unit}</span>` : ''}</div>
      ${trend ? `<span class="kpi-trend ${trend.dir}">${trend.label}</span>` : ''}
      ${subtitle ? `<div class="kpi-sub">${subtitle}</div>` : ''}
      ${date ? `<div class="kpi-date">${ICON_CAL} ${date}</div>` : ''}
    </div>
  `;
}

/* ────────────────────────────────────────────────
   H-Bar chart
──────────────────────────────────────────────── */
function renderHBarChart(data, colors, unit='%') {
  const max = Math.max(...Object.values(data));
  return Object.entries(data).map(([label, val]) => {
    const pct = (val / max) * 100;
    const color = colors[label] || 'var(--peak-blue)';
    return `
      <div class="hbar-row">
        <div class="hbar-label"><span class="legend-dot" style="background:${color}"></span>${label}</div>
        <div class="hbar-track"><div class="hbar-fill" style="width:${pct}%; background:${color}"></div></div>
        <div class="hbar-value">${fmt(val)}${unit}</div>
      </div>
    `;
  }).join('');
}

/* ────────────────────────────────────────────────
   News block helper
──────────────────────────────────────────────── */
function renderNews(sectionKey) {
  if (typeof NEWS === 'undefined' || !NEWS[sectionKey]) return '';
  const items = NEWS[sectionKey].slice(0, 6);
  if (items.length === 0) return '';
  return `
    <div class="section-anchor">📰 Últimas noticias relevantes</div>
    <div class="news-list">
      ${items.map(n => `
        <a class="news-card" href="${n.url}" target="_blank" rel="noopener noreferrer">
          <div class="news-meta">
            <span class="news-source">${n.source}</span>
            <span>·</span>
            <span>${n.date}</span>
          </div>
          <div class="news-title">${n.title}</div>
          <div class="news-link">Leer noticia →</div>
        </a>
      `).join('')}
    </div>
  `;
}

/* ────────────────────────────────────────────────
   SIDEBAR DINÁMICO
──────────────────────────────────────────────── */
function renderSidebar() {
  const ops = getOperators();
  const channels = getParamountChannels();
  const market = getMarket();
  const sidebar = document.getElementById('sidebar');

  sidebar.innerHTML = `
    <div class="sidebar-brand">
      <div class="brand-hub">
        <div>
          <span class="hub-label-big">Telco</span>
          <span class="hub-label-big accent">HUB</span>
        </div>
        <div class="brand-sub">Operadores · ${CURRENT_COUNTRY.toUpperCase()}</div>
        <div class="territory-selector" onclick="toggleTerritory(event)">
          <span class="territory-flag">${market.flag}</span>
          <span class="territory-name">${market.name}</span>
          <svg class="territory-arrow" viewBox="0 0 12 12" width="10" height="10" fill="none"><path d="M3 5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="territory-dropdown" id="territory-dropdown">
          <div class="territory-option ${CURRENT_COUNTRY==='es'?'active':''}" onclick="setCountry('es')">
            <span>🇪🇸</span><span>España</span>${CURRENT_COUNTRY==='es'?'<span class="territory-check">✓</span>':''}
          </div>
          <div class="territory-option ${CURRENT_COUNTRY==='pt'?'active':''}" onclick="setCountry('pt')">
            <span>🇵🇹</span><span>Portugal</span>${CURRENT_COUNTRY==='pt'?'<span class="territory-check">✓</span>':''}
          </div>
          <div class="territory-option disabled"><span>🇮🇹</span><span>Italia</span><span class="territory-soon">próx.</span></div>
          <div class="territory-option disabled"><span>🇫🇷</span><span>Francia</span><span class="territory-soon">próx.</span></div>
        </div>
      </div>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section-label">General</div>
      <a class="nav-item ${CURRENT_PAGE==='home'?'active':''}" onclick="navigate('home')">
        <svg class="nav-icon" viewBox="0 0 20 20" fill="none"><path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M7 18v-6h6v6" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
        <span class="label">Visión general</span>
      </a>
      <a class="nav-item ${CURRENT_PAGE==='market'?'active':''}" onclick="navigate('market')">
        <svg class="nav-icon" viewBox="0 0 20 20" fill="none"><path d="M3 17h14M5 14V8M9 14V5M13 14V10M17 14V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        <span class="label">Mercado · ${market.regulator}</span>
      </a>

      <div class="nav-section-label" style="margin-top:1.25rem">Operadores</div>
      <div class="nav-btn-grid">
        ${Object.keys(ops).map(k => `
          <button class="nav-btn ${CURRENT_PAGE===k?'active':''}" onclick="navigate('${k}')">${ops[k].name}</button>
        `).join('')}
      </div>

      <div class="nav-section-label" style="margin-top:1.25rem">Análisis</div>
      <a class="nav-item ${CURRENT_PAGE==='compare'?'active':''}" onclick="navigate('compare')">
        <svg class="nav-icon" viewBox="0 0 20 20" fill="none"><path d="M3 4h6v12H3zM11 8h6v8h-6z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
        <span class="label">Comparar operadores</span>
      </a>
      <a class="nav-item ${CURRENT_PAGE==='channels'?'active':''}" onclick="navigate('channels')">
        <svg class="nav-icon" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="11" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M7 18h6M10 15v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        <span class="label">Canales TV</span>
      </a>
      <a class="nav-item ${CURRENT_PAGE==='groups'?'active':''}" onclick="navigate('groups')">
        <svg class="nav-icon" viewBox="0 0 20 20" fill="none"><circle cx="6" cy="7" r="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="14" cy="7" r="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="14" r="2.5" stroke="currentColor" stroke-width="1.5"/></svg>
        <span class="label">Grupos audiovisuales</span>
      </a>

      <div class="nav-section-label" style="margin-top:1.25rem; color:#99c0ff">Paramount</div>
      <a class="nav-item ${CURRENT_PAGE==='paramount-overview'?'active':''}" onclick="navigate('paramount-overview')">
        <svg class="nav-icon" viewBox="0 0 20 20" fill="none"><path d="M10 2L2 16h16L10 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
        <span class="label">Visión Paramount</span>
      </a>
      <div class="nav-btn-grid">
        ${Object.keys(channels).map(k => `
          <button class="nav-btn nav-btn-accent ${CURRENT_PAGE==='ch-'+k?'active':''}" onclick="navigate('ch-${k}')">${channels[k].name}</button>
        `).join('')}
      </div>
    </nav>

    <div class="sidebar-footer">
      <button class="refresh-btn-side" onclick="refreshData()">
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M2 8C2 4.7 4.7 2 8 2c2 0 3.8.9 5 2.4M14 8c0 3.3-2.7 6-6 6-2 0-3.8-.9-5-2.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12.5 1.5v3h-3M3.5 14.5v-3h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span>Actualizar datos</span>
      </button>
      <div class="last-update-box">
        <div class="last-update-label">Última actualización</div>
        <div class="last-update-time" id="sidebar-last-update">—</div>
      </div>
    </div>
    <div class="sidebar-author">
      <div style="font-size:9.5px; text-transform:uppercase; letter-spacing:0.5px; opacity:0.7">Creado por</div>
      <div class="author-name">Borja Pérez Herraiz</div>
      <div style="margin-top:3px">Paramount · 2026</div>
    </div>
  `;
  updateLastUpdate();
}

/* ────────────────────────────────────────────────
   NAVIGATION
──────────────────────────────────────────────── */
function navigate(page) {
  CURRENT_PAGE = page;
  renderSidebar();
  const c = document.getElementById('content');
  c.innerHTML = '';
  void c.offsetWidth;

  const ops = getOperators();
  const channels = getParamountChannels();

  if (page === 'home') renderHome();
  else if (page === 'market') renderMarket();
  else if (page === 'compare') renderCompare();
  else if (page === 'channels') renderChannelsMatrix();
  else if (page === 'groups') renderGroups();
  else if (page === 'paramount-overview') renderParamountOverview();
  else if (page.startsWith('ch-') && channels[page.slice(3)]) renderParamountChannel(page.slice(3));
  else if (page.startsWith('ott-')) renderOTTLibre(page.slice(4));
  else if (ops[page]) renderOperator(page);
  else renderHome();

  document.querySelector('.main').scrollTop = 0;
}

function setCountry(c) {
  CURRENT_COUNTRY = c;
  CURRENT_PAGE = 'home';
  document.getElementById('territory-dropdown').classList.remove('open');
  navigate('home');
}

function toggleTerritory(e) {
  e.stopPropagation();
  document.getElementById('territory-dropdown').classList.toggle('open');
}

/* ────────────────────────────────────────────────
   RENDER: HOME
──────────────────────────────────────────────── */
function renderHome() {
  const m = getMarket();
  const opsList = Object.values(getOperators());
  const colorMap = CURRENT_COUNTRY === 'es'
    ? { Movistar:'#019df4', MASORANGE:'#ff7900', Vodafone:'#e60000', DIGI:'#ff6b00', Otros:'#7a80a8', OMV:'#7a80a8' }
    : { MEO:'#2bbfba', NOS:'#002d6e', Vodafone:'#e60000', DIGI:'#ff6b00', Otros:'#7a80a8' };

  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div class="page-title-block">
        <h1>Visión general — ${m.name}</h1>
        <div class="page-desc">Resumen consolidado de los operadores foco. Datos del regulador ${m.regulator} (${m.last_data_date}, publicado ${m.last_pub_date}).</div>
      </div>
      <div class="page-meta"><span class="page-meta-dot"></span> ${m.regulator} · ${m.last_data_date}</div>
    </div>

    <div class="kpi-grid">
      ${kpi({ label:'Líneas móviles', value:fmt(m.total_mobile_lines), unit:'M', date:m.last_data_date+' · pub. '+m.last_pub_date, tipKey:'total_mobile_lines', fieldId:'mkt.mob', sourceUrl:m.data_source_url })}
      ${kpi({ label:'Líneas FTTH', value:fmt(m.total_ftth_lines), unit:'M', accent:'gold', date:m.last_data_date+' · pub. '+m.last_pub_date, tipKey:'total_ftth_lines', fieldId:'mkt.ftth', sourceUrl:m.data_source_url })}
      ${kpi({ label:'Banda ancha fija', value:fmt(m.total_bb_lines), unit:'M', accent:'pink', date:m.last_data_date+' · pub. '+m.last_pub_date, tipKey:'total_bb_lines', fieldId:'mkt.bb', sourceUrl:m.data_source_url })}
      ${kpi({ label:'Top 4 cuota móvil', value:fmt(m.top4_mobile), unit:'%', accent:'movistar', subtitle:'Top 3: '+fmt(m.top3_mobile)+'%', date:m.last_data_date+' · pub. '+m.last_pub_date, tipKey:'top4_share', fieldId:'mkt.top4', sourceUrl:m.data_source_url })}
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-head"><div><div class="card-title">Cuota FTTH (% líneas)</div><div class="card-subtitle">${m.last_data_date} · ${m.regulator} · pub. ${m.last_pub_date}</div></div></div>
        ${renderHBarChart(m.ftth_share, colorMap)}
      </div>
      <div class="card">
        <div class="card-head"><div><div class="card-title">Cuota líneas móviles</div><div class="card-subtitle">${m.last_data_date} · ${m.regulator} · pub. ${m.last_pub_date}</div></div></div>
        ${renderHBarChart(m.mobile_share, colorMap)}
      </div>
    </div>

    <div class="card">
      <div class="card-head"><div><div class="card-title">Tabla resumen — Operadores foco</div></div></div>
      <table>
        <thead>
          <tr><th>Operador</th><th class="right">Móvil (M)</th><th class="right">FTTH (M)</th><th class="right">TV (M)</th><th>Marca TV</th><th class="right">Canales</th></tr>
        </thead>
        <tbody>
          ${opsList.map(op => `
            <tr style="cursor:pointer" onclick="navigate('${op.key}')">
              <td><div class="op-name"><span class="dot-op ${op.key}" style="background:${op.color}"></span> <b>${op.name}</b></div><div style="font-size:10.5px;color:var(--text-muted)">${op.parent}</div></td>
              <td class="right num">${fmt(op.mobile_lines)}</td>
              <td class="right num">${fmt(op.ftth_lines)}</td>
              <td class="right num">${op.tv_subs < 1 ? fmt(op.tv_subs, 3) : fmt(op.tv_subs)}</td>
              <td>${op.tv_brand}</td>
              <td class="right">${op.channels_count}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(230px, 1fr)); gap:18px">
      ${opsList.map(op => `
        <div class="card" style="cursor:pointer; border-top:3px solid ${op.color}" onclick="navigate('${op.key}')">
          <div class="card-head"><div><div class="card-title" style="color:${op.color}">${op.name}</div><div class="card-subtitle">${op.tagline}</div></div></div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:8px">
            <div><div style="font-size:10.5px; color:var(--text-muted); text-transform:uppercase">Móvil</div><div style="font-size:18px; font-weight:800">${fmt(op.mobile_lines)}<span style="font-size:11px; color:var(--text-muted)"> M</span></div></div>
            <div><div style="font-size:10.5px; color:var(--text-muted); text-transform:uppercase">FTTH</div><div style="font-size:18px; font-weight:800">${fmt(op.ftth_lines)}<span style="font-size:11px; color:var(--text-muted)"> M</span></div></div>
            <div><div style="font-size:10.5px; color:var(--text-muted); text-transform:uppercase">TV subs</div><div style="font-size:18px; font-weight:800">${op.tv_subs < 1 ? fmtInt(op.tv_subs*1000)+'k' : fmt(op.tv_subs)+'M'}</div></div>
            <div><div style="font-size:10.5px; color:var(--text-muted); text-transform:uppercase">Canales</div><div style="font-size:18px; font-weight:800">${op.channels_count}</div></div>
          </div>
          <div style="margin-top:14px; font-size:11.5px; color:${op.color}; font-weight:600">Ver ficha completa →</div>
        </div>
      `).join('')}
    </div>

    ${renderNews(CURRENT_COUNTRY === 'pt' ? 'home_pt' : 'home_es')}
  `;
}

/* ────────────────────────────────────────────────
   RENDER: MARKET
──────────────────────────────────────────────── */
function renderMarket() {
  const m = getMarket();
  const colorMap = CURRENT_COUNTRY === 'es'
    ? { Movistar:'#019df4', MASORANGE:'#ff7900', Vodafone:'#e60000', DIGI:'#ff6b00', Otros:'#7a80a8', OMV:'#7a80a8' }
    : { MEO:'#2bbfba', NOS:'#002d6e', Vodafone:'#e60000', DIGI:'#ff6b00', Otros:'#7a80a8' };

  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div class="page-title-block">
        <h1>Mercado · ${m.regulator}</h1>
        <div class="page-desc">Estado del mercado de telecomunicaciones en ${m.name} según ${m.regulator}.</div>
      </div>
      <div class="page-meta"><span class="page-meta-dot"></span> ${m.last_data_date} · pub. ${m.last_pub_date}</div>
    </div>

    <div class="infobox"><b>Concentración del mercado.</b> ${CURRENT_COUNTRY==='es'
      ? 'En España, Top 3 (Movistar + MASORANGE + Vodafone) suma '+fmt(m.top3_mobile)+'% del móvil. Con DIGI alcanza el '+fmt(m.top4_mobile)+'%.'
      : 'Em Portugal, Top 3 (MEO + NOS + Vodafone) soma '+fmt(m.top3_mobile)+'% do móvel. Com DIGI atinge '+fmt(m.top4_mobile)+'%.'
    }</div>

    <div class="kpi-grid">
      ${kpi({ label:'Líneas móviles', value:fmt(m.total_mobile_lines), unit:'M', date:m.last_data_date+' · pub. '+m.last_pub_date, tipKey:'total_mobile_lines', fieldId:'mk.mob', sourceUrl:m.data_source_url })}
      ${kpi({ label:'Líneas FTTH', value:fmt(m.total_ftth_lines), unit:'M', accent:'gold', date:m.last_data_date+' · pub. '+m.last_pub_date, tipKey:'total_ftth_lines', fieldId:'mk.ftth', sourceUrl:m.data_source_url })}
      ${kpi({ label:'Banda ancha fija', value:fmt(m.total_bb_lines), unit:'M', accent:'pink', date:m.last_data_date+' · pub. '+m.last_pub_date, tipKey:'total_bb_lines', fieldId:'mk.bb', sourceUrl:m.data_source_url })}
      ${kpi({ label:'Top 3 cuota móvil', value:fmt(m.top3_mobile), unit:'%', accent:'movistar', subtitle:'Top 4 con DIGI: '+fmt(m.top4_mobile)+'%', date:m.last_data_date+' · pub. '+m.last_pub_date, tipKey:'top3_share', fieldId:'mk.top3', sourceUrl:m.data_source_url })}
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-head"><div><div class="card-title">Cuota FTTH</div><div class="card-subtitle">${m.last_data_date} · ${m.regulator} · pub. ${m.last_pub_date}</div></div></div>
        ${renderHBarChart(m.ftth_share, colorMap)}
      </div>
      <div class="card">
        <div class="card-head"><div><div class="card-title">Cuota móvil</div><div class="card-subtitle">${m.last_data_date} · ${m.regulator} · pub. ${m.last_pub_date}</div></div></div>
        ${renderHBarChart(m.mobile_share, colorMap)}
      </div>
    </div>

    ${renderNews(CURRENT_COUNTRY === 'pt' ? 'market_pt' : 'market_es')}
  `;
}

/* ────────────────────────────────────────────────
   RENDER: OPERATOR
──────────────────────────────────────────────── */
function renderOperator(key) {
  const op = getOperators()[key];
  if (!op) { renderHome(); return; }
  const market = getMarket();

  // Construir oferta de canales con diales
  const catClass = {
    'Propios':'entret', 'Cine y Series':'cine', 'Cinema e Séries':'cine',
    'Streaming integrado':'cine', 'BBC y Premium':'cine', 'BBC':'cine',
    'Deportes':'deportes', 'Desporto':'deportes',
    'Infantil':'infantil',
    'Documentales':'docs', 'Documentários':'docs',
    'Música y Entret.':'musica', 'Música':'musica',
    'Internacional':'intl', 'Notícias':'intl',
    'Ficción y temáticos':'series',
    'Locales y autonómicos':'intl', 'Romenos':'intl'
  };

  const channelHTML = op.channels && Array.isArray(op.channels) ? op.channels.map((catObj, i) => `
    <div class="channel-cat-title ${i===0?'first':''}">${catObj.cat} <span style="font-weight:500; color:var(--text-muted); font-size:11px">· ${catObj.items.length} canales</span></div>
    <div class="channel-grid">
      ${catObj.items.map(ch => `
        <div class="channel-pill ${catClass[catObj.cat]||''}">
          ${ch.dial ? `<span class="dial">${ch.dial}</span>` : ''}
          <span class="ch-name">${ch.name}</span>
        </div>
      `).join('')}
    </div>
  `).join('') : '<div style="color:var(--text-muted)">Sin parrilla configurada</div>';

  // OTT Libre
  let ottHTML = '';
  if (op.has_ott_libre && op.ott_libre && OTT_LIBRE[op.ott_libre]) {
    const ott = OTT_LIBRE[op.ott_libre];
    ottHTML = `
      <div class="section-anchor">OTT Libre del operador</div>
      <div class="ott-libre-card">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap">
          <div style="display:flex; align-items:center; gap:14px">
            <div class="group-logo" style="background:${ott.color||op.color}; width:48px; height:48px; font-size:11px">${ott.name.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase()}</div>
            <div>
              <div style="font-size:16px; font-weight:800">${ott.name}</div>
              <div style="font-size:12px; color:var(--text-secondary); margin-top:2px">${ott.description}</div>
            </div>
          </div>
          <button class="btn-add" onclick="navigate('ott-${op.ott_libre}')">Ver ficha completa →</button>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:10px; margin-top:14px">
          <div style="background:white; padding:10px 12px; border-radius:8px"><div style="font-size:10.5px; color:var(--text-muted); text-transform:uppercase">Precio</div><div style="font-size:18px; font-weight:800; color:${ott.color||op.color}">${ott.price_monthly}<span style="font-size:11px; color:var(--text-muted)"> €/mes</span></div></div>
          <div style="background:white; padding:10px 12px; border-radius:8px"><div style="font-size:10.5px; color:var(--text-muted); text-transform:uppercase">Subs est.</div><div style="font-size:18px; font-weight:800">${ott.subscribers_est?fmtInt(ott.subscribers_est*1000)+'k':'—'}</div></div>
          <div style="background:white; padding:10px 12px; border-radius:8px"><div style="font-size:10.5px; color:var(--text-muted); text-transform:uppercase">Permanencia</div><div style="font-size:12px; font-weight:700; margin-top:2px">${ott.permanence||'—'}</div></div>
        </div>
      </div>
    `;
  }

  document.getElementById('content').innerHTML = `
    <div class="op-header ${key}">
      <div class="op-logo ${key}">${op.name}</div>
      <div class="op-info">
        <h1>${op.name}</h1>
        <div class="op-parent">${op.parent} · ${op.tagline}</div>
        <div class="op-tags">${op.tags.map(t => `<span class="op-tag">${t}</span>`).join('')}</div>
      </div>
    </div>

    <div class="kpi-grid">
      ${kpi({ label:'Líneas móvil', value:fmt(op.mobile_lines), unit:'M', accent:key, subtitle:'incluye OMV propios', date:op.data_period||(market.last_data_date+' · '+market.regulator), tipKey:'mobile_lines_op', fieldId:`${key}.mob`, sourceUrl:op.data_source_url })}
      ${kpi({ label:'Líneas FTTH', value:fmt(op.ftth_lines), unit:'M', accent:key, subtitle:'red propia minorista', date:op.data_period||(market.last_data_date+' · '+market.regulator), tipKey:'ftth_lines_op', fieldId:`${key}.ftth`, sourceUrl:op.data_source_url })}
      ${kpi({ label:'Suscriptores TV', value:op.tv_subs < 1 ? fmtInt(op.tv_subs*1000)+'k' : fmt(op.tv_subs)+'M', accent:key, subtitle:op.tv_brand, date:op.data_period||market.last_data_date, tipKey:'tv_subs_op', fieldId:`${key}.tv`, sourceUrl:op.data_source_url })}
      ${kpi({ label:'Canales TV', value:op.channels_count, accent:key, subtitle:'parrilla actual', date:op.data_period||market.last_data_date, tipKey:'channels_count_op', fieldId:`${key}.ch` })}
      ${kpi({ label:'ARPU convergente ~', value:op.arpu_convergente, unit:'€/mes', accent:'pink', subtitle:'estimación pública', date:op.data_period||market.last_data_date, tipKey:'arpu', fieldId:`${key}.arpu`, sourceUrl:op.data_source_url })}
    </div>

    ${ottHTML}

    <div class="section-anchor">${op.tv_brand} — Oferta de canales con diales</div>
    <div class="card">
      <div class="card-head"><div><div class="card-title">Parrilla por categoría</div><div class="card-subtitle">${op.tv_subs_note}</div></div></div>
      ${channelHTML}
    </div>

    ${renderNews(key)}
  `;
}

/* ────────────────────────────────────────────────
   RENDER: OTT LIBRE
──────────────────────────────────────────────── */
function renderOTTLibre(key) {
  const ott = OTT_LIBRE[key];
  if (!ott) { renderHome(); return; }

  document.getElementById('content').innerHTML = `
    <div class="op-header" style="background:linear-gradient(135deg, ${ott.color}10, ${ott.color}05)">
      <div class="op-logo" style="background:linear-gradient(135deg, ${ott.color}, ${ott.color})">${ott.name.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase()}</div>
      <div class="op-info">
        <h1>${ott.name}</h1>
        <div class="op-parent">${ott.parent} · OTT contratable sin fibra</div>
        <div class="op-tags">
          ${ott.launched?`<span class="op-tag">Desde ${ott.launched}</span>`:''}
          ${ott.permanence?`<span class="op-tag">${ott.permanence}</span>`:''}
          ${ott.devices?`<span class="op-tag">${ott.devices}</span>`:''}
        </div>
      </div>
    </div>

    <div class="infobox"><b>Sobre el servicio.</b> ${ott.description}</div>

    <div class="kpi-grid">
      ${kpi({ label:'Precio mensual', value:ott.price_monthly, unit:'€/mes', accent:'pink', subtitle:ott.promo||'', date:'Vigente', tipKey:'ott_price', fieldId:`ott.${key}.price` })}
      ${ott.subscribers_est ? kpi({ label:'Suscriptores estimados', value:fmtInt(ott.subscribers_est*1000), unit:'k', accent:'gold', subtitle:ott.subs_note||'', date:'Estim. Q1 2026', tipKey:'ott_subs', fieldId:`ott.${key}.subs` }) : ''}
      ${ott.catalog ? kpi({ label:'Catálogo', value:Array.isArray(ott.catalog)?ott.catalog.length+'+':ott.catalog, accent:'movistar', subtitle:'temas', date:'Actual', fieldId:`ott.${key}.cat` }) : ''}
    </div>

    ${ott.channels_included ? `
      <div class="card">
        <div class="card-head"><div><div class="card-title">Canales destacados incluidos</div></div></div>
        <div class="channel-grid">
          ${ott.channels_included.map(ch => `<div class="channel-pill"><span class="ch-name">${ch}</span></div>`).join('')}
        </div>
      </div>
    ` : ''}

    ${ott.competitors ? `
      <div class="card">
        <div class="card-head"><div><div class="card-title">Competencia directa</div></div></div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">
          ${ott.competitors.map(c => `<span class="op-tag">${c}</span>`).join('')}
        </div>
      </div>
    ` : ''}
  `;
}

/* ────────────────────────────────────────────────
   RENDER: COMPARE
──────────────────────────────────────────────── */
function renderCompare() {
  const ops = Object.values(getOperators());
  const market = getMarket();
  const rows = [
    ['Operador matriz', op => op.parent],
    ['Líneas móviles (M)', op => fmt(op.mobile_lines)],
    ['Líneas FTTH (M)', op => fmt(op.ftth_lines)],
    ['Cuota FTTH', op => fmt(market.ftth_share[op.name] || 0)+'%'],
    ['Suscriptores TV', op => op.tv_subs < 1 ? fmtInt(op.tv_subs*1000)+'k' : fmt(op.tv_subs)+'M'],
    ['Marca TV', op => op.tv_brand],
    ['Canales TV', op => op.channels_count],
    ['ARPU ~ (€)', op => fmtInt(op.arpu_convergente)],
    ['OTT Libre', op => op.has_ott_libre ? '✓ '+(OTT_LIBRE[op.ott_libre]?.name||'sí') : '—']
  ];

  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div class="page-title-block">
        <h1>Comparar operadores — ${market.name}</h1>
        <div class="page-desc">Comparativa lado a lado en convergencia, TV y red.</div>
      </div>
      <div class="page-meta"><span class="page-meta-dot"></span> ${market.last_data_date}</div>
    </div>

    <div class="card">
      <div class="card-head"><div><div class="card-title">Tabla comparativa</div></div></div>
      <table>
        <thead>
          <tr><th>Métrica</th>${ops.map(op => `<th class="right" style="color:${op.color}">${op.name}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${rows.map(([label, fn]) => `
            <tr><td style="font-weight:600">${label}</td>${ops.map(op => `<td class="right num">${fn(op)}</td>`).join('')}</tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-head"><div><div class="card-title">FTTH (M)</div></div></div>
        ${renderHBarChart(Object.fromEntries(ops.map(op => [op.name, op.ftth_lines])), Object.fromEntries(ops.map(op => [op.name, op.color])), 'M')}
      </div>
      <div class="card">
        <div class="card-head"><div><div class="card-title">Móvil (M)</div></div></div>
        ${renderHBarChart(Object.fromEntries(ops.map(op => [op.name, op.mobile_lines])), Object.fromEntries(ops.map(op => [op.name, op.color])), 'M')}
      </div>
    </div>

    <div class="card">
      <div class="card-head"><div><div class="card-title">Suscriptores TV (M)</div></div></div>
      ${renderHBarChart(Object.fromEntries(ops.map(op => [op.tv_brand, op.tv_subs])), Object.fromEntries(ops.map(op => [op.tv_brand, op.color])), 'M')}
    </div>

    ${renderNews('compare')}
  `;
}

/* ────────────────────────────────────────────────
   RENDER: CHANNELS MATRIX
──────────────────────────────────────────────── */
function renderChannelsMatrix() {
  const ops = getOperators();
  const opKeys = Object.keys(ops);
  const market = getMarket();

  // Construir matriz: canal -> operadores
  const channelMap = {};
  for (const k of opKeys) {
    if (!ops[k].channels || !Array.isArray(ops[k].channels)) continue;
    for (const catObj of ops[k].channels) {
      for (const ch of catObj.items) {
        const base = ch.name.replace(/\s*\(.*?\)\s*/g, '').trim();
        if (!channelMap[base]) channelMap[base] = { cat: catObj.cat, ops: {} };
        channelMap[base].ops[k] = ch.dial;
      }
    }
  }
  const all = Object.entries(channelMap).sort((a,b) => Object.keys(b[1].ops).length - Object.keys(a[1].ops).length || a[1].cat.localeCompare(b[1].cat));
  const totalOps = opKeys.length;
  const common = all.filter(([_, v]) => Object.keys(v.ops).length === totalOps);
  const exclusives = {};
  for (const k of opKeys) {
    exclusives[k] = all.filter(([_, v]) => Object.keys(v.ops).length === 1 && v.ops[k]);
  }

  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div class="page-title-block">
        <h1>Canales TV — Matriz cruzada (${market.name})</h1>
        <div class="page-desc">Qué canales hay en qué operadores. Muestra el dial donde se conoce.</div>
      </div>
    </div>

    <div class="kpi-grid">
      ${kpi({ label:'Canales únicos analizados', value: all.length, date:market.last_data_date, tipKey:'unique_channels', fieldId:'ch.unique' })}
      ${kpi({ label:`Comunes a los ${totalOps} operadores`, value: common.length, accent:'gold', date:market.last_data_date, tipKey:'common_channels', fieldId:'ch.common' })}
      ${opKeys.map(k => kpi({
        label:`Exclusivos ${ops[k].name}`,
        value: exclusives[k].length,
        accent: k,
        date: market.last_data_date,
        tipKey:'exclusive_channels',
        fieldId:`ch.ex.${k}`
      })).join('')}
    </div>

    <div class="card">
      <div class="card-head"><div><div class="card-title">Matriz canales × operadores</div><div class="card-subtitle">Ordenado por cobertura · dial donde se conoce</div></div></div>
      <table>
        <thead>
          <tr>
            <th>Canal</th><th>Categoría</th>
            ${opKeys.map(k => `<th style="text-align:center; color:${ops[k].color}">${ops[k].name}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${all.map(([ch, v]) => `
            <tr>
              <td style="font-weight:600">${ch}</td>
              <td style="font-size:11.5px; color:var(--text-muted)">${v.cat}</td>
              ${opKeys.map(k => `<td style="text-align:center">${v.ops[k] ? `<span class="dial">${v.ops[k]}</span>` : '<span style="color:#d9dae2">—</span>'}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    ${renderNews('channels')}
  `;
}

/* ────────────────────────────────────────────────
   RENDER: GROUPS
──────────────────────────────────────────────── */
function renderGroups() {
  const groups = getContentGroups();
  const ops = getOperators();
  const opKeys = Object.keys(ops);

  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div class="page-title-block">
        <h1>Grupos audiovisuales</h1>
        <div class="page-desc">Canales por grupo audiovisual y su distribución entre operadores.</div>
      </div>
    </div>

    ${groups.map(g => `
      <div class="card">
        <div class="card-head">
          <div style="display:flex; align-items:center; gap:14px">
            <div class="group-logo" style="background:${g.color}">${g.name.split(' ').map(w=>w[0]).join('').slice(0,3).toUpperCase()}</div>
            <div><div class="card-title">${g.name}</div><div class="card-subtitle">${g.parent} · ${g.channels.length} canales</div></div>
          </div>
          ${g.key === 'paramount' ? '<span class="op-tag" style="background:rgba(0,100,255,0.15); color:var(--peak-blue)">📌 Paramount foco</span>' : ''}
        </div>

        ${g.note ? `<div class="infobox" style="margin-bottom:14px"><b>Nota:</b> ${g.note}</div>` : ''}

        <table>
          <thead>
            <tr>
              <th>Canal</th>
              ${opKeys.map(k => `<th style="text-align:center; color:${ops[k].color}">${ops[k].name}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${g.channels.map(ch => `
              <tr>
                <td style="font-weight:600">${ch.name}</td>
                ${opKeys.map(k => {
                  const v = ch[k];
                  if (!v || v === '—') return '<td style="text-align:center"><span style="color:#d9dae2">—</span></td>';
                  if (v === 'sí') return '<td style="text-align:center"><span style="color:#1f9d55; font-size:16px">●</span></td>';
                  if (v === 'cerrado') return '<td style="text-align:center"><span style="color:#c0392b; font-size:11px; font-weight:600">cerrado</span></td>';
                  if (v === 'exclusivo') return '<td style="text-align:center"><span style="color:#ff008a; font-weight:700; font-size:11px">EXCLUSIVO</span></td>';
                  return `<td style="text-align:center"><span style="font-size:11px; font-weight:600">${v}</span></td>`;
                }).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `).join('')}

    ${renderNews('groups')}
  `;
}

/* ────────────────────────────────────────────────
   RENDER: PARAMOUNT OVERVIEW
──────────────────────────────────────────────── */
function renderParamountOverview() {
  const channels = getParamountChannels();
  const ops = getOperators();
  const opKeys = Object.keys(ops);
  const market = getMarket();

  const chsList = Object.values(channels);
  const distribution = {};
  for (const k of opKeys) {
    distribution[k] = chsList.filter(ch => ch.operators && ch.operators[k] && ch.operators[k].available).length;
  }

  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div class="page-title-block">
        <h1>📊 Visión Paramount · ${market.name}</h1>
        <div class="page-desc">Resumen ejecutivo de los canales Paramount lineales en ${market.name}.</div>
      </div>
      <div class="page-meta"><span class="page-meta-dot"></span> ${market.last_data_date}</div>
    </div>

    ${CURRENT_COUNTRY==='es' ? `
      <div class="infobox warn"><b>Cambio relevante 2025.</b> Agosto 2025: Vodafone TV elimina los canales Paramount lineales (Nickelodeon, Nick Jr., MTV, Comedy Central) al no renovar acuerdo SkyShowtime. Movistar, DIGI y MASORANGE mantienen distribución.</div>
    ` : `
      <div class="infobox warn"><b>Mudança relevante 2025-2026.</b> MEO renovou Nickelodeon e Nick Jr. em dezembro 2025; MTV Portugal cessou e foi substituída por MTV Global (feed Polónia).</div>
    `}

    <div class="kpi-grid">
      ${kpi({ label:'Canales Paramount activos', value:chsList.length, accent:'movistar', date:market.last_data_date, fieldId:'pmt.total' })}
      ${kpi({ label:'Operadores con cartera', value:opKeys.filter(k => distribution[k] > 0).length+'/'+opKeys.length, accent:'gold', date:market.last_data_date, fieldId:'pmt.ops' })}
      ${kpi({ label:'Distribución media', value:fmt(opKeys.reduce((a,k)=>a+distribution[k],0)/opKeys.length, 1), accent:'pink', subtitle:'canales por operador', date:market.last_data_date, fieldId:'pmt.avg' })}
    </div>

    <div class="card">
      <div class="card-head"><div><div class="card-title">Distribución por operador</div></div></div>
      ${renderHBarChart(
        Object.fromEntries(opKeys.map(k => [ops[k].name, distribution[k]])),
        Object.fromEntries(opKeys.map(k => [ops[k].name, ops[k].color])),
        ''
      )}
    </div>

    <div class="grid-2">
      ${chsList.map(ch => `
        <div class="card" style="cursor:pointer; border-left:4px solid ${ch.color}" onclick="navigate('ch-${ch.key}')">
          <div class="card-head">
            <div>
              <div class="card-title">${ch.name}</div>
              <div class="card-subtitle">${ch.target_age||ch.target||''} · Desde ${ch.launched||'—'}</div>
            </div>
          </div>
          <div style="font-size:12px; color:var(--text-secondary); margin-bottom:12px">${(ch.description||'').slice(0, 180)}${(ch.description||'').length>180?'…':''}</div>
          <div style="display:flex; gap:6px; flex-wrap:wrap">
            ${opKeys.map(k => {
              const o = ch.operators && ch.operators[k];
              if (!o) return '';
              return `<span class="integration-pill ${o.available?'included':'none'}" data-tip="${(o.notes||'').replace(/"/g,"'")}">${ops[k].name}${o.available && o.dial && o.dial!=='—'?' · D'+o.dial:''} ${o.available?'✓':'✗'}</span>`;
            }).join('')}
          </div>
          <div style="margin-top:12px; font-size:11.5px; color:var(--peak-blue); font-weight:600">Ver ficha →</div>
        </div>
      `).join('')}
    </div>

    ${renderNews('paramount_overview')}
  `;
}

/* ────────────────────────────────────────────────
   RENDER: PARAMOUNT CHANNEL DETAIL
──────────────────────────────────────────────── */
function renderParamountChannel(chKey) {
  const ch = getParamountChannels()[chKey];
  if (!ch) { renderHome(); return; }
  const ops = getOperators();
  const opKeys = Object.keys(ops);
  const market = getMarket();

  const available = opKeys.filter(k => ch.operators[k] && ch.operators[k].available).length;
  const dials = opKeys.filter(k => ch.operators[k] && ch.operators[k].available && ch.operators[k].dial && ch.operators[k].dial !== '—');

  const renewal = ch.renewal || {};

  document.getElementById('content').innerHTML = `
    <div class="op-header" style="background:linear-gradient(135deg, ${ch.color}10, ${ch.color}05)">
      <div class="op-logo" style="background:linear-gradient(135deg, ${ch.color}, ${ch.color}dd); font-size:14px">${ch.name.split(' ').slice(0,2).map(w=>w[0]).join('')}</div>
      <div class="op-info">
        <h1>${ch.name}</h1>
        <div class="op-parent">Paramount Networks EMEAA · ${ch.target_age||ch.target||''} · Lanzado: ${ch.launched||'—'}</div>
        <div class="op-tags">
          <span class="op-tag">${available}/${opKeys.length} operadores</span>
          <span class="op-tag">${dials.length} diales</span>
          <span class="op-tag" style="background:rgba(255,0,138,0.12); color:var(--pink)">Paramount</span>
        </div>
      </div>
    </div>

    <div class="infobox"><b>Sobre ${ch.name}.</b> ${ch.description||''}</div>

    <div class="kpi-grid">
      ${kpi({ label:'Disponible en', value:`${available}/${opKeys.length}`, accent:'movistar', date:market.last_data_date, tipKey:'paramount_avail', fieldId:`pch.${chKey}.av` })}
      ${kpi({ label:'Diales conocidos', value:dials.length, accent:'gold', date:market.last_data_date, tipKey:'paramount_dials', fieldId:`pch.${chKey}.dial` })}
      ${kpi({ label:'Target', value:(ch.target_age||ch.target||'').split(' ')[0], accent:'pink', subtitle:ch.target_age||ch.target||'', date:'Posicionamiento', fieldId:null })}
      ${ch.competitors ? kpi({ label:'Competidores directos', value:ch.competitors.length, accent:'vodafone', date:'Análisis propio', fieldId:`pch.${chKey}.comp` }) : ''}
    </div>

    ${ch.target_detail ? `
      <div class="card">
        <div class="card-head"><div><div class="card-title">Descripción del target</div></div></div>
        <p style="font-size:13px; color:var(--text-secondary); line-height:1.6">${ch.target_detail}</p>
      </div>
    ` : ''}

    <div class="card">
      <div class="card-head"><div><div class="card-title">Disponibilidad por operador</div></div></div>
      <table>
        <thead><tr><th>Operador</th><th>Estado</th><th>Dial</th><th>Paquete</th><th>Notas</th></tr></thead>
        <tbody>
          ${opKeys.map(k => {
            const o = ch.operators[k];
            if (!o) return '';
            return `
              <tr>
                <td><div class="op-name"><span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${ops[k].color}"></span> <b>${ops[k].name}</b></div></td>
                <td>${o.available ? '<span style="color:#1f9d55; font-weight:700">● Disponible</span>' : '<span style="color:#c0392b; font-weight:700">○ No disponible</span>'}</td>
                <td class="num" style="font-weight:700">${o.dial||'—'}</td>
                <td style="font-size:11.5px">${o.pack||'—'}</td>
                <td style="font-size:11.5px; color:var(--text-secondary)">${o.notes||''}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>

    ${ch.competitors ? `
      <div class="card">
        <div class="card-head"><div><div class="card-title">Competencia directa</div></div></div>
        <table>
          <thead><tr><th>Canal</th><th>Grupo</th><th>Posicionamiento</th></tr></thead>
          <tbody>
            ${ch.competitors.map(comp => `
              <tr>
                <td style="font-weight:600">${comp.name}</td>
                <td><span class="op-tag">${comp.group}</span></td>
                <td style="font-size:12px; color:var(--text-secondary)">${comp.positioning||''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` : ''}

    ${(renewal.strengths || renewal.weaknesses) ? `
      <div class="section-anchor">Análisis para renovación con operadores</div>
      <div class="renewal-block">
        ${renewal.key_message ? `<h3>Mensaje clave</h3><div class="renewal-sub">${renewal.key_message}</div>` : ''}
        <div class="renewal-grid">
          ${renewal.strengths ? `
            <div class="renewal-item strength">
              <div class="renewal-item-title strength">Fortalezas</div>
              ${renewal.strengths.map(s => `<div class="renewal-item-text" style="margin-bottom:6px"><b>${s.label||''}</b> ${s.detail||s}</div>`).join('')}
            </div>` : ''}
          ${renewal.weaknesses ? `
            <div class="renewal-item weakness">
              <div class="renewal-item-title weakness">Debilidades</div>
              ${renewal.weaknesses.map(s => `<div class="renewal-item-text" style="margin-bottom:6px"><b>${s.label||''}</b> ${s.detail||s}</div>`).join('')}
            </div>` : ''}
          ${renewal.opportunities ? `
            <div class="renewal-item opportunity">
              <div class="renewal-item-title opportunity">Oportunidades</div>
              ${renewal.opportunities.map(s => `<div class="renewal-item-text" style="margin-bottom:6px"><b>${s.label||''}</b> ${s.detail||s}</div>`).join('')}
            </div>` : ''}
          ${renewal.threats ? `
            <div class="renewal-item threat">
              <div class="renewal-item-title threat">Amenazas</div>
              ${renewal.threats.map(s => `<div class="renewal-item-text" style="margin-bottom:6px"><b>${s.label||''}</b> ${s.detail||s}</div>`).join('')}
            </div>` : ''}
        </div>
      </div>
    ` : ''}

    ${renderNews('ch_' + chKey)}
  `;
}

/* ────────────────────────────────────────────────
   REFRESH (simula cambios y marca NEW)
──────────────────────────────────────────────── */
function updateLastUpdate() {
  const el = document.getElementById('sidebar-last-update');
  if (!el) return;
  const now = new Date();
  const d = now.toLocaleDateString('es-ES', { day:'2-digit', month:'short', year:'numeric' });
  const t = now.toLocaleTimeString('es-ES', { hour:'2-digit', minute:'2-digit' });
  el.textContent = `${d} · ${t}`;
}

function refreshData() {
  const btn = document.querySelector('.refresh-btn-side svg');
  if (btn) { btn.style.transition='transform 0.8s'; btn.style.transform='rotate(360deg)'; }

  NEW_FIELDS = new Set();
  const market = getMarket();
  const ops = getOperators();
  const opKeys = Object.keys(ops);

  // Cambios simulados realistas
  const changes = [
    { id:'mkt.ftth', apply:()=>{ market.total_ftth_lines = +(market.total_ftth_lines + Math.random()*0.08 + 0.04).toFixed(2); } },
    { id:'mkt.mob', apply:()=>{ market.total_mobile_lines = +(market.total_mobile_lines + Math.random()*0.15 + 0.05).toFixed(2); } },
    { id:'mkt.bb', apply:()=>{ market.total_bb_lines = +(market.total_bb_lines + Math.random()*0.08 + 0.02).toFixed(2); } }
  ];
  opKeys.forEach(k => {
    changes.push({ id:`${k}.ftth`, apply:()=>{ ops[k].ftth_lines = +(ops[k].ftth_lines + Math.random()*0.05 + 0.01).toFixed(2); } });
    changes.push({ id:`${k}.mob`, apply:()=>{ ops[k].mobile_lines = +(ops[k].mobile_lines + Math.random()*0.1 + 0.02).toFixed(2); } });
    if (ops[k].tv_subs < 1) {
      changes.push({ id:`${k}.tv`, apply:()=>{ ops[k].tv_subs = +(ops[k].tv_subs + Math.random()*0.015 + 0.005).toFixed(3); } });
    }
  });

  const shuffled = changes.sort(() => Math.random()-0.5);
  const toApply = shuffled.slice(0, 3 + Math.floor(Math.random()*3));
  toApply.forEach(c => { c.apply(); NEW_FIELDS.add(c.id); });

  setTimeout(() => {
    if (btn) { btn.style.transform=''; btn.style.transition=''; }
    updateLastUpdate();
    navigate(CURRENT_PAGE);
  }, 800);
}

/* ────────────────────────────────────────────────
   LOGIN
──────────────────────────────────────────────── */
function tryLogin() {
  const v = document.getElementById('login-input').value;
  if (v === 'paramountmadrid') {
    document.getElementById('login-overlay').classList.add('hidden');
    init();
  } else {
    document.getElementById('login-error').textContent = 'Contraseña incorrecta';
  }
}

function init() {
  renderSidebar();
  navigate('home');
}

/* ────────────────────────────────────────────────
   Event listeners globales
──────────────────────────────────────────────── */
document.addEventListener('click', (e) => {
  const dd = document.getElementById('territory-dropdown');
  if (dd && !e.target.closest('.territory-selector') && !e.target.closest('.territory-dropdown')) {
    dd.classList.remove('open');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const i = document.getElementById('login-input');
  if (i) i.focus();
});
