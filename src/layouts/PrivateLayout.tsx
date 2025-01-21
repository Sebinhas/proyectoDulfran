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
    <div className="w-full h-screen relative flex bg-gray-100">
      <Sidebar />
      <main className="w-full pl-[250px] h-[calc(100vh-80px)] flex flex-col">
        <HeaderDashboard />
        <Outlet/>
      </main>
    </div>
  );
};

export default PrivateLayout;
