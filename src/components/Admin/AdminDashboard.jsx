import React from "react";
import { useState } from "react";
import Create from "./Account/Create";
import ViewAccounts from "./Account/ViewAccounts";

const AdminDashboard = () => {
  const [model, setModel] = useState(false);

  const modelOpen = () => {
    setModel(!model);
  };
  return (
    <div className="w-full h-full bg-[#F9FAFF]">
      {/* Title Section */}
      <div className="dashboard-title">
        <h3 className="text-lg md:text-2xl xl:text-3xl">Dashboard</h3>
        <button className="admin-btn bg-black mt-3 ml-3" onClick={modelOpen}>
          Create Admin
        </button>
      </div>
      {/* Dashboard Content */}

      <div className="dashboard-content">
        <div className="flex flex-1 overflow-hidden relative h-full w-full">
          <div className="absolute inset-0 overflow-auto !scrollbar-thin !scrollbar-track-gray-200 !scrollbar-thumb-gray-800">
            {/* Type Code here */}
            <ViewAccounts />
            {model ? <Create modelOpen={modelOpen} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
