import Sidebar from "./Sidebar"; 
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#FDFCF0]">
      {/* Sidebar hamesha fixed rahega left mein */}
      <Sidebar />

      {/* Right side content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;