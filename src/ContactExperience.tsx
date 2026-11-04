import {useId,useRef,useState,type FormEvent} from 'react';
import {ArrowUpRight,ArrowRight,ArrowLeft,Check,Copy,Phone} from 'lucide-react';
import {contacts,messengers,validPhone,composeInquiry} from './contacts';
import {asset} from './data';
import {categories} from './serviceArchitecture';

export function MessengerButtons({context='',compact=false}:{context?:string;compact?:boolean}){
 return <div className={`messenger-grid ${compact?'messenger-compact':''}`} aria-label="Связаться в мессенджере">
 {messengers.map((m,i)=><a key={m.id} className={`messenger-button messenger-${m.id}`} href={m.url} target="_blank" rel="noopener noreferrer" aria-label={`${i===0?'Написать в Telegram':`Открыть ${m.name}`}${context?` — ${context}`:''} (в новой вкладке)`}><img src={asset(`messengers/${m.icon}`)} width="28" height="28" alt=""/><span>{i===0?'Написать в Telegram':m.name}{i===0&&!compact&&<small>Напрямую · {contacts.telegramHandle}</small>}</span><ArrowUpRight size={18}/></a>)}
 </div>;
}

function PreparedMessage({text}:{text:string}){
 const[copied,setCopied]=useState(false);const[copyError,setCopyError]=useState(false);const field=useRef<HTMLTextAreaElement>(null);
 const copy=async()=>{try{await navigator.clipboard.writeText(text);setCopied(true);setCopyError(false);}catch{field.current?.focus();field.current?.select();setCopyError(true);}};
 return <section className="prepared-message" aria-label="Подготовленное обращение"><h3>Ваше сообщение готово</h3><p>Оно ещё не отправлено. Скопируйте текст и передайте мне удобным способом.</p><label>Текст обращения<textarea ref={field} value={text} readOnly rows={6}/></label><button className="vn-button" onClick={copy}>{copied?<Check size={18}/>:<Copy size={18}/>} {copied?'Текст скопирован':'Скопировать текст'}</button><span className="copy-status" role="status">{copyError?'Выделил текст — скопируйте его вручную.':copied?'Теперь можно вставить текст в сообщение.':''}</span></section>;
}

export function InquiryForm({context=''}:{context?:string}){
 const id=useId();const[values,setValues]=useState({name:'',phone:'',email:'',comment:'',service:context});const[error,setError]=useState('');const[message,setMessage]=useState('');const phone=useRef<HTMLInputElement>(null);
 const update=(key:keyof typeof values,value:string)=>{setValues(v=>({...v,[key]:value}));setMessage('');if(key==='phone')setError('');};
 const submit=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();if(!validPhone(values.phone)){setError('Укажите телефон: от 7 до 15 цифр, можно с международным кодом.');phone.current?.focus();return;}setError('');setMessage(composeInquiry(values));};
 return <div className="inquiry-form"><p className="form-intro">Можно начать с телефона и пары слов о задаче. Остальные поля — по желанию.</p><form onSubmit={submit}>
 <div className="form-pair"><label htmlFor={`${id}-name`}>Как вас зовут <small>необязательно</small><input id={`${id}-name`} autoComplete="name" value={values.name} maxLength={100} onChange={e=>update('name',e.target.value)} placeholder="Имя"/></label><label htmlFor={`${id}-phone`}>Телефон <small>обязательно</small><input ref={phone} id={`${id}-phone`} type="tel" inputMode="tel" autoComplete="tel" required aria-invalid={!!error} aria-describedby={error?`${id}-error`:undefined} value={values.phone} maxLength={32} onChange={e=>update('phone',e.target.value)} placeholder="+7 или другой код страны"/></label></div>
 {error&&<p id={`${id}-error`} className="field-error" role="alert">{error}</p>}
 <div className="form-pair"><label htmlFor={`${id}-email`}>Email <small>необязательно</small><input id={`${id}-email`} type="email" autoComplete="email" value={values.email} maxLength={150} onChange={e=>update('email',e.target.value)} placeholder="mail@example.com"/></label><label htmlFor={`${id}-service`}>Направление <small>необязательно</small><select id={`${id}-service`} value={values.service} onChange={e=>update('service',e.target.value)}><option value="">Пока не определился</option>{context&&!categories.some(c=>c.name===context)&&<option value={context}>{context}</option>}{categories.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}</select></label></div>
 <label htmlFor={`${id}-comment`}>О задаче <small>необязательно</small><textarea id={`${id}-comment`} value={values.comment} maxLength={3000} rows={3} onChange={e=>update('comment',e.target.value)} placeholder="Что хотите создать или изменить?"/></label>
 <div className="form-submit"><button className="vn-button" type="submit">Подготовить обращение<ArrowRight size={18}/></button><p>Отправка через сайт пока недоступна. Данные останутся в этом окне, пока вы сами не передадите текст.</p></div>
 </form>{message&&<PreparedMessage text={message}/>}</div>;
}

