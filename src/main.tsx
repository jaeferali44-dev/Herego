import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import { WebsiteContentProvider } from './context/WebsiteContentContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WebsiteContentProvider>
      <App />
    </WebsiteContentProvider>
  </StrictMode>,
);
