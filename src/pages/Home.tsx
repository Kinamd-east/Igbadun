import Navbar from "@/components/Navbar";
import React from "react";

const Home = () => {
  // bg-[#2c2c2c]
  return (
    <div className="">
      <Navbar />
      <div className="pt-30 px-6">
        <h1 className="text-3xl font-bold">Home</h1>
        <p className="mt-4">This is your homepage content.</p>
      </div>
    </div>
  );
};

export default Home;
