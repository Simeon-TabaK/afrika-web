import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import './index.css'
import App from './App.tsx'

// Initialize Theme (Dark by default, or Light if selected)
const savedTheme = localStorage.getItem('afrika_theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-theme');
  document.documentElement.setAttribute('data-theme', 'light');
} else {
  document.body.classList.remove('light-theme');
  document.documentElement.setAttribute('data-theme', 'dark');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
