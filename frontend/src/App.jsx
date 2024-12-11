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
import UserPage from './pages/Admin/UserPage'
import CategoryPage from './pages/Admin/Category/CategoryPage'
import UpdateCategoryPage from './pages/Admin/Category/UpdateCategoryPage'
import CreateCategoryPage from './pages/Admin/Category/CreateCategoryPage'
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
        <Route path='users' element={<UserPage/>}></Route>
        <Route path='categories' element={<CategoryPage/>}></Route>
        <Route path='categories/create' element={<CreateCategoryPage/>}></Route>
        <Route path='categories/update/:id' element={<UpdateCategoryPage/>}></Route>
      </Route>
    </Routes>

  )
}

export default App
