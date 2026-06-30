/* ════════════════════════════════════════════
   DATOS — MERCADO
   ES: CNMC datos marzo 2026 (publ. 6 mayo 2026)
   PT: ANACOM Q1 2026 (publ. mayo 2026)
══════════════════════════════════════════════ */
const MARKET = {
  es: {
    name: 'España', flag: '🇪🇸', regulator: 'CNMC',
    total_mobile_lines: 62.61,          // marzo 2026
    total_ftth_lines: 18.07,            // marzo 2026 (superó 18M, +76.784 mes)
    total_bb_lines: 19.70,              // marzo 2026 (+73.309)
    total_fixed_lines: 17.61,           // marzo 2026 (+9.969)
    mobile_voice_bb: 56.44,             // marzo 2026 (+2,9% YoY)
    m2m_lines: 50.79,                   // marzo 2026
    portability_mobile: 599196,         // marzo 2026 (+12,7% YoY)
    last_data_date: 'Marzo 2026',
    last_pub_date: '6 mayo 2026',
    data_source_url: 'https://www.cnmc.es/prensa/datos-marzo-telecos-20260506',
    ftth_share: { Movistar: 32.5, MASORANGE: 23.6, Vodafone: 16.6, DIGI: 13.8, Otros: 13.5 },
    mobile_share: { Movistar: 28.1, MASORANGE: 30.6, Vodafone: 17.5, DIGI: 12.7, OMV: 11.1 },
    top3_bb: 81.5,
    top4_bb: 95.3,
    top3_mobile: 86.7,
    top4_mobile: 99.0
  },
  pt: {
    name: 'Portugal', flag: '🇵🇹', regulator: 'ANACOM',
    total_mobile_lines: 14.2,
    total_ftth_lines: 5.3,              // Q1 2026 estimación
    total_bb_lines: 5.5,
    total_fixed_lines: 4.5,
    packets_subs: 4.80,                 // Q1 2026 (+0,8% YoY = +38k)
    arpu_packet: 39.59,                 // €/mes Q1 2026 (descenso leve)
    quad_quint_play_share: 61.5,        // % subscriptores en 4P/5P
    last_data_date: 'Q1 2026',
    last_pub_date: 'Mayo 2026',
    data_source_url: 'https://tek.sapo.pt/noticias/telecomunicacoes/artigos/portugueses-preferem-pacotes-de-telecomunicacoes-mais-completos-apesar-da-descida-do-preco-medio-para-3959-euros/',
    ftth_share: { MEO: 41.5, NOS: 34.9, Vodafone: 20.3, DIGI: 3.2, Otros: 0.1 },
    mobile_share: { MEO: 41.5, NOS: 34.9, Vodafone: 20.3, DIGI: 3.2, Otros: 0.1 },
    top3_bb: 96.7,
    top4_bb: 99.9,
    top3_mobile: 96.7,
    top4_mobile: 99.9
  }
};

/* ════════════════════════════════════════════
   OPERADORES — ESPAÑA
══════════════════════════════════════════════ */
const OPERATORS_ES = {
  movistar: {
    key: 'movistar', name: 'Movistar', parent: 'Telefónica España',
    color: '#019df4', tagline: 'Líder en convergencia, FTTH y TV de pago',
    mobile_lines: 17.9,            // Q1 2026: 16M contrato + prepago + propios (récord histórico contrato)
    fixed_lines: 7.0, ftth_lines: 5.88,    // marzo 2026 CNMC (~32,5% × 18,07M)
    tv_subs: 3.90, arpu_convergente: 91.5, // Q1 2026 oficial: 3,9M Movistar Plus+ (IPTV+OTT)
    churn_rate: 0.7,               // % churn Q1 2026 (mínimo histórico)
    tags: ['16M contrato (récord)', 'Churn 0,7%', '3,9M Movistar Plus+'],
    tv_brand: 'Movistar Plus+',
    tv_subs_note: 'Q1 2026: 3,9M suscriptores Movistar Plus+ (IPTV + OTT consolidados a 31 mar 2026). +86k netos Q1 2026 (crec. interanual 8,3%). En 2025 récord histórico +278k netos. ARPU residencial 91,5€.',
    channels_count: '+80',
    has_ott_libre: true,
    ott_libre: 'movistar-plus-lite',
    data_source_url: 'https://www.telefonica.com/es/sala-comunicacion/prensa/telefonica-eleva-ingresos-hasta-8127-millones-euros-primer-trimestre-confirma-objetivos-financieros-2026/',
    data_period: 'Q1 2026 (al 31 mar 2026) · pub. 14 may 2026',
    channels: [
      { cat:'Generalistas', items:[
        { name:'La 1', dial:'1' },{ name:'La 2', dial:'2' },{ name:'Antena 3', dial:'3' },
        { name:'Cuatro', dial:'4' },{ name:'Telecinco', dial:'5' },{ name:'laSexta', dial:'6' },
        { name:'#Vamos', dial:'8' },{ name:'#0', dial:'7' }
      ]},
      { cat:'Cine y Series', items:[
        { name:'Movistar Cine', dial:'30' },{ name:'Movistar Drama', dial:'31' },
        { name:'Movistar Acción', dial:'32' },{ name:'Movistar Comedia', dial:'33' },
        { name:'Movistar Series', dial:'34' },{ name:'AXN', dial:'37' },{ name:'AXN Movies', dial:'38' },
        { name:'TNT', dial:'42' },{ name:'Calle 13', dial:'46' },{ name:'COSMO', dial:'47' },
        { name:'Sundance', dial:'48' },{ name:'Canal Hollywood', dial:'40' },{ name:'Somos', dial:'52' },
        { name:'XTRM', dial:'45' },{ name:'Max Avances', dial:'28' },{ name:'SkyShowtime 1', dial:'29' }
      ]},
      { cat:'Fútbol y Deportes', items:[
        { name:'LaLiga TV', dial:'53' },{ name:'LaLiga Hypermotion', dial:'54' },
        { name:'DAZN Mundial', dial:'55' },{ name:'Fanzone por M+', dial:'57' },
        { name:'DAZN Mundial 2', dial:'58' },{ name:'DAZN F1', dial:'59' },
        { name:'Champions League', dial:'62' },{ name:'Eurosport 1', dial:'65' },{ name:'Eurosport 2', dial:'66' },
        { name:'Real Madrid TV', dial:'67' },{ name:'Barça TV', dial:'68' },{ name:'GOL Play', dial:'70' }
      ]},
      { cat:'Infantil', items:[
        { name:'BabyTV', dial:'110' },{ name:'Disney Junior HD', dial:'111' },
        { name:'Nick Jr. HD', dial:'113' },{ name:'Nickelodeon HD', dial:'114' },
        { name:'DreamWorks HD', dial:'115' },{ name:'Boing HD', dial:'117' },{ name:'Clan TVE HD', dial:'118' }
      ]},
      { cat:'Documentales', items:[
        { name:'Discovery', dial:'80' },{ name:'NatGeo', dial:'81' },{ name:'NatGeo Wild', dial:'82' },
        { name:'Crime+Investigation', dial:'85' },{ name:'Historia', dial:'86' },{ name:'Odisea', dial:'88' },
        { name:'Caza y Pesca', dial:'89' },{ name:'BBC Top Gear', dial:'90' },
        { name:'BBC Drama', dial:'91' },{ name:'BBC Food', dial:'92' },{ name:'BBC History', dial:'93' }
      ]},
      { cat:'Música', items:[
        { name:'MTV España', dial:'120' },{ name:'MTV 00s', dial:'121' },
        { name:'Mezzo HD', dial:'123' },{ name:'Mezzo Live HD', dial:'124' },{ name:'Stingray Classica', dial:'125' }
      ]},
      { cat:'Internacional', items:[
        { name:'BBC World', dial:'180' },{ name:'CNN', dial:'181' },{ name:'TV5 Monde', dial:'185' },
        { name:'RAI 1', dial:'187' },{ name:'Deutsche Welle', dial:'189' }
      ]},
      { cat:'OTT integradas', items:[
        { name:'Netflix (add-on)', dial:'app' },{ name:'Disney+ (add-on)', dial:'app' },
        { name:'HBO Max (add-on)', dial:'app' },{ name:'Prime Video (add-on)', dial:'app' },
        { name:'Apple TV+ (add-on)', dial:'app' }
      ]}
    ]
  },
  vodafone: {
    key: 'vodafone', name: 'Vodafone', parent: 'Zegona Communications',
    color: '#e60000', tagline: 'Operador rojo en reset Zegona, foco rentabilidad',
    mobile_lines: 10.95,            // marzo 2026 estimación (~17,5% × 62,61M)
    fixed_lines: 3.20, ftth_lines: 3.00,  // marzo 2026 (~16,6% × 18,07M); +Finetwork desde ene 2026
    tv_subs: 1.08, arpu_convergente: 65,
    tags: ['Reset Zegona', '+Finetwork ene 2026', 'TV reforzada'],
    tv_brand: 'Vodafone TV',
    tv_subs_note: 'Cifra estimada Q1 2026. Solo abonados fibra. TV sin restricciones de tarifa desde dic 2025. Incluye Finetwork desde ene 2026 (CNMC).',
    channels_count: '+100',
    has_ott_libre: false,
    data_source_url: 'https://www.saladeprensa.vodafone.es/c/notas-prensa/np-resultadosfy25q126/',
    data_period: 'Q1 FY2026 (al 30 jun 2025) · pub. jul 2025 + CNMC mar 2026',
    channels: [
      { cat:'Generalistas TDT', items:[
        { name:'La 1', dial:'1' },{ name:'La 2', dial:'2' },{ name:'Antena 3', dial:'3' },
        { name:'Cuatro', dial:'4' },{ name:'Telecinco', dial:'5' },{ name:'laSexta', dial:'6' }
      ]},
      { cat:'Cine y Series', items:[
        { name:'AXN', dial:'40' },{ name:'AXN Movies', dial:'41' },{ name:'AXN Now (OTT)', dial:'42' },
        { name:'AMC', dial:'45' },{ name:'AMC+ Connect', dial:'46' },{ name:'AMC Anime', dial:'47' },
        { name:'AMC Selekt', dial:'48' },{ name:'Star Channel', dial:'49' },
        { name:'Warner TV', dial:'50' },{ name:'TNT', dial:'51' },{ name:'COSMO', dial:'52' },
        { name:'Sundance', dial:'53' },{ name:'Somos', dial:'56' },{ name:'XTRM', dial:'58' }
      ]},
      { cat:'BBC y Premium', items:[
        { name:'BBC Drama', dial:'60' },{ name:'BBC Series', dial:'61' },{ name:'BBC Top Gear', dial:'62' },
        { name:'BBC Player (OTT)', dial:'app' }
      ]},
      { cat:'Deportes', items:[
        { name:'LaLiga TV Hypermotion', dial:'80' },{ name:'Real Madrid TV', dial:'82' },
        { name:'Eurosport 1', dial:'85' },{ name:'Eurosport 2', dial:'86' },
        { name:'Extreme Sports', dial:'88' },{ name:'Surf Channel', dial:'89' }
      ]},
      { cat:'Infantil', items:[
        { name:'Disney Junior', dial:'70' },{ name:'Boing', dial:'73' },{ name:'Clan', dial:'74' },
        { name:'My Nick Jr.', dial:'76' },{ name:'Cry Babies', dial:'78' }
      ]},
      { cat:'Documentales', items:[
        { name:'Discovery', dial:'100' },{ name:'NatGeo', dial:'101' },{ name:'Historia', dial:'103' },
        { name:'Odisea', dial:'105' },{ name:'Crimen & Historia', dial:'106' }
      ]},
      { cat:'Música y Entretenimiento', items:[
        { name:'Movie Music', dial:'130' },{ name:'Cine Friki', dial:'131' },
        { name:'Sol Música', dial:'132' }
      ]},
      { cat:'Ficción y temáticos', items:[
        { name:'Todo Novelas', dial:'140' },{ name:'DIZI (series turcas)', dial:'141' },
        { name:'Caza y Pesca', dial:'143' },{ name:'Iberalia', dial:'145' }
      ]},
      { cat:'OTT integradas', items:[
        { name:'HBO Max (incl. plan)', dial:'app' },{ name:'Netflix (bundle)', dial:'app' },
        { name:'Disney+ (bundle)', dial:'app' },{ name:'Prime Video (bundle)', dial:'app' },
        { name:'AMC+ (add-on 3,99€)', dial:'app' }
      ]}
    ]
  },
  digi: {
    key: 'digi', name: 'DIGI', parent: 'Digi Communications N.V. (Rumanía)',
    color: '#ff6b00', tagline: 'Disruptor de precios, motor del crecimiento FTTH',
    mobile_lines: 7.58,             // Q1 2026 reporte propio (líneas móvil)
    fixed_lines: 0.867,             // Q1 2026: 867k telefonía fija
    ftth_lines: 2.75,               // Q1 2026 reporte propio (fibra)
    tv_subs: 0.217,                 // Q1 2026 reporte propio (217k TV)
    total_clients: 11.4,            // Q1 2026: 11,4M clientes totales
    arpu_convergente: 25,
    tags: ['11,4M clientes (Q1 2026)', '492k portabilidades Q1', 'Sin subidas 2026'],
    tv_brand: 'DIGI TV',
    tv_subs_note: 'Q1 2026: 217k subs TV (+25% vs Q4 2025). Mejor inicio de año histórico con 492k portabilidades.',
    channels_count: '+120',
    has_ott_libre: false,
    data_source_url: 'https://www.democrata.es/economia/digi-rebasa-las-776-000-portabilidades-hasta-mayo-y-crece-un-16/',
    data_period: 'Q1 2026 (al 31 mar 2026) · pub. 29 may 2026',
    channels: [
      { cat:'Cine y Series', items:[
        { name:'Warner Bros TV', dial:'10' },{ name:'AXN', dial:'11' },{ name:'AXN Movies', dial:'12' },
        { name:'AMC', dial:'13' },{ name:'TNT', dial:'14' },{ name:'Dark', dial:'15' },
        { name:'Somos', dial:'16' },{ name:'COSMO', dial:'17' },{ name:'Sundance', dial:'18' }
      ]},
      { cat:'BBC y Premium', items:[
        { name:'BBC Series', dial:'30' },{ name:'BBC Food', dial:'31' },{ name:'BBC Top Gear', dial:'32' }
      ]},
      { cat:'Deportes', items:[
        { name:'LaLiga TV Hypermotion', dial:'40' },{ name:'LaLiga Hypermotion 2', dial:'41' },
        { name:'LaLiga Hypermotion 3', dial:'42' },{ name:'LALIGA Inside', dial:'43' },
        { name:'Eurosport 1', dial:'45' },{ name:'Eurosport 2', dial:'46' },
        { name:'100% Caza', dial:'48' },{ name:'100% Pesca', dial:'49' }
      ]},
      { cat:'Infantil', items:[
        { name:'DreamWorks', dial:'60' },{ name:'Disney Channel', dial:'61' },
        { name:'Cartoon Network', dial:'62' },{ name:'Boing', dial:'63' },
        { name:'Nickelodeon', dial:'65' },{ name:'Nick Jr.', dial:'66' }
      ]},
      { cat:'Documentales', items:[
        { name:'NatGeo', dial:'80' },{ name:'Historia', dial:'82' },{ name:'Odisea', dial:'83' },
        { name:'Cazavisión', dial:'85' },{ name:'Iberalia Original', dial:'86' },{ name:'Negocios TV', dial:'88' }
      ]},
      { cat:'Música', items:[
        { name:'MTV España', dial:'100' },{ name:'VinTV', dial:'102' },{ name:'Sol Música', dial:'103' }
      ]},
      { cat:'Internacional (RO)', items:[
        { name:'Pro TV', dial:'120' },{ name:'Antena 1 (RO)', dial:'121' },
        { name:'Kanal D (RO)', dial:'122' },{ name:'BBC World', dial:'130' }
      ]}
    ]
  },
  masorange: {
    key: 'masorange', name: 'MASORANGE', parent: 'JV Orange + MásMóvil (2024)',
    color: '#ff7900', tagline: 'Líder por clientes · ~47M líneas (incl. M2M)',
    mobile_lines: 26.8,             // Q1 2026 estimación móvil propio sin M2M
    fixed_lines: 7.3,
    ftth_lines: 4.27,               // marzo 2026 (~23,6% × 18,07M CNMC)
    tv_subs: 1.50, arpu_convergente: 54.1,    // ARPU Q1 2026 oficial (no 52,7)
    total_lines_incl_m2m: 47.0,     // Q1 2026: ~47M total grupo
    tags: ['47M líneas (M2M incl.)', 'Q1 2026 ARPU 54,1€', 'Orange consolidación Q2 2026'],
    tv_brand: 'Orange TV',
    tv_subs_note: 'Q1 2026: ingresos 1.869M€ (+1,2%), 400k+ postpago netos 12m. ARPU convergente 54,1€.',
    channels_count: '+90',
    has_ott_libre: true,
    ott_libre: 'orange-tv-libre',
    data_source_url: 'https://blog.masorange.es/masorange/masorange-aumenta-sus-ingresos-totales-un-12-hasta-los-1-869me-en-el-primer-trimestre-de-2026/',
    data_period: 'Q1 2026 (al 31 mar 2026) · pub. 23 abr 2026',
    channels: [
      { cat:'Cine y Series', items:[
        { name:'Star Channel', dial:'30' },{ name:'AMC', dial:'31' },{ name:'Warner TV', dial:'32' },
        { name:'TNT', dial:'33' },{ name:'COSMO', dial:'34' },{ name:'Calle 13', dial:'35' },
        { name:'Canal Hollywood', dial:'36' },{ name:'TCM', dial:'37' },{ name:'AXN', dial:'38' },
        { name:'Sundance', dial:'39' },{ name:'SyFy', dial:'41' },{ name:'Comedy Central', dial:'42' }
      ]},
      { cat:'Streaming integrado', items:[
        { name:'SkyShowtime (incl.)', dial:'29' },{ name:'Netflix (add-on)', dial:'app' },
        { name:'Disney+ (add-on)', dial:'app' },{ name:'HBO Max (add-on)', dial:'app' },
        { name:'Prime Video (add-on)', dial:'app' }
      ]},
      { cat:'Deportes', items:[
        { name:'LALIGA HYPERMOTION TV', dial:'50' },{ name:'LALIGA Primera Federación', dial:'51' },
        { name:'DAZN F1', dial:'52' },{ name:'DAZN Baloncesto (ACB+NBA)', dial:'53' },
        { name:'Eurosport 1', dial:'55' },{ name:'Eurosport 2', dial:'56' },
        { name:'Tennis Channel', dial:'57' },{ name:'Rugby Challenge Spain', dial:'58' },
        { name:'Gol Classics', dial:'59' },{ name:'MMATV', dial:'60' }
      ]},
      { cat:'Infantil', items:[
        { name:'Nickelodeon', dial:'67' },{ name:'Nick Jr.', dial:'68' },
        { name:'Disney Junior', dial:'69' },{ name:'DreamWorks', dial:'70' },
        { name:'Cartoon Network', dial:'71' },{ name:'Boing', dial:'72' },{ name:'Clan', dial:'73' }
      ]},
      { cat:'Documentales', items:[
        { name:'Discovery', dial:'80' },{ name:'National Geographic', dial:'81' },
        { name:'Historia', dial:'82' },{ name:'BBC Earth', dial:'83' },
        { name:'AMC Break', dial:'85' },{ name:'AMC Crime', dial:'86' }
      ]},
      { cat:'Música y Entretenimiento', items:[
        { name:'MTV España', dial:'100' },{ name:'MTV 00s', dial:'101' },{ name:'MTV Live', dial:'102' },
        { name:'Sol Música', dial:'103' },{ name:'Mezzo', dial:'104' },{ name:'Canal Cocina', dial:'105' }
      ]},
      { cat:'Locales y autonómicos', items:[
        { name:'TV3', dial:'140' },{ name:'Canal Extremadura', dial:'141' },
        { name:'Televisión Melilla', dial:'142' },{ name:'RTV Ceuta', dial:'143' },
        { name:'+17 cabeceras locales', dial:'…' }
      ]}
    ]
  }
};

/* ════════════════════════════════════════════
   OPERADORES — PORTUGAL
══════════════════════════════════════════════ */
const OPERATORS_PT = {
  meo: {
    key: 'meo', name: 'MEO', parent: 'Altice Portugal',
    color: '#2bbfba', tagline: 'Líder del mercado portugués · 41,5% cuota',
    mobile_lines: 5.7, fixed_lines: 2.1, ftth_lines: 2.20,  // ANACOM Q1 2026 (~41,5% × 5,3M)
    tv_subs: 1.85, arpu_convergente: 39.59,   // ARPU medio mercado Q1 2026 ANACOM
    tags: ['Líder 41,5% cuota', 'Premios 4gnews 2025', 'Submarcas Uzo/Moche'],
    tv_brand: 'MEO TV',
    tv_subs_note: 'Q1 2026 ANACOM: MEO lidera con 41,5% de subscritores de paquetes (4,8M total mercado).',
    channels_count: '+150',
    has_ott_libre: false,
    data_source_url: 'https://4gnews.pt/meo-deixa-para-tras-nos-vodafone-e-digi-e-ha-boas-noticias-para-os-portugueses/',
    data_period: 'Q1 2026 (al 31 mar 2026) · pub. 26 may 2026 ANACOM',
    channels: [
      { cat:'Generalistas Portugal', items:[
        { name:'RTP1', dial:'1' },{ name:'RTP2', dial:'2' },{ name:'SIC', dial:'3' },
        { name:'TVI', dial:'4' },{ name:'TVI Reality', dial:'5' },{ name:'CMTV', dial:'8' }
      ]},
      { cat:'Cine y Series', items:[
        { name:'AXN', dial:'40' },{ name:'AXN White', dial:'41' },{ name:'AXN Movies', dial:'42' },
        { name:'TVCine Edition', dial:'45' },{ name:'TVCine Top', dial:'46' },{ name:'TVCine Action', dial:'47' },
        { name:'TVCine Emotion', dial:'48' },{ name:'Hollywood', dial:'50' },{ name:'FOX', dial:'51' }
      ]},
      { cat:'Deportes', items:[
        { name:'Sport TV 1', dial:'30' },{ name:'Sport TV 2', dial:'31' },{ name:'Sport TV 3', dial:'32' },
        { name:'Sport TV 4', dial:'33' },{ name:'Sport TV 5', dial:'34' },{ name:'Sport TV+', dial:'35' },
        { name:'Eleven Sports 1', dial:'36' },{ name:'Eleven Sports 2', dial:'37' },{ name:'Benfica TV', dial:'39' }
      ]},
      { cat:'Infantil', items:[
        { name:'Disney Channel', dial:'53' },{ name:'Disney Junior', dial:'54' },
        { name:'Nickelodeon', dial:'55' },{ name:'Cartoon Network', dial:'56' },{ name:'Panda', dial:'57' }
      ]},
      { cat:'Documentales', items:[
        { name:'NatGeo', dial:'60' },{ name:'NatGeo Wild', dial:'61' },{ name:'Discovery', dial:'62' },
        { name:'História', dial:'64' },{ name:'Odisseia', dial:'65' }
      ]},
      { cat:'Música', items:[
        { name:'MTV Live', dial:'70' },{ name:'MTV 00s', dial:'71' },{ name:'MTV España', dial:'72' }
      ]},
      { cat:'Internacional', items:[
        { name:'TVE Internacional', dial:'200' },{ name:'BBC World', dial:'201' },
        { name:'CNN International', dial:'202' },{ name:'France 24', dial:'205' }
      ]}
    ]
  },
  nos: {
    key: 'nos', name: 'NOS', parent: 'Grupo NOS (ZON+Optimus)',
    color: '#002d6e', tagline: 'Segundo operador · 34,9% cuota paquetes',
    mobile_lines: 4.5, fixed_lines: 1.75, ftth_lines: 1.85,
    tv_subs: 1.55, arpu_convergente: 39.59,
    tags: ['Cuota 34,9%', 'Líder cine', '+2,2% precios 2026'],
    tv_brand: 'NOS TV',
    tv_subs_note: 'Q1 2026 ANACOM: NOS mantiene 34,9% de subscritores de paquetes.',
    channels_count: '+170',
    has_ott_libre: false,
    data_source_url: 'https://4gnews.pt/digi-meo-nos-ou-vodafone-conhece-a-operadora-que-lidera-o-mercado-em-portugal/',
    data_period: 'Q1 2026 (al 31 mar 2026) · pub. 26 may 2026 ANACOM',
    channels: [
      { cat:'Generalistas Portugal', items:[
        { name:'RTP1', dial:'1' },{ name:'RTP2', dial:'2' },{ name:'SIC', dial:'3' },
        { name:'TVI', dial:'4' },{ name:'TVI Reality', dial:'5' }
      ]},
      { cat:'Cine NOS', items:[
        { name:'Hollywood', dial:'10' },{ name:'TCM', dial:'11' },{ name:'AMC', dial:'12' },
        { name:'AXN', dial:'13' },{ name:'AXN White', dial:'14' },{ name:'AXN Movies', dial:'15' },
        { name:'FOX', dial:'16' },{ name:'FOX Comedy', dial:'17' },{ name:'FOX Movies', dial:'18' }
      ]},
      { cat:'Deportes NOS', items:[
        { name:'Sport TV 1', dial:'20' },{ name:'Sport TV 2', dial:'21' },{ name:'Sport TV 3', dial:'22' },
        { name:'Sport TV 4', dial:'23' },{ name:'Eleven Sports 1', dial:'25' },{ name:'Eleven Sports 2', dial:'26' },
        { name:'FC Porto TV', dial:'29' }
      ]},
      { cat:'Infantil', items:[
        { name:'Disney Channel', dial:'40' },{ name:'Disney Junior', dial:'41' },
        { name:'Nickelodeon', dial:'42' },{ name:'Nick Jr.', dial:'43' },
        { name:'Cartoon Network', dial:'44' },{ name:'Panda', dial:'45' }
      ]},
      { cat:'Documentales', items:[
        { name:'NatGeo', dial:'50' },{ name:'NatGeo Wild', dial:'51' },{ name:'Discovery', dial:'52' }
      ]},
      { cat:'Música', items:[
        { name:'MTV Live', dial:'60' },{ name:'MTV 00s', dial:'61' },{ name:'VH1', dial:'62' }
      ]}
    ]
  },
  vodafone_pt: {
    key: 'vodafone_pt', name: 'Vodafone Portugal', parent: 'Vodafone Group',
    color: '#e60000', tagline: 'Tercer operador · 20,3% cuota paquetes',
    mobile_lines: 3.1, fixed_lines: 0.9, ftth_lines: 1.08,
    tv_subs: 0.92, arpu_convergente: 39.59,
    tags: ['Cuota 20,3%', '+2,2% precios 2026', 'Estable'],
    tv_brand: 'Vodafone TV PT',
    tv_subs_note: 'Q1 2026 ANACOM: 20,3% de subscritores. Subió precios un 2,2% el 9 ene 2026 indexado a IPC.',
    channels_count: '+140',
    has_ott_libre: false,
    data_source_url: 'https://tek.sapo.pt/noticias/telecomunicacoes/artigos/meo-nos-e-vodafone-aumentam-precos-em-2026-mas-ha-excecoes/',
    data_period: 'Q1 2026 (al 31 mar 2026) · pub. 26 may 2026 ANACOM',
    channels: [
      { cat:'Generalistas Portugal', items:[
        { name:'RTP1', dial:'1' },{ name:'RTP2', dial:'2' },{ name:'SIC', dial:'3' },
        { name:'TVI', dial:'4' }
      ]},
      { cat:'Cine y Series', items:[
        { name:'AXN', dial:'40' },{ name:'AXN White', dial:'41' },{ name:'AXN Movies', dial:'42' },
        { name:'FOX', dial:'45' },{ name:'AMC', dial:'47' },{ name:'TVCine Edition', dial:'50' }
      ]},
      { cat:'Deportes', items:[
        { name:'Sport TV 1', dial:'30' },{ name:'Sport TV 2', dial:'31' },{ name:'Sport TV 3', dial:'32' },
        { name:'Eleven Sports 1', dial:'35' },{ name:'Eleven Sports 2', dial:'36' }
      ]},
      { cat:'Infantil', items:[
        { name:'Disney Channel', dial:'53' },{ name:'Disney Junior', dial:'54' },
        { name:'Nickelodeon', dial:'60' },{ name:'Panda', dial:'62' }
      ]},
      { cat:'Documentales', items:[
        { name:'NatGeo', dial:'70' },{ name:'Discovery', dial:'72' },{ name:'História', dial:'74' }
      ]},
      { cat:'Música', items:[
        { name:'MTV Live', dial:'80' },{ name:'MTV 00s', dial:'81' }
      ]}
    ]
  },
  digi_pt: {
    key: 'digi_pt', name: 'DIGI Portugal', parent: 'Digi Communications N.V. (Rumanía)',
    color: '#ff6b00', tagline: 'Disruptor low-cost · Única que crece (3,2%)',
    mobile_lines: 0.5, fixed_lines: 0.18, ftth_lines: 0.17,
    tv_subs: 0.145, arpu_convergente: 18,
    tags: ['Sin subida precios 2026', '3,2% cuota (Q1 2026)', 'Sin permanencia'],
    tv_brand: 'DIGI TV PT',
    tv_subs_note: 'Q1 2026 ANACOM: 3,2% subscritores paquetes (vs 2,8% Q4 2025). Única operadora ganando cuota.',
    channels_count: '+80',
    has_ott_libre: false,
    data_source_url: 'https://4gnews.pt/digi-comeca-2026-a-mostrar-a-meo-nos-e-vodafone-como-se-faz/',
    data_period: 'Q1 2026 (al 31 mar 2026) · pub. 26 may 2026 ANACOM',
    channels: [
      { cat:'Generalistas Portugal', items:[
        { name:'RTP1', dial:'1' },{ name:'RTP2', dial:'2' },{ name:'SIC', dial:'3' },{ name:'TVI', dial:'4' }
      ]},
      { cat:'Cine y Series', items:[
        { name:'AXN', dial:'30' },{ name:'AMC', dial:'31' },{ name:'TNT', dial:'32' }
      ]},
      { cat:'Infantil', items:[
        { name:'Nickelodeon', dial:'50' },{ name:'Nick Jr.', dial:'51' },
        { name:'Cartoon Network', dial:'52' }
      ]},
      { cat:'Deportes', items:[
        { name:'Eleven Sports 1', dial:'40' },{ name:'Eleven Sports 2', dial:'41' }
      ]},
      { cat:'Documentales', items:[
        { name:'NatGeo', dial:'60' },{ name:'Discovery', dial:'62' }
      ]},
      { cat:'Internacional (RO)', items:[
        { name:'Pro TV', dial:'100' },{ name:'Antena 1 (RO)', dial:'101' }
      ]}
    ]
  }
};

