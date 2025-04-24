import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [message, setMessage] = useState("");
  const {registerUser, signInWithGoogle} = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // register user

  const onSubmit = async (data) => {
    try{
      await registerUser(data.email, data.password);
      alert("User registered successfully!");
      navigate("/");
    } catch (error) {
      setMessage("Please provide a valid email or password");
      console.error("Error registering user:", error);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
      alert("Signed up successfully!");
      navigate("/")
    } catch (error) {
      alert("Google sign up failed!") 
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Please Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              placeholder="Email Address"
              className="shadow border rounded w-full py-2 px-3 focus:outline-none focus:shadow"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              placeholder="Password"
              className="shadow border rounded w-full py-2 px-3 focus:outline-none focus:shadow"
            />
          </div>
          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none">
              Register
            </button>
          </div>
        </form>

        <p className="align-baseline font-medium mt-4 text-sm">
          Have an account? Please{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>
        {/* Google Sign Up Button */}
        <div className="mt-4">
          <button
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 px-4 rounded hover:bg-gray-100 transition-all"
          >
            <FcGoogle className="text-xl" />
            <span className="text-sm font-medium text-gray-700">
              Sign up with Google
            </span>
          </button>
        </div>

        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2025 BookVerse. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
