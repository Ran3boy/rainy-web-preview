import {useEffect, useRef, useState} from 'react';
import type {MeshPhysicalMaterial} from 'three';
import {asset} from './data';

export type Layer = 'look'|'structure'|'search';

export default function Scene({layer,paused}:{layer:Layer;paused:boolean}) {
  const host = useRef<HTMLDivElement>(null);
  const state = useRef({layer,paused});
  const [status,setStatus] = useState<'loading'|'ready'|'fallback'>('loading');
  useEffect(()=>{state.current={layer,paused};},[layer,paused]);
  useEffect(()=>{
    const el=host.current!;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    let gone=false, cleanup=()=>{};
    async function load() {
      if(reduced.matches || (navigator as Navigator & {connection?:{saveData:boolean}}).connection?.saveData) {setStatus('fallback');return;}
      try {
        const T=await import('three');
        const {GLTFLoader}=await import('three/addons/loaders/GLTFLoader.js');
        if(gone)return;
        const renderer=new T.WebGLRenderer({alpha:true,antialias:innerWidth>600,powerPreference:'low-power',preserveDrawingBuffer:true});
        renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<600?1:1.5));
        renderer.outputColorSpace=T.SRGBColorSpace;
        renderer.toneMapping=T.ACESFilmicToneMapping;
        el.append(renderer.domElement);
        const scene=new T.Scene(), studio=new T.Scene();
        studio.background=new T.Color(0x393a3c);
        const disposable:Array<{dispose:()=>void}>=[];
        function panel(w:number,h:number,x:number,y:number,z:number,color:number,power:number) {
          const geo=new T.PlaneGeometry(w,h);
          const mat=new T.MeshBasicMaterial({color:new T.Color(color).multiplyScalar(power),side:T.DoubleSide});
          const mesh=new T.Mesh(geo,mat);mesh.position.set(x,y,z);mesh.lookAt(0,0,0);studio.add(mesh);disposable.push(geo,mat);
        }
        panel(1.3,6,-3,2,2,0xffffff,5);panel(.6,5,3,1,1,0xffffff,4);
        panel(5,1.6,0,5,-1,0xffffff,3);panel(1.2,1.5,3,-1,-2,0xc27d5c,1.1);
        panel(4.5,1.2,-1,2.6,4,0xffffff,3);
        const pmrem=new T.PMREMGenerator(renderer),env=pmrem.fromScene(studio,.06);
        scene.environment=env.texture;
        const light=new T.DirectionalLight(0xffffff,2);light.position.set(-3,4,5);scene.add(light);
        const camera=new T.PerspectiveCamera(31,1,.01,100);camera.position.z=4.9;
        const pivot=new T.Group();scene.add(pivot);
        const materials:MeshPhysicalMaterial[]=[];
        let frame=0,last=0,visible=true,px=0,py=0;
        const resize=new ResizeObserver(()=>{const b=el.getBoundingClientRect();if(b.width&&b.height){renderer.setSize(b.width,b.height);camera.aspect=b.width/b.height;camera.updateProjectionMatrix();}});resize.observe(el);
        const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});io.observe(el);
        const move=(e:PointerEvent)=>{if(e.pointerType==='mouse'&&innerWidth>800){const b=el.getBoundingClientRect();px=(e.clientX-b.left)/b.width-.5;py=(e.clientY-b.top)/b.height-.5;}};
        const leave=()=>{px=py=0;};el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);
        const release=()=>{cancelAnimationFrame(frame);io.disconnect();resize.disconnect();el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);renderer.domElement.remove();renderer.dispose();env.dispose();pmrem.dispose();disposable.forEach(r=>r.dispose());pivot.traverse(o=>{if(o instanceof T.Mesh){o.geometry.dispose();(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());}});};cleanup=release;
        const gltf=await new GLTFLoader().loadAsync(asset('sculpture.glb'));
        if(gone){release();return;}
        const model=gltf.scene;
        model.position.sub(new T.Box3().setFromObject(model).getCenter(new T.Vector3()));
        model.traverse(o=>{if(o instanceof T.Mesh){(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());const mat=new T.MeshPhysicalMaterial({color:0x333538,metalness:1,roughness:.16,clearcoat:.5,clearcoatRoughness:.06});o.material=mat;materials.push(mat);}});
        pivot.add(model);
        let lastLayer='';
        function animate(time:number) {
          frame=requestAnimationFrame(animate);
          if(!visible||document.hidden||time-last<33)return;
          last=time;
          const current=state.current;
          if(lastLayer!==current.layer){materials.forEach(m=>{m.wireframe=current.layer==='structure';m.color.set(current.layer==='structure'?0xa9a9a1:0x333538);m.roughness=current.layer==='search'?.25:.16;});lastLayer=current.layer;}
          const still=current.paused||reduced.matches;
          const target=current.layer==='structure'?.25:current.layer==='search'?-.7:-.3;
          pivot.rotation.y+=(target+(still?0:Math.sin(time/10000)*.11+px*.22)-pivot.rotation.y)*.06;
          pivot.rotation.x=.14+(still?0:Math.sin(time/8000)*.035+py*.09);
          pivot.rotation.z=-.12;
          pivot.position.y=still?0:Math.sin(time/6000)*.035;
          renderer.render(scene,camera);
        }
        frame=requestAnimationFrame(animate);setStatus('ready');
      } catch {cleanup();if(!gone)setStatus('fallback');}
    }
    const start=setTimeout(load,80);
    return()=>{gone=true;clearTimeout(start);cleanup();};
  },[]);
  return <div className={`liquid-scene layer-${layer} scene-${status}`} ref={host} role="img" aria-label={`Liquid Nexus: ${layer==='look'?'чёрный хром':layer==='structure'?'геометрический каркас':'поисковый слой'}`}>
    <img src={asset('sculpture.png')} alt="" fetchPriority="high"/>
    {layer==='search'&&<div className="scene-annotations" aria-hidden="true"><span>Содержание</span><span>Структура</span><span>Доступность</span></div>}
    {status==='fallback'&&<small className="fallback-label">Статичный режим · без WebGL</small>}
  </div>;
}
