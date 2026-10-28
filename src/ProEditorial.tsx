import React from 'react';
import {
  AbsoluteFill, Audio, Easing, interpolate, Sequence, spring,
  staticFile, useCurrentFrame,
} from 'remotion';
import {editorial as d} from './editorial.config';

const BG = '#F4F2EC';
const INK = '#17282D';
const TEAL = '#187B71';
const GOLD = '#C48F4B';
const GREY = '#77888A';
const FPS = 30;
const MAX = {extrapolateLeft:'clamp', extrapolateRight:'clamp'} as const;
const text: React.CSSProperties = {fontFamily: 'Arial, Helvetica, sans-serif'};
const tween = (f:number, a:number, b:number):number => interpolate(
  f,[a,b],[0,1],{...MAX,easing:Easing.bezier(0.22,1,0.36,1)}
);
const springIn = (f:number, delay:number) => spring({
  fps:FPS, frame:Math.max(0,f-delay), config:{mass:0.85,damping:23,stiffness:125},
});
const fadeUp = (f:number,delay:number,dist=48):React.CSSProperties => {
  const p=springIn(f,delay);
  return {opacity:Math.min(1,p),transform:'translate3d(0,'+((1-p)*dist)+'px,0)'};
};
const number = (n:number)=>new Intl.NumberFormat('pt-BR').format(n);

