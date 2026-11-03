import {useEffect,useRef,useState,type CSSProperties} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,ArrowRight} from 'lucide-react';
import {asset,seoCases,projects} from './data';
import {Count,type Open} from './ui';
const nf=new Intl.NumberFormat('ru-RU');

export function useMeasuredReveal(){
 const ref=useRef<HTMLDivElement>(null);const[seen,setSeen]=useState(false);
 useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setSeen(true);observer.disconnect();}},{threshold:.15});observer.observe(node);return()=>observer.disconnect();},[]);
 return {ref,seen};
}
export function EvidenceAction({open,source='topvisor'}:{open:Open;source?:'topvisor'|'metrica'}){return <button className="vn-link evidence-action" onClick={()=>open({kind:'report',value:source})}>{source==='metrica'?'Данные Яндекс Метрики':'Запросы и динамика в Topvisor'}<ArrowUpRight size={18}/></button>;}
export function VisitComparison({from=1477,to=4039,period=true}:{from?:number;to?:number;period?:boolean}){
 const{ref,seen}=useMeasuredReveal();
 return <div ref={ref} className={`visit-comparison ${seen?'is-seen':''}`} role="figure" aria-label={`Поисковые визиты: ${nf.format(from)} → ${nf.format(to)}${period?', июнь → сентябрь 2026':''}`}>
 <div className="visit-endpoint"><div><strong>{nf.format(from)}</strong><span>{period?'Июнь 2026':'Исходный замер'}</span></div><div className="visit-track"><span style={{'--value':`${from/to*100}%`} as CSSProperties}/></div></div>
 <div className="visit-endpoint"><div><strong><Count value={to}/></strong><span>{period?'Сентябрь 2026':'Итоговый замер'}</span></div><div className="visit-track"><span style={{'--value':'100%'} as CSSProperties}/></div></div>
 <p>Поисковые визиты · Яндекс Метрика</p></div>;
}
export function SearchResultStory({open,compact=false}:{open:Open;compact?:boolean}){
 return <article className={`search-result-story ${compact?'result-compact':''}`}><div className="search-result-intro"><span className="vn-label">Падел-клуб · обезличенный кейс</span><h3><Link to="/cases/north-court/">North Court<ArrowUpRight size={22}/></Link></h3><p>Оптимизация текстов и мета-тегов. Работа — около 1,5 месяца.</p><Link className="vn-link" to="/cases/north-court/">Разобрать кейс<ArrowRight size={18}/></Link></div><div className="search-result-main"><div className="result-factor">×2,7<span>рост поисковых визитов</span></div><VisitComparison/><div className="result-proof"><span><b>73</b> запроса в ТОП-3</span><span><b>93</b> запроса в ТОП-10</span></div><p className="vn-fine">Визиты: июнь → сентябрь 2026. Позиции: около 1,5 месяца. ТОП-3 входит в ТОП-10.</p><div className="evidence-actions"><EvidenceAction open={open}/><EvidenceAction open={open} source="metrica"/></div></div></article>;
}
export function VoltResult(){
 const c=seoCases[1];return <article className="volt-result" id="volt-point"><div><span className="vn-label">Аккумуляторы · обезличенный кейс</span><h3>Volt Point</h3><p>Поисковая оптимизация интернет-магазина</p></div><div className="volt-number">×{c.factor}<span>рост поисковых визитов</span></div><div className="volt-measure"><strong>667 <ArrowRight size={22}/> 6 800</strong><p>Исходный и итоговый замеры. Работа — 1 месяц.</p></div><dl><div><dt>ТОП-3</dt><dd>84 <small>+80</small></dd></div><div><dt>ТОП-10</dt><dd>95 <small>+37</small></dd></div></dl><p className="vn-fine">ТОП-3 входит в ТОП-10. Визиты не равны заявкам или продажам.</p></article>;
}
export function ProjectShowcase({open,small=false}:{open:Open;small?:boolean}){
 const[selected,setSelected]=useState(0);const project=projects[selected];
 return <div className={`project-showcase ${small?'showcase-small':''}`}><div className="project-stage"><div className="project-browser-bar"><span/><span/><span/><p>{project.domain}</p></div><Link to={project.id==='pirr'?'/cases/pirr/':'/cases/?filter=development'} onClick={project.id==='pirr'?undefined:e=>{e.preventDefault();open({kind:'project',value:project.id});}} aria-label={`Открыть проект ${project.name}`}><img key={project.id} src={asset(project.image)} alt={`Реальный экран сайта ${project.name}`} loading="lazy"/><span className="project-open-action"><ArrowUpRight size={24}/></span></Link></div><div className="project-stage-description"><div><h3>{project.name}</h3><p>{project.description}</p><span className="vn-label">{project.status}</span></div><div className="project-choices" role="group" aria-label="Выбрать работу">{projects.map((p,i)=><button key={p.id} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{p.name}<ArrowUpRight size={17}/></button>)}</div></div></div>;
}
export function ContextCTA({open,title='Начнём с вашей задачи?',context,copy='Коротко расскажите, что нужно изменить. Я помогу определить следующий шаг.'}:{open:Open;title?:string;context?:string;copy?:string}){
 return <section className="context-cta"><div><h2>{title}</h2><p>{copy}</p></div><button className="vn-button" onClick={()=>open({kind:'contact',value:context})}>Обсудить проект<ArrowUpRight size={20}/></button></section>;
}
