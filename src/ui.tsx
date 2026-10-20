import {useEffect,useRef,useState,type ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight} from 'lucide-react';
const nf=new Intl.NumberFormat('ru-RU');
export const Arrow=()=> <ArrowUpRight size={18} aria-hidden="true"/>;
export function Action({children,to,onClick,secondary=false}: {children:ReactNode;to?:string;onClick?:()=>void;secondary?:boolean}){const cls=`action ${secondary?'secondary':'primary'}`;return to?<Link className={cls} to={to} onClick={onClick}>{children}<Arrow/></Link>:<button className={cls} onClick={onClick}>{children}<Arrow/></button>;}
export function Count({value}:{value:number}){const ref=useRef<HTMLSpanElement>(null);const [shown,setShown]=useState(value);useEffect(()=>{const n=ref.current;if(!n||matchMedia('(prefers-reduced-motion: reduce)').matches)return;let frame=0;const observer=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)return;observer.disconnect();const start=performance.now();const tick=(now:number)=>{const t=Math.min((now-start)/1100,1);setShown(Math.round(value*(1-(1-t)**3)));if(t<1)frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);},{threshold:.3});observer.observe(n);return()=>{observer.disconnect();cancelAnimationFrame(frame);};},[value]);return <span ref={ref} aria-label={nf.format(value)}><span aria-hidden="true">{nf.format(shown)}</span></span>;}
export type ModalState={kind:'menu'|'city'|'contact'|'legal'|'project'|'report';value?:string}|null;
export type Open=(m:NonNullable<ModalState>)=>void;
