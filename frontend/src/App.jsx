import { Route, Routes } from 'react-router'
import './App.css'
import ProductDetailPage from './pages/ProductDetailPage'
import BlogPage from './pages/BlogPage'
import BlogDetailsPage from './pages/BlogDetailsPage'
import CartPage from './pages/CartPage'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ContactPage from "./pages/ContactPage";
import AdminUserPage from './pages/Admin/AdminUserPage'
function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/shop' element={<ShopPage/>}/>
      <Route path='/blog' element={<BlogPage/>}/>
      <Route path='/blog/:id' element={<BlogDetailsPage/>}/>
      <Route path='/auth' element={<AuthPage/>}/>
      <Route path='/products/:id' element={<ProductDetailPage/>}/>
      <Route path='/cart' element={<CartPage/>}/>
      <Route path='/contact' element={<ContactPage/>}/>
      <Route path='/admin/*'>
        <Route path='users' element={<AdminUserPage/>}></Route>
      </Route>
    </Routes>

  )
}

export default App
