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
    tv_subs: 3.65, arpu_convergente: 91.5, // ARPU Q1 2026 Telefónica
    churn_rate: 0.7,               // % churn Q1 2026 (mínimo histórico)
    tags: ['16M contrato (récord)', 'Churn 0,7%', 'Líder FTTH'],
    tv_brand: 'Movistar Plus+',
    tv_subs_note: 'Movistar Plus+ + Movistar Plus+ Lite. Q1 2026 Telefónica España. ARPU residencial 91,5€.',
    channels_count: '+80',
    has_ott_libre: true,
    ott_libre: 'movistar-plus-lite',
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
    mobile_lines: 11.0,             // marzo 2026 (~12,7% × 62,61M + propios = ~7-8M directos; cifra ampliada incluye OMV)
    fixed_lines: 2.70, ftth_lines: 2.49,  // marzo 2026 (~13,8% × 18,07M)
    tv_subs: 0.220, arpu_convergente: 25,  // DIGI TV Q1 2026 estimación tras crecimiento sostenido
    tags: ['Mejor precio', 'Líder portabilidad', 'Sin subidas 2026'],
    tv_brand: 'DIGI TV',
    tv_subs_note: 'Lanzado dic 2024. Crecimiento >30%/trimestre. DIGI TV: 220k subs estimados (Q1 2026).',
    channels_count: '+120',
    has_ott_libre: false,
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
    color: '#ff7900', tagline: 'Mayor operador de España por nº de clientes',
    mobile_lines: 26.8,             // marzo 2026 estimación (~30,6% × 62,61M + OMV propios)
    fixed_lines: 7.3, ftth_lines: 4.27,   // marzo 2026 (~23,6% × 18,07M)
    tv_subs: 1.50, arpu_convergente: 52.7,
    tags: ['Líder por clientes', '8 marcas', 'IPO posible 2026'],
    tv_brand: 'Orange TV',
    tv_subs_note: 'Estimación Q1 2026 grupo (Orange TV + Yoigo TV + cobranded). +90 canales en Orange TV.',
    channels_count: '+90',
    has_ott_libre: true,
    ott_libre: 'orange-tv-libre',
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
    name: 'Movistar Plus+ Lite', parent: 'Telefónica España', color: '#019df4',
    launched: '2019', price_from: '14€/mes',
    description: 'OTT contratable sin ser cliente de fibra/móvil de Movistar. Acceso a Movistar Plus+ vía app y web sin descodificador.',
    subs_estimate: '290k',
    subs_note: 'Estimación a Q1 2026. Movistar Plus+ Lite no se desglosa públicamente; va consolidado en TV pago Telefónica.',
    catalog: ['Series Movistar Plus+', 'Cine original Movistar', 'Documentales 0', 'LaLiga (con add-on)', 'Champions (con add-on)'],
    channels_included: ['#Vamos', '#0', 'Movistar Cine', 'Movistar Series', 'Movistar Drama', 'Movistar Comedia', 'Movistar Acción'],
    competitors: ['Vodafone TV Stream (descontinuado)', 'Orange TV Libre', 'SkyShowtime', 'Filmin']
  },
  'orange-tv-libre': {
    name: 'Orange TV Libre', parent: 'MASORANGE', color: '#ff7900',
    launched: '2024', price_from: '9,99€/mes',
    description: 'OTT abierta. Permite acceder a Orange TV sin ser cliente Orange/Yoigo, vía app, Smart TV y web.',
    subs_estimate: '150k',
    subs_note: 'Cifra estimada a Q1 2026. Lanzada para captar usuarios no convergentes y reducir churn de TV.',
    catalog: ['Star Channel', 'AMC originales', 'SkyShowtime', 'Series LaLiga', 'Documentales NatGeo', 'Música MTV'],
    channels_included: ['Star Channel', 'AMC', 'Comedy Central', 'MTV España', 'SkyShowtime', 'AXN', 'Calle 13', 'COSMO'],
    competitors: ['Movistar Plus+ Lite', 'SkyShowtime', 'Filmin', 'Atresplayer Premium']
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
