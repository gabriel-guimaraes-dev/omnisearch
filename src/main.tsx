import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FavoritesContextProvider } from './contexts/FavoritesContext';
import './index.css'
import App from './App.tsx'

// Render the App component to the root element
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FavoritesContextProvider> {/* Provide the FavoritesContext to all the components */}
      <BrowserRouter> {/* Use the BrowserRouter to handle routing */}
        <App /> 
      </BrowserRouter>
    </FavoritesContextProvider>
  </StrictMode>,
)
