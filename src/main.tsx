import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import '@fontsource/onest/latin-400.css';import '@fontsource/onest/latin-500.css';import '@fontsource/onest/latin-600.css';
import '@fontsource/onest/cyrillic-400.css';import '@fontsource/onest/cyrillic-500.css';import '@fontsource/onest/cyrillic-600.css';
import App from './App';import './styles.css';
const base=import.meta.env.BASE_URL.replace(/\/$/,'');
if(location.hash.startsWith('#/'))history.replaceState(null,'',base+location.hash.slice(1));
createRoot(document.getElementById('root')!).render(<StrictMode><BrowserRouter basename={base}><App/></BrowserRouter></StrictMode>);
