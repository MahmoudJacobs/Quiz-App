import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import SideBar from "../../SideBar/SideBar";

export default function DashboardLayout() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <div>
          <SideBar />
        </div>
        <div className="w-full dash-layout overflow-y-auto bg-theme">
          <Outlet />
        </div>
      </div>
    </>
  );
}
