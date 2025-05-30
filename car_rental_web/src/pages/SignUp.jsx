import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase/FireBase";
import { assets } from "../assets/assets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth(app);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account Created Successfully 🎉");
        setIsSignUp(false);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login Successful 🎉 ");
        setTimeout(() => navigate("/home"), 2000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 bg-cover bg-center p-4 sm:p-6 relative" style={{ backgroundImage: `url(${assets.log2})` }}>
      
    
      <div className="absolute inset-0 bg-black bg-opacity-50 -z-10"></div>
      <h1 className="absolute top-5 left-1/2 transform -translate-x-1/2 text-4xl sm:text-6xl font-bold z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-white">
        CarSpace
      </h1>

      <div className="relative flex flex-col sm:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm sm:max-w-2xl z-20">
        
        <div className="hidden sm:block w-1/2">
          <img src={assets.log1} alt="Car" className="w-full h-full object-cover" />
        </div>

        <div className="w-full sm:w-1/2 p-6 relative flex flex-col justify-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 text-center mb-4">
            {isSignUp ? "Sign Up" : "Login"}
          </h2>

         
          <button className="absolute top-3 right-3 text-red-600 text-2xl" onClick={() => setIsSignUp(!isSignUp)}>
            &times;
          </button>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignUp && (
              <div>
                <label className="block text-gray-800 text-sm md:text-base">Name</label>
                <input
                  type="text"
                  ref={nameRef}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 text-black text-sm md:text-base bg-white"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-gray-800 text-sm md:text-base">Email</label>
              <input
                type="email"
                ref={emailRef}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 text-black text-sm md:text-base bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-800 text-sm md:text-base">Password</label>
              <input
                type="password"
                ref={passwordRef}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 text-black text-sm md:text-base bg-white"
                required
              />
            </div>

            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300 text-sm md:text-base">
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>

          <p className="text-sm md:text-base text-gray-600 text-center mt-3">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <span className="text-blue-500 cursor-pointer ml-1" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Login" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default SignUp;