/* ════════════════════════════════════════════
   OTT LIBRES (ofertas independientes del operador)
══════════════════════════════════════════════ */
const OTT_LIBRE = {
  'movistar-plus-lite': {
    name: 'Movistar Plus (OTT)', parent: 'Telefónica España', color: '#019df4',
    launched: '1 ago 2023 · planes Libre relanzados 2025-2026', price_from: '4,99€/mes (desde)',
    description: 'Plataforma OTT de Telefónica contratable sin ser cliente de fibra/móvil de Movistar, vía app y web sin decodificador físico y sin permanencia. Marca comercial: "Movistar Plus" (la marca premium integrada en fibra es "Movistar Plus+"). Tres planes: Gratuito, Libre Cine y Series (4,99€) y Libre Cine, Series y Deportes (9,99€).',
    subs_estimate: '3,9M IPTV+OTT (Q1 2026)',
    subs_note: 'Telefónica reportó 3,9M suscriptores Movistar Plus+ (IPTV + OTT consolidados) a cierre marzo 2026. +86k netos Q1 2026, crecimiento interanual 8,3%. En 2025 sumó +278k netos (récord). El OTT independiente y los nuevos planes Libre son el motor de captación de no-convergentes.',
    pricing_tiers: [
      { label:'Plan Gratuito', price:'0€', detail:'Solo con tu correo. Selección de contenidos: programas de entretenimiento completos + primer capítulo de las series Originales M+. Sin permanencia' },
      { label:'Plan Libre · Cine y Series', price:'4,99€/mes', detail:'NUEVO. Cine, series, documentales, entretenimiento y +70 canales de TV. Sin oferta deportiva. Sin permanencia' },
      { label:'Plan Libre · Cine, Series y Deportes', price:'9,99€/mes', detail:'MÁS POPULAR. Todo lo anterior + 80 canales y deporte: el partido M+ de LaLiga EA, toda LaLiga Hypermotion, mejor partido de Champions y Premier, tenis, Euroliga, pádel, golf, rugby' },
      { label:'miMovistar (convergente)', price:'desde 67€/mes', detail:'Fibra 600Mb + 2 líneas móviles + TV. Packs con todo el fútbol. Incluye FlixOlé y BBC Player; ampliable con SkyShowtime, HBO Max, Apple TV, Netflix o Disney+' }
    ],
    devices: '2 reproducciones simultáneas',
    quality: 'Hasta 4K',
    catalog: ['Series Originales M+ (Yakarta, Poquita Fe, Querer, Anatomía de un instante, La Mesías)', 'Cine Original M+ y estrenos internacionales', 'Programas #0 (Ilustres Ignorantes, La Resistencia legacy)', 'Fútbol LaLiga EA + Hypermotion + Champions + Premier (plan Deportes)', 'BBC Player y FlixOlé (en miMovistar)'],
    channels_included: ['#Vamos', '#0', 'Movistar Cine', 'Movistar Series', 'Movistar Drama', 'Movistar Comedia', 'Movistar Acción', 'AXN', 'AXN Movies', 'TNT', 'Warner TV', 'TCM', 'Calle 13', 'COSMO', 'Sundance', 'Canal Hollywood', 'BBC Drama', 'BBC Food', 'BBC Top Gear', 'NatGeo', 'NatGeo Wild', 'Discovery', 'Historia', 'CNN'],
    paramount_presence: 'En el pack convergente miMovistar: SkyShowtime ampliable (dial 29 en Ficción Total desde ene 2025). Los canales lineales Nickelodeon, Nick Jr., MTV y Comedy Central se distribuyen en la TV de Movistar (IPTV), no en los planes Libre OTT.',
    competitors: ['Orange TV Libre (7,99€/mes)', 'SkyShowtime (5,99€/mes)', 'HBO Max', 'Netflix Estándar (12,99€/mes)', 'Disney+ Estándar (10,99€/mes)', 'Filmin (7,99€/mes)'],
    source_url: 'https://www.movistarplus.es/planes'
  },
  'orange-tv-libre': {
    name: 'Orange TV Libre', parent: 'MASORANGE', color: '#ff7900',
    launched: '3 oct 2024 (inicial Jazztel) · may 2025 abierto a todos los operadores', price_from: '7,99€/mes (3,99€ promo 3 meses)',
    description: 'OTT abierta de MASORANGE contratable seas o no cliente Orange/Jazztel. Más de 90 canales, 50.000+ contenidos VOD, fútbol y SkyShowtime sin coste adicional. Vía app móvil/tablet/Smart TV/PC sin decodificador. Sin permanencia.',
    subs_estimate: 'No desglosado',
    subs_note: 'MASORANGE no desglosa públicamente suscriptores de Orange TV Libre. Está integrado en cifras agregadas Orange TV (1,50M TV subs grupo Q1 2026). Lanzado oct 2024, abierto a todos en may 2025.',
    pricing_tiers: [
      { label:'Promoción de bienvenida', price:'3,99€/mes', detail:'Primeros 3 meses con 50% descuento' },
      { label:'Tarifa estándar', price:'7,99€/mes', detail:'Más de 90 canales + 50.000 contenidos VOD + SkyShowtime + fútbol selecto. Sin permanencia' },
      { label:'Incluida en tarifas Orange', price:'incluido', detail:'Incluida en Fibra 600Mb/1Gb/10Gbps + TV, Home TV Inicial y Home TV Supra de Orange' }
    ],
    devices: '5 dispositivos registrados / 2 simultáneos (mismo contenido)',
    sports: ['1 partido LaLiga EA Sports/jornada', '3 partidos LaLiga Hypermotion/jornada', '1 partido UEFA Champions League/jornada', '1 partido Serie A/jornada', '1 partido Bundesliga/jornada', '10 partidos Primera Federación/jornada', '1 partido Copa del Rey MAPFRE por eliminatoria', 'Tenis Grand Slam (Roland Garros, Open Australia)', 'Ciclismo, UFC, Eurosport completo'],
    quality: 'Hasta 4K (con decodificador) / FullHD en app',
    extras: '350 horas grabaciones en nube · Últimos 7 días · Control directo · Multiaudio/subtítulos · Búsqueda por voz · Descarga offline',
    catalog: ['SkyShowtime completo incluido (Yellowstone, Misión Imposible, Star Trek, Regreso al Futuro, Top Gun Maverick, Tulsa King)', 'Cine recientes mayores estudios', 'Series Eurosport', 'Documentales NatGeo, BBC', '50.000+ contenidos VOD'],
    channels_included: ['90+ canales generalistas, cine, series, infantil, documentales, noticias, deportes', 'SkyShowtime 1 (dial 10)', 'Eurosport 1 y 2', 'NatGeo', 'Discovery', 'AMC', 'AXN', 'Comedy Central', 'MTV España'],
    paramount_presence: 'SkyShowtime incluido sin coste extra (dial 10) · catálogo Paramount: Universal, Paramount Pictures, Nickelodeon, DreamWorks, Sky Studios, Peacock, SHOWTIME, Paramount+',
    competitors: ['Movistar Plus+ OTT (9,99€/mes)', 'SkyShowtime independiente (5,99€/mes)', 'DAZN (24,99€/mes)', 'HBO Max', 'Netflix', 'Filmin'],
    source_url: 'https://orangetv.es/orange-tv-libre'
  }
};

/* ════════════════════════════════════════════
   GRUPOS AUDIOVISUALES
══════════════════════════════════════════════ */
const CONTENT_GROUPS_ES = [
  {
    key:'paramount', name:'Paramount Networks EMEAA', color:'#0064ff', parent:'Paramount Global',
    note:'Cartera Paramount disponible en Movistar, DIGI y MASORANGE. Vodafone perdió la cartera en ago 2025 al no renovar acuerdo con SkyShowtime.',
    channels: [
      { name:'Nickelodeon', movistar:'Dial 114', vodafone:'—', digi:'Dial 65', masorange:'Dial 67' },
      { name:'Nick Jr.', movistar:'Dial 113', vodafone:'—', digi:'Dial 66', masorange:'Dial 68' },
      { name:'MTV España', movistar:'Dial 120', vodafone:'—', digi:'Dial 100', masorange:'Dial 100' },
      { name:'Comedy Central', movistar:'sí', vodafone:'—', digi:'—', masorange:'Dial 42' },
      { name:'MTV 00s', movistar:'Dial 121', vodafone:'—', digi:'—', masorange:'Dial 101' },
      { name:'MTV Live', movistar:'—', vodafone:'—', digi:'—', masorange:'Dial 102' }
    ]
  },
  {
    key:'warner', name:'Warner Bros. Discovery', color:'#003063', parent:'Warner Bros. Discovery',
    note:'Una de las carteras más distribuidas. Max Avances en Movistar (dial 28).',
    channels: [
      { name:'Warner TV', movistar:'—', vodafone:'Dial 50', digi:'Dial 10', masorange:'Dial 32' },
      { name:'TNT', movistar:'Dial 42', vodafone:'Dial 51', digi:'Dial 14', masorange:'Dial 33' },
      { name:'Cartoon Network', movistar:'sí', vodafone:'sí', digi:'Dial 62', masorange:'Dial 71' },
      { name:'Boomerang', movistar:'sí', vodafone:'—', digi:'—', masorange:'—' },
      { name:'Discovery Channel', movistar:'Dial 80', vodafone:'Dial 100', digi:'—', masorange:'Dial 80' },
      { name:'TCM', movistar:'sí', vodafone:'—', digi:'—', masorange:'Dial 37' },
      { name:'Canal Hollywood', movistar:'Dial 40', vodafone:'—', digi:'—', masorange:'Dial 36' },
      { name:'Max Avances', movistar:'Dial 28', vodafone:'—', digi:'—', masorange:'—' }
    ]
  },
  {
    key:'disney', name:'The Walt Disney Company', color:'#0a2768', parent:'Disney',
    note:'Disney+ es la cara streaming. Catálogo lineal mantiene Disney Junior tras cierre de Disney Channel lineal en 2020.',
    channels: [
      { name:'Disney Junior', movistar:'Dial 111', vodafone:'Dial 70', digi:'Dial 61', masorange:'Dial 69' },
      { name:'National Geographic', movistar:'Dial 81', vodafone:'Dial 101', digi:'Dial 80', masorange:'Dial 81' },
      { name:'NatGeo Wild', movistar:'Dial 82', vodafone:'sí', digi:'—', masorange:'sí' },
      { name:'BabyTV', movistar:'Dial 110', vodafone:'sí', digi:'—', masorange:'—' }
    ]
  },
  {
    key:'nbcu', name:'NBCUniversal', color:'#FCAF17', parent:'Comcast NBCUniversal',
    note:'SkyShowtime es JV Comcast+Paramount. SyFy desapareció de Vodafone en ago 2025.',
    channels: [
      { name:'SkyShowtime 1', movistar:'Dial 29', vodafone:'—', digi:'sí', masorange:'Dial 29' },
      { name:'SyFy', movistar:'—', vodafone:'—', digi:'—', masorange:'Dial 41' },
      { name:'DreamWorks', movistar:'Dial 115', vodafone:'—', digi:'Dial 60', masorange:'Dial 70' },
      { name:'Universal TV', movistar:'—', vodafone:'—', digi:'—', masorange:'—' }
    ]
  },
  {
    key:'amc', name:'AMC Networks International', color:'#000000', parent:'AMC Networks',
    note:'Movistar Plus+ perdió 14 canales AMC en ene 2025. Vodafone incorporó AMC+ Connect exclusivo en sep 2025.',
    channels: [
      { name:'AMC', movistar:'—', vodafone:'Dial 45', digi:'Dial 13', masorange:'Dial 31' },
      { name:'AMC+ Connect', movistar:'—', vodafone:'exclusivo', digi:'—', masorange:'—' },
      { name:'AMC Anime', movistar:'—', vodafone:'Dial 47', digi:'—', masorange:'—' },
      { name:'AMC Break', movistar:'—', vodafone:'—', digi:'—', masorange:'Dial 85' },
      { name:'AMC Crime', movistar:'—', vodafone:'—', digi:'—', masorange:'Dial 86' },
      { name:'AMC Selekt', movistar:'—', vodafone:'Dial 48', digi:'—', masorange:'sí' },
      { name:'Sundance TV', movistar:'Dial 48', vodafone:'Dial 53', digi:'Dial 18', masorange:'Dial 39' },
      { name:'Calle 13', movistar:'Dial 46', vodafone:'—', digi:'—', masorange:'Dial 35' },
      { name:'COSMO', movistar:'Dial 47', vodafone:'Dial 52', digi:'Dial 17', masorange:'Dial 34' },
      { name:'XTRM', movistar:'Dial 45', vodafone:'Dial 58', digi:'—', masorange:'sí' },
      { name:'Somos', movistar:'Dial 52', vodafone:'Dial 56', digi:'Dial 16', masorange:'—' },
      { name:'Odisea', movistar:'Dial 88', vodafone:'Dial 105', digi:'Dial 83', masorange:'sí' }
    ]
  },
  {
    key:'sony', name:'Sony Pictures Television', color:'#000000', parent:'Sony',
    note:'AXN sigue siendo el buque insignia. AXN Now añade catálogo OTT en Vodafone.',
    channels: [
      { name:'AXN', movistar:'Dial 37', vodafone:'Dial 40', digi:'Dial 11', masorange:'Dial 38' },
      { name:'AXN Movies', movistar:'Dial 38', vodafone:'Dial 41', digi:'Dial 12', masorange:'sí' },
      { name:'AXN Now (OTT)', movistar:'—', vodafone:'Dial 42', digi:'—', masorange:'—' }
    ]
  },
  {
    key:'bbc', name:'BBC Studios', color:'#000000', parent:'BBC',
    note:'Tras pérdida AMC en Movistar (ene 2025), Movistar y Vodafone incorporaron paquete BBC. Player en Vodafone.',
    channels: [
      { name:'BBC Drama', movistar:'Dial 91', vodafone:'Dial 60', digi:'—', masorange:'—' },
      { name:'BBC Series', movistar:'—', vodafone:'Dial 61', digi:'Dial 30', masorange:'—' },
      { name:'BBC Top Gear', movistar:'Dial 90', vodafone:'Dial 62', digi:'Dial 32', masorange:'—' },
      { name:'BBC Food', movistar:'Dial 92', vodafone:'—', digi:'Dial 31', masorange:'—' },
      { name:'BBC History', movistar:'Dial 93', vodafone:'—', digi:'—', masorange:'—' },
      { name:'BBC Earth', movistar:'—', vodafone:'—', digi:'—', masorange:'Dial 83' },
      { name:'BBC Player (OTT)', movistar:'—', vodafone:'app', digi:'—', masorange:'—' }
    ]
  }
];

const CONTENT_GROUPS_PT = [
  {
    key:'paramount', name:'Paramount Networks EMEAA', color:'#0064ff', parent:'Paramount Global',
    note:'Nickelodeon disponible en MEO, NOS y Vodafone PT desde 2020. Nick Jr. principalmente NOS. MTV en todos.',
    channels: [
      { name:'Nickelodeon', meo:'Dial 55', nos:'Dial 42', vodafone_pt:'Dial 60', digi_pt:'Dial 50' },
      { name:'Nick Jr.', meo:'—', nos:'Dial 43', vodafone_pt:'—', digi_pt:'Dial 51' },
      { name:'MTV Live', meo:'Dial 70', nos:'Dial 60', vodafone_pt:'Dial 80', digi_pt:'—' },
      { name:'MTV 00s', meo:'Dial 71', nos:'Dial 61', vodafone_pt:'Dial 81', digi_pt:'—' },
      { name:'MTV España (señal)', meo:'Dial 72', nos:'—', vodafone_pt:'—', digi_pt:'—' }
    ]
  },
  {
    key:'disney', name:'The Walt Disney Company', color:'#0a2768', parent:'Disney',
    note:'Disney Channel y Disney Junior siguen activos en lineal en Portugal (sin cierre Spain-style).',
    channels: [
      { name:'Disney Channel', meo:'Dial 53', nos:'Dial 40', vodafone_pt:'Dial 53', digi_pt:'—' },
      { name:'Disney Junior', meo:'Dial 54', nos:'Dial 41', vodafone_pt:'Dial 54', digi_pt:'—' },
      { name:'National Geographic', meo:'Dial 60', nos:'Dial 50', vodafone_pt:'Dial 70', digi_pt:'Dial 60' },
      { name:'NatGeo Wild', meo:'Dial 61', nos:'Dial 51', vodafone_pt:'—', digi_pt:'—' }
    ]
  },
  {
    key:'warner', name:'Warner Bros. Discovery', color:'#003063', parent:'Warner Bros. Discovery',
    channels: [
      { name:'Cartoon Network', meo:'Dial 56', nos:'Dial 44', vodafone_pt:'—', digi_pt:'Dial 52' },
      { name:'Discovery', meo:'Dial 62', nos:'Dial 52', vodafone_pt:'Dial 72', digi_pt:'Dial 62' },
      { name:'TLC', meo:'sí', nos:'sí', vodafone_pt:'—', digi_pt:'—' }
    ]
  }
];

