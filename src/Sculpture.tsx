import {useEffect,useRef,useState} from 'react';
import {asset} from './data';

export default function Sculpture(){
 const host=useRef<HTMLDivElement>(null);const [ready,setReady]=useState(false);
 useEffect(()=>{const el=host.current;if(!el)return;let cancelled=false;let dispose=()=>{};
  async function start(){
   const reduced=matchMedia('(prefers-reduced-motion: reduce)');
   if(reduced.matches || (navigator as Navigator & {connection?:{saveData:boolean}}).connection?.saveData)return;
   try{
    const T=await import('three');const {GLTFLoader}=await import('three/addons/loaders/GLTFLoader.js');if(cancelled)return;
    const renderer=new T.WebGLRenderer({alpha:true,antialias:innerWidth>600,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<600?1:1.5));renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;el!.append(renderer.domElement);
    const scene=new T.Scene(),studio=new T.Scene();studio.background=new T.Color(0x707074);
    const resources: Array<{dispose:()=>void}>=[];
    function panel(w:number,h:number,x:number,y:number,z:number,color:number,power:number){const geo=new T.PlaneGeometry(w,h),mat=new T.MeshBasicMaterial({color:new T.Color(color).multiplyScalar(power),side:T.DoubleSide});resources.push(geo,mat);const mesh=new T.Mesh(geo,mat);mesh.position.set(x,y,z);mesh.lookAt(0,0,0);studio.add(mesh);}
    panel(1.3,6,-3,2,2,0xffffff,5);panel(.55,5,3,1,1,0xffffff,4);panel(5,1.6,0,5,-1,0xffffff,3);panel(1.2,1.5,3,-1,-2,0xc27d5c,1.2);panel(2,2,-2,-3,2,0xffffff,.5);panel(4.5,1.2,-1,2.6,4,0xffffff,3);
    const key=new T.DirectionalLight(0xffffff,2);key.position.set(-3,4,5);scene.add(key);const rim=new T.DirectionalLight(0xffffff,.6);rim.position.set(4,1,-2);scene.add(rim);
    const pmrem=new T.PMREMGenerator(renderer),environment=pmrem.fromScene(studio,.06);scene.environment=environment.texture;
    const camera=new T.PerspectiveCamera(31,1,.01,100);camera.position.set(0,0,4.9);
    const pivot=new T.Group();scene.add(pivot);let visible=true,frame=0,last=0;let pointerX=0,pointerY=0;
    const resize=new ResizeObserver(()=>{if(!el)return;const {width,height}=el.getBoundingClientRect();renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();});resize.observe(el!);
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});observer.observe(el!);
    const move=(e:PointerEvent)=>{if(e.pointerType==='mouse' && innerWidth>800){const b=el!.getBoundingClientRect();pointerX=(e.clientX-b.left)/b.width-.5;pointerY=(e.clientY-b.top)/b.height-.5;}};
    const leave=()=>{pointerX=pointerY=0;};el!.addEventListener('pointermove',move);el!.addEventListener('pointerleave',leave);
    const cleanup=()=>{cancelAnimationFrame(frame);observer.disconnect();resize.disconnect();el!.removeEventListener('pointermove',move);el!.removeEventListener('pointerleave',leave);renderer.domElement.remove();renderer.dispose();environment.dispose();pmrem.dispose();resources.forEach(r=>r.dispose());pivot.traverse(o=>{if(o instanceof T.Mesh){o.geometry.dispose();const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>m.dispose());}});};dispose=cleanup;
    const gltf=await new GLTFLoader().loadAsync(asset('sculpture.glb'));if(cancelled){cleanup();return;}
    const model=gltf.scene;const center=new T.Box3().setFromObject(model).getCenter(new T.Vector3());model.position.sub(center);model.traverse(o=>{if(o instanceof T.Mesh){const old=Array.isArray(o.material)?o.material:[o.material];old.forEach(m=>m.dispose());o.geometry.computeVertexNormals();o.material=new T.MeshPhysicalMaterial({color:0x3d3e40,metalness:1,roughness:.15,clearcoat:.4,clearcoatRoughness:.06});}});pivot.add(model);
    function animate(t:number){frame=requestAnimationFrame(animate);if(!visible||document.hidden||t-last<33||reduced.matches)return;last=t;pivot.rotation.set(.14+Math.sin(t/9000)*.025+pointerY*.035,-.30+Math.sin(t/16000)*.045+pointerX*.05,-.12);pivot.position.y=Math.sin(t/7000)*.018;renderer.render(scene,camera);}
    frame=requestAnimationFrame(animate);setReady(true);
    const onReduced=()=>{if(reduced.matches){setReady(false);cancelAnimationFrame(frame);}else{frame=requestAnimationFrame(animate);setReady(true);}};reduced.addEventListener('change',onReduced);const original=dispose;dispose=()=>{reduced.removeEventListener('change',onReduced);original();};
   }catch{if(!cancelled)setReady(false);dispose();}
  }
  const idle=window.setTimeout(start,120);return()=>{cancelled=true;clearTimeout(idle);dispose();};
 },[]);
 return <div className={`sculpture ${ready?'is-ready':''}`} ref={host} role="img" aria-label="Скульптура Liquid Nexus — чёрный хром"><img src={asset('sculpture.png')} alt="" fetchPriority="high"/></div>;
}
