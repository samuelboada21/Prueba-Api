import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AsociadosList } from './components/AsociadosList.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AsociadosList />
  </StrictMode>,
)