/* ════════════════════════════════════════════
   CANALES PARAMOUNT — DETALLE
══════════════════════════════════════════════ */
const PARAMOUNT_CHANNELS_ES = {
  nickelodeon: {
    key:'nickelodeon', name:'Nickelodeon', color:'#ff7f00',
    launched:'1999 (España)',
    target_short:'Kids 6-12',
    target_detail: {
      audiencia_primaria: 'Niños y niñas de 6 a 12 años con foco en franja 8-11',
      audiencia_secundaria: 'Padres con hijos en edad escolar como co-viewers (sobre todo 35-45 años)',
      psicografía: 'Familias urbanas y suburbanas de clase media-media alta; valores: humor, amistad, identidad y aventura. Buscan contenido seguro pero no infantilizado',
      consumo: 'Pico de visionado lunes-viernes 17-20h y fines de semana 8-13h. Co-viewing alto en sábados por la mañana',
      brand_promise: '"Made for kids, loved by all": humor, libertad, energía y diversidad sin moralejas explícitas'
    },
    description:'Canal infantil insignia de Paramount. Programación animada con SpongeBob, PAW Patrol, Las Aventuras de Kid Danger y series de acción real para preadolescentes.',
    operators: {
      movistar:  { available:true,  dial:'114', pack:'Incluido en paquete base (+80 canales)', notes:'Disponible en Movistar Plus+ y Movistar Plus+ Lite (OTT)' },
      vodafone:  { available:false, dial:'—',   pack:'No disponible',                          notes:'Eliminado en ago 2025 tras fin de acuerdo con SkyShowtime' },
      digi:      { available:true,  dial:'65',  pack:'DIGI TV (7€/mes)',                       notes:'En parrilla DIGI TV (+120 canales)' },
      masorange: { available:true,  dial:'67',  pack:'Orange TV (planes con TV)',              notes:'Histórico en Orange TV; integrado con SkyShowtime desde dic 2025' }
    },
    competitors: [
      { name:'Disney Junior', group:'Disney', positioning:'Preescolar' },
      { name:'Disney Channel', group:'Disney', positioning:'Infantil 6-12 (cerrado lineal en ES)' },
      { name:'Cartoon Network', group:'Warner', positioning:'Animación 6-12' },
      { name:'Boing', group:'Mediaset/Warner', positioning:'Animación TDT (abierto)' },
      { name:'Clan TVE', group:'RTVE', positioning:'Infantil TDT público' },
      { name:'Boomerang', group:'Warner', positioning:'Clásicos animación' },
      { name:'DreamWorks', group:'NBCU', positioning:'Animación cine familiar' }
    ],
    renegotiation: {
      strengths: [
        { label:'Marca global #1 infantil', detail:'Reconocimiento de marca top-of-mind en kids. Imprescindible en parrillas infantiles premium.' },
        { label:'Catálogo extenso', detail:'SpongeBob (25 temporadas), PAW Patrol, Kid Danger… Activo único que ningún operador puede replicar.' },
        { label:'Sinergia con SkyShowtime', detail:'En operadores con acuerdo SkyShowtime, Nickelodeon refuerza el bundle global Paramount.' }
      ],
      weaknesses: [
        { label:'Disney Channel cerró en ES', detail:'El cierre del lineal de Disney Channel deja un hueco competitivo: oportunidad de capturar audiencia, pero también de presión a la baja en CPM.' },
        { label:'Migración a streaming', detail:'Niños cada vez más en YouTube/TikTok y SVOD. La audiencia lineal infantil cae estructuralmente.' }
      ],
      opportunities: [
        { label:'Reentrada en Vodafone', detail:'Tras la salida de ago 2025, hay oportunidad de paquetizar Nickelodeon+Nick Jr. en una propuesta atractiva (con SkyShowtime) para recuperar la presencia.' },
        { label:'Bundle SkyShowtime+', detail:'Negociar paquete integrado Paramount lineal + SkyShowtime con MASORANGE y DIGI para subir el ARPU contenido.' }
      ],
      threats: [
        { label:'Negociación SkyShowtime europea', detail:'El acuerdo SkyShowtime es paneuropeo. Cambios en la JV Paramount-Comcast pueden modificar contratos lineales en cascada.' },
        { label:'Compresión presupuesto kids', detail:'Operadores comprimen el gasto infantil (varias temáticas equivalentes). Renegociaciones a la baja son habituales.' }
      ],
      key_message: 'En la próxima ronda de renovaciones, el argumento clave es que Nickelodeon es la única marca infantil global de Paramount con audiencia consolidada en lineal. La salida de Disney Channel ES crea un vacío de marca que conviene capitalizar, especialmente cara a una posible reentrada en Vodafone y refuerzo del bundle en MASORANGE.'
    }
  },
  nickjr: {
    key:'nickjr', name:'Nick Jr.', color:'#ff5fa0',
    launched:'2008 (España)',
    target_short:'Preescolar 2-6',
    target_detail: {
      audiencia_primaria: 'Niños y niñas de 2 a 6 años (preescolar)',
      audiencia_secundaria: 'Padres y madres jóvenes (28-40 años) que co-visionan o aprueban el contenido',
      psicografía: 'Familias urbanas con primer/segundo hijo en edad preescolar. Búsqueda activa de contenido educativo, valores positivos y libre de violencia',
      consumo: 'Mañanas de lunes a domingo (7-11h), tarde de domingo y festivos. Co-viewing intensivo: 80% del tiempo padre/madre presente',
      brand_promise: '"Play, Learn, Grow": aprender jugando con personajes amables y narrativas suaves'
    },
    description:'Canal preescolar de Paramount. PAW Patrol, Peppa Pig, Bubble Guppies, Blue\'s Clues. Foco educativo y de juego.',
    operators: {
      movistar:  { available:true,  dial:'113', pack:'Incluido en paquete base',          notes:'HD nativo · disponible en deco UHD' },
      vodafone:  { available:false, dial:'—',   pack:'No disponible (solo My Nick Jr.)',  notes:'Eliminado en ago 2025. Solo queda My Nick Jr. (canal alternativo)' },
      digi:      { available:true,  dial:'66',  pack:'DIGI TV (7€/mes)',                  notes:'Disponible en parrilla DIGI TV' },
      masorange: { available:true,  dial:'68',  pack:'Orange TV',                         notes:'Disponible en planes con TV' }
    },
    competitors: [
      { name:'Disney Junior', group:'Disney', positioning:'Preescolar directo (mismo target)' },
      { name:'BabyTV', group:'Disney', positioning:'Bebés y muy pequeños (0-3 años)' },
      { name:'Canal Panda', group:'Otros', positioning:'Preescolar (en Vodafone Familyfans, Portugal)' },
      { name:'Clan TVE', group:'RTVE', positioning:'Preescolar TDT público' }
    ],
    renegotiation: {
      strengths: [
        { label:'PAW Patrol fenómeno', detail:'PAW Patrol es marca cultural propia. Influye decisión de compra TV y merchandising. Ventaja única no replicable.' },
        { label:'Co-viewing alto', detail:'Padres y abuelos visionan junto al niño. Multiplica el valor publicitario y la afinidad de marca familiar.' },
        { label:'Disney Junior único rival', detail:'Mercado de preescolar premium es duopolio Disney/Paramount. Ambos se necesitan en parrilla.' }
      ],
      weaknesses: [
        { label:'Audiencia decreciente', detail:'YouTube Kids canibaliza la audiencia preescolar más que cualquier otro segmento. Caída de horas-lineal año a año.' },
        { label:'Catálogo muy explotado', detail:'Series como Peppa Pig (no Paramount) son externas y rotan. El catálogo 100% propio es más limitado.' }
      ],
      opportunities: [
        { label:'Bundle con Nickelodeon', detail:'Nick Jr.+Nickelodeon como paquete único 2-12 años es difícil de batir comercialmente. Buen argumento para renovar al alza el conjunto.' },
        { label:'Reentrada en Vodafone', detail:'Vodafone perdió ambos canales. La reentrada conjunta con un precio bundle sería atractiva.' }
      ],
      threats: [
        { label:'Sustitución por OTT', detail:'Hay riesgo de que operadores prioricen incluir SkyShowtime y prescindan del lineal infantil.' },
        { label:'My Nick Jr. en Vodafone', detail:'Vodafone está usando "My Nick Jr." como alternativa (canal con catálogo limitado). Marca Paramount diluida.' }
      ],
      key_message: 'Nick Jr. es el ancla de la franja matinal infantil en operadores que lo mantienen. PAW Patrol como activo de catálogo es irrenunciable. La negociación debe ir a bundle con Nickelodeon y a un mínimo garantizado de carrying fee anclado en la posición en parrilla (dial bajo dentro del bloque infantil).'
    }
  },
  mtv: {
    key:'mtv', name:'MTV España', color:'#ffeb00',
    launched:'2000 (España)',
    target_short:'Jóvenes 16-34',
    target_detail: {
      audiencia_primaria: 'Jóvenes adultos de 16 a 34 años, con núcleo duro 18-29',
      audiencia_secundaria: 'Adultos jóvenes 35-44 nostálgicos (canal MTV 00s)',
      psicografía: 'Urbanos, consumidores de cultura pop, redes sociales y música mainstream. Mezcla universitario + primer empleo. Sensibles al humor irónico y la cultura del "trash content"',
      consumo: 'Late night (22-2h) y fines de semana. Consumo en segunda pantalla mientras usan móvil. Picos en eventos: MTV EMA, Video Music Awards',
      brand_promise: '"Music + culture + irreverence": realities, premios, conciertos y polémica cultural'
    },
    description:'Canal musical y de entretenimiento juvenil. Realities (Geordie Shore, Are You The One?), música pop y urban, premios MTV.',
    operators: {
      movistar:  { available:true,  dial:'120', pack:'Paquete base',                 notes:'Junto a MTV 00s en dial 121' },
      vodafone:  { available:false, dial:'—',   pack:'No disponible',                notes:'Cesó emisión en Vodafone TV en ago 2025' },
      digi:      { available:true,  dial:'100', pack:'DIGI TV (Música)',             notes:'Junto a Sol Música y VinTV' },
      masorange: { available:true,  dial:'100', pack:'Orange TV (Entretenimiento)',  notes:'MTV España + MTV 00s (101) + MTV Live (102)' }
    },
    competitors: [
      { name:'Sol Música', group:'Indep.', positioning:'Música nacional' },
      { name:'VH1', group:'Paramount', positioning:'Hermano MTV (rock clásico)' },
      { name:'Movie Music', group:'Vodafone', positioning:'Música y películas' },
      { name:'VinTV', group:'Indep.', positioning:'Música/vinilo (DIGI)' },
      { name:'Mezzo Live HD', group:'Indep.', positioning:'Clásica y jazz' },
      { name:'Stingray Classica', group:'Stingray', positioning:'Clásica' }
    ],
    renegotiation: {
      strengths: [
        { label:'Marca cultural única', detail:'MTV es marca patrimonial con valor mediático. Cubre franja 16-34 difícil de alcanzar por TV lineal hoy.' },
        { label:'Cluster MTV (3 señales)', detail:'En MASORANGE: MTV España + MTV 00s + MTV Live → propuesta de paquete completo dentro del mismo género.' },
        { label:'IP eventos premium', detail:'EMA, VMA, Unplugged: eventos con tracción social. Refuerzan el valor del canal en agenda mediática.' }
      ],
      weaknesses: [
        { label:'Audiencia musical migra a YouTube/Spotify', detail:'Ya no es el descubridor principal de música. La capacidad de generar tendencias musicales propias se ha erosionado.' },
        { label:'Realities saturados', detail:'Geordie Shore y similares ya no son novedad. Falta innovación de formatos propios fuertes para España.' }
      ],
      opportunities: [
        { label:'Posición pivote para SkyShowtime+ Paramount+', detail:'MTV puede actuar como gancho lineal hacia el catálogo Paramount completo en streaming. Buen argumento para renovar como puerta de entrada.' },
        { label:'MTV 00s como nostalgia premium', detail:'El segmento "30-something nostálgico" tiene poder de compra. MTV 00s como canal complementario justifica fee por dual feed.' }
      ],
      threats: [
        { label:'Sustitución por canales FAST', detail:'Pluto TV, Samsung TV+ ofrecen señales musicales gratis. Operadores podrían argumentar canibalización.' },
        { label:'Salida MTV España Vodafone', detail:'La salida de Vodafone es un precedente preocupante. Refuerza la negociación si Movistar o MASORANGE intentan renovar a la baja.' }
      ],
      key_message: 'El argumento de renovación de MTV no es la audiencia bruta (que cae) sino la cobertura de un target premium 18-34 difícil de alcanzar y el valor reputacional + eventos. Conviene paquetizar MTV España + MTV 00s + MTV Live como cluster y vincular a la negociación de SkyShowtime para reforzar el bundle Paramount.'
    }
  },
  comedycentral: {
    key:'comedycentral', name:'Comedy Central', color:'#f6c33f',
    launched:'1999 (como Paramount Comedy)',
    target_short:'Adultos 18-45',
    target_detail: {
      audiencia_primaria: 'Adultos 18-45 (núcleo duro 25-39)',
      audiencia_secundaria: 'Fans de stand-up y comedia americana cult (en todas las edades adultas)',
      psicografía: 'Urbanos, formación media-alta, consumidores de comedia inteligente, satírica e irreverente. Aprecian sátira política, humor absurdo y referencias culturales',
      consumo: 'Prime time (20-23h) y late night. Maratones de fin de semana. Buen consumo on-demand de monólogos y stand-up',
      brand_promise: '"Funny first": comedia sin medias tintas, desde Friends hasta South Park y The Daily Show'
    },
    description:'Comedia adulta de Paramount. Stand-up, sitcoms, South Park (en SkyShowtime), The Daily Show, Friends repeats.',
    operators: {
      movistar:  { available:true,  dial:'sí', pack:'Paquete base',         notes:'Histórico en parrilla Movistar Plus+' },
      vodafone:  { available:false, dial:'—',  pack:'No disponible',        notes:'Eliminado en ago 2025' },
      digi:      { available:false, dial:'—',  pack:'No disponible',        notes:'No figura en parrilla actual DIGI TV' },
      masorange: { available:true,  dial:'42', pack:'Orange TV (Cine y series)', notes:'En categoría entretenimiento' }
    },
    competitors: [
      { name:'TNT', group:'Warner', positioning:'Series + comedia generalista' },
      { name:'Warner TV', group:'Warner', positioning:'Comedias clásicas' },
      { name:'AXN', group:'Sony', positioning:'Series generalistas con comedia' },
      { name:'COSMO', group:'AMC', positioning:'Series femeninas y comedia romántica' }
    ],
    renegotiation: {
      strengths: [
        { label:'Catálogo histórico', detail:'Friends, Seinfeld, South Park (en SkyShowtime), The Daily Show. Es la marca global de comedia.' },
        { label:'Stand-up español propio', detail:'Producción local con cómicos en activo. Diferenciación frente a otros canales de series.' },
        { label:'Sinergia Paramount+', detail:'Punto de entrada lineal hacia el catálogo Paramount streaming. Útil como gancho.' }
      ],
      weaknesses: [
        { label:'Audiencia más baja del cluster', detail:'Comedy Central es el menos vendido del cluster Paramount. Caja de ahorros en negociaciones a la baja.' },
        { label:'Solo 2/4 operadores', detail:'No presente en Vodafone ni DIGI. Pérdida de distribución reduce poder negociador para sostener carrying fee.' },
        { label:'South Park no es lineal', detail:'El gran activo (South Park) está en SkyShowtime, no en Comedy Central lineal. El canal queda con catálogo menos premium.' }
      ],
      opportunities: [
        { label:'Reentrada paquete con MTV', detail:'Comedy Central + MTV como bundle entretenimiento adulto puede tener sentido para DIGI o Vodafone reentrante.' },
        { label:'Stand-up español original', detail:'Mayor inversión en producción local diferencia y permite anclar carrying fee en contenido único.' }
      ],
      threats: [
        { label:'Riesgo cierre lineal', detail:'Comedy Central es el más vulnerable de los 4 canales Paramount lineales en ES. Posible reestructuración hacia FAST/AVOD.' },
        { label:'TNT compite directamente', detail:'TNT es el competidor más fuerte (más distribución, más catálogo). Puede comerse el slot de comedia en parrillas con presupuesto limitado.' }
      ],
      key_message: 'Comedy Central es el activo lineal Paramount con la posición más débil. La estrategia de renovación debe ir vinculada al cluster MTV+CC y plantear bundle con SkyShowtime. Conviene reforzar producción local (stand-up español) para sostener un argumento de carrying fee. En negociaciones con operadores ausentes (Vodafone, DIGI) hay que ofrecer descuentos a cambio de distribución amplia, no fees individualmente altos.'
    }
  }
};

const PARAMOUNT_CHANNELS_PT = {
  nickelodeon: {
    key:'nickelodeon', name:'Nickelodeon Portugal', color:'#ff7f00',
    launched:'2005 (Portugal)',
    target_short:'Kids 6-12',
    target_detail: {
      audiencia_primaria: 'Crianças 6-12 anos com foco 8-11',
      audiencia_secundaria: 'Pais que co-visionam ou autorizam consumo, 30-45 anos',
      psicografía: 'Famílias urbanas, classe média, valores: humor, amizade, identidade',
      consumo: 'Manhã (8-12h) e tarde escolar (17-20h). Picos fim-de-semana',
      brand_promise: '"Made for kids, loved by all"'
    },
    description:'Canal infantil Paramount em Portugal. Disponível em todas as operadoras desde 2020 (chegou a MEO y Vodafone PT em abril 2020).',
    operators: {
      meo:        { available:true,  dial:'55', pack:'MEO TV (todos os pacotes)', notes:'Chegou a MEO 31/3/2020' },
      nos:        { available:true,  dial:'42', pack:'NOS TV (incluido)',          notes:'Exclusivo NOS até 2020. Histórico.' },
      vodafone_pt:{ available:true,  dial:'60', pack:'Vodafone TV (incluido)',     notes:'Chegou em 14/4/2020' },
      digi_pt:    { available:true,  dial:'50', pack:'DIGI TV Portugal',            notes:'Disponible en parrilla DIGI PT' }
    },
    competitors: [
      { name:'Disney Channel', group:'Disney', positioning:'Infantil 6-12 (sigue en lineal en PT)' },
      { name:'Disney Junior', group:'Disney', positioning:'Preescolar' },
      { name:'Cartoon Network', group:'Warner', positioning:'Animación 6-12' },
      { name:'Canal Panda', group:'Dreamia (NOS)', positioning:'Infantil portugués líder' }
    ],
    renegotiation: {
      strengths: [
        { label:'Distribución 100%', detail:'Único canal Paramount con presencia en los 4 grandes operadores en Portugal.' },
        { label:'Catálogo global', detail:'SpongeBob, PAW Patrol funcionan igual de bien en mercado portugués que en español.' },
        { label:'Panda no es Paramount', detail:'A diferencia de España, en Portugal el competidor doméstico fuerte (Canal Panda) compite directamente con Nickelodeon.' }
      ],
      weaknesses: [
        { label:'Mercado más pequeño', detail:'Portugal tiene ~5,4M de subscripciones de paquete vs ~17M en España. Volúmenes inferiores reducen carrying fee absoluto.' },
        { label:'Canal Panda muy fuerte', detail:'Panda es marca infantil de cabecera en muchos hogares portugueses. Compite por slot y por presupuesto.' }
      ],
      opportunities: [
        { label:'DIGI ascendiendo', detail:'DIGI gana cuota rápido. Negociar bundle Paramount completo en DIGI PT antes de que tome posición fuerte.' },
        { label:'Aniversario 20 años Portugal', detail:'2025 marcó 20 años de Nickelodeon en Portugal. Plataforma natural para refuerzo de carrying fee con eventos especiales.' }
      ],
      threats: [
        { label:'Subidas IPC consolidadas', detail:'MEO, NOS y Vodafone PT suben precios al ritmo del IPC. Los operadores presionarán a su vez a los proveedores de contenido.' },
        { label:'Concentración Paramount-Comcast', detail:'La JV SkyShowtime opera también en PT. Cambios pueden afectar la posición de Nickelodeon en operadores con SkyShowtime integrado.' }
      ],
      key_message: 'En Portugal, Nickelodeon tiene la posición ideal: distribución total. La negociación debe enfocarse en sostener el carrying fee frente a presión inflacionaria, vincular renovaciones con extensión a Nick Jr. donde aún no está (MEO y Vodafone PT) y aprovechar la subida de DIGI para construir una propuesta paquete completo Paramount.'
    }
  },
  nickjr: {
    key:'nickjr', name:'Nick Jr. Portugal', color:'#ff5fa0',
    launched:'2010 (Portugal)',
    target_short:'Preescolar 2-6',
    target_detail: {
      audiencia_primaria: 'Crianças 2-6 anos (pré-escolar)',
      audiencia_secundaria: 'Pais e mães jovens (28-40 anos)',
      psicografía: 'Famílias urbanas com primeiro/segundo filho. Procuram conteúdo educativo e seguro',
      consumo: 'Manhãs e tardes (co-viewing intensivo)',
      brand_promise: '"Play, Learn, Grow"'
    },
    description:'Canal preescolar Paramount Portugal. Distribución más restringida que Nickelodeon: actualmente principalmente en NOS y DIGI PT.',
    operators: {
      meo:        { available:false, dial:'—',  pack:'No disponible',                  notes:'Solo Nickelodeon en MEO; Nick Jr. ausente' },
      nos:        { available:true,  dial:'43', pack:'NOS TV (incluido)',               notes:'Histórico exclusivo NOS' },
      vodafone_pt:{ available:false, dial:'—',  pack:'No disponible',                  notes:'Vodafone PT no incluye Nick Jr. de forma lineal' },
      digi_pt:    { available:true,  dial:'51', pack:'DIGI TV Portugal',                notes:'Disponible DIGI PT' }
    },
    competitors: [
      { name:'Disney Junior', group:'Disney', positioning:'Preescolar directo (mismo target)' },
      { name:'Canal Panda', group:'Dreamia/NOS', positioning:'Preescolar portugués líder' },
      { name:'Panda Kids', group:'Dreamia/NOS', positioning:'Preescolar joven' }
    ],
    renegotiation: {
      strengths: [
        { label:'PAW Patrol fenómeno global', detail:'PAW Patrol funciona igual en Portugal. Activo cultural transversal.' },
        { label:'NOS exclusividad histórica', detail:'NOS valora Nick Jr. como diferenciador en su parrilla infantil premium.' }
      ],
      weaknesses: [
        { label:'Sin distribución en MEO ni Vodafone PT', detail:'Solo 2/4 operadores. Cuota de hogares inferior a la marca Nickelodeon.' },
        { label:'Canal Panda doméstico fuerte', detail:'Dreamia (JV NOS-Paramount paradójicamente) opera Panda. Hay solapamiento estratégico interno.' }
      ],
      opportunities: [
        { label:'Entrada en MEO + Vodafone', detail:'MEO ya tiene Nickelodeon. Vender Nick Jr. como complemento natural es vía abierta. Ídem Vodafone PT.' },
        { label:'Bundle con Nickelodeon', detail:'Paquete kids 2-12 unificado (Nick Jr. + Nickelodeon) es propuesta de valor clara para captar nuevos operadores.' }
      ],
      threats: [
        { label:'Panda canibaliza', detail:'Operadores que ya tienen Panda pueden argumentar redundancia y rechazar Nick Jr.' },
        { label:'Streaming preescolar fuerte', detail:'YouTube Kids domina el preescolar global. Audiencia lineal decreciente.' }
      ],
      key_message: 'En Portugal, la prioridad es ampliar distribución de Nick Jr. (entrar en MEO y Vodafone PT). El argumento debe ser bundle kids completo Paramount con NOS como referencia, y precio escalable según volumen. La existencia de Panda complica el discurso "único en preescolar premium", por lo que conviene reforzar IP propio (PAW Patrol, Blue\'s Clues).'
    }
  },
  mtv: {
    key:'mtv', name:'MTV Portugal', color:'#ffeb00',
    launched:'2003 (MTV Portugal)',
    target_short:'Jóvenes 16-34',
    target_detail: {
      audiencia_primaria: 'Jovens adultos 16-34, núcleo duro 18-29',
      audiencia_secundaria: 'Adultos 35-44 nostálgicos',
      psicografía: 'Urbanos, cultura pop, redes sociais',
      consumo: 'Late night e fim-de-semana',
      brand_promise: '"Music + culture + irreverence"'
    },
    description:'MTV Portugal. Distribución amplia con sub-marcas MTV Live, MTV 00s en operadores principales.',
    operators: {
      meo:        { available:true,  dial:'70', pack:'MEO TV',         notes:'MTV Live (70), MTV 00s (71), MTV España (72)' },
      nos:        { available:true,  dial:'60', pack:'NOS TV',          notes:'MTV Live + MTV 00s + VH1' },
      vodafone_pt:{ available:true,  dial:'80', pack:'Vodafone TV PT',  notes:'MTV Live + MTV 00s' },
      digi_pt:    { available:false, dial:'—',  pack:'No disponible',   notes:'Ausente en parrilla DIGI PT' }
    },
    competitors: [
      { name:'VH1', group:'Paramount', positioning:'Hermano MTV (rock clásico)' },
      { name:'Mezzo', group:'Indep.', positioning:'Clásica y jazz' }
    ],
    renegotiation: {
      strengths: [
        { label:'Cluster MTV (varias señales)', detail:'MTV Live + MTV 00s + MTV España: oferta múltiple en mismo carrying.' },
        { label:'Reach amplio', detail:'Presente en 3/4 operadores principales. Buena penetración.' }
      ],
      weaknesses: [
        { label:'Ausente en DIGI PT', detail:'DIGI no incluye MTV. Hueco de distribución al operador low-cost en crecimiento.' },
        { label:'Audiencia musical migra', detail:'Mismo problema global: YouTube/Spotify canibalizan.' }
      ],
      opportunities: [
        { label:'Entrada en DIGI PT', detail:'DIGI gana cuota rápido. Entrada temprana con precio agresivo permite establecer fee base antes de que tome posición.' },
        { label:'Cluster Paramount lineal+SkyShowtime', detail:'MTV refuerza el bundle Paramount global en operadores con SkyShowtime.' }
      ],
      threats: [
        { label:'Subidas IPC', detail:'Operadores PT presionan a proveedores para absorber inflación.' },
        { label:'FAST en Portugal también', detail:'Pluto TV y Samsung TV+ disponibles. Sustitución del lineal musical en marcha.' }
      ],
      key_message: 'El plan en Portugal pasa por consolidar presencia con MEO, NOS y Vodafone PT (defensiva: sostener fee) y abrir DIGI PT (ofensiva: distribución con fee escalonado). Cluster múltiple es la propuesta de valor.'
    }
  }
};


