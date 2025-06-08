import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";

const Signin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/");
    } catch (err) {
      console.error("Sign in error:", err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-1 flex-col gap-6 justify-center items-center w-full h-screen">
      <h1 className="text-[25px] edu-sa-hand-medium700">
        Land of the Forgotten
      </h1>

      <form onSubmit={onSubmit} className="space-y-12 w-full max-w-md">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900 edu-sa-hand-medium500">
            Sign in to your Account
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600 edu-sa-hand-medium500">
            Enter your email and password to access your account.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-y-8">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900 edu-sa-hand-medium500"
              >
                Email address
              </label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900 edu-sa-hand-medium500"
              >
                Password
              </label>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p>
            Don’t have an account?{" "}
            <a href="/sign-up" className="underline text-blue-500">
              Sign up
            </a>
          </p>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Signin;
