import Navbar from "@/components/Navbar";
import React from "react";
import { Link } from "react-router-dom";

const TappingMarketplace = () => {
  const items = [
    {
      title: "Land of the Forgotten",
      description: "Experience the tapping game on the Somnia blockchain.",
      image: "/images/Landoftheforgotten.PNG",
      link: "/tapping/landoftheforgotten",
    },
    // { title: "Item 2", description: "This is the second item." },
    // { title: "Item 3", description: "This is the third item." },
    // { title: "Item 4", description: "This is the fourth item." },
    // { title: "Item 5", description: "This is the fifth item." },
    // { title: "Item 6", description: "This is the sixth item." },
  ];
  return (
    <div>
      <Navbar />
      <div className="pt-32 min-h-screen bg-gray-100 px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center underline">
          Tap Games
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {items.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="p-6 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition-all duration-300 max-w-sm bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
            >
              <img className="rounded-lg" src={item.image} alt="pic" />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white edu-sa-hand-medium500">
                  {item.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 edu-sa-hand-medium400">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TappingMarketplace;
