import React from "react";
import Banner from "./Banner";
import Movies from "../pages/app/Movies";

function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-8 p-4 bg-black text-gray-300">
      <Banner />
      <Movies />
    </div>
  );
}

export default Home;
