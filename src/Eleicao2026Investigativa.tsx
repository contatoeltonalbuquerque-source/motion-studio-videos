import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Sequence, Audio, staticFile} from 'remotion';

/** Gráficos de 2026 sujeitos à conferência na base definitiva do TSE.
 * Taxas regionais históricas: primeiro turno; 2026, ambos os turnos.
 * ATENÇÃO: ícones nacionais não representam distribuição espacial por UF.
 */
const DATA={
  national:[{year:2010,first:18.12,second:21.5},{year:2014,first:19.39,second:21.1},{year:2018,first:20.33,second:21.29},{year:2022,first:20.93,second:20.57},{year:2026,first:21.08,second:19.22}],
  regions:[
    {name:'NORTE',first:19.43,second:21.21,prior:[19.78,19.71,20.93]},
    {name:'NORDESTE',first:18.39,second:16.44,prior:[20.03,18.77,19.52]},
    {name:'CENTRO-OESTE',first:21.70,second:20.03,prior:[18.68,21.03,21.34]},
    {name:'SUDESTE',first:22.70,second:20.24,prior:[19.73,21.99,21.96]},
    {name:'SUL',first:20.46,second:18.19,prior:[16.72,17.26,19.35]},
  ],
  first:{lula:53879538,flavio:56104503,others:9316747,blank:2300798,nulls:3674249,attendance:125275835},
  second:{lula:64256232,flavio:59826041,blank:1430493,nulls:2723298,attendance:128236074},
};
const C={bg:'#07141D',panel:'#0D2530',line:'#264856',white:'#F5FAFA',muted:'#9FBAC3',cyan:'#2FE6D0',gold:'#F6B86A',red:'#F18C86'};
const number=(n:number)=>new Intl.NumberFormat('pt-BR').format(n);
const pct=(n:number)=>n.toFixed(2).replace('.',',')+'%';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const tween=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],clamp);
const Ease:React.FC<{children:React.ReactNode;delay?:number;dy?:number}>=({children,delay=0,dy=40})=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 const s=spring({frame:Math.max(0,frame-delay),fps,config:{damping:24,stiffness:115}});
 return <div style={{opacity:Math.max(0,Math.min(1,s)),transform:'translateY('+((1-s)*dy)+'px)'}}>{children}</div>;
};
const Base:React.FC<{label:string;children:React.ReactNode}>=({label,children})=><AbsoluteFill style={{background:C.bg,color:C.white,fontFamily:'Arial,sans-serif',overflow:'hidden'}}>
 <AbsoluteFill style={{backgroundImage:'linear-gradient(rgba(62,122,139,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(62,122,139,.08) 1px,transparent 1px)',backgroundSize:'86px 86px'}}/>
 <div style={{position:'absolute',top:92,left:80,right:80,display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:24,fontWeight:800,letterSpacing:2}}><span style={{color:C.cyan}}>DADOS / 2026</span><span style={{color:C.muted,fontSize:20}}>{label}</span></div>
 <div style={{position:'absolute',bottom:104,left:80,right:80,height:2,background:C.line}}/>
 <div style={{position:'absolute',bottom:70,left:80,fontSize:19,color:C.muted}}>FONTE: TSE • RESULTADOS 2010–2026</div>
 {children}
 </AbsoluteFill>;