export function GuidedBrief({context=''}:{context?:string}){
 const[step,setStep]=useState(0);const[service,setService]=useState(context);const[website,setWebsite]=useState('');const[comment,setComment]=useState('');const[generated,setGenerated]=useState(false);const title=['С чего начнём?','Что уже есть?','Что важно изменить?'][step];const heading=useRef<HTMLHeadingElement>(null);
 const move=(n:number)=>{setStep(n);setGenerated(false);requestAnimationFrame(()=>heading.current?.focus());};
 return <div className="guided-brief"><div className="brief-progress" aria-label={`Шаг ${step+1} из 3`}>{[0,1,2].map(n=><span className={n<=step?'is-current':''} key={n}/>)}</div><div className="brief-question"><h3 tabIndex={-1} ref={heading}>{title}</h3><span>{step+1} / 3</span></div>
 {step===0&&<div className="brief-service-options" role="group" aria-label="Выбор задачи">{categories.map(c=><button key={c.id} aria-pressed={service===c.name} onClick={()=>setService(c.name)}>{c.id==='geo-aeo'?'GEO / AEO':c.name}{service===c.name?<Check size={18}/>:<ArrowUpRight size={18}/>}</button>)}<button aria-pressed={!service} onClick={()=>setService('')}>Нужна помощь с выбором{!service&&<Check size={18}/>}</button></div>}
 {step===1&&<><p>Ссылка на сайт или коротко о материалах. Этот шаг можно пропустить.</p><label>Сайт или исходная ситуация<input type="text" value={website} onChange={e=>setWebsite(e.target.value)} maxLength={500} placeholder="Сайт, макет или идея с нуля"/></label></>}
 {step===2&&<><p>Какую задачу должен решить сайт? Пары предложений достаточно.</p><label>Короткое описание<textarea rows={4} value={comment} onChange={e=>setComment(e.target.value)} maxLength={3000} placeholder="Кому нужен сайт и что на нём важно сделать"/></label></>}
 <div className="brief-controls">{step>0&&<button className="vn-link" onClick={()=>move(step-1)}><ArrowLeft size={17}/>Назад</button>}{step<2?<button className="vn-button" onClick={()=>move(step+1)}>Дальше<ArrowRight size={17}/></button>:<button className="vn-button" onClick={()=>setGenerated(true)}>Собрать описание<ArrowRight size={17}/></button>}</div>
 {generated&&<><PreparedMessage text={composeInquiry({service,website,comment})}/><MessengerButtons context={service} compact/></>}
 </div>;
}

export type ContactView='messengers'|'form'|'brief';
export function ContactExperience({context='',initial='messengers'}:{context?:string;initial?:ContactView}){
 const[view,setView]=useState<ContactView>(initial);const panel=useId();
 return <div className="contact-experience">{context&&<div className="inquiry-context"><span>Обсудим</span><strong>{context}</strong></div>}<div className="contact-view-tabs" role="tablist" aria-label="Способ обращения">{([{id:'messengers',label:'Написать'},{id:'form',label:'Оставить заявку'},{id:'brief',label:'Подобрать услугу'}] as const).map((tab,i)=><button key={tab.id} role="tab" id={`${panel}-${tab.id}`} aria-controls={`${panel}-body`} aria-selected={view===tab.id} tabIndex={view===tab.id?0:-1} onClick={()=>setView(tab.id)} onKeyDown={e=>{const ids=['messengers','form','brief'] as const;const n=e.key==='ArrowRight'?(i+1)%3:e.key==='ArrowLeft'?(i+2)%3:e.key==='Home'?0:e.key==='End'?2:null;if(n!==null){e.preventDefault();setView(ids[n]);document.getElementById(`${panel}-${ids[n]}`)?.focus();}}}>{tab.label}</button>)}</div><div role="tabpanel" id={`${panel}-body`} aria-labelledby={`${panel}-${view}`} tabIndex={0}>
 <div hidden={view!=='messengers'}><p className="contact-experience-intro">Напишите мне в удобном мессенджере. Начнём с вашей задачи.</p><MessengerButtons context={context}/><a className="phone-action" href={contacts.phoneHref}><Phone size={18}/><span>Позвонить: <strong>{contacts.phoneDisplay}</strong></span><ArrowUpRight size={17}/></a><div className="contact-next-actions"><button onClick={()=>setView('form')}>Оставить заявку<ArrowRight size={17}/></button><button onClick={()=>setView('brief')}>Подобрать услугу<ArrowRight size={17}/></button></div></div>
 <div hidden={view!=='form'}><InquiryForm context={context}/></div><div hidden={view!=='brief'}><GuidedBrief context={context}/></div>
 </div></div>;
}