/* ════════════════════════════════════════════
   NOTICIAS POR SECCIÓN
   Curadas con enlaces reales y fechas verificadas.
   Estructura: NEWS[sectionKey] = [{source, date, title, url}]
══════════════════════════════════════════════ */
const NEWS = {
  // ─── ESPAÑA ─────────────────────────────────
  home_es: [
    { source:'CNMC', date:'6 may 2026', title:'Las líneas FTTH superan los 18 millones en España (datos marzo 2026)', url:'https://www.cnmc.es/prensa/datos-marzo-telecos-20260506' },
    { source:'CASADOMO', date:'7 may 2026', title:'CNMC confirma crecimiento de la fibra con +18M líneas en marzo', url:'https://www.casadomo.com/2026/05/07/cnmc-confirma-crecimiento-fibra-optica-mas-18-millones-lineas-marzo' },
    { source:'CNMC', date:'26 mar 2026', title:'Telecos cierran 2025 con leve aumento en ingresos minoristas y fuerte tráfico móvil', url:'https://www.cnmc.es/prensa/estadisticas-telecos-4T-2025-20260327' },
    { source:'CNMC', date:'13 abr 2026', title:'FTTH roza los 18 millones en febrero 2026 con Movistar líder', url:'https://www.cnmc.es/prensa/datos-febrero-telecos-20260413' },
    { source:'ADSLZone', date:'25 may 2026', title:'Telefónica acelera: 16M clientes móviles y bajas en mínimos históricos', url:'https://www.adslzone.net/noticias/operadores/resultados-telefonica-primer-trimestre-2026-espana/' },
    { source:'Mobile World Live', date:'19 ene 2026', title:'Zegona triplica el valor de Vodafone España en año y medio', url:'https://www.mobileworldlive.com/spanish/zegona-triplica-el-valor-de-vodafone-espana-en-ano-y-medio/' }
  ],

  market_es: [
    { source:'CNMC', date:'6 may 2026', title:'Estadísticas oficiales de telecomunicaciones · marzo 2026', url:'https://www.cnmc.es/prensa/datos-marzo-telecos-20260506' },
    { source:'CNMC', date:'5 mar 2026', title:'La competencia en banda ancha fija se intensifica en municipios pequeños', url:'https://www.cnmc.es/prensa/geografico-banda-ancha-fija-20260305' },
    { source:'CNMC', date:'5 nov 2025', title:'La fibra óptica alcanzó 17,5M líneas en agosto', url:'https://www.cnmc.es/prensa/datos-agosto-telecos-20251105' },
    { source:'CNMC Data', date:'continuo', title:'Datos abiertos de telecomunicaciones · serie histórica', url:'https://data.cnmc.es/telecomunicaciones-y-sector-audiovisual/conjuntos-de-datos/datos-mensuales/telecomunicaciones' },
    { source:'CASADOMO', date:'7 may 2026', title:'18M líneas FTTH y portabilidad récord de 599k en marzo', url:'https://www.casadomo.com/2026/05/07/cnmc-confirma-crecimiento-fibra-optica-mas-18-millones-lineas-marzo' }
  ],

  movistar: [
    { source:'Telefónica', date:'14 may 2026', title:'Telefónica eleva sus ingresos a 8.127M€ en Q1 2026 y confirma objetivos', url:'https://www.telefonica.com/es/sala-comunicacion/prensa/telefonica-eleva-ingresos-hasta-8127-millones-euros-primer-trimestre-confirma-objetivos-financieros-2026/' },
    { source:'Roams', date:'15 may 2026', title:'Telefónica supera 16M contratos móviles y ARPU de 91,5€', url:'https://roams.es/actualidad/telefonia/telefonica-supera-16-millones-contratos-sube-ingreso-medio-cliente-91-5-euros/' },
    { source:'ADSLZone', date:'25 may 2026', title:'Telefónica acelera en España: 16M móvil y bajas mínimas', url:'https://www.adslzone.net/noticias/operadores/resultados-telefonica-primer-trimestre-2026-espana/' },
    { source:'Merca2', date:'14 may 2026', title:'Acción Telefónica sube 5% en mayo impulsada por Brasil y menor competencia ES', url:'https://www.merca2.es/2026/05/14/resultados-telefonica-mayo-2026-bolsa-2380029/' },
    { source:'CapitalMadrid', date:'24 feb 2026', title:'Telefónica obtiene beneficio neto de 2.122M€ (-19%) en 2025', url:'https://www.capitalmadrid.com/2026/2/24/71231/telefonica-obtiene-un-beneficio-neto-de-2122-millones-19-en-2025-despues-de-desinversiones.html' },
    { source:'Telefónica', date:'continuo', title:'Resultados trimestrales 2026 · Telefónica Investor Relations', url:'https://www.telefonica.com/es/accionistas-inversores/informacion-financiera/resultados-trimestrales/2026/' }
  ],

  vodafone: [
    { source:'Vodafone España', date:'16 jul 2025', title:'Vodafone España culmina su primer año bajo Zegona con mejora operativa', url:'https://www.saladeprensa.vodafone.es/c/notas-prensa/np-resultadosfy25q126/' },
    { source:'El Español', date:'26 feb 2026', title:'Vodafone España aumenta ingresos 1,1% hasta 923M€ en Q4', url:'https://www.elespanol.com/invertia/empresas/tecnologia/20260226/vodafone-espana-aumenta-ingresos-millones-cuarto-trimestre/1003744146317_0.html' },
    { source:'Merca2', date:'20 may 2026', title:'Vodafone España bajo Zegona: menos guerra de precios, más cliente rentable', url:'https://www.merca2.es/2026/05/20/vodafone-espana-zegona-precios-rentable-2377889/' },
    { source:'Mobile World Live', date:'19 ene 2026', title:'Zegona triplica el valor de Vodafone España en año y medio', url:'https://www.mobileworldlive.com/spanish/zegona-triplica-el-valor-de-vodafone-espana-en-ano-y-medio/' },
    { source:'Benzinga', date:'24 feb 2025', title:'Vodafone España aumenta ingresos: la estrategia de Zegona da resultados', url:'https://es.benzinga.com/news/global/europe/vodafone-espana-aumenta-ingresos-la-estrategia-de-zegona-da-resultados/' },
    { source:'TipRanks', date:'2024', title:'Zegona anuncia nuevo contrato de fibra mayorista en España', url:'https://www.tipranks.com/news/company-announcements/zegona-announces-new-fibre-contract-in-spain' }
  ],

  digi: [
    { source:'Democrata', date:'29 may 2026', title:'DIGI rebasa las 776.000 portabilidades hasta mayo y crece 16%', url:'https://www.democrata.es/economia/digi-rebasa-las-776-000-portabilidades-hasta-mayo-y-crece-un-16/' },
    { source:'El Independiente', date:'29 may 2026', title:'DIGI dispara 16% las portabilidades y supera 776k hasta mayo', url:'https://www.elindependiente.com/economia/2026/05/29/digi-dispara-portabilidades-mayo/' },
    { source:'Roams', date:'24 abr 2026', title:'DIGI: no vende fibra a pérdidas; cómo puede ofrecer 500Mbps a 10€', url:'https://roams.es/actualidad/telefonia/digi-asegura-no-vender-fibra-perdidas-por-que-ofrecer-500mbps-10-euros/' },
    { source:'Xataka Móvil', date:'1 abr 2026', title:'DIGI logra mejor dato histórico mensual en portabilidades fijas (marzo)', url:'https://www.xatakamovil.com/digi/agresiva-estrategia-precios-digi-tiene-su-efecto-ha-logrado-mejor-dato-su-historia-portabilidades-netas-fijas' },
    { source:'ADSLZone', date:'5 mar 2026', title:'DIGI anuncia 400M€ inversión 2026 y gran expansión fibra', url:'https://www.adslzone.net/noticias/operadores/digi-anuncia-400-millones-inversion-espana/' },
    { source:'Xataka Móvil', date:'24 feb 2026', title:'DIGI 2025: 33M€ pérdidas pero 1.673k portabilidades récord', url:'https://www.xatakamovil.com/digi/digi-tiene-fibra-10-gbps-barata-su-musculo-esta-otro-servicio-lineas-moviles' }
  ],

  masorange: [
    { source:'MASORANGE', date:'23 abr 2026', title:'MASORANGE aumenta ingresos 1,2% hasta 1.869M€ en Q1 2026', url:'https://blog.masorange.es/masorange/masorange-aumenta-sus-ingresos-totales-un-12-hasta-los-1-869me-en-el-primer-trimestre-de-2026/' },
    { source:'Mobile World Live', date:'24 abr 2026', title:'MasOrange facturó 1,2% más en Q1 2026 (1.869M€)', url:'https://www.mobileworldlive.com/spanish/masorange-facturo-un-12-mas-en-el-primer-trimestre-de-2026' },
    { source:'El Español', date:'23 abr 2026', title:'MasOrange ingresa 1.869M€ a la espera de que Orange tome el control', url:'https://www.elespanol.com/invertia/empresas/tecnologia/20260423/masorange-gana-millones-primer-trimestre-espera-orange-tome-control/1003744218334_0.html' },
    { source:'La Ecuación Digital', date:'23 abr 2026', title:'MASORANGE eleva ingresos: ARPU 54,1€ y sinergias 394M€', url:'https://www.laecuaciondigital.com/destacadas/masorange-ingresos-resultados-trimestrales-2026/' },
    { source:'Wikipedia', date:'jun 2026', title:'MasOrange · evolución 2024-2026 y cifras Q1', url:'https://es.wikipedia.org/wiki/MasOrange' },
    { source:'Zonamovilidad', date:'23 abr 2026', title:'MasOrange crece 1,2% y avanza en integración con Orange', url:'https://www.zonamovilidad.es/resultados-masorange-primer-trimestre-2026-crece-ingresos-avanza-integracion-orange' }
  ],

  // ─── PORTUGAL ───────────────────────────────
  home_pt: [
    { source:'4gnews', date:'26 may 2026', title:'MEO deja atrás a NOS, Vodafone y DIGI en Q1 2026 (41,5%)', url:'https://4gnews.pt/meo-deixa-para-tras-nos-vodafone-e-digi-e-ha-boas-noticias-para-os-portugueses/' },
    { source:'Tek Sapo', date:'26 may 2026', title:'Portugueses prefieren paquetes más completos · ARPU 39,59€', url:'https://tek.sapo.pt/noticias/telecomunicacoes/artigos/portugueses-preferem-pacotes-de-telecomunicacoes-mais-completos-apesar-da-descida-do-preco-medio-para-3959-euros/' },
    { source:'4gnews', date:'29 may 2026', title:'Precios de operadoras PT caen en abril 2026 (-0,9%)', url:'https://4gnews.pt/o-preco-das-operadoras-em-portugal-ficou-mais-barato-e-o-culpado-todos-sabemos-quem-e/' },
    { source:'Tek Sapo', date:'29 may 2026', title:'Precios telecos PT bajan 0,9% en abril · DIGI sigue líder en mínimos', url:'https://tek.sapo.pt/noticias/telecomunicacoes/artigos/precos-das-telecomunicacoes-descem-09-em-abril-qual-e-a-operadora-com-as-mensalidades-mais-baixas/' },
    { source:'4gnews', date:'27 feb 2026', title:'DIGI, MEO, NOS o Vodafone: la operadora que lidera PT en 2025', url:'https://4gnews.pt/digi-meo-nos-ou-vodafone-conhece-a-operadora-que-lidera-o-mercado-em-portugal/' },
    { source:'Magazine HD', date:'10 ene 2026', title:'DIGI mantém preços enquanto MEO, NOS e Vodafone aumentam 2026', url:'https://www.magazine-hd.com/apps/wp/operadora-low-cost-comeca-2026-grande-concorrencia-nos-meo-vodafone/' }
  ],

  market_pt: [
    { source:'ANACOM Consumidor', date:'mar 2026', title:'Precios de telecomunicaciones sin alteraciones en marzo', url:'https://www.anacom-consumidor.pt/-/precos-das-telecomunicacoes-sem-alteracoes-em-marco' },
    { source:'ANACOM', date:'continuo', title:'Pacotes de serviços de comunicações eletrónicas · informes', url:'https://www.anacom.pt/render.jsp?categoryId=337754' },
    { source:'Tek Sapo', date:'26 may 2026', title:'4P/5P son ya 61,5% subscritores y 70,5% receitas en Q1 2026', url:'https://tek.sapo.pt/noticias/telecomunicacoes/artigos/portugueses-preferem-pacotes-de-telecomunicacoes-mais-completos-apesar-da-descida-do-preco-medio-para-3959-euros/' },
    { source:'4gnews', date:'27 feb 2026', title:'Mercado paquetes PT: cuotas oficiales ANACOM', url:'https://4gnews.pt/digi-meo-nos-ou-vodafone-conhece-a-operadora-que-lidera-o-mercado-em-portugal/' },
    { source:'PCAssiste', date:'8 ene 2026', title:'DIGI congela precios mientras trío histórico sube en 2026', url:'https://www.pcassiste.com/2026/01/08/telecomunicacoes-2026-digi-congela-precos-enquanto-meo-nos-e-vodafone-avancam-com-aumentos/' }
  ],

  meo: [
    { source:'4gnews', date:'26 may 2026', title:'MEO líder en Portugal con 41,5% subscritores en Q1 2026', url:'https://4gnews.pt/meo-deixa-para-tras-nos-vodafone-e-digi-e-ha-boas-noticias-para-os-portugueses/' },
    { source:'4gnews', date:'27 feb 2026', title:'MEO domina mercado PT al final de 2025 con 41,6%', url:'https://4gnews.pt/digi-meo-nos-ou-vodafone-conhece-a-operadora-que-lidera-o-mercado-em-portugal/' },
    { source:'Tek Sapo', date:'3 dic 2025', title:'MEO, NOS y Vodafone aumentan precios en 2026 (excepto DIGI)', url:'https://tek.sapo.pt/noticias/telecomunicacoes/artigos/meo-nos-e-vodafone-aumentam-precos-em-2026-mas-ha-excecoes/' },
    { source:'Tek Sapo', date:'26 may 2026', title:'ANACOM Q1 2026: MEO 41,5%, ARPU 39,59€', url:'https://tek.sapo.pt/noticias/telecomunicacoes/artigos/portugueses-preferem-pacotes-de-telecomunicacoes-mais-completos-apesar-da-descida-do-preco-medio-para-3959-euros/' }
  ],

  nos: [
    { source:'4gnews', date:'26 may 2026', title:'NOS segundo operador PT con 34,9% en Q1 2026', url:'https://4gnews.pt/meo-deixa-para-tras-nos-vodafone-e-digi-e-ha-boas-noticias-para-os-portugueses/' },
    { source:'4gnews', date:'27 feb 2026', title:'NOS y operadoras PT cierran 2025 según ANACOM', url:'https://4gnews.pt/digi-meo-nos-ou-vodafone-conhece-a-operadora-que-lidera-o-mercado-em-portugal/' },
    { source:'Tek Sapo', date:'3 dic 2025', title:'NOS confirma aumentos de precios para 2026', url:'https://tek.sapo.pt/noticias/telecomunicacoes/artigos/meo-nos-e-vodafone-aumentam-precos-em-2026-mas-ha-excecoes/' }
  ],

  vodafone_pt: [
    { source:'Tek Sapo', date:'3 dic 2025', title:'Vodafone PT aumenta precios indexados a IPC en 2026 (+2,2%)', url:'https://tek.sapo.pt/noticias/telecomunicacoes/artigos/meo-nos-e-vodafone-aumentam-precos-em-2026-mas-ha-excecoes/' },
    { source:'4gnews', date:'26 may 2026', title:'Vodafone PT mantiene 20,3% cuota paquetes (Q1 2026)', url:'https://4gnews.pt/meo-deixa-para-tras-nos-vodafone-e-digi-e-ha-boas-noticias-para-os-portugueses/' },
    { source:'4gnews', date:'27 feb 2026', title:'Vodafone PT pierde cuota frente al avance de DIGI', url:'https://4gnews.pt/digi-meo-nos-ou-vodafone-conhece-a-operadora-que-lidera-o-mercado-em-portugal/' }
  ],

  digi_pt: [
    { source:'4gnews', date:'7 ene 2026', title:'DIGI empieza 2026 sin subir precios mientras trío histórico sube', url:'https://4gnews.pt/digi-comeca-2026-a-mostrar-a-meo-nos-e-vodafone-como-se-faz/' },
    { source:'Magazine HD', date:'10 ene 2026', title:'DIGI mantiene tabla inalterada en 2026 para ganar cuota', url:'https://www.magazine-hd.com/apps/wp/operadora-low-cost-comeca-2026-grande-concorrencia-nos-meo-vodafone/' },
    { source:'PCAssiste', date:'8 ene 2026', title:'DIGI congela precios en PT, MEO/NOS/Vodafone suben 2,2%', url:'https://www.pcassiste.com/2026/01/08/telecomunicacoes-2026-digi-congela-precos-enquanto-meo-nos-e-vodafone-avancam-com-aumentos/' },
    { source:'4gnews', date:'27 feb 2026', title:'DIGI única operadora PT que gana cuota en 2025 (2,8%)', url:'https://4gnews.pt/digi-meo-nos-ou-vodafone-conhece-a-operadora-que-lidera-o-mercado-em-portugal/' }
  ],

  // ─── ANÁLISIS ───────────────────────────────
  compare: [
    { source:'CNMC', date:'6 may 2026', title:'Cuotas oficiales de mercado · marzo 2026', url:'https://www.cnmc.es/prensa/datos-marzo-telecos-20260506' },
    { source:'Kompara', date:'22 abr 2026', title:'Comparativa de tarifas fibra y móvil 2026: todas las operadoras', url:'https://kompara.es/internet-movil/tarifas' },
    { source:'Roams', date:'24 abr 2026', title:'DIGI vs Movistar vs Orange: análisis comparativo Q1 2026', url:'https://roams.es/actualidad/telefonia/digi-asegura-no-vender-fibra-perdidas-por-que-ofrecer-500mbps-10-euros/' }
  ],

  channels: [
    { source:'MundoPlus.tv', date:'9 ene 2025', title:'Nuevo dial Movistar Plus+ tras pérdida AMC Networks', url:'https://www.mundoplus.tv/tv-digital/este-es-el-nuevo-dial-de-movistar-plus/' },
    { source:'Bandaancha', date:'21 ago 2025', title:'Vodafone elimina 7 canales SkyShowtime: MTV, Comedy, Nick…', url:'https://bandaancha.eu/foros/vodafone-eliminara-7-canales-pago-1757554' },
    { source:'MundoPlus.tv', date:'21 ago 2025', title:'Calle 13, SyFy, Comedy Central y otros 4 canales abandonan Vodafone', url:'https://www.mundoplus.tv/tv-digital/calle-13-syfy-comedy-central-y-otros-4-canales-abandonan-vodafone-tv/' },
    { source:'Xataka Home', date:'2 nov 2024', title:'Nuevos canales gratis llegados a Movistar, Orange y Vodafone', url:'https://www.xatakahome.com/servicios-de-smart-tv/quiza-no-te-has-dado-cuenta-canales-gratis-que-han-llegado-a-movistar-plus-orange-tv-vodafone-tv-ultimos-meses' }
  ],

  groups: [
    { source:'Bandaancha', date:'21 ago 2025', title:'Paramount perdió Vodafone en agosto 2025 por desacuerdo SkyShowtime', url:'https://bandaancha.eu/foros/vodafone-eliminara-7-canales-pago-1757554' },
    { source:'MundoPlus.tv', date:'9 ene 2025', title:'AMC sale de Movistar: 14 canales menos en la parrilla', url:'https://www.mundoplus.tv/tv-digital/este-es-el-nuevo-dial-de-movistar-plus/' },
    { source:'MEO Forum', date:'19 dic 2025', title:'MEO renueva Nickelodeon con Paramount Portugal', url:'https://forum.meo.pt/tv-e-pacotes-9/canais-tv-boa-noticia-165975' },
    { source:'MEO Forum', date:'31 dic 2025', title:'MTV Portugal cesa: MEO no renueva con Paramount', url:'https://forum.meo.pt/tv-e-pacotes-9/mtv-portugal-166050' }
  ],

  // ─── PARAMOUNT ──────────────────────────────
  paramount_overview: [
    { source:'Bandaancha', date:'21 ago 2025', title:'Vodafone elimina Nick, Nick Jr., MTV y Comedy Central', url:'https://bandaancha.eu/foros/vodafone-eliminara-7-canales-pago-1757554' },
    { source:'MEO Forum', date:'19 dic 2025', title:'MEO renueva Nickelodeon + Nick Jr. en Portugal', url:'https://forum.meo.pt/tv-e-pacotes-9/canais-tv-boa-noticia-165975' },
    { source:'Wikipedia', date:'29 ene 2026', title:'Nickelodeon Iberia: cierre feed ibérico, integración Global Unlimited', url:'https://pt.wikipedia.org/wiki/Nickelodeon_(Portugal)' },
    { source:'Selectra', date:'5 may 2026', title:'Dónde ver Nickelodeon: diales actualizados', url:'https://tv.selectra.com/es-ES/canales/nickelodeon' }
  ],

  ch_nickelodeon: [
    { source:'MundoPlus.tv', date:'9 ene 2025', title:'Dial 114 Movistar: Nickelodeon estable tras reorganización', url:'https://www.mundoplus.tv/tv-digital/este-es-el-nuevo-dial-de-movistar-plus/' },
    { source:'Selectra', date:'5 may 2026', title:'Nickelodeon: diales por operador en España y Portugal', url:'https://tv.selectra.com/es-ES/canales/nickelodeon' },
    { source:'Wikipedia', date:'9 feb 2026', title:'Nickelodeon Portugal: feed Global Unlimited desde 29 ene 2026', url:'https://pt.wikipedia.org/wiki/Nickelodeon_(Portugal)' }
  ],

  ch_nickjr: [
    { source:'MundoPlus.tv', date:'9 ene 2025', title:'Nick Jr. en dial 113 Movistar Plus+', url:'https://www.mundoplus.tv/tv-digital/este-es-el-nuevo-dial-de-movistar-plus/' },
    { source:'MEO Forum', date:'19 dic 2025', title:'Nick Jr. renovado por MEO con Paramount', url:'https://forum.meo.pt/tv-e-pacotes-9/canais-tv-boa-noticia-165975' }
  ],

  ch_mtv: [
    { source:'MEO Forum', date:'31 dic 2025', title:'MTV Portugal sustituida por MTV Global tras no renovación MEO', url:'https://forum.meo.pt/tv-e-pacotes-9/mtv-portugal-166050' },
    { source:'Bandaancha', date:'21 ago 2025', title:'MTV España fuera de Vodafone TV desde agosto 2025', url:'https://bandaancha.eu/foros/vodafone-eliminara-7-canales-pago-1757554' },
    { source:'MundoPlus.tv', date:'9 ene 2025', title:'MTV España dial 120 + MTV 00s dial 121 en Movistar', url:'https://www.mundoplus.tv/tv-digital/este-es-el-nuevo-dial-de-movistar-plus/' }
  ],

  ch_comedycentral: [
    { source:'Bandaancha', date:'21 ago 2025', title:'Comedy Central abandona Vodafone en agosto 2025', url:'https://www.mundoplus.tv/tv-digital/calle-13-syfy-comedy-central-y-otros-4-canales-abandonan-vodafone-tv/' },
    { source:'MundoPlus.tv', date:'9 ene 2025', title:'Comedy Central permanece en Movistar y MASORANGE', url:'https://www.mundoplus.tv/tv-digital/este-es-el-nuevo-dial-de-movistar-plus/' }
  ]
};


/* ════════════════════════════════════════════
   PERFILES DE TARGET (Punto 13)
   Indexado por país + canal: TARGET_PROFILES[country][channel_key]
══════════════════════════════════════════════ */
const TARGET_PROFILES = {
  es: {
    nickelodeon: {
      age_range: '6-12 años (extensión 4-14)',
      gender_split: '52% niños / 48% niñas',
      socioeconomic: 'C1-C2 / clase media · familias con hijos en edad escolar',
      key_interests: ['SpongeBob y franquicias clásicas', 'PAW Patrol (cross con Nick Jr.)', 'Series live-action tween (iCarly, Henry Danger)', 'Animación cómica adventure', 'Gaming infantil (Roblox, Minecraft)'],
      consumption_behavior: [
        'Co-viewing con padres en fin de semana mañana',
        'Visionado lineal en franja 17h-20h (vuelta colegio)',
        'Alto consumo VOD vía operador (no SVOD propio)',
        'Multi-screen: TV + tablet personal en paralelo'
      ],
      decision_maker: 'Padre/madre (decisor económico) + niño (influenciador alto)',
      complementary_brands: 'LEGO, Funko, McDonald\'s Happy Meal, parques temáticos',
      ad_value: 'Premium en kids · CPM mantenido pese a caída lineal',
      sources: [
        { label:'Barlovento Comunicación', url:'https://www.barloventocomunicacion.es/audiencias-mensuales/' },
        { label:'Kantar Media (audímetros TV)', url:'https://www.kantarmedia.com/es' },
        { label:'AIMC EGM (consumo medios)', url:'https://www.aimc.es/' },
        { label:'Análisis interno Paramount EMEAA' }
      ]
    },
    nickjr: {
      age_range: '2-6 años (preescolar puro)',
      gender_split: '50% / 50% (sin sesgo en estos años)',
      socioeconomic: 'C1-C2 · familias con bebés/preescolares',
      key_interests: ['PAW Patrol (#1 absoluto)', 'Peppa Pig', 'Bluey', 'Aprendizaje temprano (números, colores, emociones)', 'Música infantil'],
      consumption_behavior: [
        'Co-viewing parental 80%+ del tiempo (decisión del adulto)',
        'Visionado mañana temprano (7h-10h) y tarde post-siesta',
        'Repetición alta de mismos episodios (efecto familiarización)',
        'Soporte calmar/entretener en momentos puntuales'
      ],
      decision_maker: 'Madre/padre puro (niño aún no decide)',
      complementary_brands: 'Productos infancia (alimentación, higiene, ropa), juguetería pre-escolar, librerías',
      ad_value: 'Muy alto en categorías niños 0-5 y maternidad',
      sources: [
        { label:'Barlovento Comunicación', url:'https://www.barloventocomunicacion.es/audiencias-mensuales/' },
        { label:'Kantar Media (audímetros TV)', url:'https://www.kantarmedia.com/es' },
        { label:'CIS Barómetro Familia con hijos 0-6' },
        { label:'Análisis interno Paramount EMEAA' }
      ]
    },
    mtv: {
      age_range: '16-34 años (core 18-24)',
      gender_split: '58% mujeres / 42% hombres',
      socioeconomic: 'Mix · urbano y joven adulto · estudiantes y primer empleo',
      key_interests: ['Realities (Geordie Shore, Acapulco Shore, Catfish)', 'Pop, R&B, urbano (Bad Bunny, Rosalía, Aitana)', 'Premios MTV (VMAs, EMAs)', 'Lifestyle juvenil y celebridades', 'K-pop (BTS, BLACKPINK)'],
      consumption_behavior: [
        'Consumo lineal en franja noche (22h-1h)',
        'Backbone para ambient TV en pisos compartidos',
        'Doble pantalla: TV + Instagram/TikTok',
        'Bajo consumo de música lineal (todo en Spotify) — los realities mueven la audiencia'
      ],
      decision_maker: 'El propio joven adulto',
      complementary_brands: 'Bebidas (cerveza, RTD), fast fashion, beauty, tecnología, festivales, gaming',
      ad_value: 'Premium en 18-24 difícil de alcanzar vía TV lineal',
      sources: [
        { label:'Barlovento Comunicación', url:'https://www.barloventocomunicacion.es/audiencias-mensuales/' },
        { label:'GfK DAM (audiencia digital)', url:'https://www.gfk.com/insights' },
        { label:'IAB Spain TV Connected', url:'https://iabspain.es/' },
        { label:'Análisis interno Paramount EMEAA' }
      ]
    },
    comedycentral: {
      age_range: '18-45 años (core 25-40)',
      gender_split: '63% hombres / 37% mujeres',
      socioeconomic: 'Mix · profesional joven y mid-adulto urbano',
      key_interests: ['South Park', 'Friends, Big Bang Theory (reposiciones premium)', 'Stand-up comedy (Comedy Central Live!)', 'Sitcoms norteamericanas', 'Comedia satírica adulta'],
      consumption_behavior: [
        'Late-night viewing (22h-2h) — el sofá tras el día',
        'Comedia como "decompresión" tras trabajo',
        'Doble pantalla con redes (Twitter/X) para comentar memes',
        'Atraído por comedy specials Netflix → tensión con OTT'
      ],
      decision_maker: 'El propio adulto joven (decisor de su tarifa TV)',
      complementary_brands: 'Cerveza, snacks salados, bebidas energéticas, automoción, fintech, gaming',
      ad_value: 'Bueno en 25-40 con humor adulto · contexto seguro para anunciantes',
      sources: [
        { label:'Barlovento Comunicación', url:'https://www.barloventocomunicacion.es/audiencias-mensuales/' },
        { label:'AIMC EGM (consumo TV/digital)', url:'https://www.aimc.es/' },
        { label:'IAB Spain Estudio Anual Vídeo', url:'https://iabspain.es/' },
        { label:'Análisis interno Paramount EMEAA' }
      ]
    }
  },
  pt: {
    nickelodeon: {
      age_range: '6-12 anos (extensão 4-14)',
      gender_split: '52% rapazes / 48% raparigas',
      socioeconomic: 'C1-C2 · famílias com crianças em idade escolar',
      key_interests: ['SpongeBob (referência geracional PT)', 'PAW Patrol (cross com Nick Jr.)', 'Loud em Casa, Henry Danger', 'Animação cómica e aventura'],
      consumption_behavior: [
        'Co-viewing familiar fim de semana',
        'Visionamento linear 17h-20h (regresso da escola)',
        'Concorrência forte do Canal Panda (líder local)',
        'Multi-screen: TV + tablet em simultâneo'
      ],
      decision_maker: 'Pai/mãe (decisão económica) + criança (alta influência)',
      complementary_brands: 'LEGO, Funko, parques temáticos, brinquedos, livros infantis',
      ad_value: 'Premium mas com pressão de Canal Panda no mercado PT',
      sources: [
        { label:'GfK Portugal (audiências TV)', url:'https://www.gfk.com/insights' },
        { label:'CAEM (Comissão de Análise de Estudos de Meios)', url:'https://www.caem.pt/' },
        { label:'Marktest Audimetria', url:'https://www.marktest.com/' },
        { label:'Análise interna Paramount EMEAA' }
      ]
    },
    nickjr: {
      age_range: '2-6 anos (pré-escolar)',
      gender_split: '50% / 50%',
      socioeconomic: 'C1-C2 · famílias com bebés e pré-escolares',
      key_interests: ['PAW Patrol', 'Peppa Pig', 'Aprendizagem precoce', 'Música infantil'],
      consumption_behavior: [
        'Co-viewing parental obrigatório (decisão do adulto)',
        'Visionamento manhã e início da tarde',
        'Repetição alta de mesmos episódios',
        'Concorrência directa com Panda Kids'
      ],
      decision_maker: 'Mãe/pai (criança ainda não decide)',
      complementary_brands: 'Produtos infância, higiene, brinquedos pré-escolares',
      ad_value: 'Alto em categorias maternidade e infância 0-5',
      sources: [
        { label:'GfK Portugal (audiências TV)', url:'https://www.gfk.com/insights' },
        { label:'CAEM (Comissão de Análise de Estudos de Meios)', url:'https://www.caem.pt/' },
        { label:'INE Portugal demografia 0-6', url:'https://www.ine.pt/' },
        { label:'Análise interna Paramount EMEAA' }
      ]
    },
    mtv: {
      age_range: '16-34 anos (core 18-24)',
      gender_split: '58% mulheres / 42% homens',
      socioeconomic: 'Urbano e jovem adulto',
      key_interests: ['Reality shows', 'Música pop e urbana', 'Premios MTV EMAs', 'Lifestyle juvenil', 'K-pop'],
      consumption_behavior: [
        'Sinal Global (Polónia) sem dobragem PT — experiência reduzida',
        'Consumo nocturno + ambient TV',
        'Concorrência das playlists Spotify',
        'MEO saiu em 2025 (perda de alcance crítica)'
      ],
      decision_maker: 'O próprio jovem adulto',
      complementary_brands: 'Bebidas, moda fast, beauty, tecnologia, festivais (NOS Alive, MEO Sudoeste)',
      ad_value: 'Reduzido pela perda de MEO e ausência de localização PT',
      sources: [
        { label:'GfK Portugal (audiências TV)', url:'https://www.gfk.com/insights' },
        { label:'Marktest Audimetria', url:'https://www.marktest.com/' },
        { label:'IAB Portugal estudos digitais', url:'https://iab.pt/' },
        { label:'Análise interna Paramount EMEAA' }
      ]
    }
  }
};

