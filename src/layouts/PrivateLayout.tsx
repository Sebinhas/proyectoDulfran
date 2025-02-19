import { Outlet } from 'react-router-dom';
import { HeaderDashboard } from '../components/Headers/HeaderDashboard/HeaderDashboard';
import { Sidebar } from '../components/Sidebar/Sidebar';
// import { getTokenFromLocalStorage } from '../helpers/localstorage.helper'

const PrivateLayout = () => {
  //   const token = getTokenFromLocalStorage()

  //   if (!token) {
  //     return <Navigate to="/login" replace />
  //   }

  return (
    <div className="w-full min-h-screen relative flex bg-gray-100">
      <Sidebar />
      <main className="w-full pl-[270px] min-h-screen flex flex-col">
        <HeaderDashboard />
        <Outlet/>
      </main>
    </div>
  );
};

export default PrivateLayout;
