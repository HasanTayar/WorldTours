import React from "react";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import DashboardOverview from "../../Components/Admin/DashboardOverview";
import DataVisualization from "../../Components/Admin/DataVisualization";
import "./AdminDashboard.css";

const AdminDashboard = ({user}) => {
  console.log(user);
  return (
      <div className="main-content">
        <DashboardOverview />
        <DataVisualization />
      </div>
  );
};

export default AdminDashboard;