/* ════════════════════════════════════════════
   PLAN DE ACCIÓN POR OPERADOR (Punto 15 — Expandido)
   Estructura por operador:
   {
     priority, deadline, ask, tactic, fee_estimate,
     offers: [propuestas concretas para llevar a la mesa],
     competitor_deals: [acuerdos públicos de otros groups para benchmarking],
     scenarios: { worst, base, best } con KPIs numéricos
   }
══════════════════════════════════════════════ */
const ACTION_PLANS = {
  es: {
    nickelodeon: {
      movistar: {
        priority: 'mantener',
        deadline: 'Próxima renovación 2026-2027',
        ask: 'Mantener dial 114 + bloque infantil completo (Nick + Nick Jr.) en pack base de Movistar Plus+. Renovación a 3 años con cláusula anti-sustitución por Disney Channel relanzado.',
        tactic: 'Movistar es el ancla más estable de la cartera Paramount en España. Telefónica acaba de reportar 16M contratos móvil (récord histórico) y ARPU 91,5€ Q1 2026 — momento óptimo para defender fee actual sin abrir negociación a la baja. Apalancar valor de SkyShowtime ya integrado en Ficción Total (dial 29) como argumento de paquete Paramount completo.',
        fee_estimate: '0,18-0,24 €/sub/mes (carrying fee estimado para canal infantil premium en España)',
        offers: [
          'Renovación 3 años con incremento IPC limitado (+1,5% anual) a cambio de garantía dial 114 y pack base',
          'Pack co-branded Nick + Nick Jr. + Comedy Central como "Universo Paramount Familia" con descuento 8% sobre fee individual',
          'Activación premium en vacaciones escolares (maratones SpongeBob, especiales PAW Patrol) con co-marketing Movistar Plus+',
          'Inclusión sin coste adicional en Movistar Plus+ Lite (OTT) durante los 3 años — anclaje en cliente no-fibra'
        ],
        competitor_deals: [
          'Disney+ con Movistar: integración total en Ficción Total + dial dedicado tras cierre Disney Channel TDT (ene 2025). Modelo agresivo de OTT',
          'Warner/Max: integrado en miMovistar Fusión desde mar 2024, plan Estándar incluido sin coste extra en paquetes Ficción Total',
          'SkyShowtime (Paramount JV con Comcast): dial 29 en Movistar desde ene 2025, en Ficción Total a 16€/mes incluido. Demuestra apetito del operador por Paramount Group',
          'AMC perdió Movistar ene 2025 con sus 14 canales — alerta: Movistar consolida hacia menos canales premium con más valor'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'Movistar incluye Disney Channel relanzado (abr 2026) en pack base y degrada Nickelodeon a dial 200+ o lo saca del pack base.',
            kpis: { reach: '-65% (de 17M a ~6M hogares)', fee_impact: '-40% fee revenue ES', arpu_loss: '~3,8M€/año perdidos' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación a 3 años con dial 114 mantenido y fee con incremento IPC. Nickelodeon sigue como ancla infantil junto a Disney Junior.',
            kpis: { reach: '17,9M subs Movistar', fee_impact: '+4,5% YoY (IPC)', arpu_loss: '0' }
          },
          best: {
            label: 'Best case',
            description: 'Renovación 3 años + pack premium Paramount Familia (Nick + Nick Jr. + Comedy) integrado en Movistar Plus+ Lite. Co-marketing eventos escolares.',
            kpis: { reach: '17,9M Movistar + 350k Plus+ Lite', fee_impact: '+12% fee revenue', arpu_loss: '+750k€/año' }
          }
        }
      },
      vodafone: {
        priority: 'reentrada',
        deadline: 'Q3-Q4 2026 (negociación post-reorganización Zegona)',
        ask: 'Reentrada con bundle Nick + Nick Jr. + SkyShowtime como propuesta integrada. Dial doble dígito (60-70) y pack base, no opcional.',
        tactic: 'Vodafone TV se reforzó en sep+dic 2025 con +35 canales nuevos pero salió de la cartera Paramount en ago 2025 al no renovar SkyShowtime. Zegona está enfocada en cliente rentable (ARPU 65€ vs 91€ Movistar). Aprovechar la ventana de renegociación tras el primer año de Zegona-only — están abiertos a paquetes diferenciales. Argumento clave: Vodafone perdió 1,1M hogares con TV potenciales sin Paramount.',
        fee_estimate: '0,12-0,18 €/sub/mes (rebaja año 1, escalado IPC desde año 2)',
        offers: [
          'Año 1 con fee 30% descuento (0,12€/sub) → garantizar entrada en pack base con dial doble dígito',
          'Bundle "Familia Paramount" Nick + Nick Jr. + Comedy Central como pack opcional a 2,99€/mes para suscriptores Vodafone',
          'Inclusión sin coste extra en cualquier futura OTT independiente Vodafone (anticipándose a posible OTT Vodafone Libre)',
          'Cláusula MFN (Most Favored Nation) con Vodafone para que cualquier mejora en otro operador les llegue automáticamente'
        ],
        competitor_deals: [
          'Vodafone+HBO: histórico exclusivo desde 2016, renovado hasta 2026 sin exclusividad. Modelo de plataforma incluida en pack',
          'Vodafone+AMC: salió de Movistar ene 2025 y reforzó Vodafone con AMC+ Connect canal exclusivo desde sep 2025. Demuestra apetito de Vodafone por catálogo premium tras pérdida Paramount',
          'Vodafone+BBC: paquete completo BBC añadido tras reorganización Zegona en sep 2025. Indica que están abiertos a nuevos catálogos',
          'Disney+ con Vodafone: integrado en pack premium Familyfans desde 2024'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'Vodafone no abre negociación y consolida con AMC+ y BBC como alternativa al universo Paramount. Nick + Nick Jr. quedan fuera 3 años más.',
            kpis: { reach: '0 (sigue ausente)', fee_impact: '-1,1M hogares potenciales', arpu_loss: '~2,8M€/año perdidos vs base 2024' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Reentrada Nick + Nick Jr. en pack opcional a 2,99€/mes para suscriptores Vodafone, dial 60-70. Fee promocional año 1.',
            kpis: { reach: '1,1M hogares (penetración ~40%)', fee_impact: '+0,8M€/año fee revenue', arpu_loss: '0' }
          },
          best: {
            label: 'Best case',
            description: 'Pack Paramount completo (Nick + Nick Jr. + MTV + Comedy) integrado en pack base Vodafone TV con dial premium. Co-marketing kids.',
            kpis: { reach: '1,1M hogares (100%)', fee_impact: '+2,4M€/año fee revenue', arpu_loss: '+1,9M€/año vs ausencia actual' }
          }
        }
      },
      digi: {
        priority: 'crecer',
        deadline: '2026 continuo · revisión Q4 2026',
        ask: 'Mantener dial 65 + push para promoción cruzada Nick en captación. Fee escalonado con bonus por crecimiento DIGI TV (>300k subs en 2027).',
        tactic: 'DIGI cerró Q1 2026 con 217k DIGI TV (+25% vs Q4 2025) y 11,4M clientes totales. Es el motor del crecimiento en España. Negociar fee variable atado al crecimiento — alinear incentivos. Apuntar a familias jóvenes urbanas low-cost (target ideal para Nick).',
        fee_estimate: '0,14-0,20 €/sub/mes (escalonado por hitos de crecimiento)',
        offers: [
          'Fee escalonado: 0,14€ para los primeros 250k subs, 0,17€ para 250-500k, 0,20€ para >500k',
          'Bundle Nick + Nick Jr. con descuento 10% vs fee individual + posición consecutiva dial 65-66',
          'Co-marketing en campañas de captación DIGI: promo "primer mes gratis Nick" para nuevos suscriptores TV',
          'Cláusula de exclusividad geográfica en zonas DIGI con cobertura fibra propia (incentivo de captación)'
        ],
        competitor_deals: [
          'DIGI+SkyShowtime: integrado en parrilla básica DIGI TV desde lanzamiento. Modelo de plataforma incluida',
          'DIGI+AMC: añadió los 14 canales AMC tras salida Movistar ene 2025 — apetito demostrado por catálogo premium',
          'DIGI+Warner: dispone del paquete BBC y catálogo Warner desde 2024 vía acuerdo distribución',
          'AMC SELEKT en Prime Video: alternativa OTT que demuestra estrategia AMC multi-canal post-Movistar'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'DIGI prioriza coste sobre catálogo infantil premium. Sustituye Nick por Cartoon Network low-cost o decide salir del segmento infantil.',
            kpis: { reach: '0 (cierra distribución)', fee_impact: '-217k subs', arpu_loss: '~400k€/año perdidos' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación con fee escalonado, dial 65 mantenido. DIGI TV crece a 350k subs fin 2026.',
            kpis: { reach: '350k subs DIGI TV', fee_impact: '+15% fee revenue YoY', arpu_loss: '+220k€/año' }
          },
          best: {
            label: 'Best case',
            description: 'DIGI TV alcanza 500k+ subs en 2027 con Nick destacado en captación. Bundle Nick + Nick Jr. en todas las altas.',
            kpis: { reach: '500k+ subs', fee_impact: '+45% fee revenue vs 2025', arpu_loss: '+880k€/año' }
          }
        }
      },
      masorange: {
        priority: 'consolidar OTT',
        deadline: 'Renovación 2026-2027 · consolidación Orange Q2 2026',
        ask: 'Garantizar inclusión en Orange TV Libre (OTT independiente) además de Orange TV principal tras consolidación Orange (Q2 2026). Pack Paramount familia en parrilla unificada.',
        tactic: 'MASORANGE alcanzó 47M líneas y ARPU 54,1€ en Q1 2026 con consolidación Orange inminente. Orange TV Libre (7,99€) integra ya SkyShowtime sin coste — abrir vía para incluir Nick + Nick Jr. con mismo modelo. Argumento: ampliar valor percibido del OTT independiente frente a Movistar Plus+ Lite (12€).',
        fee_estimate: '0,16-0,22 €/sub/mes (mayor en Orange TV principal, menor en OTT Libre)',
        offers: [
          'Inclusión Nick + Nick Jr. en Orange TV Libre sin coste extra para el cliente (paga Paramount fee al operador) — clavar diferenciación vs Movistar Plus+ Lite',
          'Renovación 3 años parrilla unificada Orange + Yoigo + Jazztel post-consolidación',
          'Activaciones cruzadas con SkyShowtime (mismo grupo Paramount JV) — pack "Familia Paramount" en Orange TV Libre',
          'Co-marketing en festivales infantiles patrocinados por Orange (Fiesta del Cine Kids, parques temáticos)'
        ],
        competitor_deals: [
          'MASORANGE+SkyShowtime: integrado en Orange TV Libre sin coste desde dic 2024 — modelo de referencia para Nick',
          'Disney+ con Orange: add-on integrado opcional, no en pack base',
          'Warner/Max con Orange: integrado desde may 2024 en Cine y Series Total',
          'AMC con MASORANGE: canales AMC mantenidos en parrilla tras salida Movistar (DIGI también los tiene)'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'Tras consolidación Orange, racionalización de parrilla deja fuera Nick o Nick Jr. priorizando exclusivos Orange (deportes, SkyShowtime).',
            kpis: { reach: '-50% (de 26,8M a ~13M)', fee_impact: '-30% fee revenue', arpu_loss: '~2,1M€/año perdidos' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación 3 años con dial 67 mantenido en Orange TV principal y inclusión opcional en Orange TV Libre (3,99€ add-on familiar).',
            kpis: { reach: '26,8M Orange + 250k Orange TV Libre', fee_impact: '+5% IPC', arpu_loss: '+180k€/año' }
          },
          best: {
            label: 'Best case',
            description: 'Inclusión sin coste en Orange TV Libre + pack Paramount Familia destacado en captación post-consolidación. Visibilidad en 8 marcas Orange.',
            kpis: { reach: '26,8M Orange + 800k OTT Libre', fee_impact: '+18% fee revenue YoY', arpu_loss: '+1,3M€/año' }
          }
        }
      }
    },
    nickjr: {
      movistar: {
        priority: 'mantener',
        deadline: 'Próxima renovación 2026-2027',
        ask: 'Mantener dial 113 + bundle inseparable con Nickelodeon. Garantizar posición preescolar premium junto a Disney Junior (no como alternativa de menor categoría).',
        tactic: 'Nick Jr. es el ancla de target preescolar (2-6 años) con co-viewing parental obligado — perfil ARPU psicológico alto. Defender posición consecutiva con Nick (D113-D114). El cierre Disney Channel TDT ene 2025 y relanzamiento Disney Channel reposicionado Disney Junior abril 2026 abre ventana para reforzar Nick Jr. como preescolar #1 en Movistar.',
        fee_estimate: '0,15-0,20 €/sub/mes (preescolar premium con co-viewing parental)',
        offers: [
          'Bundle inseparable Nick + Nick Jr. con renovación conjunta a 3 años + co-marketing kids escolar',
          'Pack pre-escolar Paramount Nick Jr. + Baby TV (si aplica): "Universo Paramount Pre-K" con descuento 12% vs fee individual',
          'Producción exclusiva PAW Patrol shorts para Movistar (windowing 30 días pre-streaming) — diferenciación claro vs Disney Junior',
          'Activaciones bloque mañana sábado (8h-11h) con maratones temáticos co-marketing Movistar'
        ],
        competitor_deals: [
          'Disney Junior en Movistar: dial 111. Único superviviente del universo Disney lineal tras cierre Disney Channel TDT (ene 2025)',
          'Disney Channel relanzado (abril 2026): reposicionamiento como Disney Junior — riesgo de canibalización pero también de fragmentación Disney',
          'BabyTV en Movistar (dial 110): cubre target 0-2 años, complementario a Nick Jr.',
          'Clan TVE (TDT gratis): competidor por audiencia pero no en pack premium operador'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'Movistar racionaliza parrilla preescolar manteniendo solo Disney Junior (mayor marca) y degrada Nick Jr. a dial 200+ o lo elimina.',
            kpis: { reach: '-100% (out)', fee_impact: '-2,9M€/año revenue', arpu_loss: 'pérdida total cartera ES preescolar Movistar' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación junto con Nick a 3 años, dial 113 mantenido, fee con IPC.',
            kpis: { reach: '17,9M subs', fee_impact: '+4,5% YoY (IPC)', arpu_loss: '0' }
          },
          best: {
            label: 'Best case',
            description: 'Pack pre-escolar Paramount con bundle Nick Jr. + BabyTV producciones exclusivas PAW Patrol. Posicionamiento como #1 preescolar en Movistar.',
            kpis: { reach: '17,9M + windowing exclusivo', fee_impact: '+11% fee revenue', arpu_loss: '+650k€/año' }
          }
        }
      },
      vodafone: {
        priority: 'reentrada',
        deadline: 'Q3-Q4 2026',
        ask: 'Reentrada en bundle inseparable con Nickelodeon. Pack familiar base con dial 50-60.',
        tactic: 'Vender Nick + Nick Jr. como propuesta única — Vodafone no puede elegir solo uno. Argumento: el público preescolar es decisor familiar de tarifa, alto valor para retención. Vodafone TV reforzada en sep+dic 2025 buscaba kids — propuesta única.',
        fee_estimate: '0,12-0,18 €/sub/mes (bundle Nick + Nick Jr. con descuento conjunto)',
        offers: [
          'Bundle Nick + Nick Jr. con fee 30% descuento año 1, sólo si se entra como pack',
          'Pack "Familia Paramount" preescolar + kids como add-on opcional a 2,99€/mes',
          'Inclusión en futura OTT independiente Vodafone (si se lanza) con cláusula MFN',
          'Co-marketing kids escolar y eventos Vodafone (descuentos en parques temáticos socios)'
        ],
        competitor_deals: [
          'Vodafone tiene actualmente Disney Junior + BabyTV + Cartoon Network + Boing — cobertura infantil sin Paramount',
          'Canal Panda no opera en España, sin amenaza directa local',
          'Cry Babies, El reino infantil — canales de bajo coste actualmente en Vodafone, sin equivalente premium'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'Vodafone consolida con Disney Junior + Cartoon Network como cobertura infantil suficiente, sin Paramount.',
            kpis: { reach: '0', fee_impact: '-1,1M hogares potenciales', arpu_loss: '~1,5M€/año perdidos' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Reentrada Nick + Nick Jr. en pack opcional a 2,99€/mes, dial 50-60.',
            kpis: { reach: '1,1M hogares (penetración ~35%)', fee_impact: '+0,6M€/año', arpu_loss: '0' }
          },
          best: {
            label: 'Best case',
            description: 'Pack Familia Paramount integrado en pack base Vodafone TV. Co-marketing kids y parques temáticos.',
            kpis: { reach: '1,1M hogares (100%)', fee_impact: '+1,8M€/año', arpu_loss: '+1,4M€/año' }
          }
        }
      },
      digi: {
        priority: 'crecer',
        deadline: '2026 continuo',
        ask: 'Posición consecutiva con Nick (D65-D66). Bundle Nick + Nick Jr. en captación.',
        tactic: 'DIGI capta familias jóvenes urbanas — perfil ideal para Nick Jr. Fee escalonado con bonus por crecimiento DIGI TV.',
        fee_estimate: '0,12-0,18 €/sub/mes',
        offers: [
          'Bundle Nick + Nick Jr. con descuento 15% vs fee individual',
          'Posición consecutiva D65-D66 garantizada en renovación',
          'Promo "primer mes gratis bloque infantil" para nuevos suscriptores DIGI TV',
          'Co-marketing en zonas con alta presencia DIGI (Galicia, Cataluña, urbana joven)'
        ],
        competitor_deals: [
          'DIGI tiene Disney Junior + Cartoon Network + Boing + DreamWorks — parrilla preescolar competitiva',
          'DIGI low-cost no compite con OTT premium (Disney+, Netflix Kids) en su target',
          'Cartoon Network como amenaza directa preescolar 4-7'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'DIGI prioriza coste y elimina Nick Jr. del pack base.',
            kpis: { reach: '0', fee_impact: '-217k subs', arpu_loss: '~280k€/año perdidos' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación con fee escalonado, dial 66 mantenido, DIGI TV crece a 350k.',
            kpis: { reach: '350k subs', fee_impact: '+15% YoY', arpu_loss: '+180k€/año' }
          },
          best: {
            label: 'Best case',
            description: 'DIGI TV alcanza 500k+ con bundle Nick + Nick Jr. destacado en captación.',
            kpis: { reach: '500k+ subs', fee_impact: '+45% vs 2025', arpu_loss: '+650k€/año' }
          }
        }
      },
      masorange: {
        priority: 'consolidar OTT',
        deadline: 'Renovación 2026-2027',
        ask: 'Mantener Orange TV principal + push para Orange TV Libre. Bundle con Nick.',
        tactic: 'Tras consolidación Orange, asegurar parrilla unificada con Yoigo TV. Probar pack preescolar (Nick Jr. + Baby TV + Disney Junior) como opcional premium.',
        fee_estimate: '0,14-0,20 €/sub/mes',
        offers: [
          'Bundle Nick + Nick Jr. inseparable en parrilla unificada post-consolidación',
          'Inclusión Nick Jr. en Orange TV Libre como diferenciador vs competidores',
          'Co-marketing kids con marcas Orange (Yoigo, Jazztel) — capilaridad multi-marca',
          'Activaciones en parques infantiles y festivales kids patrocinados por Orange'
        ],
        competitor_deals: [
          'Orange tiene Disney Junior + Cartoon Network + DreamWorks + BabyTV — cobertura completa',
          'SkyShowtime en Orange TV Libre incluye contenido Nick (catálogo Paramount Pre-K)',
          'Cartoon Network como amenaza directa kids 6-12'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'Racionalización post-consolidación Orange elimina Nick Jr. priorizando Disney Junior.',
            kpis: { reach: '-50% (de 26,8M a 13M)', fee_impact: '-30% fee revenue', arpu_loss: '~1,6M€/año perdidos' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación 3 años, dial 68 mantenido, inclusión opcional en Orange TV Libre.',
            kpis: { reach: '26,8M + 200k OTT Libre', fee_impact: '+5% IPC', arpu_loss: '+150k€/año' }
          },
          best: {
            label: 'Best case',
            description: 'Pack Paramount Familia destacado en captación post-consolidación, 8 marcas Orange.',
            kpis: { reach: '26,8M + 700k OTT', fee_impact: '+18% YoY', arpu_loss: '+1,1M€/año' }
          }
        }
      }
    },
    mtv: {
      movistar: {
        priority: 'mantener cluster',
        deadline: 'Próxima renovación',
        ask: 'Mantener cluster MTV España + MTV 00s + opcionalmente MTV Live. Defender fee por cluster, no canal a canal.',
        tactic: 'Pivot narrativo: vender MTV no como música lineal (perdida vs Spotify) sino como propiedad cross-media (festivales, EMAs, realities Geordie Shore). Backbone del pack adulto joven junto a Comedy Central. Argumento: target 16-34 difícil de alcanzar vía lineal, MTV captura ambient viewing nocturno.',
        fee_estimate: '0,06-0,12 €/sub/mes (cluster MTV completo)',
        offers: [
          'Cluster MTV (España + 00s + Live) fee único con descuento 20% vs canales individuales',
          'Co-marketing festivales españoles (Mad Cool, Primavera Sound, FIB) con propiedad MTV',
          'Premios MTV EMAs como evento Movistar Plus+ exclusivo (windowing 7 días)',
          'Bundle MTV + Comedy Central como "Universo Paramount Adulto Joven" con descuento 15%'
        ],
        competitor_deals: [
          'Sol Música, Mezzo Live: canales música nicho en Movistar (precio bajo, audiencia pequeña)',
          'Spotify dominio absoluto música lineal — operadores reducen carteras música',
          'Vevo en Pluto TV: alternativa gratuita FAST canal',
          'Stingray Classica: canales clásicos premium en Movistar'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'Movistar elimina MTV (o solo deja MTV España en pack premium) priorizando catálogo de cine y deportes.',
            kpis: { reach: '-100% MTV 00s/Live', fee_impact: '-65% fee revenue cluster', arpu_loss: '~1,2M€/año perdidos' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación cluster MTV completo a 3 años, fee plano (sin subida ni bajada).',
            kpis: { reach: '17,9M subs', fee_impact: '0% YoY', arpu_loss: '0' }
          },
          best: {
            label: 'Best case',
            description: 'Cluster MTV + Comedy Central como pack adulto joven Paramount con activaciones festivales y EMAs exclusivos.',
            kpis: { reach: '17,9M + activaciones', fee_impact: '+15% fee revenue', arpu_loss: '+520k€/año' }
          }
        }
      },
      vodafone: {
        priority: 'reentrada',
        deadline: 'Q4 2026',
        ask: 'Reentrada de MTV España junto a Nickelodeon como pack Paramount completo (kids + adulto joven).',
        tactic: 'No vender MTV solo: empaquetar siempre con Nick + Comedy Central. Si Vodafone solo quiere infantil, MTV out — fuerza la decisión global.',
        fee_estimate: '0,04-0,08 €/sub/mes',
        offers: [
          'MTV España incluido en pack Paramount completo (Nick + Nick Jr. + MTV + Comedy)',
          'No vender MTV aislado — sólo como parte del cluster',
          'Activaciones festivales españoles con Vodafone como sponsor (cross-marketing)',
          'Premios MTV EMAs como evento Vodafone TV (similar a Movistar pero contenido diferenciado)'
        ],
        competitor_deals: [
          'Movie Music sustituye MTV en Vodafone desde ago 2025 — nicho menor',
          'Vodafone tiene Sol Música como única opción música actualmente',
          'Espacio MTV vacío en Vodafone TV — oportunidad si llega con Nick'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'Vodafone consolida Movie Music como sustituto y no reincorpora MTV.',
            kpis: { reach: '0', fee_impact: '-1,1M hogares', arpu_loss: '~280k€/año perdidos' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Reentrada MTV España en pack Paramount completo con Nick + Comedy.',
            kpis: { reach: '1,1M hogares (penetración ~30%)', fee_impact: '+150k€/año', arpu_loss: '0' }
          },
          best: {
            label: 'Best case',
            description: 'Cluster MTV completo en pack base Vodafone TV + activaciones festivales sponsor Vodafone.',
            kpis: { reach: '1,1M hogares (100%)', fee_impact: '+450k€/año', arpu_loss: '+380k€/año' }
          }
        }
      },
      digi: {
        priority: 'crecer',
        deadline: '2026',
        ask: 'Mantener dial 100 + promover MTV 00s como secundario.',
        tactic: 'Target 16-34 alineado con base joven de DIGI. Posicionar como música que tu familia conoce — atractivo para hogares low-cost.',
        fee_estimate: '0,04-0,08 €/sub/mes',
        offers: [
          'Cluster MTV + MTV 00s con fee escalonado',
          'Promo cruzada en captación DIGI joven urbana',
          'Co-marketing con marca DIGI en eventos Madrid, Barcelona',
          'Activaciones gratuitas EMAs con visibilidad DIGI'
        ],
        competitor_deals: [
          'DIGI tiene MTV España, MTV 00s, Sol Música, VinTV — parrilla música activa',
          'No hay amenazas directas en su parrilla actual'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'DIGI elimina MTV priorizando música nacional low-cost.',
            kpis: { reach: '0', fee_impact: '-217k subs', arpu_loss: '~120k€/año perdidos' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación, dial 100 mantenido, DIGI TV crece a 350k.',
            kpis: { reach: '350k subs', fee_impact: '+15% YoY', arpu_loss: '+85k€/año' }
          },
          best: {
            label: 'Best case',
            description: 'DIGI TV 500k+ con MTV destacado en captación joven.',
            kpis: { reach: '500k+', fee_impact: '+45% vs 2025', arpu_loss: '+250k€/año' }
          }
        }
      },
      masorange: {
        priority: 'mantener cluster',
        deadline: 'Renovación 2026-2027',
        ask: 'Mantener los 3 feeds (MTV España, MTV 00s, MTV Live). MASORANGE es el único que distribuye los 3.',
        tactic: 'Defender esta exclusividad de cluster completo. Negociar co-branding en festivales españoles patrocinados por Orange.',
        fee_estimate: '0,05-0,10 €/sub/mes (cluster 3 feeds)',
        offers: [
          'Cluster MTV 3 feeds renovación 3 años con fee plano',
          'Co-branding MTV Live en festivales Orange (sponsor histórico de Mad Cool)',
          'Activaciones EMAs como evento Orange TV',
          'Bundle MTV + Comedy en parrilla unificada post-consolidación'
        ],
        competitor_deals: [
          'Orange tiene Sol Música, Qello Concerts, Mezzo — cartera amplia música',
          'MASORANGE es el único que distribuye los 3 feeds MTV en España (diferenciador)',
          'Stingray como add-on premium música'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'Racionalización post-consolidación elimina MTV Live y MTV 00s, dejando solo MTV España.',
            kpis: { reach: '26,8M solo MTV España', fee_impact: '-60% fee cluster', arpu_loss: '~720k€/año perdidos' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación cluster 3 feeds + co-branding festivales Orange.',
            kpis: { reach: '26,8M subs', fee_impact: '+5% IPC', arpu_loss: '+80k€/año' }
          },
          best: {
            label: 'Best case',
            description: 'Cluster MTV completo + activaciones festivales sponsor Orange + bundle Paramount adulto.',
            kpis: { reach: '26,8M + activaciones', fee_impact: '+20% YoY', arpu_loss: '+450k€/año' }
          }
        }
      }
    },
    comedycentral: {
      movistar: {
        priority: 'mantener',
        deadline: 'Próxima renovación',
        ask: 'Mantener dial 128 y posición en pack base. Defender South Park como activo de retención.',
        tactic: 'Backbone de oferta adulta-noche. South Park es retención de cartera con audiencias consistentes nocturnas. Defender fee actual, no abrir negociación a la baja.',
        fee_estimate: '0,08-0,14 €/sub/mes',
        offers: [
          'Renovación 3 años con fee plano + windowing exclusivo South Park 7 días pre-streaming',
          'Bundle Comedy + MTV como Universo Paramount Adulto Joven',
          'Stand-up specials producción local (LOL Spain) con co-marketing Movistar',
          'Activaciones late-night con maratones temáticos (Friends, Big Bang Theory)'
        ],
        competitor_deals: [
          'TNT, Warner TV: alternativas Warner para series adultas/comedia en Movistar',
          'COSMO, Calle 13: comedia/romance Movistar (AMC pero salió ene 2025)',
          'Netflix Specials: amenaza dominante stand-up premium global'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'Movistar elimina Comedy Central priorizando Warner TV/TNT como cobertura comedia.',
            kpis: { reach: '-100%', fee_impact: '-2,1M€/año', arpu_loss: 'pérdida total' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación 3 años, dial 128 mantenido, fee con IPC.',
            kpis: { reach: '17,9M subs', fee_impact: '+4,5% IPC', arpu_loss: '0' }
          },
          best: {
            label: 'Best case',
            description: 'Pack Universo Paramount Adulto + windowing South Park + producción local stand-up.',
            kpis: { reach: '17,9M + windowing', fee_impact: '+12% fee', arpu_loss: '+580k€/año' }
          }
        }
      },
      vodafone: {
        priority: 'reentrada',
        deadline: 'Q4 2026',
        ask: 'Reentrada con bundle MTV + Comedy Central como pack entretenimiento adulto-joven.',
        tactic: 'Vender ambos canales empaquetados. Comedy Central solo = bajo valor; con MTV se construye cluster coherente.',
        fee_estimate: '0,06-0,10 €/sub/mes (bundle MTV + Comedy)',
        offers: [
          'Bundle MTV + Comedy Central como pack único entretenimiento adulto',
          'South Park windowing exclusivo Vodafone TV (diferenciador)',
          'Stand-up specials co-produced Vodafone (eventos en vivo desde Madrid/BCN)',
          'Activaciones late-night sponsor Vodafone'
        ],
        competitor_deals: [
          'Warner TV en Vodafone: comedia clásica (Friends, Big Bang), competidor directo',
          'TNT en Vodafone: series/comedia adulta',
          'Vodafone añadió canales BBC Series, Drama, Top Gear sep 2025 — apetito comedia británica'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'Vodafone consolida con Warner TV + BBC como cobertura comedia, sin Paramount.',
            kpis: { reach: '0', fee_impact: '-1,1M hogares', arpu_loss: '~580k€/año perdidos' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Reentrada Comedy + MTV como bundle, pack opcional.',
            kpis: { reach: '1,1M hogares (penetración ~30%)', fee_impact: '+220k€/año', arpu_loss: '0' }
          },
          best: {
            label: 'Best case',
            description: 'Bundle Paramount Adulto completo (Comedy + MTV) en pack base Vodafone TV con windowing exclusivo South Park.',
            kpis: { reach: '1,1M hogares (100%)', fee_impact: '+680k€/año', arpu_loss: '+520k€/año' }
          }
        }
      },
      digi: {
        priority: 'ENTRAR (no presente)',
        deadline: 'Q3 2026 — clave',
        ask: 'Primera distribución en DIGI con fee promocional año 1. South Park como gancho.',
        tactic: 'DIGI necesita engrosar oferta adulta. Comedy Central + South Park = gancho para hogares jóvenes urbanos. Fee escalonado con bonus por suscriptores TV >300k.',
        fee_estimate: '0,06-0,10 €/sub/mes (año 1 promocional, escalado IPC)',
        offers: [
          'Año 1 con fee 40% descuento promocional para entrada en pack base',
          'Bundle Comedy + MTV como pack adulto joven con descuento 20%',
          'Activación South Park en captación: "primer mes gratis Comedy" para nuevos suscriptores DIGI TV',
          'Cláusula MFN: cualquier mejora en otros operadores llega automáticamente a DIGI'
        ],
        competitor_deals: [
          'DIGI tiene TNT, Warner TV, AXN — cobertura comedia adulta básica',
          'DIGI no distribuye Comedy Central actualmente — hueco competitivo',
          'Netflix Specials disponible vía app en deco DIGI'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'DIGI no acepta entrada (coste vs valor percibido), Comedy Central queda solo en Movistar + MASORANGE.',
            kpis: { reach: '0', fee_impact: '-217k subs potenciales', arpu_loss: '~180k€/año oportunidad perdida' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Entrada DIGI con fee promocional, dial 130-135, DIGI TV crece a 350k.',
            kpis: { reach: '350k subs (nueva distribución)', fee_impact: '+250k€/año revenue nuevo', arpu_loss: '+250k€/año' }
          },
          best: {
            label: 'Best case',
            description: 'Entrada bundle Comedy + MTV destacada en captación DIGI, 500k+ subs en 2027.',
            kpis: { reach: '500k+ subs', fee_impact: '+520k€/año', arpu_loss: '+520k€/año' }
          }
        }
      },
      masorange: {
        priority: 'mantener',
        deadline: 'Renovación 2026-2027',
        ask: 'Mantener dial 41 y posición en cine y series. Asegurar parrilla unificada post-consolidación.',
        tactic: 'Tras consolidación Orange, asegurar Comedy Central en parrilla unificada Orange + Yoigo + Jazztel. Defender fee.',
        fee_estimate: '0,07-0,12 €/sub/mes',
        offers: [
          'Renovación 3 años parrilla unificada post-consolidación',
          'Bundle Comedy + MTV en pack adulto Orange TV',
          'Stand-up specials con co-marketing Orange en festivales humor',
          'Inclusión opcional Orange TV Libre como diferenciador'
        ],
        competitor_deals: [
          'Orange tiene Warner TV, TNT, AXN, AMC, Star Channel — cartera comedia/series fuerte',
          'Movie Music sustituye nicho cluster música/cine',
          'Cobertura amplia comedia adulta en Orange'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'Racionalización post-consolidación elimina Comedy Central priorizando Warner TV.',
            kpis: { reach: '-50% (de 26,8M a 13M)', fee_impact: '-30% fee', arpu_loss: '~720k€/año perdidos' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación 3 años, dial 41 mantenido, parrilla unificada.',
            kpis: { reach: '26,8M subs', fee_impact: '+5% IPC', arpu_loss: '+80k€/año' }
          },
          best: {
            label: 'Best case',
            description: 'Bundle Paramount Adulto en Orange TV principal + inclusión Orange TV Libre.',
            kpis: { reach: '26,8M + 500k OTT', fee_impact: '+18% YoY', arpu_loss: '+580k€/año' }
          }
        }
      }
    }
  },
  pt: {
    nickelodeon: {
      meo: {
        priority: 'CRÍTICO mantener',
        deadline: 'Renovación cerrada dic 2025 — próxima 2027-2028',
        ask: 'Garantizar permanencia multianual tras renovación dic 2025. Mantener dial 44 y bundle Nick + Nick Jr. en pack base.',
        tactic: 'MEO ya mostró reservas sobre coste Paramount en negociación 2024-2025. La pérdida sería catastrófica: 41,5% del mercado PT (4,8M paquetes). Defender fee sin subidas — co-promo con marketing local PT. Canal Panda (Dreamia, JV NOS+AMC) es la mayor amenaza local.',
        fee_estimate: '0,20-0,28 €/sub/mes (premium en PT por escasez catálogo infantil internacional)',
        offers: [
          'Renovación 3 años post-2027 con incremento limitado (+IPC max 2%)',
          'Co-marketing local con dobraje PT exclusivo (no feed global) — diferenciación vs Canal Panda',
          'Bundle Nick + Nick Jr. como pack inseparable infantil Paramount',
          'Activaciones eventos kids PT (festivales infantiles, cines MEO)'
        ],
        competitor_deals: [
          'Canal Panda (Dreamia): líder absoluto audiencia infantil PT, top of mind 61% en adultos con niños vs 4% del 2º — amenaza máxima local',
          'Panda Kids (Dreamia, lanzado jun 2025): canal hermano enfocado 6-9 años Geração Alpha',
          'Disney Junior en MEO (dial 40): único Disney lineal PT tras cierre Disney Channel',
          'MEO+SkyShowtime: integrado a 1€/mes durante 2 años para clientes M3/M4 (deal preferencial Paramount Group)'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'MEO no renueva en 2027 priorizando Canal Panda (JV con AMC) por mejor performance audiencia + coste local. Pérdida del 41,5% del mercado PT.',
            kpis: { reach: '-100% MEO (1,99M subs perdidos)', fee_impact: '-5,2M€/año fee revenue PT', arpu_loss: 'catastrófica · 41,5% mercado PT perdido' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación 3 años post-2027 con incremento IPC limitado, dial 44 mantenido, bundle Nick + Nick Jr.',
            kpis: { reach: '1,99M subs MEO', fee_impact: '+4,5% IPC', arpu_loss: '0' }
          },
          best: {
            label: 'Best case',
            description: 'Renovación con dobraje PT exclusivo, co-marketing local, bundle ampliado con SkyShowtime activaciones.',
            kpis: { reach: '1,99M MEO + 800k SkyShowtime PT', fee_impact: '+15% fee revenue', arpu_loss: '+520k€/año' }
          }
        }
      },
      nos: {
        priority: 'mantener · alta vigilancia',
        deadline: 'Próxima renovación 2026-2027',
        ask: 'Mantener dial 42 y posición en pack base NOS TV. Vigilar conflicto con Canal Panda (NOS es 50% propietario vía Dreamia).',
        tactic: 'NOS es histórico distribuidor de Nickelodeon desde 2005, PERO tiene conflicto estructural: es 50% propietario de Canal Panda (Dreamia JV con AMC). Hay incentivo para priorizar Panda sobre Nick. Defender fee con plus por exclusividades de eventos + cláusula anti-degradación dial.',
        fee_estimate: '0,18-0,25 €/sub/mes',
        offers: [
          'Renovación 3 años con cláusula anti-degradación dial (no mover Nick por debajo dial 50)',
          'Premieres exclusivas series Nick en NOS (windowing 30 días) — diferenciación vs Canal Panda',
          'Co-marketing con cines NOS (Cinemas NOS es propiedad del grupo) para activaciones kids',
          'Producción local series con sello Nick para audiencia PT (mitigar ventaja Panda)'
        ],
        competitor_deals: [
          'Canal Panda en NOS: dial 41, propiedad 50% NOS vía Dreamia — conflicto estructural',
          'Panda Kids en NOS: dial 44, hermano Canal Panda',
          'Cinemas NOS (propiedad NOS): potencial canal de activación cross-media',
          'Disney Junior en NOS (dial 40)'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'NOS prioriza Canal Panda (su JV) y degrada Nick a dial 100+ o lo elimina del pack base.',
            kpis: { reach: '-100% NOS (1,68M subs)', fee_impact: '-4,3M€/año fee revenue PT', arpu_loss: 'catastrófica · 34,9% mercado PT perdido' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación con dial 42 mantenido, fee plano, cláusula anti-degradación.',
            kpis: { reach: '1,68M subs NOS', fee_impact: '0% YoY', arpu_loss: '0' }
          },
          best: {
            label: 'Best case',
            description: 'Premieres exclusivas + co-marketing Cinemas NOS + producción local — Nick refuerza posición vs Panda.',
            kpis: { reach: '1,68M subs + cross-media', fee_impact: '+10% fee', arpu_loss: '+420k€/año' }
          }
        }
      },
      vodafone_pt: {
        priority: 'mantener',
        deadline: 'Próxima renovación',
        ask: 'Mantener dial 60 — Vodafone TV PT estable como destino familiar.',
        tactic: 'Vodafone PT 20,3% cuota Q1 2026, sin pretensiones expansivas pero apetito por catálogo familiar (incluye Disney+ sin coste). Defender disponibilidad sin condiciones.',
        fee_estimate: '0,15-0,22 €/sub/mes',
        offers: [
          'Renovación con dial 60 mantenido y fee con IPC limitado',
          'Bundle Nick + Nick Jr. con descuento conjunto 10%',
          'Inclusión en pack família Vodafone TV PT',
          'Co-marketing con Vodafone Smart TV box (kids mode)'
        ],
        competitor_deals: [
          'Vodafone PT incluye Disney+ sin coste en pack TV — Paramount NO equivalente',
          'Canal Panda en Vodafone (dial 41)',
          'HBO Max y Prime Video también incluidos sin coste en Vodafone PT',
          'Vodafone PT estrategia "todo incluido" en pack família'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'Vodafone PT no renueva si coste sube — alternativa Canal Panda + Disney+ ya cubre infantil familiar.',
            kpis: { reach: '-100% Vodafone PT (0,98M subs)', fee_impact: '-2,5M€/año', arpu_loss: 'pérdida 20,3% mercado PT' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación dial 60 con fee IPC limitado.',
            kpis: { reach: '0,98M subs', fee_impact: '+2% IPC limitado', arpu_loss: '+45k€/año' }
          },
          best: {
            label: 'Best case',
            description: 'Bundle Nick + Nick Jr. en pack família + co-marketing Smart TV kids mode.',
            kpis: { reach: '0,98M subs + activaciones', fee_impact: '+8% fee', arpu_loss: '+180k€/año' }
          }
        }
      },
      digi_pt: {
        priority: 'CRECER',
        deadline: '2026 continuo',
        ask: 'Posición prominente en captación DIGI PT (única ganando cuota Q1 2026 con 3,2%).',
        tactic: 'DIGI PT ganó +0,4pp en Q1 2026 = motor de crecimiento. Aprovechar política "sin subidas precios 2026" como argumento ARPU. Negociar fee escalonado por suscriptor + co-marketing en campañas de captación.',
        fee_estimate: '0,12-0,18 €/sub/mes (escalado por crecimiento)',
        offers: [
          'Fee escalonado: 0,12€ primeros 200k subs, 0,15€ para 200-400k, 0,18€ para >400k',
          'Bundle Nick + Nick Jr. con descuento 15% en captación DIGI PT',
          'Co-marketing en campañas captación DIGI ("sin subida 2026 + entretenimiento kids Paramount")',
          'Activaciones en zonas DIGI con cobertura fibra propia (Lisboa, Porto urbano)'
        ],
        competitor_deals: [
          'DIGI PT añadió canales tras compra Nowo 2024 — apetito por catálogo',
          'Canal Panda en DIGI también (necesario por cuota mercado)',
          'DIGI PT política "sin subidas" 2026 vs MEO/NOS/Vodafone +2,2% — argumento captación'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'DIGI prioriza coste y elimina Nick priorizando catálogo más barato.',
            kpis: { reach: '0', fee_impact: '-155k subs', arpu_loss: '~180k€/año oportunidad perdida' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación con fee escalonado, dial 53 mantenido, DIGI PT crece a 250k subs.',
            kpis: { reach: '250k subs DIGI PT', fee_impact: '+30% YoY (crecimiento DIGI)', arpu_loss: '+150k€/año' }
          },
          best: {
            label: 'Best case',
            description: 'DIGI PT 400k+ subs en 2027 con Nick destacado en captación + co-marketing.',
            kpis: { reach: '400k+ subs', fee_impact: '+85% vs 2025', arpu_loss: '+520k€/año' }
          }
        }
      }
    },
    nickjr: {
      meo: {
        priority: 'CRÍTICO mantener',
        deadline: 'Renovación cerrada dic 2025',
        ask: 'Mantener dial 53 + bundle inseparable con Nickelodeon.',
        tactic: 'Bundle inseparable Nick + Nick Jr. Co-viewing parental = ARPU psicológico alto. Defender fee tras renovación dic 2025.',
        fee_estimate: '0,18-0,24 €/sub/mes',
        offers: [
          'Bundle Nick + Nick Jr. renovación conjunta 3 años',
          'Pack preescolar Paramount con dobraje PT exclusivo',
          'Activaciones PAW Patrol en parques temáticos MEO',
          'Co-marketing escolar (regreso a clases, vacaciones)'
        ],
        competitor_deals: [
          'Canal Panda (preescolar 3-8) en MEO dial 41 — amenaza local máxima',
          'Disney Junior en MEO dial 40',
          'BabyTV en MEO (dial 40 share)',
          'JimJam en MEO (dial 45)'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'MEO consolida con Canal Panda + Disney Junior como cobertura preescolar, elimina Nick Jr.',
            kpis: { reach: '-100% MEO (1,99M)', fee_impact: '-4,8M€/año', arpu_loss: '41,5% mercado PT preescolar perdido' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación junto con Nick, dial 53 mantenido.',
            kpis: { reach: '1,99M subs', fee_impact: '+IPC limitado', arpu_loss: '0' }
          },
          best: {
            label: 'Best case',
            description: 'Pack preescolar Paramount con dobraje PT + activaciones parques temáticos MEO.',
            kpis: { reach: '1,99M + activaciones', fee_impact: '+12% fee', arpu_loss: '+380k€/año' }
          }
        }
      },
      nos: {
        priority: 'mantener · alta vigilancia',
        deadline: 'Próxima renovación',
        ask: 'Mantener dial 46 — defender que NOS no priorice Panda Kids sobre Nick Jr.',
        tactic: 'NOS tiene Panda Kids (Dreamia JV) muy fuerte para target 6-9. Posicionar Nick Jr. como complemento internacional para 2-6, no sustituto. Cláusula anti-degradación dial.',
        fee_estimate: '0,15-0,22 €/sub/mes',
        offers: [
          'Renovación 3 años con cláusula anti-degradación dial',
          'Producción local series preescolar Nick para PT',
          'Co-marketing con Cinemas NOS estrenos kids',
          'Bundle Nick + Nick Jr. inseparable en NOS'
        ],
        competitor_deals: [
          'Panda Kids (Dreamia, 50% NOS): canal hermano Canal Panda lanzado 2025 — amenaza directa estructural',
          'Disney Junior en NOS',
          'BabyTV cubre 0-2 años (complementario)',
          'JimJam'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'NOS prioriza Panda Kids (su JV) y elimina Nick Jr.',
            kpis: { reach: '-100% NOS (1,68M)', fee_impact: '-3,9M€/año', arpu_loss: '34,9% mercado PT preescolar perdido' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación dial 46 mantenido, cláusula anti-degradación.',
            kpis: { reach: '1,68M subs', fee_impact: '0% plano', arpu_loss: '0' }
          },
          best: {
            label: 'Best case',
            description: 'Producción local PT + bundle inseparable + co-marketing Cinemas NOS.',
            kpis: { reach: '1,68M + activaciones', fee_impact: '+8% fee', arpu_loss: '+280k€/año' }
          }
        }
      },
      vodafone_pt: {
        priority: 'mantener',
        deadline: 'Próxima renovación',
        ask: 'Mantener disponibilidad dial 56.',
        tactic: 'Vodafone PT estable, sin pretensiones expansivas pero apetito família.',
        fee_estimate: '0,12-0,18 €/sub/mes',
        offers: [
          'Bundle Nick + Nick Jr. con descuento 10%',
          'Inclusión en pack família Vodafone TV PT',
          'Co-marketing kids mode Smart TV'
        ],
        competitor_deals: [
          'Disney+ sin coste en Vodafone PT — alternativa preescolar Disney',
          'Canal Panda + Panda Kids en Vodafone',
          'Cobertura preescolar amplia ya'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'Vodafone PT consolida con Canal Panda + Disney+ sin Paramount.',
            kpis: { reach: '0', fee_impact: '-2,2M€/año', arpu_loss: '20,3% mercado perdido' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación dial 56 con IPC limitado.',
            kpis: { reach: '0,98M subs', fee_impact: '+2% IPC', arpu_loss: '+38k€/año' }
          },
          best: {
            label: 'Best case',
            description: 'Bundle Paramount preescolar destacado en pack família.',
            kpis: { reach: '0,98M + activaciones', fee_impact: '+8% fee', arpu_loss: '+160k€/año' }
          }
        }
      },
      digi_pt: {
        priority: 'CRECER',
        deadline: '2026',
        ask: 'Promover Nick Jr. junto a Nick en captación DIGI PT.',
        tactic: 'DIGI gana familias jóvenes — perfil ideal para Nick Jr. Bundle inseparable.',
        fee_estimate: '0,10-0,16 €/sub/mes',
        offers: [
          'Bundle Nick + Nick Jr. con descuento 15%',
          'Promo captación DIGI PT ("entretenimiento Paramount sin subida")',
          'Co-marketing escolar regreso a clases',
          'Activaciones zonas DIGI Lisboa, Porto'
        ],
        competitor_deals: [
          'DIGI PT política sin subidas 2026',
          'Canal Panda + Panda Kids en DIGI',
          'Cobertura preescolar mínima en DIGI PT actual'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'DIGI prioriza coste y elimina Nick Jr.',
            kpis: { reach: '0', fee_impact: '-145k subs', arpu_loss: '~140k€/año' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación dial 52, DIGI PT crece a 250k.',
            kpis: { reach: '250k subs', fee_impact: '+30% YoY', arpu_loss: '+120k€/año' }
          },
          best: {
            label: 'Best case',
            description: 'DIGI PT 400k+ con bundle Nick + Nick Jr. destacado en captación.',
            kpis: { reach: '400k+ subs', fee_impact: '+85% vs 2025', arpu_loss: '+380k€/año' }
          }
        }
      }
    },
    mtv: {
      meo: {
        priority: 'RECUPERAR (no renovado 2025)',
        deadline: 'Q4 2026 — clave',
        ask: 'Reentrada con MTV Global como canal opcional (no obligatorio en pack base).',
        tactic: 'MEO no renovó en 2025 por coste. Negociar fee mínimo + reinclusión en pack opcional. Argumento: pérdida de 41,5% del mercado PT afecta la marca MTV en PT y reduce alcance para anunciantes globales.',
        fee_estimate: '0,03-0,06 €/sub/mes (mínimo viable)',
        offers: [
          'Fee mínimo año 1 (descuento 50%) para reentrada en pack opcional',
          'MTV Global feed (sin dobraje PT) para reducir coste técnico',
          'Activaciones festivales PT (MEO Sudoeste como sponsor principal Vodafone — oportunidad cross)',
          'Bundle con SkyShowtime ya en MEO (deal 1€/mes) como pack adulto joven Paramount'
        ],
        competitor_deals: [
          'MTV Portugal cesó 2025 al no renovar MEO',
          'MTV Global feed (Polonia) sin dobraje PT en NOS, Vodafone, DIGI',
          'NOS Alive, MEO Sudoeste, Super Bock Super Rock — festivales PT con sponsorship telco',
          'MEO+SkyShowtime: 1€/mes 2 años — modelo de precio bajo Paramount Group'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'MEO no acepta reentrada — MTV queda fuera del 41,5% del mercado PT 3 años más.',
            kpis: { reach: '0 en MEO', fee_impact: '-1,99M subs potenciales', arpu_loss: '~280k€/año oportunidad perdida' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Reentrada MTV Global en pack opcional con fee descuento año 1.',
            kpis: { reach: '1,99M MEO (penetración ~10%)', fee_impact: '+85k€/año revenue nuevo', arpu_loss: '+85k€/año' }
          },
          best: {
            label: 'Best case',
            description: 'Reentrada MTV en pack base MEO + activaciones festivales PT con sponsorship MEO Sudoeste.',
            kpis: { reach: '1,99M MEO (100%)', fee_impact: '+520k€/año', arpu_loss: '+520k€/año' }
          }
        }
      },
      nos: {
        priority: 'mantener',
        deadline: 'Próxima renovación',
        ask: 'Mantener dial 120 (feed Polonia).',
        tactic: 'Coste de distribución reducido (sin dobraje PT). Defender carrying fee mínimo.',
        fee_estimate: '0,03-0,06 €/sub/mes',
        offers: [
          'Renovación con fee plano',
          'Bundle con activaciones festivales NOS (NOS Alive sponsor principal NOS)',
          'Premios MTV EMAs como evento NOS TV'
        ],
        competitor_deals: [
          'NOS Alive — sponsor principal NOS (oportunidad cross-marketing)',
          'Mezzo, Stingray, VH1 — canales música nicho competidores',
          'Spotify dominio absoluto música lineal'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'NOS elimina MTV priorizando música nicho local.',
            kpis: { reach: '-100% NOS', fee_impact: '-1,68M subs', arpu_loss: '~180k€/año perdidos' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación dial 120, fee plano.',
            kpis: { reach: '1,68M subs', fee_impact: '0% YoY', arpu_loss: '0' }
          },
          best: {
            label: 'Best case',
            description: 'Activaciones festivales NOS + EMAs como evento — alineación cross-media.',
            kpis: { reach: '1,68M + activaciones', fee_impact: '+10% fee', arpu_loss: '+85k€/año' }
          }
        }
      },
      vodafone_pt: {
        priority: 'mantener',
        deadline: 'Próxima renovación',
        ask: 'Mantener dial 120 feed Polonia.',
        tactic: 'Vodafone PT estable. Sin cambios significativos.',
        fee_estimate: '0,03-0,06 €/sub/mes',
        offers: [
          'Renovación fee plano',
          'Activaciones MEO Sudoeste (sponsor Vodafone)',
          'Premios MTV EMAs Vodafone TV PT'
        ],
        competitor_deals: [
          'MEO Sudoeste — festival sponsor Vodafone (cross-marketing posible)',
          'Mezzo, Stingray en Vodafone'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'Vodafone PT no renueva MTV.',
            kpis: { reach: '-100%', fee_impact: '-0,98M subs', arpu_loss: '~110k€/año perdidos' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación dial 120 fee plano.',
            kpis: { reach: '0,98M subs', fee_impact: '0% YoY', arpu_loss: '0' }
          },
          best: {
            label: 'Best case',
            description: 'Activaciones MEO Sudoeste cross-Vodafone + EMAs.',
            kpis: { reach: '0,98M + activaciones', fee_impact: '+10% fee', arpu_loss: '+50k€/año' }
          }
        }
      },
      digi_pt: {
        priority: 'mantener',
        deadline: '2026',
        ask: 'Mantener dial 120 + bundle con Nick.',
        tactic: 'DIGI PT crece — MTV es complemento juvenil de la parrilla.',
        fee_estimate: '0,02-0,05 €/sub/mes',
        offers: [
          'Bundle MTV + Nick con descuento conjunto',
          'Promo cruzada en captación DIGI PT'
        ],
        competitor_deals: [
          'DIGI PT política sin subidas 2026 — argumento favorable para canales música low-cost',
          'Cobertura música mínima en DIGI PT actual'
        ],
        scenarios: {
          worst: {
            label: 'Worst case',
            description: 'DIGI elimina MTV (música nicho).',
            kpis: { reach: '0', fee_impact: '-145k subs', arpu_loss: '~25k€/año' }
          },
          base: {
            label: 'Base case (más probable)',
            description: 'Renovación, DIGI PT 250k subs.',
            kpis: { reach: '250k subs', fee_impact: '+30% YoY', arpu_loss: '+25k€/año' }
          },
          best: {
            label: 'Best case',
            description: 'DIGI PT 400k+ con MTV + Nick destacado.',
            kpis: { reach: '400k+ subs', fee_impact: '+85% vs 2025', arpu_loss: '+85k€/año' }
          }
        }
      }
    }
  }
};


