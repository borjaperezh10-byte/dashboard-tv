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
      <a class="nav-item ${CURRENT_PAGE==='evolution'?'active':''}" onclick="navigate('evolution')">
        <svg class="nav-icon" viewBox="0 0 20 20" fill="none"><path d="M3 17l5-5 4 4 5-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="3" cy="17" r="1.5" fill="currentColor"/><circle cx="8" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="16" r="1.5" fill="currentColor"/><circle cx="17" cy="9" r="1.5" fill="currentColor"/></svg>
        <span class="label">Evolución</span>
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

      <div class="nav-section-label" style="margin-top:1.25rem; color:#ffb84d">Renovaciones</div>
      <a class="nav-item ${CURRENT_PAGE==='renovaciones'?'active':''}" onclick="navigate('renovaciones')">
        <svg class="nav-icon" viewBox="0 0 20 20" fill="none"><path d="M3 10a7 7 0 0112-4.9M17 10a7 7 0 01-12 4.9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M15 2v4h-4M5 18v-4h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span class="label">Visión global</span>
      </a>
      <div class="nav-btn-grid">
        ${Object.keys(ops).map(k => `
          <button class="nav-btn nav-btn-renew ${CURRENT_PAGE==='renov-'+k?'active':''}" onclick="navigate('renov-${k}')">${ops[k].name}</button>
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
  else if (page === 'evolution') renderEvolution();
  else if (page === 'compare') renderCompare();
  else if (page === 'renovaciones') renderRenovacionesHub();
  else if (page.startsWith('renov-') && ops[page.slice(6)]) renderRenovacionesOperador(page.slice(6));
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
      ${kpi({ label:'Líneas fibra', value:fmt(m.total_ftth_lines), unit:'M', accent:'gold', date:m.last_data_date+' · pub. '+m.last_pub_date, tipKey:'total_ftth_lines', fieldId:'mkt.ftth', sourceUrl:m.data_source_url })}
      ${kpi({ label:'Clientes TV (4 operadores foco)', value:fmt(opsList.reduce((s,o)=>s+(o.tv_subs||0),0), 2), unit:'M', accent:'pink', subtitle:'Suma de clientes TV pago', date:m.last_data_date+' · pub. '+m.last_pub_date, tipKey:'tv_clients', fieldId:'mkt.tv', sourceUrl:m.data_source_url })}
      ${kpi({ label:'Top 4 cuota móvil', value:fmt(m.top4_mobile), unit:'%', accent:'movistar', subtitle:'Top 3: '+fmt(m.top3_mobile)+'%', date:m.last_data_date+' · pub. '+m.last_pub_date, tipKey:'top4_share', fieldId:'mkt.top4', sourceUrl:m.data_source_url })}
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-head"><div><div class="card-title">Cuota líneas fibra (%)</div><div class="card-subtitle">${m.last_data_date} · ${m.regulator} · pub. ${m.last_pub_date}</div></div></div>
        ${renderHBarChart(m.ftth_share, colorMap)}
      </div>
      <div class="card">
        <div class="card-head"><div><div class="card-title">Cuota líneas móviles</div><div class="card-subtitle">${m.last_data_date} · ${m.regulator} · pub. ${m.last_pub_date}</div></div></div>
        ${renderHBarChart(m.mobile_share, colorMap)}
      </div>
    </div>

    <div class="card">
      <div class="card-head"><div><div class="card-title">Cuota clientes TV (% sobre 4 operadores foco)</div><div class="card-subtitle">${m.last_data_date} · TV pago · suma operadores foco = 100%</div></div></div>
      ${(() => {
        const totTV = opsList.reduce((s,o)=>s+(o.tv_subs||0),0);
        const tvShare = {};
        opsList.forEach(o => { tvShare[o.name] = totTV>0 ? +(o.tv_subs/totTV*100).toFixed(1) : 0; });
        return renderHBarChart(tvShare, colorMap);
      })()}
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
            <div><div style="font-size:10.5px; color:var(--text-muted); text-transform:uppercase">Fibra</div><div style="font-size:18px; font-weight:800">${fmt(op.ftth_lines)}<span style="font-size:11px; color:var(--text-muted)"> M</span></div></div>
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
   RENDER: EVOLUCIÓN (Punto 2 - 10 años, 4 gráficos)
──────────────────────────────────────────────── */
function renderEvolution() {
  const histKey = CURRENT_COUNTRY;
  if (typeof HISTORICAL_DATA === 'undefined' || !HISTORICAL_DATA[histKey]) {
    document.getElementById('content').innerHTML = '<div class="card">Datos históricos no disponibles para este país.</div>';
    return;
  }
  const h = HISTORICAL_DATA[histKey];
  const m = getMarket();
  const countryName = CURRENT_COUNTRY === 'es' ? 'España' : 'Portugal';
  const opColors = CURRENT_COUNTRY === 'es'
    ? { Movistar:'#019df4', MASORANGE:'#ff7900', Vodafone:'#e60000', DIGI:'#ff6b00' }
    : { MEO:'#2bbfba', NOS:'#002d6e', Vodafone:'#e60000', DIGI:'#ff6b00' };

  // Helper: single-series line chart
  const lineChart = (data, color, unit) => {
    const W = 580, H = 220, padL = 50, padR = 25, padT = 18, padB = 32;
    const innerW = W - padL - padR, innerH = H - padT - padB;
    const max = Math.max(...data) * 1.08;
    const min = Math.min(...data) * 0.92;
    const range = max - min || 1;
    const xStep = innerW / (data.length - 1);
    const points = data.map((v, i) => ({
      x: padL + i * xStep,
      y: padT + innerH - ((v - min) / range) * innerH,
      val: v
    }));
    const path = points.map((p, i) => (i===0?'M':'L')+p.x.toFixed(1)+','+p.y.toFixed(1)).join(' ');
    const area = path + ` L ${points[points.length-1].x.toFixed(1)},${padT+innerH} L ${padL},${padT+innerH} Z`;
    const yTicks = 4;
    const yLabels = Array.from({length:yTicks+1}, (_,i) => {
      const val = min + (range * i / yTicks);
      const y = padT + innerH - (i / yTicks) * innerH;
      return { val: val.toFixed(1), y };
    });
    return `
      <svg viewBox="0 0 ${W} ${H}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style="overflow:visible">
        ${yLabels.map(t => `
          <line x1="${padL}" y1="${t.y}" x2="${W-padR}" y2="${t.y}" stroke="#e9eaf2" stroke-width="1"/>
          <text x="${padL-8}" y="${t.y+3}" font-size="10" fill="#7a80a8" text-anchor="end">${t.val}${unit}</text>
        `).join('')}
        ${h.years.map((y, i) => `
          <text x="${padL+i*xStep}" y="${H-padB+14}" font-size="9.5" fill="#7a80a8" text-anchor="middle">${y}</text>
        `).join('')}
        <path d="${area}" fill="${color}" fill-opacity="0.12"/>
        <path d="${path}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
        ${points.map(p => `
          <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3" fill="${color}" stroke="#fff" stroke-width="1.5"/>
        `).join('')}
        <text x="${points[points.length-1].x - 38}" y="${points[points.length-1].y - 10}" font-size="11" fill="${color}" font-weight="800">${data[data.length-1].toFixed(1)}${unit}</text>
      </svg>
    `;
  };

  // Multi-line chart for TV share by operator
  const multiLineChart = (series, colors, unit) => {
    const W = 580, H = 260, padL = 45, padR = 110, padT = 18, padB = 32;
    const innerW = W - padL - padR, innerH = H - padT - padB;
    const allValues = Object.values(series).flat();
    const max = Math.max(...allValues) * 1.05;
    const min = 0;
    const range = max - min || 1;
    const xStep = innerW / (h.years.length - 1);
    const yTicks = 5;
    const yLabels = Array.from({length:yTicks+1}, (_,i) => {
      const val = min + (range * i / yTicks);
      const y = padT + innerH - (i / yTicks) * innerH;
      return { val: val.toFixed(0), y };
    });
    return `
      <svg viewBox="0 0 ${W} ${H}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style="overflow:visible">
        ${yLabels.map(t => `
          <line x1="${padL}" y1="${t.y}" x2="${W-padR}" y2="${t.y}" stroke="#e9eaf2" stroke-width="1"/>
          <text x="${padL-8}" y="${t.y+3}" font-size="10" fill="#7a80a8" text-anchor="end">${t.val}${unit}</text>
        `).join('')}
        ${h.years.map((y, i) => `
          <text x="${padL+i*xStep}" y="${H-padB+14}" font-size="9.5" fill="#7a80a8" text-anchor="middle">${y}</text>
        `).join('')}
        ${Object.entries(series).map(([op, data]) => {
          const color = colors[op] || '#999';
          const points = data.map((v, i) => ({
            x: padL + i * xStep,
            y: padT + innerH - ((v - min) / range) * innerH
          }));
          const firstNonZero = data.findIndex(v => v > 0);
          const validPoints = firstNonZero >= 0 ? points.slice(firstNonZero) : points;
          if (validPoints.length === 0) return '';
          const path = validPoints.map((p, i) => (i===0?'M':'L')+p.x.toFixed(1)+','+p.y.toFixed(1)).join(' ');
          const last = validPoints[validPoints.length-1];
          return `
            <path d="${path}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round"/>
            ${validPoints.map(p => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="2.5" fill="${color}"/>`).join('')}
            <text x="${last.x + 6}" y="${last.y + 3}" font-size="10.5" fill="${color}" font-weight="700">${op} ${data[data.length-1].toFixed(1)}${unit}</text>
          `;
        }).join('')}
      </svg>
    `;
  };

  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div class="page-title-block">
        <h1>Evolución — ${countryName}</h1>
        <div class="page-desc">Series anuales 2016–2026 de líneas móviles, fibra, clientes TV pago y desglose por operador. Fuente: ${m.regulator} (informes anuales). Las series por operador son estimaciones basadas en cuotas oficiales.</div>
      </div>
      <div class="page-meta"><span class="page-meta-dot"></span> 10 años · ${m.regulator}</div>
    </div>

    <div class="section-anchor">📱 Líneas móviles</div>
    <div class="grid-2">
      <div class="card chart-card">
        <div class="card-head"><div>
          <div class="card-title">Total mercado</div>
          <div class="card-subtitle">Evolución 2016-2026 · ${m.regulator}</div>
        </div></div>
        <div class="chart-wrap">${lineChart(h.mobile_lines, '#0064ff', 'M')}</div>
      </div>
      <div class="card chart-card">
        <div class="card-head"><div>
          <div class="card-title">Por operador (4 foco)</div>
          <div class="card-subtitle">Líneas móviles · M · estimación sobre cuotas</div>
        </div></div>
        <div class="chart-wrap">${h.mobile_by_op ? multiLineChart(h.mobile_by_op, opColors, 'M') : '<div style="color:var(--text-muted); padding:20px">Sin desglose</div>'}</div>
      </div>
    </div>

    <div class="section-anchor">🔵 Líneas fibra</div>
    <div class="grid-2">
      <div class="card chart-card">
        <div class="card-head"><div>
          <div class="card-title">Total mercado</div>
          <div class="card-subtitle">Evolución 2016-2026 · crecimiento explosivo de fibra</div>
        </div></div>
        <div class="chart-wrap">${lineChart(h.ftth_lines, '#ffa600', 'M')}</div>
      </div>
      <div class="card chart-card">
        <div class="card-head"><div>
          <div class="card-title">Por operador (4 foco)</div>
          <div class="card-subtitle">Líneas fibra · M · estimación sobre cuotas</div>
        </div></div>
        <div class="chart-wrap">${h.ftth_by_op ? multiLineChart(h.ftth_by_op, opColors, 'M') : '<div style="color:var(--text-muted); padding:20px">Sin desglose</div>'}</div>
      </div>
    </div>

    <div class="section-anchor">📺 Clientes TV pago</div>
    <div class="grid-2">
      <div class="card chart-card">
        <div class="card-head"><div>
          <div class="card-title">Total mercado</div>
          <div class="card-subtitle">Evolución 2016-2026 · ${CURRENT_COUNTRY==='es' ? 'pico ~7,3M en 2019, declive por OTT' : 'crecimiento sostenido, 4,8M hoy'}</div>
        </div></div>
        <div class="chart-wrap">${lineChart(h.tv_subs, '#ec3c8d', 'M')}</div>
      </div>
      <div class="card chart-card">
        <div class="card-head"><div>
          <div class="card-title">Por operador (4 foco)</div>
          <div class="card-subtitle">Clientes TV · M · estimación sobre cuotas</div>
        </div></div>
        <div class="chart-wrap">${h.tv_by_op ? multiLineChart(h.tv_by_op, opColors, 'M') : '<div style="color:var(--text-muted); padding:20px">Sin desglose</div>'}</div>
      </div>
    </div>

    <div class="section-anchor">📊 Cuota TV por operador</div>
    <div class="card chart-card">
      <div class="card-head"><div>
        <div class="card-title">Cuota TV por operador (%)</div>
        <div class="card-subtitle">Evolución 2016-2026 · % sobre 4 operadores foco</div>
      </div></div>
      <div class="chart-wrap">${multiLineChart(h.tv_share_by_op, opColors, '%')}</div>
    </div>

    <div class="card">
      <div class="card-head"><div><div class="card-title">Lectura estratégica · 10 años</div></div></div>
      <div style="font-size:13px; line-height:1.6; color:var(--text-secondary)">
        ${CURRENT_COUNTRY === 'es' ? `
          <p><strong style="color:var(--text-primary)">Móvil:</strong> España añadió +10,9M líneas en una década (51,7M → 62,6M), saturación con penetración >126%/100hab por crecimiento de doble línea y M2M.</p>
          <p><strong style="color:var(--text-primary)">FTTH:</strong> Cuadruplicó parque (4,3M → 18,1M). España es líder europeo de fibra. Telefónica cerró su red de cobre en 2024.</p>
          <p><strong style="color:var(--text-primary)">TV pago:</strong> Pico 7,3M en 2019; declive a 6,5M por canibalización de OTT (Netflix, Disney+, HBO Max, SkyShowtime). Movistar Plus+ se reinventó como OTT abierto en 2023 y ha vuelto a crecer.</p>
          <p><strong style="color:var(--text-primary)">Cuota TV:</strong> Movistar mantiene liderazgo ~60%. Vodafone pierde cuota bajo Zegona. MASORANGE consolidó +10pp vía fusiones. DIGI emerge desde fin 2023 con crecimiento +25%/trimestre.</p>
        ` : `
          <p><strong style="color:var(--text-primary)">Móvel:</strong> Portugal aumentou +2,2M linhas (11,6M → 13,8M). Mercado maduro com penetração estável.</p>
          <p><strong style="color:var(--text-primary)">FTTH:</strong> Mais que duplicou (2,1M → 5,3M). Portugal lidera cobertura de fibra na UE.</p>
          <p><strong style="color:var(--text-primary)">TV paga:</strong> Crescimento sostenido (3,6M → 4,8M) graças à força dos pacotes 4P/5P. Modelo diferente do ES, sem perda por OTT.</p>
          <p><strong style="color:var(--text-primary)">Quota TV:</strong> MEO estável ~42%, NOS ~35%, Vodafone ~21%. DIGI entrou em 2024 e já ganhou 3,2pp em ano e meio.</p>
        `}
      </div>
    </div>
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
      ${kpi({ label:'Líneas fibra', value:fmt(m.total_ftth_lines), unit:'M', accent:'gold', date:m.last_data_date+' · pub. '+m.last_pub_date, tipKey:'total_ftth_lines', fieldId:'mk.ftth', sourceUrl:m.data_source_url })}
      ${kpi({ label:'Banda ancha fija', value:fmt(m.total_bb_lines), unit:'M', accent:'pink', date:m.last_data_date+' · pub. '+m.last_pub_date, tipKey:'total_bb_lines', fieldId:'mk.bb', sourceUrl:m.data_source_url })}
      ${kpi({ label:'Top 3 cuota móvil', value:fmt(m.top3_mobile), unit:'%', accent:'movistar', subtitle:'Top 4 con DIGI: '+fmt(m.top4_mobile)+'%', date:m.last_data_date+' · pub. '+m.last_pub_date, tipKey:'top3_share', fieldId:'mk.top3', sourceUrl:m.data_source_url })}
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-head"><div><div class="card-title">Cuota líneas fibra</div><div class="card-subtitle">${m.last_data_date} · ${m.regulator} · pub. ${m.last_pub_date}</div></div></div>
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

  const getChannelInfo = (chName) => {
    if (typeof CHANNEL_INFO === 'undefined') return null;
    // lookup directo
    if (CHANNEL_INFO[chName]) return CHANNEL_INFO[chName];
    // fuzzy: quitar HD, FHD, +, etc
    const normalized = chName.replace(/\s*(HD|FHD|UHD|4K|\+)\s*$/i, '').trim();
    if (CHANNEL_INFO[normalized]) return CHANNEL_INFO[normalized];
    return null;
  };

  const channelHTML = op.channels && Array.isArray(op.channels) ? op.channels.map((catObj, i) => `
    <div class="channel-cat-title ${i===0?'first':''}">${catObj.cat} <span style="font-weight:500; color:var(--text-muted); font-size:11px">· ${catObj.items.length} canales</span></div>
    <div class="channel-grid">
      ${catObj.items.map(ch => {
        const info = getChannelInfo(ch.name);
        const group = info ? info.group : null;
        return `
        <div class="channel-pill ${catClass[catObj.cat]||''}" ${group ? `data-tip="${group.replace(/"/g,'&quot;')}"` : ''}>
          ${ch.dial ? `<span class="dial">${ch.dial}</span>` : ''}
          <span class="ch-name">${ch.name}</span>
          ${group ? `<span class="ch-group">${group.length > 24 ? group.slice(0,23)+'…' : group}</span>` : ''}
        </div>
      `}).join('')}
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
      ${(() => {
        // Calcula totales sobre los 4 operadores foco
        const allOps = getOperators();
        const totMob = Object.values(allOps).reduce((s,o)=>s+(o.mobile_lines||0),0);
        const totFTTH = Object.values(allOps).reduce((s,o)=>s+(o.ftth_lines||0),0);
        const totTV = Object.values(allOps).reduce((s,o)=>s+(o.tv_subs||0),0);
        const pctMob  = totMob>0  ? (op.mobile_lines / totMob * 100).toFixed(1) : '—';
        const pctFTTH = totFTTH>0 ? (op.ftth_lines / totFTTH * 100).toFixed(1) : '—';
        const pctTV   = totTV>0   ? (op.tv_subs / totTV * 100).toFixed(1) : '—';
        return `
          ${kpi({ label:'Líneas móvil', value:fmt(op.mobile_lines), unit:'M', accent:key, subtitle:pctMob+'% sobre 4 ops foco', date:op.data_period||(market.last_data_date+' · '+market.regulator), tipKey:'mobile_lines_op', fieldId:`${key}.mob`, sourceUrl:op.data_source_url })}
          ${kpi({ label:'Líneas fibra', value:fmt(op.ftth_lines), unit:'M', accent:key, subtitle:pctFTTH+'% sobre 4 ops foco', date:op.data_period||(market.last_data_date+' · '+market.regulator), tipKey:'ftth_lines_op', fieldId:`${key}.ftth`, sourceUrl:op.data_source_url })}
          ${kpi({ label:'Clientes TV', value:op.tv_subs < 1 ? fmtInt(op.tv_subs*1000)+'k' : fmt(op.tv_subs)+'M', accent:key, subtitle:pctTV+'% sobre 4 ops foco · '+op.tv_brand, date:op.data_period||market.last_data_date, tipKey:'tv_subs_op', fieldId:`${key}.tv`, sourceUrl:op.data_source_url })}
          ${kpi({ label:'Canales TV', value:op.channels_count, accent:key, subtitle:'parrilla actual', date:op.data_period||market.last_data_date, tipKey:'channels_count_op', fieldId:`${key}.ch` })}
          ${kpi({ label:'ARPU convergente ~', value:op.arpu_convergente, unit:'€/mes', accent:'pink', subtitle:'estimación pública', date:op.data_period||market.last_data_date, tipKey:'arpu', fieldId:`${key}.arpu`, sourceUrl:op.data_source_url })}
        `;
      })()}
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
/* ────────────────────────────────────────────────
   RENDER: RENOVACIONES — HUB (Visión global)
──────────────────────────────────────────────── */
function renderRenovacionesHub() {
  if (typeof ACTION_PLANS === 'undefined' || !ACTION_PLANS[CURRENT_COUNTRY]) {
    document.getElementById('content').innerHTML = '<div class="card">Sin planes de renovación cargados.</div>';
    return;
  }
  const plans = ACTION_PLANS[CURRENT_COUNTRY];
  const ops = getOperators();
  const channels = getParamountChannels();
  const chKeys = Object.keys(channels);
  const opKeys = Object.keys(ops);
  const countryName = CURRENT_COUNTRY === 'es' ? 'España' : 'Portugal';

  const priorityClass = (p) => {
    const s = (p||'').toLowerCase();
    if (s.includes('crítico') || s.includes('critico') || s.includes('entrar') || s.includes('recuperar')) return 'priority-critical';
    if (s.includes('crecer') || s.includes('reentrada')) return 'priority-high';
    if (s.includes('mantener') || s.includes('consolidar')) return 'priority-stable';
    return '';
  };

  // Matriz de prioridades operador × canal
  const matrix = opKeys.map(opK => {
    const row = { op: ops[opK], opKey: opK, cells: [] };
    chKeys.forEach(chK => {
      const plan = plans[chK] && plans[chK][opK];
      row.cells.push({ chKey: chK, chName: channels[chK].name, plan });
    });
    return row;
  });

  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div class="page-title-block">
        <h1>Renovaciones — ${countryName}</h1>
        <div class="page-desc">Visión global de los planes de acción y renovación de contratos con cada operador. Selecciona un operador en el menú para ver el detalle por canal.</div>
      </div>
      <div class="page-meta"><span class="page-meta-dot"></span> ${opKeys.length} operadores × ${chKeys.length} canales</div>
    </div>

    <div class="card">
      <div class="card-head"><div>
        <div class="card-title">Matriz de prioridades · Operador × Canal</div>
        <div class="card-subtitle">Click en cada celda para ir al plan detallado del operador</div>
      </div></div>
      <div style="overflow-x:auto">
        <table class="renov-matrix">
          <thead>
            <tr>
              <th style="text-align:left">Operador</th>
              ${chKeys.map(k => `<th>${channels[k].name}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${matrix.map(row => `
              <tr>
                <td style="cursor:pointer" onclick="navigate('renov-${row.opKey}')">
                  <div style="display:flex; align-items:center; gap:10px">
                    <span class="dot-op" style="background:${row.op.color}; width:10px; height:10px"></span>
                    <strong>${row.op.name}</strong>
                  </div>
                </td>
                ${row.cells.map(cell => `
                  <td onclick="navigate('renov-${row.opKey}')" style="cursor:pointer; text-align:center">
                    ${cell.plan ? `
                      <span class="action-priority ${priorityClass(cell.plan.priority)}" style="font-size:9.5px">${cell.plan.priority||'—'}</span>
                      <div style="font-size:10px; color:var(--text-muted); margin-top:4px">${cell.plan.deadline ? (cell.plan.deadline.length > 28 ? cell.plan.deadline.slice(0,27)+'…' : cell.plan.deadline) : ''}</div>
                    ` : '<span style="color:var(--text-muted); font-size:11px">—</span>'}
                  </td>
                `).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="grid-2">
      ${opKeys.map(opK => {
        const op = ops[opK];
        const planCount = chKeys.filter(chK => plans[chK] && plans[chK][opK]).length;
        const critical = chKeys.filter(chK => {
          const p = plans[chK] && plans[chK][opK];
          if (!p) return false;
          const s = (p.priority||'').toLowerCase();
          return s.includes('crítico') || s.includes('critico') || s.includes('entrar') || s.includes('recuperar');
        }).length;
        return `
          <div class="card" style="cursor:pointer; border-top:4px solid ${op.color}" onclick="navigate('renov-${opK}')">
            <div class="card-head"><div>
              <div class="card-title" style="color:${op.color}">${op.name}</div>
              <div class="card-subtitle">${planCount} planes · ${critical > 0 ? `<span style="color:#c0392b; font-weight:700">${critical} críticos</span>` : 'sin críticos'}</div>
            </div></div>
            <div style="display:flex; flex-direction:column; gap:6px; margin-top:8px">
              ${chKeys.map(chK => {
                const p = plans[chK] && plans[chK][opK];
                if (!p) return '';
                return `
                  <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 8px; background:var(--surface-2); border-radius:6px">
                    <span style="font-size:12px; font-weight:600">${channels[chK].name}</span>
                    <span class="action-priority ${priorityClass(p.priority)}" style="font-size:9px">${p.priority||'—'}</span>
                  </div>
                `;
              }).join('')}
            </div>
            <div style="margin-top:14px; font-size:11.5px; color:${op.color}; font-weight:600">Ver detalle completo →</div>
          </div>
        `;
      }).join('')}
    </div>

    ${typeof NEGOTIATION_FRAMEWORK !== 'undefined' ? `
      <div class="section-anchor">📑 Marco de negociación de carriage</div>
      <div class="action-intro">
        Term sheet y guion de negociación aplicables a todos los operadores. Perspectiva: Paramount como licenciante (vendedor).
        Los campos marcados con <code>[ ]</code> se rellenan en la mesa; las variables económicas clave (CPS, mínimo, escalador, MFN) están precargadas por operador-canal en cada ficha.
      </div>

      <div class="termsheet-grid">
        ${NEGOTIATION_FRAMEWORK.term_sheet_sections.map(sec => `
          <div class="termsheet-card">
            <div class="termsheet-card-title">${sec.icon} ${sec.title}</div>
            ${sec.note ? `<div class="termsheet-note">${sec.note}</div>` : ''}
            <table class="termsheet-table">
              ${sec.rows.map(r => `
                <tr>
                  <td class="termsheet-var">${r.variable}</td>
                  <td class="termsheet-val ${r.editable ? 'editable' : ''}">${r.value}</td>
                </tr>
              `).join('')}
            </table>
          </div>
        `).join('')}
      </div>

      <div class="section-anchor">🤝 Guion de negociación por fases</div>
      <div class="phases-timeline">
        ${NEGOTIATION_FRAMEWORK.phases.map(ph => `
          <div class="phase-card" style="border-left:4px solid ${ph.color}">
            <div class="phase-head">
              <span class="phase-num" style="background:${ph.color}">${ph.num}</span>
              <div>
                <div class="phase-title">${ph.title}</div>
                <div class="phase-subtitle">${ph.subtitle}</div>
              </div>
            </div>
            <ul class="phase-points">
              ${ph.points.map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>

      ${NEGOTIATION_FRAMEWORK.strategic_reminder ? `
        <div class="strategic-reminder">
          <div class="strategic-reminder-icon">♟️</div>
          <div><strong>Recordatorio estratégico.</strong> ${NEGOTIATION_FRAMEWORK.strategic_reminder}</div>
        </div>
      ` : ''}
    ` : ''}
  `;
}

/* ────────────────────────────────────────────────
   RENDER: RENOVACIONES — DETALLE POR OPERADOR (con tabs por canal)
──────────────────────────────────────────────── */
function renderRenovacionesOperador(opKey) {
  if (typeof ACTION_PLANS === 'undefined' || !ACTION_PLANS[CURRENT_COUNTRY]) {
    document.getElementById('content').innerHTML = '<div class="card">Sin planes de renovación cargados.</div>';
    return;
  }
  const plans = ACTION_PLANS[CURRENT_COUNTRY];
  const ops = getOperators();
  const channels = getParamountChannels();
  const op = ops[opKey];
  if (!op) { renderHome(); return; }

  // Canales con plan para este operador
  const chKeys = Object.keys(channels).filter(chK => plans[chK] && plans[chK][opKey]);
  if (chKeys.length === 0) {
    document.getElementById('content').innerHTML = `<div class="card">No hay planes para ${op.name} en este país.</div>`;
    return;
  }

  // Determinar canal activo (default: primero)
  const activeCh = (typeof CURRENT_RENOV_CH !== 'undefined' && chKeys.includes(CURRENT_RENOV_CH))
    ? CURRENT_RENOV_CH
    : chKeys[0];

  const priorityClass = (p) => {
    const s = (p||'').toLowerCase();
    if (s.includes('crítico') || s.includes('critico') || s.includes('entrar') || s.includes('recuperar')) return 'priority-critical';
    if (s.includes('crecer') || s.includes('reentrada')) return 'priority-high';
    if (s.includes('mantener') || s.includes('consolidar')) return 'priority-stable';
    return '';
  };

  // Función para renderizar el plan de un canal
  const renderPlan = (chK) => {
    const p = plans[chK][opKey];
    if (!p) return '<div class="card">Sin plan para este canal.</div>';
    const sc = p.scenarios || {};
    const ch = channels[chK];

    return `
      <div class="renov-plan-card" style="border-left:5px solid ${op.color}">
        <div class="renov-plan-header">
          <div>
            <div class="renov-plan-channel">${ch.name}</div>
            <div class="renov-plan-subtitle">${ch.target_short||ch.target_age||''} · Plan de acción para ${op.name}</div>
          </div>
          <span class="action-priority ${priorityClass(p.priority)}" style="font-size:11px; padding:5px 12px">${p.priority||'—'}</span>
        </div>

        <div class="renov-plan-meta">
          <div class="action-meta-item">
            <span class="action-meta-label">Deadline</span>
            <span class="action-meta-value">${p.deadline||'—'}</span>
          </div>
          ${p.fee_estimate ? `<div class="action-meta-item">
            <span class="action-meta-label">Fee estimado</span>
            <span class="action-meta-value">${p.fee_estimate}</span>
          </div>` : ''}
        </div>

        <div class="action-section">
          <div class="action-section-title">📌 Qué pedir a ${op.name}</div>
          <div class="action-section-text">${p.ask||''}</div>
        </div>

        <div class="action-section">
          <div class="action-section-title">🧭 Táctica recomendada</div>
          <div class="action-section-text muted">${p.tactic||''}</div>
        </div>

        ${p.offers && p.offers.length ? `
        <div class="action-section">
          <div class="action-section-title">💼 Ofertas concretas para llevar a la mesa</div>
          <ul class="action-offers">
            ${p.offers.map(o => `<li>${o}</li>`).join('')}
          </ul>
        </div>` : ''}

        ${p.competitor_deals && p.competitor_deals.length ? `
        <div class="action-section">
          <div class="action-section-title">🏢 Deals de competidores (benchmarking)</div>
          <ul class="action-competitors">
            ${p.competitor_deals.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>` : ''}

        ${(typeof NEGOTIATION_ECONOMICS !== 'undefined' && NEGOTIATION_ECONOMICS[CURRENT_COUNTRY] && NEGOTIATION_ECONOMICS[CURRENT_COUNTRY][chK] && NEGOTIATION_ECONOMICS[CURRENT_COUNTRY][chK][opKey]) ? (() => {
          const ec = NEGOTIATION_ECONOMICS[CURRENT_COUNTRY][chK][opKey];
          const levClass = (l) => {
            const s = (l||'').toLowerCase();
            if (s.includes('alto')) return 'lev-high';
            if (s.includes('muy bajo') || s.includes('conflicto')) return 'lev-critical';
            if (s.includes('bajo')) return 'lev-low';
            return 'lev-mid';
          };
          return `
          <div class="action-section">
            <div class="action-section-title">💶 Term sheet económico (posición de negociación)</div>
            <div class="econ-cps-row">
              <div class="econ-cps econ-cps-open">
                <div class="econ-cps-label">CPS apertura</div>
                <div class="econ-cps-value">${ec.cps_open}</div>
                <div class="econ-cps-sub">por sub/mes</div>
              </div>
              <div class="econ-cps-arrow">→</div>
              <div class="econ-cps econ-cps-target">
                <div class="econ-cps-label">CPS objetivo</div>
                <div class="econ-cps-value">${ec.cps_target}</div>
                <div class="econ-cps-sub">realista</div>
              </div>
              <div class="econ-cps-arrow">→</div>
              <div class="econ-cps econ-cps-walk">
                <div class="econ-cps-label">Walk-away</div>
                <div class="econ-cps-value">${ec.cps_walkaway}</div>
                <div class="econ-cps-sub">mínimo</div>
              </div>
            </div>
            <table class="econ-table">
              <tr><td class="econ-var">Mínimo garantizado</td><td class="econ-val">${ec.min_guarantee}</td></tr>
              <tr><td class="econ-var">Escalador anual</td><td class="econ-val">${ec.escalator}</td></tr>
              <tr><td class="econ-var">Cláusula MFN</td><td class="econ-val">${ec.mfn}</td></tr>
              <tr><td class="econ-var">Estrategia de bundle</td><td class="econ-val">${ec.bundle}</td></tr>
              <tr><td class="econ-var">BATNA (alternativa)</td><td class="econ-val">${ec.batna}</td></tr>
              <tr><td class="econ-var">Leverage (poder negociador)</td><td class="econ-val"><span class="econ-lev ${levClass(ec.leverage)}">${ec.leverage}</span></td></tr>
            </table>
          </div>
          `;
        })() : ''}

        ${(sc.worst || sc.base || sc.best) ? `
        <div class="action-section">
          <div class="action-section-title">📊 Escenarios proyectados</div>
          <div class="scenario-grid">
            ${sc.worst ? `
              <div class="scenario-card scenario-worst">
                <div class="scenario-head">⬇️ ${sc.worst.label||'Worst'}</div>
                <div class="scenario-desc">${sc.worst.description||''}</div>
                ${sc.worst.kpis ? `<div class="scenario-kpis">
                  ${Object.entries(sc.worst.kpis).map(([key,val]) => `
                    <div class="scenario-kpi">
                      <span class="scenario-kpi-label">${key.replace(/_/g,' ')}</span>
                      <span class="scenario-kpi-value">${val}</span>
                    </div>
                  `).join('')}
                </div>` : ''}
              </div>` : ''}
            ${sc.base ? `
              <div class="scenario-card scenario-base">
                <div class="scenario-head">➡️ ${sc.base.label||'Base'}</div>
                <div class="scenario-desc">${sc.base.description||''}</div>
                ${sc.base.kpis ? `<div class="scenario-kpis">
                  ${Object.entries(sc.base.kpis).map(([key,val]) => `
                    <div class="scenario-kpi">
                      <span class="scenario-kpi-label">${key.replace(/_/g,' ')}</span>
                      <span class="scenario-kpi-value">${val}</span>
                    </div>
                  `).join('')}
                </div>` : ''}
              </div>` : ''}
            ${sc.best ? `
              <div class="scenario-card scenario-best">
                <div class="scenario-head">⬆️ ${sc.best.label||'Best'}</div>
                <div class="scenario-desc">${sc.best.description||''}</div>
                ${sc.best.kpis ? `<div class="scenario-kpis">
                  ${Object.entries(sc.best.kpis).map(([key,val]) => `
                    <div class="scenario-kpi">
                      <span class="scenario-kpi-label">${key.replace(/_/g,' ')}</span>
                      <span class="scenario-kpi-value">${val}</span>
                    </div>
                  `).join('')}
                </div>` : ''}
              </div>` : ''}
          </div>
        </div>` : ''}
      </div>
    `;
  };

  document.getElementById('content').innerHTML = `
    <div class="op-header" style="background:linear-gradient(135deg, ${op.color}15, ${op.color}05); border-left:6px solid ${op.color}">
      <div class="op-logo ${opKey}" style="background:${op.color}; color:#fff">${op.name.slice(0,3).toUpperCase()}</div>
      <div class="op-info">
        <h1>Renovaciones · ${op.name}</h1>
        <div class="op-parent">${op.parent} · ${chKeys.length} canales Paramount con plan de acción</div>
        <div class="op-tags">
          <span class="op-tag" style="cursor:pointer" onclick="navigate('${opKey}')">📊 Ver ficha operador</span>
          <span class="op-tag" style="cursor:pointer" onclick="navigate('renovaciones')">↩ Volver a Renovaciones</span>
        </div>
      </div>
    </div>

    <div class="renov-tabs">
      ${chKeys.map(chK => {
        const p = plans[chK][opKey];
        return `
          <button class="renov-tab ${chK===activeCh?'active':''}" onclick="setRenovChannel('${opKey}','${chK}')">
            <span class="renov-tab-name">${channels[chK].name}</span>
            <span class="action-priority ${priorityClass(p.priority)}" style="font-size:8.5px; padding:2px 6px">${(p.priority||'').replace(/\s.*$/,'').slice(0,12)}</span>
          </button>
        `;
      }).join('')}
    </div>

    <div id="renov-plan-container">
      ${renderPlan(activeCh)}
    </div>

    ${renderNews && typeof renderNews === 'function' ? renderNews(opKey) : ''}
  `;
}

// Estado activo del tab de renovaciones
let CURRENT_RENOV_CH = null;
function setRenovChannel(opKey, chK) {
  CURRENT_RENOV_CH = chK;
  renderRenovacionesOperador(opKey);
  document.querySelector('.main').scrollTop = 0;
}


/* ────────────────────────────────────────────────
   RENDER: OTT LIBRE
──────────────────────────────────────────────── */
function renderOTTLibre(key) {
  const ott = OTT_LIBRE[key];
  if (!ott) { renderHome(); return; }

  // Helper para enriquecer canales destacados con grupo + FAST
  const enrichChannel = (chName) => {
    if (typeof CHANNEL_INFO === 'undefined') return { name: chName };
    if (CHANNEL_INFO[chName]) return { name: chName, ...CHANNEL_INFO[chName] };
    const normalized = chName.replace(/\s*(HD|FHD|UHD|4K|\+)\s*$/i, '').trim();
    if (CHANNEL_INFO[normalized]) return { name: chName, ...CHANNEL_INFO[normalized] };
    return { name: chName };
  };

  document.getElementById('content').innerHTML = `
    <div class="op-header" style="background:linear-gradient(135deg, ${ott.color}10, ${ott.color}05)">
      <div class="op-logo" style="background:linear-gradient(135deg, ${ott.color}, ${ott.color})">${ott.name.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase()}</div>
      <div class="op-info">
        <h1>${ott.name}</h1>
        <div class="op-parent">${ott.parent} · OTT contratable sin fibra del operador</div>
        <div class="op-tags">
          ${ott.launched?`<span class="op-tag">${ott.launched}</span>`:''}
          ${ott.devices?`<span class="op-tag">${ott.devices}</span>`:''}
          ${ott.quality?`<span class="op-tag">${ott.quality}</span>`:''}
          <span class="op-tag">Sin permanencia</span>
        </div>
      </div>
    </div>

    <div class="infobox"><b>Sobre ${ott.name}.</b> ${ott.description}</div>

    <div class="kpi-grid">
      ${kpi({ label:'Precio desde', value:ott.price_from||'—', accent:'pink', subtitle:'sin permanencia', date:'Vigente', fieldId:`ott.${key}.price`, sourceUrl:ott.source_url })}
      ${kpi({ label:'Suscriptores', value:ott.subs_estimate||'—', accent:'gold', subtitle:'reportado / estimado', date:'Q1 2026', fieldId:`ott.${key}.subs`, sourceUrl:ott.source_url })}
      ${kpi({ label:'Canales incluidos', value:(ott.channels_included && ott.channels_included.length) || '—', accent:'movistar', subtitle:'destacados en parrilla', date:'Actual', fieldId:`ott.${key}.cat` })}
      ${kpi({ label:'Competidores directos', value:(ott.competitors && ott.competitors.length) || '—', accent:'vodafone', subtitle:'OTT comparables', date:'Análisis propio', fieldId:`ott.${key}.comp` })}
    </div>

    ${ott.subs_note ? `
      <div class="card">
        <div class="card-head"><div><div class="card-title">Detalle de suscriptores</div></div></div>
        <p style="font-size:13px; color:var(--text-secondary); line-height:1.6; margin:0">${ott.subs_note}</p>
      </div>
    ` : ''}

    ${ott.pricing_tiers && ott.pricing_tiers.length ? `
      <div class="section-anchor">Planes y precios</div>
      <div class="ott-tiers-grid">
        ${ott.pricing_tiers.map(t => `
          <div class="ott-tier-card" style="border-top:3px solid ${ott.color}">
            <div class="ott-tier-label">${t.label}</div>
            <div class="ott-tier-price" style="color:${ott.color}">${t.price}</div>
            <div class="ott-tier-detail">${t.detail||''}</div>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${(ott.sports && ott.sports.length) || ott.extras ? `
      <div class="grid-2">
        ${ott.sports && ott.sports.length ? `
          <div class="card">
            <div class="card-head"><div><div class="card-title">⚽ Fútbol y deportes incluidos</div></div></div>
            <ul style="margin:0; padding-left:18px; font-size:12.5px; color:var(--text-primary); line-height:1.7">
              ${ott.sports.map(s => `<li>${s}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        ${ott.extras ? `
          <div class="card">
            <div class="card-head"><div><div class="card-title">⚙️ Funcionalidades</div></div></div>
            <div style="font-size:12.5px; color:var(--text-primary); line-height:1.6">${ott.extras}</div>
          </div>
        ` : ''}
      </div>
    ` : ''}

    ${ott.paramount_presence ? `
      <div class="card" style="border-left:4px solid #0064ff">
        <div class="card-head"><div><div class="card-title" style="color:#0064ff">🎬 Presencia Paramount en este OTT</div></div></div>
        <p style="font-size:13px; color:var(--text-primary); line-height:1.6; margin:0">${ott.paramount_presence}</p>
      </div>
    ` : ''}

    ${ott.catalog && ott.catalog.length ? `
      <div class="card">
        <div class="card-head"><div><div class="card-title">Catálogo destacado</div></div></div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">
          ${ott.catalog.map(c => `<span class="op-tag" style="font-size:11.5px">${c}</span>`).join('')}
        </div>
      </div>
    ` : ''}

    ${ott.channels_included && ott.channels_included.length ? `
      <div class="card">
        <div class="card-head"><div>
          <div class="card-title">Canales destacados incluidos</div>
          <div class="card-subtitle">Con grupo audiovisual</div>
        </div></div>
        <div class="channel-grid">
          ${ott.channels_included.map(ch => {
            const info = enrichChannel(ch);
            return `
              <div class="channel-pill" ${info.group ? `data-tip="${info.group.replace(/"/g,'&quot;')}"` : ''}>
                <span class="ch-name">${info.name}</span>
                ${info.group ? `<span class="ch-group">${info.group.length > 24 ? info.group.slice(0,23)+'…' : info.group}</span>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    ` : ''}

    ${ott.competitors && ott.competitors.length ? `
      <div class="card">
        <div class="card-head"><div><div class="card-title">Competencia directa (benchmarking)</div></div></div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">
          ${ott.competitors.map(c => `<span class="op-tag">${c}</span>`).join('')}
        </div>
      </div>
    ` : ''}

    ${ott.source_url ? `
      <div style="margin-top:14px; font-size:11.5px; color:var(--text-muted); text-align:center">
        Fuente oficial: <a href="${ott.source_url}" target="_blank" rel="noopener noreferrer" style="color:var(--peak-blue); text-decoration:none; border-bottom:1px dotted var(--peak-blue)">${ott.source_url}</a>
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
    ['Líneas fibra (M)', op => fmt(op.ftth_lines)],
    ['Cuota fibra', op => fmt(market.ftth_share[op.name] || 0)+'%'],
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
              <div class="card-subtitle">${ch.target_short||ch.target_age||ch.target||''} · Desde ${ch.launched||'—'}</div>
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

  const renewal = ch.renegotiation || ch.renewal || {};

  document.getElementById('content').innerHTML = `
    <div class="op-header" style="background:linear-gradient(135deg, ${ch.color}10, ${ch.color}05)">
      <div class="op-logo" style="background:linear-gradient(135deg, ${ch.color}, ${ch.color}dd); font-size:14px">${ch.name.split(' ').slice(0,2).map(w=>w[0]).join('')}</div>
      <div class="op-info">
        <h1>${ch.name}</h1>
        <div class="op-parent">Paramount Networks EMEAA · ${ch.target_short||ch.target_age||ch.target||''} · Lanzado: ${ch.launched||'—'}</div>
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
      ${kpi({ label:'Target', value:(ch.target_short||ch.target_age||ch.target||'').split(' ')[0], accent:'pink', subtitle:ch.target_short||ch.target_age||ch.target||'', date:'Posicionamiento', fieldId:null })}
      ${ch.competitors ? kpi({ label:'Competidores directos', value:ch.competitors.length, accent:'vodafone', date:'Análisis propio', fieldId:`pch.${chKey}.comp` }) : ''}
    </div>

    ${(typeof TARGET_PROFILES !== 'undefined' && TARGET_PROFILES[CURRENT_COUNTRY] && TARGET_PROFILES[CURRENT_COUNTRY][chKey]) ? (() => {
      const tp = TARGET_PROFILES[CURRENT_COUNTRY][chKey];
      return `
      <div class="card">
        <div class="card-head"><div><div class="card-title">Perfil tipo del target</div><div class="card-subtitle">Edad, género, intereses y comportamiento de consumo</div></div></div>
        <div class="target-profile">
          <div class="target-row">
            <div class="target-cell">
              <div class="target-label">Edad</div>
              <div class="target-value">${tp.age_range}</div>
            </div>
            <div class="target-cell">
              <div class="target-label">Género</div>
              <div class="target-value">${tp.gender_split}</div>
            </div>
            <div class="target-cell">
              <div class="target-label">Nivel socioeconómico</div>
              <div class="target-value">${tp.socioeconomic}</div>
            </div>
            <div class="target-cell">
              <div class="target-label">Decisor de compra</div>
              <div class="target-value">${tp.decision_maker}</div>
            </div>
          </div>
          <div class="target-block">
            <div class="target-label">Intereses principales</div>
            <div class="target-tags">${tp.key_interests.map(i => `<span class="target-tag">${i}</span>`).join('')}</div>
          </div>
          <div class="target-block">
            <div class="target-label">Comportamiento de consumo</div>
            <ul class="target-list">${tp.consumption_behavior.map(b => `<li>${b}</li>`).join('')}</ul>
          </div>
          <div class="target-row">
            <div class="target-cell" style="flex:1">
              <div class="target-label">Marcas complementarias</div>
              <div class="target-value-sub">${tp.complementary_brands}</div>
            </div>
            <div class="target-cell" style="flex:1">
              <div class="target-label">Valor publicitario</div>
              <div class="target-value-sub">${tp.ad_value}</div>
            </div>
          </div>
          ${tp.sources && tp.sources.length ? `
            <div class="target-sources">
              <span class="target-sources-label">Fuentes</span>
              <span class="target-sources-list">
                ${tp.sources.map((s,idx) => `
                  <span class="target-source-item">${s.url ? `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label}</a>` : s.label}${idx < tp.sources.length-1 ? ' ·' : ''}</span>
                `).join('')}
              </span>
            </div>
          ` : ''}
        </div>
      </div>
      `;
    })() : ''}

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

    ${(typeof AUDIENCE_DATA !== 'undefined' && AUDIENCE_DATA[CURRENT_COUNTRY] && AUDIENCE_DATA[CURRENT_COUNTRY][chKey]) ? (() => {
      const aud = AUDIENCE_DATA[CURRENT_COUNTRY][chKey];
      const trendIcon = aud.trend === 'down' ? '📉' : (aud.trend === 'up' ? '📈' : '➡️');
      const trendColor = aud.trend === 'down' ? '#c0392b' : (aud.trend === 'up' ? '#1f9d55' : '#7a80a8');
      return `
        <div class="section-anchor">📊 Análisis de audiencia</div>
        <div class="audience-intro">
          Cuota de pantalla, alcance y posición competitiva del canal en ${CURRENT_COUNTRY === 'es' ? 'España (Barlovento Comunicación · Kantar/Fifty5Blue)' : 'Portugal (GfK · CAEM)'}.
          Las cifras públicas individuales por canal de pago son escasas — los rangos provienen de los rankings agregados y patrones de los informes mensuales.
        </div>

        <div class="audience-kpis">
          <div class="audience-kpi"><div class="audience-kpi-label">Cuota TV total</div><div class="audience-kpi-value">${aud.share_total_tv}</div></div>
          <div class="audience-kpi"><div class="audience-kpi-label">Cuota TV pago</div><div class="audience-kpi-value">${aud.share_pay_tv}</div></div>
          <div class="audience-kpi"><div class="audience-kpi-label">Ranking pago</div><div class="audience-kpi-value">${aud.ranking_pay_tv}</div></div>
          <div class="audience-kpi"><div class="audience-kpi-label">Alcance anual</div><div class="audience-kpi-value">${aud.reach_annual}</div></div>
          <div class="audience-kpi audience-kpi-wide"><div class="audience-kpi-label">Cuota en target</div><div class="audience-kpi-value">${aud.target_share}</div></div>
        </div>

        <div class="audience-trend" style="border-left:4px solid ${trendColor}">
          <span style="font-size:18px">${trendIcon}</span>
          <div><strong style="color:${trendColor}">Tendencia · </strong>${aud.trend_label}</div>
        </div>

        <div class="grid-2">
          <div class="card">
            <div class="card-head"><div>
              <div class="card-title">Franjas horarias</div>
              <div class="card-subtitle">Cuándo se ve más y cuándo menos</div>
            </div></div>
            <div class="audience-timeslot">
              <div class="audience-timeslot-row"><span class="audience-timeslot-label strong">🔵 Fuerte:</span><span>${aud.timeslot_strongest||'—'}</span></div>
              <div class="audience-timeslot-row"><span class="audience-timeslot-label weak">⚪ Débil:</span><span>${aud.timeslot_weakest||'—'}</span></div>
            </div>
          </div>

          <div class="card">
            <div class="card-head"><div>
              <div class="card-title">Contenido top que mueve audiencia</div>
              <div class="card-subtitle">Lo más visto del canal</div>
            </div></div>
            <div class="audience-content">
              ${(aud.top_content||[]).map(c => `<span class="audience-content-tag">${c}</span>`).join('')}
            </div>
          </div>
        </div>

        ${aud.benchmark_competitors && aud.benchmark_competitors.length ? `
          <div class="card">
            <div class="card-head"><div>
              <div class="card-title">Benchmark con competidores en el mismo segmento</div>
              <div class="card-subtitle">Posición relativa por audiencia</div>
            </div></div>
            <table>
              <thead>
                <tr><th>Canal/competidor</th><th>Cuota</th><th>Lectura</th></tr>
              </thead>
              <tbody>
                ${aud.benchmark_competitors.map(b => `
                  <tr>
                    <td style="font-weight:600">${b.name}</td>
                    <td style="white-space:nowrap"><span class="op-tag" style="background:${b.stronger?'rgba(231,76,60,0.13)':'rgba(46,204,113,0.13)'}; color:${b.stronger?'#c0392b':'#1f9d55'}">${b.value}</span></td>
                    <td style="font-size:12px; color:var(--text-secondary)">${b.insight}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : ''}

        ${aud.key_insights && aud.key_insights.length ? `
          <div class="card" style="border-left:4px solid #0064ff">
            <div class="card-head"><div><div class="card-title" style="color:#0064ff">💡 Lectura estratégica</div></div></div>
            <ul class="audience-insights">
              ${aud.key_insights.map(i => `<li>${i}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        ${aud.source_note || (aud.sources && aud.sources.length) ? `
          <div class="audience-sources">
            ${aud.source_note ? `<div class="audience-source-note">${aud.source_note}</div>` : ''}
            ${aud.sources && aud.sources.length ? `
              <div class="audience-sources-list">
                <span class="audience-sources-label">Fuentes</span>
                ${aud.sources.map((s,idx) => `
                  <span class="audience-source-item">${s.url ? `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label}</a>` : s.label}${idx < aud.sources.length-1 ? ' ·' : ''}</span>
                `).join('')}
              </div>
            ` : ''}
          </div>
        ` : ''}
      `;
    })() : ''}

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

    ${(typeof ACTION_PLANS !== 'undefined' && ACTION_PLANS[CURRENT_COUNTRY] && ACTION_PLANS[CURRENT_COUNTRY][chKey]) ? (() => {
      const plan = ACTION_PLANS[CURRENT_COUNTRY][chKey];
      const priorityClass = (p) => {
        const s = (p||'').toLowerCase();
        if (s.includes('crítico') || s.includes('critico') || s.includes('entrar') || s.includes('recuperar')) return 'priority-critical';
        if (s.includes('crecer') || s.includes('reentrada')) return 'priority-high';
        if (s.includes('mantener') || s.includes('consolidar')) return 'priority-stable';
        return '';
      };
      return `
      <div class="section-anchor">🎯 Renovaciones por operador (resumen)</div>
      <div class="action-intro">
        Vista rápida de la prioridad y deadline en cada operador.
        El plan detallado (ofertas, deals de competidores, escenarios worst/base/best) está en la nueva sección <strong>Renovaciones</strong> del menú lateral.
      </div>
      <div class="renov-summary-grid">
        ${opKeys.filter(k => plan[k]).map(k => {
          const p = plan[k];
          return `
            <div class="renov-summary-card" style="border-left:4px solid ${ops[k].color}" onclick="setRenovChannel('${k}','${chKey}')">
              <div class="renov-summary-head">
                <div class="renov-summary-op" style="color:${ops[k].color}">${ops[k].name}</div>
                <span class="action-priority ${priorityClass(p.priority)}" style="font-size:9.5px">${p.priority||'—'}</span>
              </div>
              <div class="renov-summary-deadline">⏱ ${p.deadline||'—'}</div>
              <div class="renov-summary-link" style="color:${ops[k].color}">Ver plan completo →</div>
            </div>
          `;
        }).join('')}
      </div>
      `;
    })() : ''}

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
