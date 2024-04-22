import React from "react";

const DashboardTopBar = () => {
  return (
    <div className="flex justify-between ">
      <input type="search" placeholder="🔎 Search Here" className="rounded-md border-black bg-white border px-2" />
      <div className="avater w-8  ">
        <img
          src="/demo-avater.jpg"
          className="border-blue-700 border-4 rounded-full"
          alt=""
        />
      </div>
    </div>
  );
};

export default DashboardTopBar;