/* ════════════════════════════════════════════
   DICCIONARIO MAESTRO DE CANALES (Punto 5)
   Para cada canal: grupo audiovisual y si está en FAST
   FAST = Free Ad-Supported Streaming TV (Pluto TV, Samsung TV Plus, etc.)
   Lookup case-insensitive normalizado en app.js
══════════════════════════════════════════════ */
const CHANNEL_INFO = {
  // ─── Generalistas TDT ES ────────────────
  'La 1':            { group:'RTVE',                       fast:true,  fastOn:'Samsung TV Plus, Pluto TV' },
  'La 2':            { group:'RTVE',                       fast:true,  fastOn:'Samsung TV Plus, Pluto TV' },
  'Antena 3':        { group:'Atresmedia',                 fast:true,  fastOn:'Samsung TV Plus' },
  'Cuatro':          { group:'Mediaset España (MFE)',      fast:true,  fastOn:'Samsung TV Plus' },
  'Telecinco':       { group:'Mediaset España (MFE)',      fast:true,  fastOn:'Samsung TV Plus' },
  'laSexta':         { group:'Atresmedia',                 fast:true,  fastOn:'Samsung TV Plus' },
  '#Vamos':          { group:'Movistar Plus+ (Telefónica)', fast:false },
  '#0':              { group:'Movistar Plus+ (Telefónica)', fast:false },

  // ─── Generalistas TDT PT ────────────────
  'RTP1':            { group:'RTP',                        fast:false },
  'RTP2':            { group:'RTP',                        fast:false },
  'RTP3':            { group:'RTP',                        fast:false },
  'SIC':             { group:'Impresa',                    fast:false },
  'SIC Notícias':    { group:'Impresa',                    fast:false },
  'TVI':             { group:'Media Capital',              fast:false },
  'TVI Reality':     { group:'Media Capital',              fast:false },
  'CMTV':            { group:'Cofina',                     fast:false },

  // ─── Cine y Series Movistar ─────────────
  'Movistar Cine':       { group:'Movistar Plus+ (Telefónica)', fast:false },
  'Movistar Drama':      { group:'Movistar Plus+ (Telefónica)', fast:false },
  'Movistar Acción':     { group:'Movistar Plus+ (Telefónica)', fast:false },
  'Movistar Comedia':    { group:'Movistar Plus+ (Telefónica)', fast:false },
  'Movistar Series':     { group:'Movistar Plus+ (Telefónica)', fast:false },
  'AXN':                 { group:'Sony Pictures Television',     fast:false },
  'AXN Movies':          { group:'Sony Pictures Television',     fast:false },
  'AXN White':           { group:'Sony Pictures Television',     fast:false },
  'AXN Black':           { group:'Sony Pictures Television',     fast:false },
  'TNT':                 { group:'Warner Bros. Discovery',       fast:false },
  'Warner TV':           { group:'Warner Bros. Discovery',       fast:true,  fastOn:'Pluto TV' },
  'TCM':                 { group:'Warner Bros. Discovery',       fast:false },
  'Calle 13':            { group:'NBCUniversal',                 fast:false },
  'COSMO':               { group:'NBCUniversal',                 fast:false },
  'Sundance':            { group:'AMC Networks',                 fast:false },
  'Sundance TV':         { group:'AMC Networks',                 fast:false },
  'Canal Hollywood':     { group:'AMC Networks (Dreamia en PT)', fast:false },
  'Somos':               { group:'AMC Networks',                 fast:false },
  'XTRM':                { group:'AMC Networks',                 fast:false },
  'AMC':                 { group:'AMC Networks',                 fast:false },
  'AMC+ Connect':        { group:'AMC Networks',                 fast:false },
  'DARK':                { group:'AMC Networks',                 fast:false },
  'Max Avances':         { group:'Warner Bros. Discovery',       fast:false },
  'HBO Max':             { group:'Warner Bros. Discovery',       fast:false },
  'SkyShowtime 1':       { group:'Paramount Skydance + Comcast (JV)', fast:false },
  'SkyShowtime':         { group:'Paramount Skydance + Comcast (JV)', fast:false },
  'Star Channel':        { group:'Disney (FOX legacy)',          fast:false },
  'FOX':                 { group:'Disney (FOX legacy)',          fast:false },
  'FX':                  { group:'Disney',                       fast:false },
  'Squirrel':            { group:'Squirrel Media (Net TV)',      fast:false },
  'Squirrel 2':          { group:'Squirrel Media (Net TV)',      fast:false },

  // ─── Deportes ───────────────────────────
  'LaLiga TV':           { group:'LaLiga / Telefónica',          fast:false },
  'LaLiga Hypermotion':  { group:'LaLiga / Telefónica',          fast:false },
  'M+ LaLiga TV':        { group:'LaLiga / Telefónica',          fast:false },
  'M+ Vamos':            { group:'Movistar Plus+ (Telefónica)',  fast:false },
  'DAZN Mundial':        { group:'DAZN',                          fast:false },
  'DAZN Mundial 2':      { group:'DAZN',                          fast:false },
  'DAZN F1':             { group:'DAZN',                          fast:false },
  'DAZN':                { group:'DAZN',                          fast:false },
  'Fanzone por M+':      { group:'Movistar Plus+ (Telefónica)',  fast:false },
  'Champions League':    { group:'UEFA / Movistar',              fast:false },
  'Eurosport 1':         { group:'Warner Bros. Discovery',       fast:false },
  'Eurosport 2':         { group:'Warner Bros. Discovery',       fast:false },
  'Real Madrid TV':      { group:'Real Madrid C.F.',             fast:true,  fastOn:'Samsung TV Plus, Pluto TV' },
  'Barça TV':            { group:'FC Barcelona',                 fast:false },
  'GOL Play':            { group:'MEDIAPRO',                     fast:false },

  // ─── Infantil ───────────────────────────
  'BabyTV':              { group:'Disney',                       fast:false },
  'Disney Junior':       { group:'Disney',                       fast:false },
  'Disney Junior HD':    { group:'Disney',                       fast:false },
  'Disney Channel':      { group:'Disney',                       fast:false },
  'Nick Jr.':            { group:'Paramount Skydance',           fast:false },
  'Nick Jr. HD':         { group:'Paramount Skydance',           fast:false },
  'Nickelodeon':         { group:'Paramount Skydance',           fast:true,  fastOn:'Pluto TV (algunos shows)' },
  'Nickelodeon HD':      { group:'Paramount Skydance',           fast:true,  fastOn:'Pluto TV (algunos shows)' },
  'DreamWorks':          { group:'Universal (NBCUniversal)',     fast:false },
  'DreamWorks HD':       { group:'Universal (NBCUniversal)',     fast:false },
  'Boing':               { group:'Mediaset España (MFE)',        fast:false },
  'Boing HD':            { group:'Mediaset España (MFE)',        fast:false },
  'Clan TVE':            { group:'RTVE',                          fast:false },
  'Clan TVE HD':         { group:'RTVE',                          fast:false },
  'Canal Panda':         { group:'Dreamia (NOS 50% + AMC 50%)',  fast:false },
  'Panda Kids':          { group:'Dreamia (NOS 50% + AMC 50%)',  fast:false },
  'Biggs':               { group:'Dreamia (NOS 50% + AMC 50%)',  fast:false },
  'Cartoon Network':     { group:'Warner Bros. Discovery',       fast:false },
  'Cartoonito':          { group:'Warner Bros. Discovery',       fast:false },
  'JimJam':              { group:'AMC Networks',                 fast:false },

  // ─── Documentales ───────────────────────
  'Discovery':           { group:'Warner Bros. Discovery',       fast:true,  fastOn:'Pluto TV, Samsung TV Plus' },
  'Discovery Channel':   { group:'Warner Bros. Discovery',       fast:true,  fastOn:'Pluto TV, Samsung TV Plus' },
  'NatGeo':              { group:'Disney (National Geographic)', fast:false },
  'National Geographic': { group:'Disney (National Geographic)', fast:false },
  'NatGeo Wild':         { group:'Disney (National Geographic)', fast:false },
  'Crime+Investigation': { group:'A+E Networks',                 fast:false },
  'Crime+Investigation HD': { group:'A+E Networks',              fast:false },
  'Historia':            { group:'A+E Networks',                 fast:true,  fastOn:'Pluto TV (Historia + segmentos)' },
  'História':            { group:'A+E Networks',                 fast:false },
  'Canal Historia':      { group:'A+E Networks',                 fast:false },
  'Odisea':              { group:'AMC Networks',                 fast:false },
  'Odisseia':            { group:'AMC Networks',                 fast:false },
  'Caza y Pesca':        { group:'AMC Networks',                 fast:false },
  'BBC Top Gear':        { group:'BBC Studios',                  fast:false },
  'BBC Drama':           { group:'BBC Studios',                  fast:false },
  'BBC Food':            { group:'BBC Studios',                  fast:false },
  'BBC History':         { group:'BBC Studios',                  fast:false },
  'BBC Earth':           { group:'BBC Studios',                  fast:true,  fastOn:'Samsung TV Plus' },
  'BBC Series':          { group:'BBC Studios',                  fast:true,  fastOn:'Pluto TV (desde feb 2026)' },
  'Canal Cocina':        { group:'AMC Networks',                 fast:false },
  'Casa e Cozinha':      { group:'Dreamia (NOS 50% + AMC 50%)',  fast:false },
  'DMAX':                { group:'Warner Bros. Discovery',       fast:false },

  // ─── Música ─────────────────────────────
  'MTV España':          { group:'Paramount Skydance',           fast:true,  fastOn:'Pluto TV (MTV varios canales)' },
  'MTV 00s':             { group:'Paramount Skydance',           fast:true,  fastOn:'Pluto TV' },
  'MTV Live':            { group:'Paramount Skydance',           fast:false },
  'MTV':                 { group:'Paramount Skydance',           fast:true,  fastOn:'Pluto TV' },
  'MTV Global':          { group:'Paramount Skydance',           fast:true,  fastOn:'Pluto TV' },
  'MTV Hits':            { group:'Paramount Skydance',           fast:true,  fastOn:'Pluto TV' },
  'MTV Tattoo a dos':    { group:'Paramount Skydance',           fast:true,  fastOn:'Pluto TV' },
  'MTV Catfish':         { group:'Paramount Skydance',           fast:true,  fastOn:'Samsung TV Plus' },
  'Comedy Central':      { group:'Paramount Skydance',           fast:true,  fastOn:'Pluto TV' },
  'Comedy Central HD':   { group:'Paramount Skydance',           fast:true,  fastOn:'Pluto TV' },
  'Mezzo':               { group:'Les Échos-Le Parisien',        fast:false },
  'Mezzo HD':            { group:'Les Échos-Le Parisien',        fast:false },
  'Mezzo Live':          { group:'Les Échos-Le Parisien',        fast:false },
  'Mezzo Live HD':       { group:'Les Échos-Le Parisien',        fast:false },
  'Stingray Classica':   { group:'Stingray Group',               fast:false },
  'Sol Música':          { group:'Atresmedia',                   fast:true,  fastOn:'Samsung TV Plus' },
  'VH1':                 { group:'Paramount Skydance',           fast:false },
  'Movie Music':         { group:'Operador (white-label)',       fast:false },
  'VinTV':               { group:'Squirrel Media',               fast:false },

  // ─── Internacional ──────────────────────
  'BBC World':           { group:'BBC News',                     fast:false },
  'CNN':                 { group:'Warner Bros. Discovery',       fast:true,  fastOn:'Samsung TV Plus' },
  'CNN International':   { group:'Warner Bros. Discovery',       fast:true,  fastOn:'Samsung TV Plus' },
  'TV5 Monde':           { group:'TV5 Monde (consorcio público)', fast:false },
  'RAI 1':               { group:'RAI (Italia)',                 fast:false },
  'Deutsche Welle':      { group:'Deutsche Welle (Alemania)',    fast:false },
  'France 24':           { group:'France Médias Monde',          fast:false },
  'Euronews':            { group:'Euronews',                     fast:true,  fastOn:'Pluto TV, Samsung TV Plus' },
  'Bloomberg':           { group:'Bloomberg L.P.',               fast:true,  fastOn:'Samsung TV Plus' },

  // ─── OTT integradas ─────────────────────
  'Netflix (add-on)':    { group:'Netflix',                      fast:false },
  'Disney+ (add-on)':    { group:'Disney',                       fast:false },
  'HBO Max (add-on)':    { group:'Warner Bros. Discovery',       fast:false },
  'Max (add-on)':        { group:'Warner Bros. Discovery',       fast:false },
  'Prime Video (add-on)':{ group:'Amazon',                       fast:false },
  'Apple TV+ (add-on)':  { group:'Apple',                        fast:false },
  'Pluto TV (app)':      { group:'Paramount Skydance',           fast:true,  fastOn:'(es la propia FAST)' }
};


