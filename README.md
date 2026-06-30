# Telco Hub — Operadores Iberia

Dashboard interno para visualizar información de los principales operadores de fibra, móvil y TV en España y Portugal, con foco especial en los canales Paramount lineales.

## Estructura

```
.
├── index.html       # HTML estructural + login overlay
├── styles.css       # Estilos (marca Paramount: Vista Navy + Peak Blue)
├── data.js          # Datos (operadores, canales, OTT libres, grupos, Paramount)
├── app.js           # Lógica: navegación, renders, refresh, tooltips
├── vercel.json      # Config de deploy estático
└── README.md
```

## Desarrollo local

Es 100% estático. Cualquier servidor HTTP simple lo sirve:

```bash
# Opción 1: Python
python3 -m http.server 8000

# Opción 2: Node
npx serve .

# Opción 3: Vercel CLI
npx vercel dev
```

Luego abrir `http://localhost:8000` (o el puerto que indique).

## Deploy en Vercel

1. Push del repo a GitHub.
2. En Vercel: **New Project** → conectar el repo.
3. Framework Preset: **Other** (es estático puro).
4. No requiere build, Output Directory: raíz.
5. Deploy.

`vercel.json` ya configura headers y rutas.

## Acceso

Contraseña actual hardcoded: `paramountmadrid`

> **Nota seguridad:** en una fase futura conviene mover esto a un check server-side o usar Vercel Password Protection. Por ahora es un gate cliente para evitar exposición casual.

## Datos

- **España**: CNMC (datos mensuales + trimestrales)
- **Portugal**: ANACOM (Q1 2026)
- **Operadores**: cifras corporativas oficiales (Q1 2026)

Los datos están hardcodeados en `data.js`. En el futuro se podrán mover a **Supabase**:

```
operators          (key, country, name, parent, color, ...)
operator_metrics   (operator_key, period, mobile_lines, ftth_lines, tv_subs, ...)
channels           (key, group_key, name, target_age, ...)
operator_channels  (operator_key, channel_key, dial, package, available)
paramount_renewal  (channel_key, country, swot_category, label, detail)
```

## Roadmap de cambios pendientes

Trabajamos por bloques de 3:

- ✅ Bloque 1: óvalos sidebar, tooltip de info, eliminar Speedtest
- ✅ Bloque 2: datos marzo 2026 (CNMC) + Q1 2026 (ANACOM), sin planes, sin Highlights
- ✅ Bloque 3: botón "Fuente" junto a icono "i", rango fechas en KPIs, noticias por sección
- ✅ Bloque 4: perfil tipo del target (edad, género, intereses, consumo) y plan de acción por operador en canales Paramount
- ✅ Bloque 5: planes de acción enriquecidos con ofertas concretas, deals de competidores (SkyShowtime, Disney+, Warner/Max, AMC, BBC, Canal Panda) y 3 escenarios (worst/base/best) con KPIs numéricos por operador
- ✅ Bloque 6: Home KPIs (Clientes TV), nueva página Evolución 10 años con 4 gráficos SVG, KPIs operador con % sobre 4 ops foco, OTTs (Movistar Plus+ y Orange TV Libre) con datos oficiales completos (tiers, suscriptores, fútbol, fuentes), canales con grupo audiovisual + chip FAST, target con fuentes (Barlovento, Kantar, GfK…), eliminado KPI "Diales conocidos" de canales Paramount
- ✅ Bloque 7: nueva sección sidebar "Renovaciones" con vista hub (matriz operador × canal) + ficha detallada por operador con tabs por canal (4 ES + 3 PT). El plan completo (ofertas, deals competidores, escenarios) vive ahora en Renovaciones; en cada canal Paramount queda un resumen corto con link directo al plan del operador. Fix: claves PT (vodafone_pt/digi_pt) alineadas en ACTION_PLANS
- ✅ Bloque 8: análisis de audiencias por canal Paramount (4 ES + 3 PT) con datos públicos de Barlovento/Kantar/Fifty5Blue (ES) y GfK/CAEM (PT). Incluye 5 KPIs (cuota total, pago, ranking, alcance, target), franjas horarias fuertes/débiles, contenido top, benchmark con competidores directos (Boing, Disney Junior, Canal Panda, Panda Kids, Gloob, Warner TV, Spotify), tendencia, lectura estratégica y fuentes verificadas con enlace
- ✅ Bloque 9: (1-4) "FTTH"→"Fibra" en toda la UI + gráfico cuota TV en home; (5) Evolución reorganizada con gráfico total + por operador en móvil/fibra/TV (10 años); (6) Movistar Plus OTT con datos oficiales (planes Gratuito/Libre 4,99€/Deportes 9,99€/miMovistar 67€); (7) badge FAST eliminado de la UI (solo grupo audiovisual, que es verificable); (8) favicon de TV; (9) bloque "Descripción del target" eliminado; (10) Renovaciones rehechas con framework de carriage del MD: term sheet (6 secciones) + guion de 5 fases + recordatorio estratégico en el hub, y term sheet económico (CPS apertura/objetivo/walk-away, mínimo garantizado, escalador, MFN, bundle, BATNA, leverage) por operador-canal

## Autor

Borja Pérez Herraiz · Paramount · 2026
