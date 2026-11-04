import {useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,Check,X} from 'lucide-react';
import {asset,cities,projects} from './data';

import {categories} from './serviceArchitecture';
import {navigation} from './layout';
import {ContactExperience} from './ContactExperience';
import {Action,type ModalState,type Open} from './ui';

export default function Dialogs({state,close,open,city,setCity}:{state:ModalState;close:()=>void;open:Open;city:string;setCity:(value:string)=>void}){
 const dialog=useRef<HTMLDialogElement>(null);const[zoom,setZoom]=useState(100);
 useEffect(()=>{const d=dialog.current;if(!d||!state)return;setZoom(100);const previous=document.activeElement as HTMLElement|null;const overflow=document.body.style.overflow;const scroll={left:window.scrollX,top:window.scrollY};document.body.style.overflow='hidden';d.showModal();return()=>{d.close();document.body.style.overflow=overflow;window.scrollTo({...scroll,behavior:'instant'});previous?.focus({preventScroll:true});};},[state]);
 if(!state)return null;const report=state.kind==='report';const metrica=state.value==='metrica';const project=projects.find(p=>p.id===state.value);
 const title=state.kind==='menu'?'Rainy Web':state.kind==='city'?'Выберите город':state.kind==='contact'?'Обсудим ваш проект':state.kind==='project'?project?.name||'О проекте':state.kind==='report'?(metrica?'Метрика · North Court':'Topvisor · North Court'):state.value||'Документы';
 return <dialog ref={dialog} className={report?'report-dialog':state.kind==='contact'?'contact-dialog':'menu-dialog'} onCancel={e=>{e.preventDefault();close();}} onClick={e=>{if(e.target===e.currentTarget)close();}} aria-labelledby="modal-title"><div className={report?'report-shell':state.kind==='contact'?'contact-shell':'menu-inner'}><div className={report?'report-toolbar':'dialog-heading'}><div><h2 id="modal-title">{title}</h2>{report&&<p>{metrica?'Поисковые визиты · июнь и сентябрь 2026':'Запросы и динамика позиций · Topvisor'}</p>}</div><div className={report?'report-controls':'dialog-controls'}>{report&&<div className="segmented" aria-label="Масштаб отчёта">{[100,150].map(z=><button key={z} aria-pressed={zoom===z} onClick={()=>setZoom(z)}>{z}%</button>)}</div>}<button className="icon-button close-button" aria-label={report?'Закрыть отчёт':state.kind==='menu'?'Закрыть меню':'Закрыть окно'} onClick={close}><X/></button></div></div>
 {report?<><div className="report-scroll" tabIndex={0} role="region" aria-label="Прокручиваемая область отчёта"><img width={metrica?1740:1280} height={metrica?180:847} className={`report-image zoom-${zoom} ${metrica?'metrica':'topvisor'}`} src={asset(metrica?'north-metrica.png':'north-topvisor.jpeg')} alt={metrica?'Исходный фрагмент: визиты 1477 и 4039, посетители 745 и 2963':'Исходный обезличенный скриншот Topvisor: запросы, даты и динамика позиций'}/></div><p className="report-footnote">Позиции и поисковые визиты — разные измерения. Масштабирование и прокрутка доступны внутри отчёта.</p></>:<>
 {state.kind==='menu'&&<><nav aria-label="Мобильное меню">{navigation.map(([label,to])=><Link key={to} to={to} onClick={close}>{label}<ArrowUpRight/></Link>)}</nav><nav className="service-menu-mobile" aria-label="Направления услуг">{categories.map(c=><Link key={c.id} to={c.route} onClick={close}>{c.name}<ArrowUpRight size={18}/></Link>)}</nav><button className="text-action" onClick={()=>open({kind:'city'})}>{city}<ArrowUpRight size={18}/></button><p>Дизайн, разработка сайтов и SEO.<br/>Прямая работа с Николаем Ивановым.</p></>}
 {state.kind==='city'&&<><p>Работа по России, удалённо. Выбор города не означает физический офис.</p><div className="city-list">{cities.map(c=><button key={c} aria-pressed={city===c} onClick={()=>{setCity(c);close();}}>{c}{city===c&&<Check size={17}/>}</button>)}</div></>}
 {state.kind==='contact'&&<ContactExperience key={state.value||'general'} context={state.value}/>}
 {state.kind==='project'&&project&&<><img className="project-modal-image" src={asset(project.image)} alt={`Экран сайта ${project.name}`}/><p>{project.description}</p><p>{project.status}.</p><Action to="/cases/?filter=development" onClick={close}>К кейсам разработки</Action></>}
 {state.kind==='legal'&&<><p>Окончательные документы будут опубликованы до подключения отправки заявок и аналитики.</p><p>Обращение можно подготовить локально и отправить самостоятельно. Выбранный город может сохраняться в вашем браузере.</p></>}
 </>}
 </div></dialog>;
}