/* ════════════════════════════════════════════
   DATOS HISTÓRICOS 10 AÑOS (Punto 2: Evolución)
   Series anuales para gráficos de evolución
   Datos basados en CNMC (ES) y ANACOM (PT) - histórico publicado anualmente
══════════════════════════════════════════════ */
const HISTORICAL_DATA = {
  es: {
    years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
    // Líneas móviles totales (M) - CNMC informes anuales
    mobile_lines: [51.7, 52.8, 54.1, 55.4, 56.1, 56.9, 58.1, 59.5, 60.8, 61.9, 62.6],
    // Líneas FTTH (M) - CNMC. Crecimiento explosivo desde 2017
    ftth_lines: [4.3, 6.5, 8.7, 10.7, 11.9, 13.1, 14.5, 15.8, 16.8, 17.7, 18.1],
    // Clientes TV pago (M) - CNMC. Pico ~7M en 2022, declive hacia 6,5M por canibalización OTT
    tv_subs: [6.3, 6.8, 7.2, 7.3, 7.1, 7.2, 7.0, 6.8, 6.6, 6.5, 6.45],
    // Cuota % TV por operador (4 ops foco) - histórica
    tv_share_by_op: {
      Movistar:  [58.3, 60.2, 61.0, 61.8, 60.5, 59.0, 58.5, 58.0, 56.8, 57.5, 60.5],  // pierde algo pero sigue líder
      MASORANGE: [13.0, 13.5, 14.0, 14.5, 15.0, 16.0, 18.0, 19.5, 21.0, 22.5, 23.3],  // crece con consolidación
      Vodafone:  [27.0, 25.0, 23.0, 22.0, 22.5, 22.5, 21.0, 19.5, 18.5, 17.5, 16.7],  // pierde Zegona
      DIGI:      [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.5,  1.5,  2.5,  3.4]   // emerge fin 2023, crece rápido
    },
    // Líneas móviles por operador (M) - estimación basada en cuotas CNMC
    mobile_by_op: {
      Movistar:  [17.5, 17.3, 17.2, 17.0, 16.8, 16.6, 16.9, 17.2, 17.5, 17.7, 17.9],
      MASORANGE: [19.0, 19.8, 20.5, 21.4, 22.0, 22.8, 23.8, 24.7, 25.6, 26.2, 26.8],  // suma Orange+MásMóvil consolidado
      Vodafone:  [14.5, 14.0, 13.5, 13.0, 12.5, 12.0, 11.7, 11.4, 11.1, 11.0, 10.95],  // declive sostenido
      DIGI:      [1.2, 1.9, 2.7, 3.5, 4.2, 5.0, 5.8, 6.4, 6.9, 7.3, 7.58]   // crecimiento sostenido
    },
    // Líneas fibra por operador (M) - estimación basada en cuotas CNMC FTTH
    ftth_by_op: {
      Movistar:  [2.6, 3.3, 3.9, 4.4, 4.7, 5.0, 5.2, 5.4, 5.6, 5.75, 5.88],
      MASORANGE: [1.2, 1.9, 2.5, 3.0, 3.3, 3.6, 3.8, 4.0, 4.15, 4.2, 4.27],
      Vodafone:  [0.4, 1.0, 1.8, 2.4, 2.7, 2.9, 3.0, 3.0, 2.95, 2.98, 3.0],  // incl. Finetwork desde 2026
      DIGI:      [0.05, 0.2, 0.45, 0.7, 1.0, 1.4, 1.8, 2.1, 2.4, 2.6, 2.75]
    },
    // Clientes TV por operador (M) - estimación basada en cuota TV × total
    tv_by_op: {
      Movistar:  [3.67, 4.10, 4.39, 4.51, 4.30, 4.25, 4.10, 3.94, 3.75, 3.74, 3.90],
      MASORANGE: [0.82, 0.92, 1.01, 1.06, 1.07, 1.15, 1.26, 1.33, 1.39, 1.46, 1.50],
      Vodafone:  [1.70, 1.70, 1.66, 1.61, 1.60, 1.62, 1.47, 1.33, 1.22, 1.14, 1.08],
      DIGI:      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.03, 0.10, 0.16, 0.217]
    }
  },
  pt: {
    years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
    // Líneas móviles totales (M) - ANACOM
    mobile_lines: [11.6, 11.8, 12.0, 12.3, 12.6, 12.7, 13.1, 13.4, 13.6, 13.7, 13.8],
    // Líneas FTTH (M) - ANACOM (crecimiento sostenido)
    ftth_lines: [2.1, 2.4, 2.8, 3.2, 3.6, 4.1, 4.5, 4.8, 5.0, 5.2, 5.3],
    // Clientes TV pago (M) - ANACOM. Estable ~4,5M
    tv_subs: [3.6, 3.7, 3.8, 3.9, 4.0, 4.2, 4.4, 4.5, 4.6, 4.7, 4.8],
    // Cuota % TV por operador (4 ops foco) - histórica ANACOM
    tv_share_by_op: {
      MEO:        [42.0, 42.5, 42.5, 42.8, 43.0, 43.2, 42.8, 42.5, 42.2, 41.8, 41.5],
      NOS:        [36.5, 36.0, 36.0, 35.8, 35.5, 35.3, 35.0, 35.0, 35.0, 34.9, 34.9],
      Vodafone:   [21.0, 21.0, 21.0, 21.0, 21.0, 21.0, 21.5, 21.5, 21.2, 20.8, 20.3],
      DIGI:       [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  1.0,  2.0,  3.2]   // entra 2024
    },
    // Líneas móviles por operador (M) - estimación ANACOM
    mobile_by_op: {
      MEO:        [5.1, 5.2, 5.3, 5.4, 5.5, 5.5, 5.6, 5.6, 5.7, 5.7, 5.7],
      NOS:        [4.4, 4.4, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5],
      Vodafone:   [4.3, 4.3, 4.2, 4.1, 4.0, 3.9, 3.7, 3.5, 3.3, 3.2, 3.1],  // declive
      DIGI:       [0.0, 0.0, 0.0, 0.0, 0.0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5]   // entra ~2021
    },
    // Líneas fibra por operador (M) - estimación ANACOM
    ftth_by_op: {
      MEO:        [0.95, 1.05, 1.2, 1.35, 1.5, 1.7, 1.85, 1.95, 2.05, 2.15, 2.2],
      NOS:        [0.8, 0.9, 1.05, 1.2, 1.35, 1.5, 1.6, 1.7, 1.78, 1.82, 1.85],
      Vodafone:   [0.3, 0.4, 0.5, 0.6, 0.7, 0.85, 0.95, 1.0, 1.04, 1.06, 1.08],
      DIGI:       [0.0, 0.0, 0.0, 0.0, 0.0, 0.02, 0.05, 0.08, 0.12, 0.15, 0.17]
    },
    // Clientes TV por operador (M) - estimación cuota × total ANACOM
    tv_by_op: {
      MEO:        [1.51, 1.57, 1.62, 1.67, 1.72, 1.81, 1.88, 1.91, 1.94, 1.96, 1.99],
      NOS:        [1.31, 1.33, 1.37, 1.40, 1.42, 1.48, 1.54, 1.58, 1.61, 1.64, 1.67],
      Vodafone:   [0.76, 0.78, 0.80, 0.82, 0.84, 0.88, 0.95, 0.97, 0.97, 0.98, 0.98],
      DIGI:       [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.05, 0.10, 0.145]
    }
  }
};


/* ════════════════════════════════════════════
   ANÁLISIS DE AUDIENCIAS (Bloque 8)
   Datos públicos: Barlovento (Kantar/Fifty5Blue) en ES, GfK/CAEM en PT
   Fuentes citadas. Estimaciones marcadas claramente.
══════════════════════════════════════════════ */
const AUDIENCE_DATA = {
  es: {
    nickelodeon: {
      share_total_tv: '~0,15-0,20%',
      share_pay_tv: '~0,9-1,1%',
      ranking_pay_tv: 'Top 20-25 entre temáticas pago',
      reach_annual: '~6-7M espectadores únicos/año (estim.)',
      target_share: 'Niños 4-12: 8-12% en franja tarde (17h-20h)',
      trend: 'down',
      trend_label: 'Caída moderada por canibalización OTT (Netflix Kids, Disney+, YouTube Kids)',
      timeslot_strongest: '17h-20h (vuelta colegio)',
      timeslot_weakest: 'Madrugada y mañana laborable',
      top_content: ['SpongeBob (referente generacional)', 'PAW Patrol', 'The Loud House', 'Henry Danger', 'iCarly reposiciones'],
      benchmark_competitors: [
        { name:'Boing (TDT, Mediaset)', value:'0,8-0,9%', insight:'LÍDER infantil España 4-12 años · gratuita TDT', stronger:true },
        { name:'Clan TVE (TDT, RTVE)', value:'0,7-0,8%', insight:'Referente preescolar/infantil gratuito · 2º infantil', stronger:true },
        { name:'Disney Junior', value:'0,1% / 0,6% TV pago (puesto 29)', insight:'Por debajo de Nickelodeon en pago', stronger:false },
        { name:'Cartoon Network', value:'~0,1%', insight:'Nicho dibujos animados Warner', stronger:false }
      ],
      key_insights: [
        'Nickelodeon mantiene posición sólida entre temáticas pago infantiles (top 20-25 ranking Barlovento).',
        'Por encima de Disney Junior (puesto 29 en 2025, 0,6% TV pago) — Disney Junior se relanza como Disney Channel el 1 abril 2026 reposicionado para 6-11 años, lo que aumenta competencia directa.',
        'Boing (TDT gratuita) lidera infantil 4-12 años con 0,8-0,9% de cuota total — la gratuidad es el gran competidor en lineal.',
        'Tendencia bajista de TV lineal infantil compensada parcialmente por co-viewing parental y momentos predecibles (tarde-noche).'
      ],
      source_note: 'Datos Barlovento Comunicación 2025 (Kantar/Fifty5Blue). Cifras específicas por canal de pago no se publican individualmente; rangos basados en informes mensuales y ranking de temáticas pago.',
      sources: [
        { label:'Barlovento Comunicación · Informe Anual 2025', url:'https://barloventocomunicacion.es/wp-content/uploads/2026/02/Analisis-Audiencia-TV_ano-2025_Barlovento.pdf' },
        { label:'Cine y Tele · Análisis cierre 2025', url:'https://www.cineytele.com/2026/01/02/la-television-tradicional-cierra-2025-con-una-audiencia-del-93-de-la-poblacion/' },
        { label:'Satcesc · Disney Channel vuelve TV pago', url:'https://satcesc.com/2026/03/06/disney-channel-vuelve-tv-pago/' }
      ]
    },
    nickjr: {
      share_total_tv: '~0,08-0,12%',
      share_pay_tv: '~0,4-0,6%',
      ranking_pay_tv: 'Top 30-40 entre temáticas pago',
      reach_annual: '~4-5M espectadores únicos/año (estim.)',
      target_share: 'Niños 2-6: 12-15% en mañana sábado (8h-11h)',
      trend: 'flat',
      trend_label: 'Estable por co-viewing parental obligado · resistente a OTT',
      timeslot_strongest: 'Sábado mañana (8h-11h) · 17h-19h diario',
      timeslot_weakest: 'Tarde-noche y madrugada',
      top_content: ['PAW Patrol (#1)', 'Peppa Pig', 'Bluey', 'Blue\'s Clues', 'Dora la exploradora'],
      benchmark_competitors: [
        { name:'Disney Junior', value:'0,1% / 0,6% TV pago', insight:'Competidor directo preescolar · puesto 29 (Barlovento)', stronger:false },
        { name:'Clan TVE preescolar (TDT)', value:'~0,3% target preescolar', insight:'Gratuito · alta penetración familias', stronger:true },
        { name:'BabyTV (Disney)', value:'~0,05%', insight:'Cubre 0-2 años, complementario', stronger:false },
        { name:'Cartoonito', value:'~0,05%', insight:'Cartoon Network preescolar · presencia baja', stronger:false }
      ],
      key_insights: [
        'Nick Jr. tiene audiencia más nicho que Nickelodeon pero mayor engagement por co-viewing parental.',
        'Mañana sábado (8h-11h) es la franja oro: cuota target preescolar 12-15%, padres comparten visionado y deciden la tarifa TV familiar.',
        'Disney Junior relanzamiento como Disney Channel (abr 2026) deja hueco preescolar puro · oportunidad para Nick Jr. capturar audiencia 2-6 años más concentrada.',
        'PAW Patrol es el ancla absoluta — equivalente al fenómeno Peppa Pig en términos de penetración familiar.'
      ],
      source_note: 'Datos Barlovento Comunicación 2025. Cuotas target preescolar son estimación basada en patrones de informes mensuales.',
      sources: [
        { label:'Barlovento Comunicación · Informe Anual 2025', url:'https://barloventocomunicacion.es/wp-content/uploads/2026/02/Analisis-Audiencia-TV_ano-2025_Barlovento.pdf' },
        { label:'Datatonics · Informe mensual Barlovento abril 25', url:'https://datatonics.substack.com/p/297-informe-mensual-del-comportamiento' }
      ]
    },
    mtv: {
      share_total_tv: '~0,03-0,05%',
      share_pay_tv: '~0,15-0,25%',
      ranking_pay_tv: 'Top 50-60 entre temáticas pago',
      reach_annual: '~3-4M espectadores únicos/año (estim.)',
      target_share: 'Jóvenes 16-34: 0,4-0,8% en franja noche (22h-1h)',
      trend: 'down',
      trend_label: 'Declive estructural: Spotify dominó música lineal · realities mantienen audiencia',
      timeslot_strongest: 'Noche (22h-1h) · ambient TV pisos compartidos',
      timeslot_weakest: 'Mañana y sobremesa',
      top_content: ['Geordie Shore', 'Acapulco Shore', 'Catfish', 'Premios MTV EMAs (evento anual)', 'Música pop/urbano latino'],
      benchmark_competitors: [
        { name:'Sol Música', value:'~0,02%', insight:'Música española · nicho menor', stronger:false },
        { name:'Mezzo (clásica)', value:'~0,02%', insight:'Música clásica · target alto', stronger:false },
        { name:'Stingray Classica', value:'~0,01%', insight:'Premium clásica add-on', stronger:false },
        { name:'Spotify/YouTube (no lineal)', value:'>90% jóvenes', insight:'Dominador absoluto música · amenaza estructural', stronger:true }
      ],
      key_insights: [
        'MTV España sufre el declive estructural más severo de toda la cartera Paramount: la música lineal está prácticamente muerta en target 16-34 (>90% usa Spotify/YouTube).',
        'Realities (Geordie Shore, Acapulco Shore, Catfish) son los que sostienen la audiencia residual · ambient TV nocturno funciona.',
        'EMAs (Premios MTV Europe) es el único evento anual capaz de generar pico de audiencia significativo · oportunidad de activación premium.',
        'En el cluster MTV (España + MTV 00s + MTV Live), defender el paquete entero vs canal a canal es la jugada correcta — fee por cluster reduce el riesgo de canibalización.'
      ],
      source_note: 'Datos Barlovento Comunicación 2025 · informes mensuales. Cifras audiencia digital (Spotify/YouTube) provienen de IAB Spain Estudio Anual.',
      sources: [
        { label:'Barlovento Comunicación · Informe Anual 2025', url:'https://barloventocomunicacion.es/wp-content/uploads/2026/02/Analisis-Audiencia-TV_ano-2025_Barlovento.pdf' },
        { label:'IAB Spain · Estudio Anual Vídeo', url:'https://iabspain.es/' }
      ]
    },
    comedycentral: {
      share_total_tv: '~0,08-0,12%',
      share_pay_tv: '~0,4-0,6%',
      ranking_pay_tv: 'Top 25-35 entre temáticas pago',
      reach_annual: '~5-6M espectadores únicos/año (estim.)',
      target_share: 'Adultos 25-40: 0,7-1,2% en late-night (22h-2h)',
      trend: 'flat',
      trend_label: 'Estable · South Park y Friends son retención de cartera consistente',
      timeslot_strongest: 'Late-night 22h-2h · sofá tras trabajo',
      timeslot_weakest: 'Mañana y sobremesa',
      top_content: ['South Park (referente adulto)', 'Friends (reposiciones premium)', 'The Big Bang Theory', 'Comedy Central Live! stand-up', 'The Daily Show'],
      benchmark_competitors: [
        { name:'TNT (Warner)', value:'~0,15-0,2%', insight:'Comedia/series clásica · competidor directo Movistar', stronger:true },
        { name:'Warner TV', value:'0,3% (puesto 4 pay)', insight:'Top temáticas pago Barlovento · gran competidor en comedia', stronger:true },
        { name:'COSMO (NBC)', value:'~0,05%', insight:'Romance/comedia femenina · audiencia diferenciada', stronger:false },
        { name:'Netflix Specials', value:'no medido lineal', insight:'Domina stand-up premium global · amenaza OTT', stronger:true }
      ],
      key_insights: [
        'Comedy Central tiene audiencia más resiliente que MTV por el ancla South Park (target adulto fiel) y los clásicos Friends/Big Bang.',
        'Warner TV ha capturado posición #4 en ranking Barlovento 2025 — gran competidor directo en cartera comedia/series.',
        'Late-night (22h-2h) es la franja oro para target adulto joven · ambient TV decompresión post-trabajo.',
        'Netflix Specials globales han debilitado la posición de stand-up lineal, pero los catálogos clásicos (Friends, Big Bang) son retención estructural.'
      ],
      source_note: 'Datos Barlovento Comunicación 2025. Warner TV con dato preciso (0,3%, puesto 4). Resto canales Paramount sin desglose público específico — rangos basados en patrones de informes mensuales.',
      sources: [
        { label:'Barlovento Comunicación · Informe Anual 2025', url:'https://barloventocomunicacion.es/wp-content/uploads/2026/02/Analisis-Audiencia-TV_ano-2025_Barlovento.pdf' },
        { label:'Barlovento Comunicación · Publicaciones', url:'https://barloventocomunicacion.es/publicaciones/' }
      ]
    }
  },
  pt: {
    nickelodeon: {
      share_total_tv: '~0,3-0,5%',
      share_pay_tv: '~0,8-1,2%',
      ranking_pay_tv: 'Top 10-15 entre canais temáticos pago',
      reach_annual: '~1,5-2,0M espectadores únicos/año (estim.)',
      target_share: 'Crianças 4-12: 4-7% em tarde (17h-20h)',
      trend: 'down',
      trend_label: 'Perdeu liderança infantil em jul 2025 (Gloob assumiu) · Paramount renovou MEO dic 2025',
      timeslot_strongest: '17h-20h (regresso da escola) · sábado de manhã',
      timeslot_weakest: 'Noite profunda e madrugada',
      top_content: ['SpongeBob', 'PAW Patrol (cross com Nick Jr.)', 'The Thundermans', 'Henry Danger', 'iCarly'],
      benchmark_competitors: [
        { name:'Canal Panda (Dreamia)', value:'LÍDER infantil PT', insight:'Top of mind 61% adultos com filhos vs 4% do 2º · ameaça máxima', stronger:true },
        { name:'Panda Kids (Dreamia 2021)', value:'~0,3-0,5%', insight:'Hermano Canal Panda para 6-9 anos · refuerzo Dreamia', stronger:true },
        { name:'Gloob (Globo)', value:'Líder infantil jul 2025', insight:'Canal brasileiro · assumiu liderança infantil PT', stronger:true },
        { name:'Disney Junior', value:'~0,1%', insight:'Cobertura preescolar Disney · presença residual', stronger:false }
      ],
      key_insights: [
        'AMENAZA ESTRUCTURAL: Canal Panda (Dreamia, JV NOS 50% + AMC 50%) é líder absoluto infantil PT com 61% top of mind vs 4% do 2º. NOS tem incentivo estrutural para priorizar Panda sobre Nickelodeon.',
        'En julho 2025, Gloob (canal brasileiro Globo) assumiu liderança infantil PT, deslocando Nickelodeon. Mercado PT mais fragmentado que ES.',
        'MEO renovou Nickelodeon + Nick Jr. em dic 2025 (positivo) mas NÃO renovou MTV Portugal/MTV Live/MTV 00 (saíram 31/12/2025).',
        'Histórico de Nickelodeon PT mostra picos de 1,2% share total (junho 2020) — capacidade demonstrada de competir com generalistas em momentos peak.',
        'No mercado LATAM/Brasil, Paramount FECHOU todos os seus canais lineares (Nick, Nick Jr., MTV, Comedy Central) em 31/12/2025 → estratégia D2C streaming. Em Iberia mantém-se distribuição linear (por enquanto).'
      ],
      source_note: 'GfK/CAEM (medição oficial PT). Histórico Nickelodeon PT: pico 1,2% share total (junho 2020). Cifras 2025 estimadas baseadas em padrões de informes públicos.',
      sources: [
        { label:'GfK Portugal · medição CAEM', url:'https://www.gfk.com/insights' },
        { label:'CAEM · audiências TV Portugal', url:'https://www.caem.pt/' },
        { label:'Espalha Factos · Nickelodeon PT recordes', url:'https://espalhafactos.com/2020/06/23/nickelodeon-portugal-festeja-recordes-de-audiencia/' },
        { label:'MEO Fórum · renovação Nickelodeon dic 2025', url:'https://forum.meo.pt/tv-e-pacotes-9/canais-tv-boa-noticia-165975' }
      ]
    },
    nickjr: {
      share_total_tv: '~0,2-0,3%',
      share_pay_tv: '~0,5-0,8%',
      ranking_pay_tv: 'Top 20-25 entre canais temáticos pago',
      reach_annual: '~1,0-1,5M espectadores únicos/año (estim.)',
      target_share: 'Crianças 2-6: 8-11% em manhã sábado',
      trend: 'flat',
      trend_label: 'Estável por co-viewing parental · pressionado por Panda Kids (Dreamia)',
      timeslot_strongest: 'Sábado manhã · 16h-18h diário',
      timeslot_weakest: 'Noite e madrugada',
      top_content: ['PAW Patrol (#1)', 'Peppa Pig', 'Bluey', 'Aprendizagem precoce'],
      benchmark_competitors: [
        { name:'Panda Kids (Dreamia)', value:'~0,3-0,5%', insight:'Hermano Canal Panda · ameaça directa estrutural NOS', stronger:true },
        { name:'Canal Panda (preescolar)', value:'LÍDER 3-8 anos', insight:'Histórico líder · ameaça máxima', stronger:true },
        { name:'Disney Junior', value:'~0,1%', insight:'Presença residual', stronger:false },
        { name:'BabyTV', value:'~0,03%', insight:'Cubre 0-2 anos', stronger:false }
      ],
      key_insights: [
        'AMENAZA ESTRUTURAL: Panda Kids (Dreamia JV NOS+AMC, lançado 2021) é o competidor directo de Nick Jr. para 6-9 anos · NOS prioriza Panda Kids por estrutura accionista.',
        'Canal Panda é histórico líder preescolar 3-8 anos PT — Nick Jr. compete num mercado já dominado pelo grupo Dreamia.',
        'Co-viewing parental sostiene audiência de Nick Jr. em momentos predecíveis (sábado manhã, tarde-noite).',
        'PAW Patrol é o ancla absoluta para 2-6 anos · sem ele, Nick Jr. perderia diferenciação vs Panda Kids.'
      ],
      source_note: 'GfK/CAEM (medição oficial PT). Cifras Nick Jr. PT são estimação baseada em ranking de cabo CAEM e padrão de informes mensais.',
      sources: [
        { label:'GfK Portugal · medição CAEM', url:'https://www.gfk.com/insights' },
        { label:'CAEM · audiências TV Portugal', url:'https://www.caem.pt/' },
        { label:'Wikipedia · Panda Kids', url:'https://en.wikipedia.org/wiki/Panda_Kids' }
      ]
    },
    mtv: {
      share_total_tv: '~0,02-0,04%',
      share_pay_tv: '~0,1-0,2%',
      ranking_pay_tv: 'Fora do top 60 temáticos pago',
      reach_annual: '~500-800k espectadores únicos/año (estim.)',
      target_share: 'Jovens 16-34: 0,2-0,4% noite',
      trend: 'down',
      trend_label: 'CRÍTICA: MEO não renovou MTV Portugal/MTV Live/MTV 00 (saíram 31/12/2025) · sinal Global Polónia sem dobragem PT',
      timeslot_strongest: 'Noite · ambient TV',
      timeslot_weakest: 'Resto do dia',
      top_content: ['Realities (Geordie Shore, Acapulco Shore)', 'Música pop e urbano', 'Premios MTV EMAs'],
      benchmark_competitors: [
        { name:'Spotify/YouTube (no lineal)', value:'>90% jovens PT', insight:'Dominador absoluto música · ameaça estrutural global', stronger:true },
        { name:'Mezzo (clásica)', value:'~0,02%', insight:'Música nicho clásica', stronger:false },
        { name:'Trace Urban (antes 2025)', value:'~0,01%', insight:'Música urbana · saiu MEO em 2025', stronger:false }
      ],
      key_insights: [
        'SITUAÇÃO CRÍTICA: MEO saiu dos canais MTV Portugal/MTV Live/MTV 00 em 31/12/2025 — perda de 41,5% do mercado PT.',
        'NOS também avisou a saída de MTV Live e MTV 00 em 31/12/2025. Apenas MTV Global (sinal Polónia sem dobragem) continua disponível.',
        'No mercado LATAM, Paramount encerrou MTV Brasil em 31/12/2025 — sinal de transição global para D2C streaming via Paramount+ e Pluto TV.',
        'EMAs (Premios MTV Europe) é único evento capaz de gerar alcance significativo · oportunidade de activação cross-media com festivais (MEO Sudoeste, NOS Alive).'
      ],
      source_note: 'GfK/CAEM (medição oficial PT). Cifras estimadas dado pequeno tamanho de audiência. Saída MEO/NOS de canais MTV confirmada por fontes oficiais (dezembro 2025).',
      sources: [
        { label:'MEO Fórum · saída canais MTV', url:'https://forum.meo.pt/tv-e-pacotes-9/possivel-saida-de-canais-do-meo-165532' },
        { label:'MEO Fórum · atualização grelha 1 jan 2026', url:'https://forum.meo.pt/tv-e-pacotes-9/atualizacao-da-grelha-de-canais-meo-165974' },
        { label:'Minha Operadora · Paramount LATAM encerramento', url:'https://www.minhaoperadora.com.br/2025/12/paramount-desativa-oito-canais-na-america-latina-e-reforca-aposta-no-streaming.html' }
      ]
    }
  }
};