const Label:React.FC<{text:string}>=({text})=><div style={{fontSize:26,color:C.cyan,fontWeight:800,letterSpacing:4,marginBottom:34}}>{text}</div>;
const Hero=()=>{
 const f=useCurrentFrame();
 return <Base label="ABERTURA"><div style={{position:'absolute',top:420,left:80,right:80}}>
 <Ease delay={5}><Label text="UMA ANÁLISE DOS NÚMEROS"/></Ease>
 <Ease delay={20}><div style={{fontSize:110,fontWeight:900,lineHeight:1.04,letterSpacing:-5}}>ELEIÇÕES<br/><span style={{color:C.cyan}}>2026</span></div></Ease>
 <Ease delay={40}><div style={{fontSize:51,fontWeight:700,marginTop:85,lineHeight:1.18}}>O QUE MUDOU<br/>ENTRE OS TURNOS?</div></Ease>
 <div style={{marginTop:100,width:840,height:6,background:C.line,borderRadius:10}}><div style={{width:(tween(f,60,160)*100)+'%',height:'100%',background:C.gold}}/></div>
 <Ease delay={82}><p style={{fontSize:31,color:C.muted,lineHeight:1.5,marginTop:44}}>Abstenções, comparecimento, votos válidos e evolução histórica.</p></Ease>
 </div></Base>;
};
const SeriesGraph=()=>{
 const f=useCurrentFrame();
 return <Base label="01 / HISTÓRICO"><div style={{position:'absolute',top:260,left:78,right:78}}>
 <Ease><Label text="2010 · 2014 · 2018 · 2022 · 2026"/></Ease>
 <Ease delay={18}><div style={{fontSize:75,fontWeight:900,lineHeight:1.08}}>A ABSTENÇÃO<br/>EM CINCO ELEIÇÕES</div></Ease>
 <div style={{marginTop:125,display:'flex',flexDirection:'column',gap:64}}>
 {DATA.national.map((d,i)=><div key={d.year}>
 <div style={{fontSize:28,letterSpacing:2,fontWeight:800,color:C.white,marginBottom:16}}>{d.year}</div>
 <div style={{display:'flex',gap:22,alignItems:'center',marginBottom:12}}><span style={{width:110,color:C.muted,fontSize:23}}>1º TURNO</span><div style={{flex:1,height:26,background:C.panel,borderRadius:16,overflow:'hidden'}}><div style={{width:(d.first/25*100*tween(f,20+i*18,55+i*18))+'%',height:'100%',background:C.cyan,borderRadius:16}}/></div><span style={{width:113,fontSize:29,textAlign:'right',color:C.cyan}}>{pct(d.first)}</span></div>
 <div style={{display:'flex',gap:22,alignItems:'center'}}><span style={{width:110,color:C.muted,fontSize:23}}>2º TURNO</span><div style={{flex:1,height:26,background:C.panel,borderRadius:16,overflow:'hidden'}}><div style={{width:(d.second/25*100*tween(f,32+i*18,67+i*18))+'%',height:'100%',background:C.gold,borderRadius:16}}/></div><span style={{width:113,fontSize:29,textAlign:'right',color:C.gold}}>{pct(d.second)}</span></div>
 </div>)}
 </div></div></Base>;
};
const Regional=()=>{
 const f=useCurrentFrame();
 return <Base label="02 / REGIÕES"><div style={{position:'absolute',left:80,right:80,top:270}}>
 <Ease><Label text="2026 • COMPARAÇÃO REGIONAL"/></Ease>
 <Ease delay={13}><div style={{fontSize:76,fontWeight:900,lineHeight:1.08}}>CINCO REGIÕES.<br/>DOIS TURNOS.</div></Ease>
 <div style={{display:'flex',gap:36,marginTop:35,fontSize:25}}><span style={{color:C.cyan}}>■ 1º TURNO</span><span style={{color:C.gold}}>■ 2º TURNO</span></div>
 <div style={{marginTop:110,display:'flex',flexDirection:'column',gap:66}}>
 {DATA.regions.map((r,i)=><div key={r.name} style={{opacity:tween(f,12+i*18,34+i*18)}}>
 <div style={{fontSize:28,fontWeight:800,letterSpacing:2,marginBottom:18}}>{r.name}<span style={{float:'right',color:r.second>r.first?C.red:C.cyan}}>{r.second>r.first?'+':''}{(r.second-r.first).toFixed(2).replace('.',',')} p.p.</span></div>
 <div style={{height:22,background:C.panel,borderRadius:12,marginBottom:12,overflow:'hidden'}}><div style={{width:(r.first/25*100*tween(f,24+i*18,78+i*18))+'%',height:'100%',background:C.cyan}}/></div>
 <div style={{height:22,background:C.panel,borderRadius:12,overflow:'hidden'}}><div style={{width:(r.second/25*100*tween(f,38+i*18,92+i*18))+'%',height:'100%',background:C.gold}}/></div>
 <div style={{display:'flex',justifyContent:'space-between',fontSize:22,color:C.muted,marginTop:10}}><span>{pct(r.first)}</span><span>{pct(r.second)}</span></div>
 </div>)}
 </div>
 </div></Base>;
};
const PeopleIcon:React.FC<{color:string;opacity?:number}>=({color,opacity=1})=><svg width="55" height="79" viewBox="0 0 55 79" style={{opacity}}>
 <circle cx="27.5" cy="14" r="12" fill={color}/><path fill={color} d="M15 30 Q27 23 40 30 L49 53 L41 58 L37 43 L37 79 L18 79 L18 43 L14 58 L6 53Z"/></svg>;
