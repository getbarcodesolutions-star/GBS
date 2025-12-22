import React, { useContext, useEffect, useState } from "react";
import axios from 'axios'
import hide from "/assets/images/hidden.png";
import show from "/assets/images/eye.png";
import { ShopContext } from "../../context/ShopContext";
import { toast } from "react-toastify";

const LoginSignup = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState("login");
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')


  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'signup') {

        const response = await axios.post(backendUrl + "/api/user/register", { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }

      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  };

  useEffect(() => {
    if(token){
      navigate('/orders')
    }
  },[token])

  return (
    <>
      <div className="w-full h-45 flex justify-center items-start text-neutral-200 bg-gradient-to-br from-[#7DA0CA] to-[#052695]/80 lg:mt-17 mt-15">
        <p className="mt-3 text-5xl md:text-7xl font-bold flex gap-10 tracking-widest">
          {mode === "signup" ? "S I G N UP" : "L O G IN"}
        </p>
      </div>

      <div className="2xl:h-185 xl:h-150 lg:h-125 sm:h-140 h-130 bg-neutral-100 -mt-16 w-full flex justify-center items-center shadow-blue-950 rounded-t-[80px] shadow-[0_-0px_40px_30px_rgba(0,0,0,0.2)]">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <form
            onSubmit={onsubmitHandler}
            className="mx-auto w-full sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-2/5 flex p-10 space-y-5 flex-col h-full max-w-3xl"
          >
            {mode === "signup" && (
              <div>
                <input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  className="border w-full py-2 text-base md:text-2xl tracking-widest rounded-md px-3 focus:ring-3 outline-none focus:ring-[#C1E8FF] text-[clamp(14px,1.6vw,24px)]"
                />
              </div>
            )}

            <div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border w-full py-2 text-base md:text-2xl tracking-widest rounded-md px-3 focus:ring-3 outline-none focus:ring-[#C1E8FF] text-[clamp(14px,1.6vw,24px)]"
              />
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-2 m:p-1 p-0 cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <img
                  className="w-7 md:w-8"
                  src={showPassword ? show : hide}
                  alt="toggle password"
                />
              </button>

              <input
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border w-full py-2 text-base md:text-2xl tracking-widest rounded-md px-3 focus:ring-3 outline-none focus:ring-[#C1E8FF] text-[clamp(14px,1.6vw,24px)]"
              />
            </div>

            <div className="flex justify-between">


              {mode === "login" ? (
                <p
                  onClick={() => setMode("signup")}
                  className="text-neutral-700 font-bold tracking-wide cursor-pointer text-[clamp(12px,1.2vw,16px)]"
                >
                  Create Account
                </p>
              ) : (
                <p
                  onClick={() => setMode("login")}
                  className="text-neutral-700 font-bold tracking-wide cursor-pointer text-[clamp(12px,1.2vw,16px)]"
                >
                  Login here
                </p>
              )}
            </div>

            <div className="w-full">
              <button
                type="submit"
                className="p-4 w-full text-xl md:text-2xl font-black cursor-pointer text-[#06324d] tracking-widest bg-[#70b3da] rounded-xl"
              >
                {mode === "login" ? "Log in" : "Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
