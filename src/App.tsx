import {useEffect,useRef,useState} from 'react';
import {Route,Routes,useLocation} from 'react-router-dom';
import Home from './Home';
import {Services,Cases,PIRR,NorthCourt} from './pages';
import {Header,ContactSection,Footer,MobileDock} from './layout';
import Dialogs from './Dialogs';
import {cities} from './data';
import {Action,type ModalState,type Open} from './ui';

export default function App(){
 const[modal,setModal]=useState<ModalState>(null);const[city,setCityState]=useState(()=>{try{const saved=localStorage.getItem('rainy-preview-city')||localStorage.getItem('rainy-experience-city');return saved&&cities.includes(saved)?saved:cities[0];}catch{return cities[0];}});
 const main=useRef<HTMLElement>(null);const loc=useLocation();const open:Open=m=>setModal(m);
 const setCity=(c:string)=>{setCityState(c);try{localStorage.setItem('rainy-preview-city',c);}catch{/* Optional local storage. */}};
 useEffect(()=>{setModal(null);const section=loc.hash.slice(1)||new URLSearchParams(loc.search).get('section');window.scrollTo(0,0);const id=requestAnimationFrame(()=>{if(section)document.getElementById(section)?.scrollIntoView();});main.current?.focus({preventScroll:true});const label=loc.pathname.startsWith('/services')?'Услуги':loc.pathname.includes('north-court')?'North Court':loc.pathname.includes('pirr')?'PIRR':loc.pathname.startsWith('/cases')?'Кейсы':'Дизайн, код, поиск';document.title=label+' — Rainy Web';document.querySelector('meta[name="description"]')?.setAttribute('content',label+' — дизайн, разработка сайтов и SEO. Николай Иванов. Прямая работа со специалистом.');return()=>cancelAnimationFrame(id);},[loc.pathname,loc.search,loc.hash]);
 return <><a className="skip-link" href="#main-content" onClick={e=>{e.preventDefault();main.current?.focus();}}>К содержанию</a><Header open={open}/><main id="main-content" ref={main} tabIndex={-1}><Routes><Route path="/" element={<Home open={open}/>}/><Route path="/services/" element={<Services open={open}/>}/><Route path="/cases/" element={<Cases open={open}/>}/><Route path="/cases/pirr/" element={<PIRR open={open}/>}/><Route path="/cases/north-court/" element={<NorthCourt open={open}/>}/><Route path="*" element={<section className="container page-intro section"><h1>Страница не найдена</h1><Action to="/">На главную</Action></section>}/></Routes></main><ContactSection city={city} setCity={setCity}/><Footer open={open}/><MobileDock open={open}/><Dialogs state={modal} close={()=>setModal(null)} open={open} city={city} setCity={setCity}/></>;
}