/* ════════════════════════════════════════════
   FRAMEWORK DE NEGOCIACIÓN DE CARRIAGE (Bloque 9)
   Basado en el documento "Negociación de Carriage de Canales de TV"
   Perspectiva: licenciante (Paramount, vendedor) frente a operador
══════════════════════════════════════════════ */
const NEGOTIATION_FRAMEWORK = {
  // Plantilla de term sheet con las variables clave
  term_sheet_sections: [
    {
      title: '1. Partes y objeto',
      icon: '📋',
      rows: [
        { variable: 'Licenciante', value: 'Paramount Networks EMEAA', editable: false },
        { variable: 'Operador', value: '[ Movistar / Orange / Vodafone / DIGI ]', editable: true },
        { variable: 'Canales objeto', value: '[ Listar feeds SD/HD/4K del portfolio ]', editable: true },
        { variable: 'Territorio', value: 'España / Portugal', editable: false },
        { variable: 'Idiomas / versiones', value: '[ Doblaje local / feed global ]', editable: true }
      ]
    },
    {
      title: '2. Económicos',
      icon: '💰',
      note: 'Variables económicas clave con apertura / objetivo / walk-away. Cifras rellenadas según research; el resto plantilla.',
      rows: [
        { variable: 'Modelo de precio', value: 'CPS (coste por suscriptor/mes) · híbrido con mínimo garantizado', editable: false },
        { variable: 'CPS apertura', value: 'ver por operador-canal', editable: false },
        { variable: 'Mínimo garantizado anual', value: 'ver por operador-canal', editable: false },
        { variable: 'Escalador anual', value: 'IPC + 1-2% (objetivo) · IPC plano (walk-away)', editable: false },
        { variable: 'Tramos por penetración (tiering)', value: '[ Definir umbrales de bonus/descuento ]', editable: true },
        { variable: 'Cláusula MFN', value: 'Most Favored Nation: igualar mejor trato a comparables', editable: false },
        { variable: 'Condiciones de pago', value: '[ 30-60 días · EUR ]', editable: true },
        { variable: 'Derecho de auditoría', value: '[ Anual · coste a cargo del auditor salvo desviación >5% ]', editable: true }
      ]
    },
    {
      title: '3. Empaquetado y distribución',
      icon: '📦',
      rows: [
        { variable: 'Paquete (básico/premium/add-on)', value: '[ Objetivo: pack base, no opcional ]', editable: true },
        { variable: 'Penetración mínima comprometida', value: '[ % de la base del operador ]', editable: true },
        { variable: 'Definición de "abonado"', value: 'Direccionable que recibe el canal (no solo activado)', editable: false },
        { variable: 'Bundling del portfolio', value: 'En bloque (locomotora arrastra los débiles)', editable: false },
        { variable: 'Posición EPG / nº de canal', value: '[ Defender dial actual o contiguo a competidores ]', editable: true }
      ]
    },
    {
      title: '4. Alcance de derechos',
      icon: '🎬',
      rows: [
        { variable: 'Lineal', value: 'Incluido', editable: false },
        { variable: 'Catch-up / VOD', value: '[ Moneda de cambio · precio asociado ]', editable: true },
        { variable: 'Start-over / Restart', value: '[ Negociable ]', editable: true },
        { variable: 'Network PVR', value: '[ Negociable ]', editable: true },
        { variable: 'Plataformas (STB/app/web/móvil/Smart TV)', value: '[ Multi-plataforma estándar ]', editable: true },
        { variable: 'Calidades (SD/HD/4K)', value: '[ HD base · 4K premium ]', editable: true },
        { variable: 'Exclusividad', value: 'Reservar como moneda de alto valor', editable: false }
      ]
    },
    {
      title: '5. Marketing y publicidad',
      icon: '📣',
      rows: [
        { variable: 'Fondos de co-marketing', value: '[ Pedir alto · ceder a cambio de penetración ]', editable: true },
        { variable: 'Compromisos de promoción en plataforma', value: '[ Destacados, banners, EPG ]', editable: true },
        { variable: 'Inventario publicitario local', value: '[ Quién vende/monetiza ]', editable: true },
        { variable: 'Reparto de ingresos publicitarios', value: '[ % licenciante / operador ]', editable: true }
      ]
    },
    {
      title: '6. Legal',
      icon: '⚖️',
      rows: [
        { variable: 'Duración', value: '3 años (objetivo · lineal a la baja exige plazos cortos)', editable: false },
        { variable: 'Renovación', value: '[ Negociada, no automática ]', editable: true },
        { variable: 'Ventanas de renegociación', value: '[ Anual sobre penetración/escalador ]', editable: true },
        { variable: 'Terminación y cambio de control', value: '[ Cláusula change-of-control ]', editable: true },
        { variable: 'Blackout al vencimiento', value: 'Ir a negro solo si BATNA creíble', editable: false },
        { variable: 'Ley aplicable', value: '[ España / Portugal ]', editable: true }
      ]
    }
  ],
  // Guion de negociación por fases
  phases: [
    {
      num: '0',
      title: 'Preparación',
      subtitle: 'Antes de sentarse',
      color: '#7a80a8',
      points: [
        'Define tu BATNA: ¿qué haces si no hay acuerdo? (OTT directo vía Pluto TV / Paramount+, otro operador, ir a negro).',
        'Calcula tu ZOPA y tu walk-away price por cada variable económica.',
        'Reúne munición de datos: share, alcance, tiempo de visionado, afinidad con el target (Kantar/Barlovento, GfK/CAEM).',
        'Mapea el portfolio: identifica la locomotora (Nickelodeon para familias) y los canales débiles que quieres colocar (MTV).',
        'Anticipa la munición del operador: su escala, alternativas para rellenar el hueco, su visionado real y la tendencia estructural a la baja del lineal.'
      ]
    },
    {
      num: '1',
      title: 'Apertura y encuadre',
      subtitle: 'Anclar alto',
      color: '#0064ff',
      points: [
        'Abre con el paquete completo (todos los canales), no con el canal estrella suelto. Anclas alto y das margen para "ceder".',
        'Encuadra el valor en términos del operador: retención de abonados y reducción de churn, no solo audiencia.',
        'Pide más de lo que esperas (CPS, posición EPG, fondos de marketing) para tener moneda de cambio.'
      ]
    },
    {
      num: '2',
      title: 'Exploración de intereses',
      subtitle: 'Escuchar y sondear',
      color: '#00a8a8',
      points: [
        'Identifica qué le duele de verdad al operador: ¿target infantil/familiar?, ¿completar paquete?, ¿diferenciarse de un rival?',
        'Sondea su sensibilidad: ¿le preocupa más el coste fijo o el CPS?, ¿quiere exclusividad?',
        'Usa preguntas, no afirmaciones, para no quemar palancas pronto.'
      ]
    },
    {
      num: '3',
      title: 'Intercambio de concesiones',
      subtitle: 'Nunca ceder gratis',
      color: '#ffa600',
      points: [
        'Nunca cedas gratis: cada concesión va atada a una contrapartida ("bajo el CPS si subes a básico y mantienes la penetración mínima").',
        'Usa el bundling como palanca central: el must-have (Nickelodeon) arrastra a los débiles (MTV).',
        'Reserva la exclusividad y los derechos no lineales (VOD, catch-up) como monedas de cambio de alto valor.',
        'Mantén el mínimo garantizado casi innegociable: es tu red de seguridad.'
      ]
    },
    {
      num: '4',
      title: 'Cierre',
      subtitle: 'Blindar definiciones',
      color: '#1f9d55',
      points: [
        'Cierra primero los principios económicos (modelo, CPS, mínimo, duración) y luego el detalle legal.',
        'Blinda las definiciones ambiguas: sobre todo "abonado" y los comparables del MFN.',
        'Fija ventanas de renegociación realistas dadas las tendencias del lineal.'
      ]
    },
    {
      num: '5',
      title: 'Si no hay acuerdo',
      subtitle: 'Blackout creíble',
      color: '#c0392b',
      points: [
        'La amenaza de blackout solo funciona si es creíble y llega en el timing de renovación.',
        'Ten preparado el plan B comunicado internamente (OTT directo, otro operador) antes de tensar la cuerda.',
        'Evita faroles que no puedas sostener: el operador dominante los detecta.'
      ]
    }
  ],
  strategic_reminder: 'En carriage manda quien tiene una alternativa creíble al "ir a negro". Tu poder real = fuerza de marca × escasez de alternativas para el operador × credibilidad de tu BATNA. Las tendencias a la baja del lineal (infantil y música) erosionan tu leverage cada año: tenlo en cuenta en duración y escaladores.'
};

/* ════════════════════════════════════════════
   ECONÓMICOS DE NEGOCIACIÓN POR OPERADOR-CANAL (Bloque 9)
   CPS (coste por suscriptor/mes), mínimo garantizado, escalador, MFN, BATNA
   Indexado: NEGOTIATION_ECONOMICS[country][channel][operator]
   Cifras de apertura/objetivo/walk-away estimadas para uso interno.
══════════════════════════════════════════════ */
const NEGOTIATION_ECONOMICS = {
  es: {
    nickelodeon: {
      movistar:  { cps_open:'0,28 €', cps_target:'0,22 €', cps_walkaway:'0,18 €', min_guarantee:'2,8 M€/año', escalator:'IPC +1,5%', mfn:'Sí · vs Vodafone y Orange', bundle:'Nick + Nick Jr. en bloque', batna:'Pluto TV + Paramount+ directo · alcance ya alto', leverage:'alto' },
      vodafone:  { cps_open:'0,18 €', cps_target:'0,15 €', cps_walkaway:'0,12 €', min_guarantee:'1,0 M€/año', escalator:'IPC plano año 1', mfn:'Sí · cláusula de igualación', bundle:'Nick + Nick Jr. + SkyShowtime', batna:'Seguir ausente · presión vía marca', leverage:'medio' },
      digi:      { cps_open:'0,20 €', cps_target:'0,16 €', cps_walkaway:'0,14 €', min_guarantee:'0,5 M€/año', escalator:'escalonado por hitos de subs', mfn:'No (operador en crecimiento)', bundle:'Nick + Nick Jr. con bonus crecimiento', batna:'Crecer vía otros · DIGI necesita catálogo', leverage:'medio-alto' },
      masorange: { cps_open:'0,24 €', cps_target:'0,19 €', cps_walkaway:'0,16 €', min_guarantee:'2,0 M€/año', escalator:'IPC +1%', mfn:'Sí · vs Movistar', bundle:'Nick + Nick Jr. en Orange TV + OTT Libre', batna:'OTT Libre integra SkyShowtime · sinergia', leverage:'alto' }
    },
    nickjr: {
      movistar:  { cps_open:'0,20 €', cps_target:'0,16 €', cps_walkaway:'0,13 €', min_guarantee:'1,8 M€/año', escalator:'IPC +1,5%', mfn:'Atado a Nickelodeon', bundle:'Inseparable de Nickelodeon', batna:'Co-viewing parental = alto valor retención', leverage:'alto' },
      vodafone:  { cps_open:'0,14 €', cps_target:'0,11 €', cps_walkaway:'0,09 €', min_guarantee:'0,7 M€/año', escalator:'IPC plano año 1', mfn:'Atado a Nickelodeon', bundle:'Inseparable de Nickelodeon', batna:'Pack familiar incompleto sin él', leverage:'medio' },
      digi:      { cps_open:'0,15 €', cps_target:'0,12 €', cps_walkaway:'0,10 €', min_guarantee:'0,4 M€/año', escalator:'escalonado por subs', mfn:'No', bundle:'Con Nickelodeon, posición consecutiva', batna:'Captación familias jóvenes urbanas', leverage:'medio' },
      masorange: { cps_open:'0,18 €', cps_target:'0,14 €', cps_walkaway:'0,12 €', min_guarantee:'1,4 M€/año', escalator:'IPC +1%', mfn:'Atado a Nickelodeon', bundle:'Inseparable + parrilla unificada', batna:'Pack pre-escolar premium opcional', leverage:'alto' }
    },
    mtv: {
      movistar:  { cps_open:'0,10 €', cps_target:'0,07 €', cps_walkaway:'0,05 €', min_guarantee:'0,6 M€/año', escalator:'plano', mfn:'No', bundle:'Cluster MTV (España+00s+Live)', batna:'Débil · lineal música casi muerto', leverage:'bajo' },
      vodafone:  { cps_open:'0,07 €', cps_target:'0,05 €', cps_walkaway:'0,04 €', min_guarantee:'0,2 M€/año', escalator:'plano', mfn:'No', bundle:'Empaquetar con Nick + Comedy', batna:'Muy débil · solo entra con bundle', leverage:'muy bajo' },
      digi:      { cps_open:'0,06 €', cps_target:'0,05 €', cps_walkaway:'0,04 €', min_guarantee:'0,15 M€/año', escalator:'plano', mfn:'No', bundle:'Con Nick', batna:'Débil', leverage:'bajo' },
      masorange: { cps_open:'0,09 €', cps_target:'0,07 €', cps_walkaway:'0,05 €', min_guarantee:'0,5 M€/año', escalator:'plano', mfn:'No · único con los 3 feeds', bundle:'Cluster 3 feeds exclusivo', batna:'Exclusividad de cluster es la palanca', leverage:'medio-bajo' }
    },
    comedycentral: {
      movistar:  { cps_open:'0,14 €', cps_target:'0,11 €', cps_walkaway:'0,08 €', min_guarantee:'1,0 M€/año', escalator:'IPC plano', mfn:'No', bundle:'South Park como ancla', batna:'Catálogo Friends/Big Bang = retención', leverage:'medio' },
      vodafone:  { cps_open:'0,10 €', cps_target:'0,08 €', cps_walkaway:'0,06 €', min_guarantee:'0,4 M€/año', escalator:'IPC plano', mfn:'No', bundle:'Con MTV (cluster adulto joven)', batna:'Warner TV/BBC cubren comedia', leverage:'bajo-medio' },
      digi:      { cps_open:'0,10 €', cps_target:'0,07 €', cps_walkaway:'0,06 €', min_guarantee:'0,25 M€/año', escalator:'IPC plano', mfn:'No', bundle:'Entrada nueva · South Park gancho', batna:'DIGI sin Comedy Central hoy · hueco', leverage:'medio' },
      masorange: { cps_open:'0,12 €', cps_target:'0,10 €', cps_walkaway:'0,07 €', min_guarantee:'0,8 M€/año', escalator:'IPC +1%', mfn:'No', bundle:'En cine y series Orange', batna:'Parrilla unificada post-consolidación', leverage:'medio' }
    }
  },
  pt: {
    nickelodeon: {
      meo:        { cps_open:'0,30 €', cps_target:'0,24 €', cps_walkaway:'0,20 €', min_guarantee:'2,5 M€/año', escalator:'IPC máx +2%', mfn:'Sí', bundle:'Nick + Nick Jr. doblaje PT', batna:'MEO = 41,5% mercado · pérdida catastrófica', leverage:'medio (renovado dic 2025)' },
      nos:        { cps_open:'0,25 €', cps_target:'0,20 €', cps_walkaway:'0,17 €', min_guarantee:'2,0 M€/año', escalator:'IPC plano', mfn:'Sí · cláusula anti-degradación dial', bundle:'Nick + Nick Jr.', batna:'CONFLICTO: NOS posee 50% Canal Panda', leverage:'bajo (conflicto estructural)' },
      vodafone:   { cps_open:'0,22 €', cps_target:'0,18 €', cps_walkaway:'0,15 €', min_guarantee:'1,0 M€/año', escalator:'IPC máx', mfn:'Sí', bundle:'Nick + Nick Jr. pack família', batna:'Disney+ incluido sin coste · alternativa', leverage:'medio' },
      digi:       { cps_open:'0,18 €', cps_target:'0,14 €', cps_walkaway:'0,12 €', min_guarantee:'0,3 M€/año', escalator:'escalonado por subs', mfn:'No', bundle:'Nick + Nick Jr. en captación', batna:'DIGI única ganando cuota · motor', leverage:'medio-alto' }
    },
    nickjr: {
      meo:        { cps_open:'0,24 €', cps_target:'0,18 €', cps_walkaway:'0,15 €', min_guarantee:'1,8 M€/año', escalator:'IPC máx +2%', mfn:'Atado a Nickelodeon', bundle:'Inseparable de Nickelodeon', batna:'Co-viewing parental alto valor', leverage:'medio' },
      nos:        { cps_open:'0,20 €', cps_target:'0,16 €', cps_walkaway:'0,13 €', min_guarantee:'1,4 M€/año', escalator:'IPC plano', mfn:'Anti-degradación dial', bundle:'Inseparable de Nickelodeon', batna:'CONFLICTO: Panda Kids es de NOS/Dreamia', leverage:'bajo (conflicto)' },
      vodafone:   { cps_open:'0,16 €', cps_target:'0,13 €', cps_walkaway:'0,11 €', min_guarantee:'0,6 M€/año', escalator:'IPC máx', mfn:'Atado a Nickelodeon', bundle:'Inseparable', batna:'Cobertura preescolar ya amplia', leverage:'medio' },
      digi:       { cps_open:'0,14 €', cps_target:'0,11 €', cps_walkaway:'0,09 €', min_guarantee:'0,25 M€/año', escalator:'escalonado', mfn:'No', bundle:'Con Nickelodeon en captación', batna:'Captación familias jóvenes', leverage:'medio' }
    },
    mtv: {
      meo:        { cps_open:'0,06 €', cps_target:'0,04 €', cps_walkaway:'0,03 €', min_guarantee:'0,15 M€/año', escalator:'plano', mfn:'No', bundle:'MTV Global pack opcional', batna:'CRÍTICO: MEO ya salió 31/12/2025', leverage:'muy bajo (recuperar)' },
      nos:        { cps_open:'0,05 €', cps_target:'0,04 €', cps_walkaway:'0,03 €', min_guarantee:'0,12 M€/año', escalator:'plano', mfn:'No', bundle:'MTV Global feed Polonia', batna:'NOS salió MTV Live/00 31/12/2025', leverage:'muy bajo' },
      vodafone:   { cps_open:'0,05 €', cps_target:'0,04 €', cps_walkaway:'0,03 €', min_guarantee:'0,12 M€/año', escalator:'plano', mfn:'No', bundle:'MTV Global', batna:'Débil', leverage:'bajo' },
      digi:       { cps_open:'0,04 €', cps_target:'0,03 €', cps_walkaway:'0,02 €', min_guarantee:'0,08 M€/año', escalator:'plano', mfn:'No', bundle:'Con Nick', batna:'Débil', leverage:'bajo' }
    }
  }
};
