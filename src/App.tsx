import {useEffect,useRef,useState} from 'react';
import {Link,Route,Routes,useLocation} from 'react-router-dom';
import Home from './Home';
import {DirectionPage,LegalPage,NotFoundPage} from './StructurePages';
import {ServicesNext,ProcessNext,AboutNext,ContactsNext} from './VNextPages';
import SEOPage from './VNextSEO';
import {CasesNext,NorthCourtNext} from './VNextCases';
import {categories,legalRoutes,pageMetadata} from './serviceArchitecture';
import {PIRR} from './pages';
import {Header,ContactSection,Footer,MobileDock} from './layout';
import Dialogs from './Dialogs';
import {cities} from './data';
import {Action,type ModalState,type Open} from './ui';

export default function App(){
 const[modal,setModal]=useState<ModalState>(null);const[city,setCityState]=useState(()=>{try{const saved=localStorage.getItem('rainy-preview-city')||localStorage.getItem('rainy-experience-city');return saved&&cities.includes(saved)?saved:cities[0];}catch{return cities[0];}});
 const main=useRef<HTMLElement>(null);const loc=useLocation();const open:Open=m=>setModal(m);
 const setCity=(c:string)=>{setCityState(c);try{localStorage.setItem('rainy-preview-city',c);}catch{/* Optional local storage. */}};
 useEffect(()=>{setModal(null);const section=loc.hash.slice(1)||new URLSearchParams(loc.search).get('section');window.scrollTo(0,0);const id=requestAnimationFrame(()=>{if(section)document.getElementById(section)?.scrollIntoView();});main.current?.focus({preventScroll:true});const path=loc.pathname.replace(/\/?$/,'/');const meta=pageMetadata[path]||{title:'Страница не найдена',description:'Страница не найдена. Откройте каталог услуг Rainy Web.'};document.title=meta.title+' — Rainy Web';document.querySelector('meta[name="description"]')?.setAttribute('content',meta.description);return()=>cancelAnimationFrame(id);},[loc.pathname,loc.search,loc.hash]);
 return <><a className="skip-link" href="#main-content" onClick={e=>{e.preventDefault();main.current?.focus();}}>К содержанию</a><Header open={open}/><main id="main-content" ref={main} tabIndex={-1}><Routes><Route path="/" element={<Home open={open}/>}/><Route path="/services/" element={<ServicesNext open={open}/>}/><Route path="/cases/" element={<CasesNext open={open}/>}/><Route path="/cases/pirr/" element={<PIRR open={open}/>}/><Route path="/cases/north-court/" element={<NorthCourtNext open={open}/>}/>{categories.map(c=><Route key={c.id} path={c.route} element={c.id==='seo'?<SEOPage open={open}/>:<DirectionPage id={c.id} open={open}/>}/>)}<Route path="/about/" element={<AboutNext open={open}/>}/><Route path="/process/" element={<ProcessNext open={open}/>}/><Route path="/contacts/" element={<ContactsNext/>}/>{legalRoutes.map(([path])=><Route key={path} path={path} element={<LegalPage path={path}/>}/>)}<Route path="*" element={<NotFoundPage/>}/></Routes>{loc.pathname.includes('/cases/pirr')&&<nav className="container related-directions section" aria-label="Услуги по теме кейса"><Link className="text-link" to="/services/development/">Разработка сайтов</Link></nav>}</main><ContactSection city={city} setCity={setCity} open={open}/><Footer open={open}/><MobileDock open={open}/><Dialogs state={modal} close={()=>setModal(null)} open={open} city={city} setCity={setCity}/></>;
}
