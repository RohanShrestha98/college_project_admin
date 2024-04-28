import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import BaseLayout from './layouts/BaseLayout'
import Login from './pages/auth/login'
import AuthLayout from './layouts/AuthLayout'
import Category from './pages/category/Category'
import Product from './pages/product/Product'
import AddProduct from './pages/product/AddProduct'
import OrderProduct from './pages/orderproduct/OrderProduct'
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
        </Route>
        <Route element={<BaseLayout />}>
          <Route path='/' element={<></>} />
          <Route path='/category' element={<Category />} />
          <Route path='/product' element={<Product />} />
          <Route path='/add-product' element={<AddProduct />} />
          <Route path='/order-product' element={<OrderProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
