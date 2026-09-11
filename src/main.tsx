import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { WebsiteContentProvider } from './context/WebsiteContentContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WebsiteContentProvider>
      <App />
    </WebsiteContentProvider>
  </StrictMode>,
);