const People=()=>{
 const f=useCurrentFrame();
 const count=Math.round(interpolate(f,[25,170,190,300],[0,54,54,64],clamp));
 const isSecond=f>190;
 return <Base label="03 / VOTOS DE LULA"><div style={{position:'absolute',top:240,left:80,right:80}}>
 <Ease><Label text="EVOLUÇÃO DA VOTAÇÃO"/></Ease>
 <Ease delay={12}><div style={{fontSize:71,fontWeight:900,lineHeight:1.1}}>MILHÕES DE VOTOS<br/>EM PICTOGRAMAS</div></Ease>
 <div style={{marginTop:58,color:C.muted,fontSize:26}}>Cada pessoa representa aproximadamente 1 milhão de votos.</div>
 <div style={{marginTop:115,display:'grid',gridTemplateColumns:'repeat(8,1fr)',gap:'29px 25px',background:C.panel,border:'2px solid '+C.line,borderRadius:38,padding:'62px 52px'}}>
 {Array.from({length:72},(_,i)=><PeopleIcon key={i} color={i<54?C.cyan:C.gold} opacity={i<count?1:.11}/>)}
 </div>
 <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginTop:65}}><span style={{fontSize:27,color:C.muted}}>{isSecond?'2º TURNO':'1º TURNO'}</span><strong style={{fontSize:90,color:isSecond?C.gold:C.cyan,letterSpacing:-3}}>{isSecond?number(DATA.second.lula):number(DATA.first.lula)}</strong></div>
 <div style={{marginTop:42,fontSize:44,color:C.gold,fontWeight:900,opacity:tween(f,210,250)}}>+{number(DATA.second.lula-DATA.first.lula)} VOTOS</div>
 </div></Base>;
};
const Equation=()=>{
 const f=useCurrentFrame();
 const additional=DATA.second.attendance-DATA.first.attendance;
 const invalidFirst=DATA.first.blank+DATA.first.nulls;
 const invalidSecond=DATA.second.blank+DATA.second.nulls;
 const reduction=invalidFirst-invalidSecond;
 const newValid=additional+reduction;
 const cards=[
 {title:'MAIS COMPARECIMENTOS',value:additional,c:C.cyan,delay:20},
 {title:'MENOS BRANCOS E NULOS',value:reduction,c:C.gold,delay:55},
 {title:'NOVOS VOTOS VÁLIDOS (SALDO)',value:newValid,c:C.white,delay:100}
 ];
 return <Base label="04 / RECONCILIAÇÃO"><div style={{position:'absolute',top:285,left:80,right:80}}>
 <Ease><Label text="A CONTA DO SEGUNDO TURNO"/></Ease>
 <Ease delay={14}><div style={{fontSize:83,fontWeight:900,lineHeight:1.1}}>COMO O TOTAL<br/>AUMENTOU?</div></Ease>
 <div style={{marginTop:130,display:'flex',flexDirection:'column',gap:64}}>
 {cards.map((d,i)=><div key={d.title} style={{opacity:tween(f,d.delay,d.delay+28),background:C.panel,border:'2px solid '+C.line,borderRadius:26,padding:'35px 42px'}}>
 <div style={{fontSize:25,color:C.muted,letterSpacing:2}}>{d.title}</div>
 <div style={{fontSize:76,color:d.c,fontWeight:900,letterSpacing:-3,marginTop:18}}>{number(Math.round(d.value*tween(f,d.delay,d.delay+55)))}</div>
 </div>)}
 </div><div style={{fontSize:31,color:C.muted,lineHeight:1.5,marginTop:80}}>O saldo de comparecimentos e a redução de votos inválidos explicam o aumento líquido de votos válidos.</div>
 </div></Base>;
};
const HistoricalRegions=()=>{
 const f=useCurrentFrame();const years=['2014','2018','2022','2026'];
 return <Base label="05 / SÉRIE REGIONAL"><div style={{position:'absolute',top:255,left:75,right:75}}>
 <Ease><Label text="PRIMEIRO TURNO • POR REGIÃO"/></Ease>
 <Ease delay={14}><div style={{fontSize:75,fontWeight:900,lineHeight:1.1}}>2014 — 2026</div></Ease>
 <div style={{display:'flex',justifyContent:'space-between',marginTop:92,marginLeft:190,fontSize:24,color:C.muted}}>{years.map(y=><span key={y}>{y}</span>)}</div>
 {DATA.regions.map((r,i)=><div key={r.name} style={{marginTop:60,opacity:tween(f,10+i*15,30+i*15)}}>
 <div style={{fontSize:26,fontWeight:800,marginBottom:20}}>{r.name}</div>
 <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
 {[...r.prior,r.first].map((v,j)=><div key={j} style={{background:j===3?C.panel:'#132B36',padding:'20px 10px',textAlign:'center',borderRadius:16,border:j===3?'2px solid '+C.cyan:'2px solid transparent'}}>
 <div style={{fontSize:30,fontWeight:800,color:j===3?C.cyan:C.white}}>{pct(v)}</div>
 <div style={{height:120,position:'relative',marginTop:20}}><div style={{height:(v/25*110*tween(f,25+i*18+j*5,75+i*18+j*5))+'px',width:24,background:j===3?C.cyan:C.gold,position:'absolute',bottom:0,left:'calc(50% - 12px)',borderRadius:8}}/></div></div>)}
 </div></div>)}
 <div style={{color:C.muted,fontSize:22,marginTop:58}}>Dados por região: série de 2014, 2018, 2022 e 2026. Para 2010, o vídeo compara a taxa nacional.</div>
 </div></Base>;
};
const Finish=()=>{
 const f=useCurrentFrame();
 return <Base label="06 / CONCLUSÃO"><div style={{position:'absolute',top:500,left:80,right:80}}>
 <Ease delay={5}><Label text="O QUE PODEMOS CONCLUIR?"/></Ease>
 <Ease delay={18}><div style={{fontSize:87,fontWeight:900,lineHeight:1.11}}>UM PADRÃO<br/>DIFERENTE.<br/><span style={{color:C.cyan}}>NÃO UMA PROVA<br/>DE FRAUDE.</span></div></Ease>
 <Ease delay={48}><div style={{fontSize:33,lineHeight:1.48,color:C.muted,marginTop:95}}>Taxas atípicas merecem investigação com boletins de urna, registros de comparecimento e dados de cada seção eleitoral.</div></Ease>
 <div style={{marginTop:90,height:7,width:840,background:C.line}}><div style={{height:'100%',background:C.gold,width:tween(f,52,170)*840}}/></div>
 </div></Base>;
};
export const Eleicao2026Investigativa:React.FC=()=>{
 return <AbsoluteFill style={{background:C.bg}}>
 <Sequence from={0} durationInFrames={240} premountFor={30}><Hero/></Sequence>
 <Sequence from={240} durationInFrames={390} premountFor={30}><SeriesGraph/></Sequence>
 <Sequence from={630} durationInFrames={400} premountFor={30}><Regional/></Sequence>
 <Sequence from={1030} durationInFrames={390} premountFor={30}><People/></Sequence>
 <Sequence from={1420} durationInFrames={350} premountFor={30}><Equation/></Sequence>
 <Sequence from={1770} durationInFrames={410} premountFor={30}><HistoricalRegions/></Sequence>
 <Sequence from={2180} durationInFrames={220} premountFor={30}><Finish/></Sequence>
 </AbsoluteFill>;
};
