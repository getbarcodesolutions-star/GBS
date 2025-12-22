import React, { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Slidebar from './components/Slidebar'
import Add from './pages/Add'
import Orders from './pages/Orders'
import Customers from './pages/Customers'
import Products from './pages/Products'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Edit from './pages/Edit'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '₹'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />


      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <div>
          <Navbar setToken={setToken} />
          <div className="w-full flex min-h-screen">
            <Slidebar />
            <div className="w-full bg-blue p-4">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/products" element={<Products token={token} />} />
                <Route path="/orders" element={<Orders token={token} backendUrl={backendUrl} />} />
                <Route path="/edit-product/:id" element={<Edit token={token} />} />
                {/* <Route path="/customers" element={<Customers token={token} />} /> */}
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
