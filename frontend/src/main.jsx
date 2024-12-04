import { createRoot } from 'react-dom/client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import App from './App.jsx'
import MainLayouts from './Layouts/MainLayouts.jsx'
import CartProvider from './context/CartProvider.jsx';
import {BrowserRouter} from "react-router";

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <CartProvider>
        <MainLayouts>
        <App />
      </MainLayouts>
    </CartProvider>
  </BrowserRouter>
)
