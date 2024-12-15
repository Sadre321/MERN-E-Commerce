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
import CreateProductPage from './pages/Admin/Product/CreateProductPage'
import ProductPage from './pages/Admin/Product/ProductPage'
import UpdateProductPage from './pages/Admin/Product/UpdateProductPage'
import CouponPage from './pages/Admin/Coupon/CouponPage'
import CreateCouponPage from './pages/Admin/Coupon/CreateCouponPage'
import UpdateCouponPage from './pages/Admin/Coupon/UpdateCouponPage'
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
        <Route path='products' element={<ProductPage/>}></Route>
        <Route path='products/create' element={<CreateProductPage/>}></Route>
        <Route path='products/update/:productId' element={<UpdateProductPage/>}></Route>
        <Route path='coupons' element={<CouponPage/>}></Route>
        <Route path='coupons/create' element={<CreateCouponPage/>}></Route>
        <Route path='coupons/update/:id' element={<UpdateCouponPage/>}></Route>
      </Route>
    </Routes>

  )
}

export default App