const Arrow:React.FC<{size?:number;color?:string}> = ({size=44,color=TEAL}) => (
 <svg width={size} height={size} viewBox="0 0 64 64">
  <path d="M10 32 H52 M38 18 L52 32 L38 46" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
 </svg>
);
const Person:React.FC<{color:string}> = ({color}) => (
 <svg width="48" height="66" viewBox="0 0 48 66">
   <circle fill={color} cx="24" cy="10" r="10"/>
   <path fill={color} d="M12 24Q24 19 36 24L43 44L36 47L32 37V65H16V37L12 47L5 44Z"/>
 </svg>
);
const Canvas:React.FC<{section:string;children:React.ReactNode;duration:number}> = ({section,children,duration}) => {
 const frame=useCurrentFrame();
 const alpha=interpolate(frame,[0,11,duration-13,duration],[0,1,1,0],MAX);
 return <AbsoluteFill style={{...text,background:BG,color:INK,overflow:'hidden',opacity:alpha}}>
   <AbsoluteFill style={{
     backgroundImage:'linear-gradient(rgba(24,123,113,.045) 1px, transparent 1px),linear-gradient(90deg,rgba(24,123,113,.045) 1px,transparent 1px)',
     backgroundSize:'96px 96px'
   }}/>
   <div style={{position:'absolute',top:88,left:88,right:88,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
     <div style={{fontSize:26,fontWeight:900,letterSpacing:3,color:TEAL}}>{d.projectLabel}</div>
     <div style={{fontSize:21,letterSpacing:2,color:GREY}}>{section}</div>
   </div>
   <div style={{position:'absolute',left:88,right:88,bottom:91,height:2,background:'#D4DBD5'}} />
   <div style={{position:'absolute',left:88,bottom:50,fontSize:17,letterSpacing:2,color:GREY}}>{d.source}</div>
   {children}
 </AbsoluteFill>;
};
const Tag:React.FC<{label:string}> = ({label}) =>
 <div style={{display:'inline-flex',background:TEAL,color:'white',padding:'16px 27px',fontSize:23,letterSpacing:3,fontWeight:800,borderRadius:8}}>{label}</div>;

const Cover:React.FC = ()=>{
 const f=useCurrentFrame();
 const stroke=tween(f,28,110);
 return <Canvas duration={240} section="01 / INTRO">
  <div style={{position:'absolute',left:85,top:410,right:80}}>
    <div style={fadeUp(f,5)}><Tag label="VISUAL STORYTELLING"/></div>
    <div style={{...fadeUp(f,21),fontSize:108,fontWeight:900,lineHeight:1.08,letterSpacing:-5,whiteSpace:'pre-line',marginTop:60}}>
      {d.title}
    </div>
    <div style={{...fadeUp(f,48),fontSize:33,lineHeight:1.45,color:GREY,marginTop:58,maxWidth:730}}>{d.openingCaption}</div>
    <svg width="840" height="260" style={{marginTop:88,overflow:'visible'}}>
      <path d="M10 190 C145 190, 170 105, 300 125 S495 250, 625 110 S775 100, 830 26"
        stroke={GOLD} strokeWidth="9" strokeLinecap="round" fill="none"
        strokeDasharray="1100" strokeDashoffset={1100*(1-stroke)} />
      <circle cx="830" cy="26" r={11*stroke} fill={TEAL}/>
    </svg>
  </div>
 </Canvas>;
};

const People:React.FC = ()=>{
 const f=useCurrentFrame();
 const intro=tween(f,29,105);
 const change=tween(f,154,305);
 const active=Math.round(d.firstValue + (d.lastValue-d.firstValue)*change);
 const max=Math.max(d.maxPictograms,d.firstValue,d.lastValue);
 return <Canvas duration={360} section="02 / PICTOGRAMAS">
  <div style={{position:'absolute',left:85,top:275,right:85}}>
    <div style={fadeUp(f,8)}><Tag label="UMA PESSOA POR ÍCONE"/></div>
    <div style={{...fadeUp(f,22),fontSize:76,fontWeight:900,letterSpacing:-2,lineHeight:1.09,marginTop:44}}>VEJA OS DADOS<br/>GANHAREM VIDA.</div>
  </div>
  <div style={{position:'absolute',left:86,right:86,top:660,bottom:390,background:'#fff',borderRadius:26,padding:'60px 53px',boxShadow:'0 22px 80px rgba(23,40,45,.08)'}}>
    <div style={{display:'grid',gridTemplateColumns:'repeat(10,minmax(0,1fr))',gap:'22px 18px',justifyItems:'center'}}>
      {Array.from({length:max},(_,i)=>{
        const enabled=i<active;
        const initial=i<d.firstValue;
        const p=tween(f,10+i*1.15,22+i*1.15);
        return <div key={i} style={{opacity:enabled?p:0.14,transform:'translateY('+(18*(1-p))+'px)'}}>
          <Person color={!enabled?'#CFD9D6':initial?TEAL:GOLD}/>
        </div>;
      })}
    </div>
    <div style={{position:'absolute',left:53,right:53,bottom:68,display:'flex',alignItems:'baseline',justifyContent:'space-between',borderTop:'2px solid #E4E9E6',paddingTop:30}}>
      <div style={{fontSize:117,fontWeight:900,letterSpacing:-5,color:TEAL}}>{number(Math.round(d.firstValue*intro + (active-d.firstValue)*intro))}</div>
      <div style={{fontSize:26,color:GREY,fontWeight:700,letterSpacing:2}}>{f<154?d.firstLabel:d.lastLabel}</div>
    </div>
  </div>
  <div style={{position:'absolute',bottom:262,left:98,fontSize:25,color:GREY}}>{d.unitLabel}</div>
 </Canvas>;
};

const Comparison:React.FC = ()=>{
 const f=useCurrentFrame();
 const p=tween(f,40,145);
 const q=tween(f,112,230);
 const values=[d.firstValue,d.lastValue];
 return <Canvas duration={380} section="03 / EVOLUÇÃO">
  <div style={{position:'absolute',left:86,right:86,top:325}}>
    <div style={fadeUp(f,8)}><Tag label="A TRANSFORMAÇÃO"/></div>
    <div style={{...fadeUp(f,24),fontSize:82,fontWeight:900,letterSpacing:-3,lineHeight:1.08,marginTop:44}}>{d.comparisonText}</div>
    <div style={{...fadeUp(f,43),fontSize:31,color:GREY,marginTop:36,lineHeight:1.4}}>{d.comparisonSubtext}</div>
    <div style={{marginTop:120,padding:'66px 55px',background:'white',borderRadius:28,boxShadow:'0 24px 85px rgba(23,40,45,.09)'}}>
      {values.map((v,i)=>{
        const progress=i===0?p:q;
        return <div key={i} style={{marginBottom:i?0:105}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:30}}>
            <span style={{color:GREY,fontSize:28,fontWeight:800,letterSpacing:3}}>{i===0?d.firstLabel:d.lastLabel}</span>
            <strong style={{color:i?GOLD:TEAL,fontSize:77}}>{number(Math.round(v*progress))}</strong>
          </div>
          <div style={{height:38,background:'#E7ECE9',borderRadius:30,overflow:'hidden'}}>
            <div style={{height:'100%',width:(v/Math.max(d.maxPictograms,1)*progress*100)+'%',background:i?GOLD:TEAL,borderRadius:30}}/>
          </div>
        </div>;
      })}
    </div>
    <div style={{marginTop:92,display:'flex',alignItems:'center',gap:26}}>
      <span style={{fontSize:116,color:TEAL,fontWeight:900,letterSpacing:-6}}>{(d.lastValue-d.firstValue)>=0?'+':''}{number(Math.round((d.lastValue-d.firstValue)*tween(f,232,330)))}</span>
      <Arrow/>
      <span style={{fontSize:27,color:GREY,letterSpacing:2}}>VARIAÇÃO ILUSTRATIVA</span>
    </div>
  </div>
 </Canvas>;
};
const Breakdown:React.FC = ()=>{
 const f=useCurrentFrame();
 const items=d.breakdownItems;
 const sum=items.reduce((a,b)=>a+b.value,0);
 return <Canvas duration={350} section="04 / EXPLICAÇÃO">
  <div style={{position:'absolute',left:85,top:330,right:85}}>
    <div style={fadeUp(f,9)}><Tag label="COMPOSIÇÃO DO TOTAL"/></div>
    <div style={{...fadeUp(f,25),fontSize:90,fontWeight:900,letterSpacing:-3,lineHeight:1.07,marginTop:48}}>{d.breakdownTitle}</div>
    <div style={{display:'flex',height:100,borderRadius:16,overflow:'hidden',marginTop:115,background:'#DFE7E2'}}>
      {items.map((item,i)=>{
        const p=tween(f,65+i*25,140+i*25);
        return <div key={item.label} style={{height:'100%',width:((item.value/sum)*100*p)+'%',background:item.color}}/>;
      })}
    </div>
    <div style={{marginTop:80}}>
      {items.map((item,i)=><div key={item.label} style={{...fadeUp(f,95+i*42),display:'flex',alignItems:'center',gap:30,borderBottom:'2px solid #DFE5DF',padding:'34px 10px'}}>
        <div style={{width:24,height:24,borderRadius:5,background:item.color}}/>
        <div style={{fontSize:29,letterSpacing:2,fontWeight:800,flex:1}}>{item.label}</div>
        <div style={{fontSize:72,fontWeight:900,color:item.color}}>{number(Math.round(item.value*tween(f,100+i*42,153+i*42)))}</div>
      </div>)}
    </div>
    <div style={{...fadeUp(f,270),marginTop:84,fontSize:28,lineHeight:1.45,color:GREY}}>Dados de demonstração. Substitua por fontes verificadas antes de publicar.</div>
  </div>
 </Canvas>;
};

const Closing:React.FC = ()=>{
 const f=useCurrentFrame();
 const line=tween(f,70,180);
 return <Canvas duration={470} section="05 / CONCLUSÃO">
  <div style={{position:'absolute',top:510,left:85,right:85,textAlign:'center'}}>
    <div style={{...fadeUp(f,18),display:'flex',justifyContent:'center'}}><Tag label="NARRATIVA VISUAL"/></div>
    <div style={{...fadeUp(f,35),marginTop:80,fontSize:104,lineHeight:1.12,letterSpacing:-5,fontWeight:900,whiteSpace:'pre-line'}}>{d.finalTitle}</div>
    <div style={{margin:'70px auto 0',width:(175*line)+'px',height:8,background:GOLD,borderRadius:8}}/>
    <div style={{...fadeUp(f,100),fontSize:34,lineHeight:1.45,color:GREY,marginTop:60}}>{d.finalText}</div>
    <div style={{...fadeUp(f,180),marginTop:180,fontSize:23,color:TEAL,letterSpacing:4,fontWeight:800}}>CRIADO EM REMOTION / REACT</div>
  </div>
 </Canvas>;
};
export const ProEditorial:React.FC = ()=>(
 <AbsoluteFill style={{background:BG}}>
  <Sequence from={0} durationInFrames={240}><Cover/></Sequence>
  <Sequence from={240} durationInFrames={360}><People/></Sequence>
  <Sequence from={600} durationInFrames={380}><Comparison/></Sequence>
  <Sequence from={980} durationInFrames={350}><Breakdown/></Sequence>
  <Sequence from={1330} durationInFrames={470}><Closing/></Sequence>
  {d.optionalNarration ? <Audio src={staticFile(d.optionalNarration)}/> : null}
 </AbsoluteFill>
);
