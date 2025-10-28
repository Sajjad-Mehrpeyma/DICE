import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import './styles/dashboard.css';
import './styles/signals.css';
import './styles/planning.css';
import './styles/copilot.css';
import './styles/setup.css';
import './styles/insights.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
