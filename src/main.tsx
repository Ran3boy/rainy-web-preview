import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {HashRouter} from 'react-router-dom';
import '@fontsource/onest/latin-400.css';import '@fontsource/onest/latin-500.css';import '@fontsource/onest/latin-600.css';
import '@fontsource/onest/cyrillic-400.css';import '@fontsource/onest/cyrillic-500.css';import '@fontsource/onest/cyrillic-600.css';
import App from './App';import './styles.css';
createRoot(document.getElementById('root')!).render(<StrictMode><HashRouter><App/></HashRouter></StrictMode>);
