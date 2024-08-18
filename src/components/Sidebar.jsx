import { FaUser, FaSignOutAlt, FaUserAlt, FaBuilding } from 'react-icons/fa';
import { MdOutlineDashboard, MdOutlineWork } from 'react-icons/md';
import { useAuthStore } from "../store/store";
import SidebarItem from './SidebarItem'; // Import the new SidebarItem component

const Sidebar = () => {
  const { logout } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col antialiased bg-red-800 text-gray-800">
      <div className="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
        <div className="flex items-center justify-center h-14 border-b">
          <div>UDM | On-The-Job Training</div>
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
              </div>
            </li>
            <SidebarItem
              label="Dashboard"
              icon={MdOutlineDashboard}
              to="/admin/dashboard"  
            />
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">Tables</div>
              </div>
            </li>
            <SidebarItem
              label="Users"
              icon={FaUserAlt}
              to="/admin/table/users"  
            />
            <SidebarItem
              label="Companies"
              icon={FaBuilding}
              to="/admin/table/companies"  
            />
            <SidebarItem
              label="Jobs"
              icon={MdOutlineWork}
              to="/admin/table/jobs"  
            />
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">Settings</div>
              </div>
            </li>
            <SidebarItem
              label="Logout"
              icon={FaSignOutAlt}
              onClick={logout}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
