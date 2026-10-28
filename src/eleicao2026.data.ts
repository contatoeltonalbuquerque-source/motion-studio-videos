// Fontes auditáveis e valores consolidados para a composição Eleicoes2026Investigacao
// Brasil inclui eleitorado no exterior. Regiões não incluem exterior.
// Históricos: TSE (séries divulgadas com arredondamento de duas casas).
// 2026: TSE 1ºT 04/10/2026 e 2ºT 25/10/2026, 100% das seções.
export const electionData = {
  updated: "28/10/2026",
  sourceLine: "TSE • Resultados 2026 / série histórica",
  nationalHistory: [
    {year:2010,first:18.12,second:21.50},
    {year:2014,first:19.39,second:21.10},
    {year:2018,first:20.33,second:21.29},
    {year:2022,first:20.95,second:20.58},
    {year:2026,first:21.08,second:19.22}
  ],
  regions: [
    {name:"NORTE", first:19.43, second:21.25, electorate:13101175, historical:[19.78,19.71,20.93,19.43]},
    {name:"NORDESTE", first:18.39, second:16.49, electorate:43511237, historical:[20.03,18.77,19.52,18.39]},
    {name:"CENTRO-OESTE", first:21.70, second:20.05, electorate:12001141, historical:[18.68,21.03,21.34,21.70]},
    {name:"SUDESTE", first:22.70, second:20.27, electorate:66344562, historical:[19.73,21.99,21.96,22.70]},
    {name:"SUL", first:20.46, second:18.19, electorate:22870853, historical:[16.72,17.26,19.35,20.46]},
  ],
  regionalHistoricalYears:[2014,2018,2022,2026],
  turnout:{first:125275835,second:128236074,delta:2960239},
  absent:{first:33469244,second:30509005},
  blank:{first:2300798,second:1430496},
  nullVotes:{first:3674249,second:2723305},
  valid:{first:119300788,second:124082273,delta:4781485},
  candidates:{
    lula:{first:53879538,second:64256232,delta:10376694},
    flavio:{first:56104503,second:59826041,delta:3721538},
    eliminated:9316747
  },
  attributionCaution:"Saldo de votos NÃO revela transferências individuais. O voto é secreto.",
  links:[
    "https://www.tse.jus.br/comunicacao/noticias/2026/Outubro/presidente-do-tse-anuncia-reeleicao-de-lula-e-faz-balanco-do-2o-turno-das-eleicoes-2026",
    "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/divulgacao-dos-resultados-das-eleicoes-2026",
    "https://dadosabertos.tse.jus.br/pt_BR/dataset/comparecimento-e-abstencao-2026"
  ]
} as const;
export const formatNumber=(n:number)=>new Intl.NumberFormat("pt-BR").format(n);
export const pct=(n:number)=>n.toFixed(2).replace(".",",")+"%";
