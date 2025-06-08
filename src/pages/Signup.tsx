import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import axios from "axios"; // or use fetch

import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";

const Signup = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    country: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name");
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const data = await response.json();
        const sortedCountries = data
          .map((country) => country.name.common)
          .sort((a, b) => a.localeCompare(b));
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: form.fullName,
        email: form.email,
        username: form.username,
        country: form.country,
        taps: 2000,
        petals: 0,
        energy: 2000,
        maxEnergy: 2000,

        createdAt: new Date(),
      });

      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex flex-col flex-1 gap-6">
      <Navbar />
      <div className="flex flex-1 flex-col gap-6 justify-center pt-[10rem] items-center w-full h-screen">
        <h1 className="text-[25px] edu-sa-hand-medium700">
          Land of the forgotten
        </h1>

        <form onSubmit={onSubmit} className="space-y-12 w-full max-w-md">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900 edu-sa-hand-medium500">
                Create your Account
              </h2>
              <p className="mt-1 text-sm/6 text-gray-600 edu-sa-hand-medium500">
                This information will be displayed publicly and will be used to
                signin in the future
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="fullName"
                    className="block text-sm/6 font-medium text-gray-900 edu-sa-hand-medium500"
                  >
                    Full Name
                  </label>
                  <div className="mt-2">
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="given-name"
                      onChange={handleChange}
                      className="block edu-sa-hand-medium500 w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
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
                      className="block edu-sa-hand-medium500 w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm/6 font-medium text-gray-900 edu-sa-hand-medium500"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="janesmith"
                      onChange={handleChange}
                      className="block edu-sa-hand-medium500 w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
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
                      autoComplete="password"
                      className="block edu-sa-hand-medium500 w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm/6 font-medium text-gray-900 edu-sa-hand-medium500"
                  >
                    Country
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      onChange={handleChange}
                      className="edu-sa-hand-medium500 col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option value="">Select your country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    {/* <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <p>
              Already have an account?{" "}
              <a href="/sign-in" className="underline text-blue-500">
                sign in
              </a>
            </p>
            <button
              type="submit"
              onClick={onSubmit}
              className="rounded-md cursor-pointer bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
