// index.js
import { createRoot } from 'react-dom/client';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import App from './App.jsx';
import CartProvider from './context/CartProvider.jsx';
import { BrowserRouter } from "react-router";
import { Layout } from './Layouts/Layout.jsx'; // Layout bileşenini import et

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      <Layout>
        <App />  {/* Layout bileşeni App'i sarar ve doğru layout'u seçer */}
      </Layout>
    </CartProvider>
  </BrowserRouter>
);
