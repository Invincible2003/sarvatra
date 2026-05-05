import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />

        <div className="p-6 bg-gray-100 flex-1">
          <Outlet />
        </div>

        {/* FOOTER */}
        <footer className="text-center text-sm text-gray-500 p-3 bg-white border-t">
          Made by <span className="font-semibold">Aryan Pandey</span>
        </footer>
      </div>
    </div>
  );
}