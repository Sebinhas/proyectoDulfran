import { Outlet } from "react-router-dom";
import HeaderHome from "../components/Headers/HeaderHome/HeaderHome";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {


  return (
    <div className="min-h-screen flex flex-col">
      <HeaderHome />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
