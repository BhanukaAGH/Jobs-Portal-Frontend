import React from "react";
import CompanyView from "./company/CompanyView";

const AdminCompany = () => {
  return (
    <div className="w-full h-full bg-[#F9FAFF]">
      {/* Title Section */}
      <div className="dashboard-title">
        <h3 className="text-lg md:text-2xl xl:text-3xl">Companies Details</h3>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <div className="flex flex-1 overflow-hidden relative h-full w-full">
          <div className="absolute inset-0 overflow-auto !scrollbar-thin !scrollbar-track-gray-200 !scrollbar-thumb-gray-800">
            <CompanyView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCompany;
