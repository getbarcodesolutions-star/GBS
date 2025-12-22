import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        backendUrl + '/api/user/admin',
        { email, password }
      )

      if (response.data.success) {
        setToken(response.data.token)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100">
      <div className="bg-white shadow-2xl rounded-xl px-8 py-6 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 tracking-wider text-center">
          Admin Panel
        </h1>

        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <p className="text-md font-bold text-neutral-800 mb-1">
              Email Address
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md w-full px-3 py-2 border border-neutral-300 outline-none"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="mb-4">
            <p className="text-md font-bold text-neutral-800 mb-1">
              Password
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md w-full px-3 py-2 border border-neutral-300 outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full px-4 py-2 rounded-lg font-black
                       text-neutral-100 bg-dark cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
