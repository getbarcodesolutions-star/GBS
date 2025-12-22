import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/header/Header'
import Home from './components/pages/Home'
import Label from './components/pages/Label'
import Ribbon from './components/pages/Ribbon'
import Contact from './components/pages/Contact'
import Printer from './components/pages/Printer'
import Login from './components/pages/Login'
import Search from './components/pages/Search'
import Product from './components/pages/Product'
import ScrollToTop from './components/ScrollToTop'
import Cart from './components/pages/Cart'
import { ToastContainer, toast } from 'react-toastify';
import PlaceOrder from './components/pages/PlaceOrder'
import Orders from './components/pages/Orders'
import Verify from './components/pages/Verify'

const App = () => {
  return (
    <>
       <ToastContainer
       className={'md:mt-15 sm:mt-20 py-20 px-15 sm:px-0 sm:py-0 '}
       autoClose={1000}
       hideProgressBar={false}
       closeOnClick
       draggable
       />
        <Header />
        <ScrollToTop/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/label' element={<Label />} />
          <Route path='/ribbon' element={<Ribbon />} />
          <Route path='/printer' element={<Printer />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/search' element={<Search />} />
          <Route path='/onestepcheckout' element={<PlaceOrder/>}/>
          <Route path='/orders' element={<Orders />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
        
      
    </>
  )
}

export default App
