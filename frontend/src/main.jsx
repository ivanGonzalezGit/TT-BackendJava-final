import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/authContext.jsx';
import { TotalProvider } from './context/TotalContext';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TotalProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <App />
          </Router>    
        </CartProvider>
      </AuthProvider>
    </TotalProvider>
  </StrictMode>,
)
