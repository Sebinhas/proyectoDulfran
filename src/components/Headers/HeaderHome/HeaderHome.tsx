import { useHeaderHome } from './UseHeaderHome';
import { IoIosMenu, IoIosClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const HeaderHome = () => {
  const navigate = useNavigate();
  const { isMenuOpen, handleOpenMenu, handleCloseMenu, navLinks, scrollToSection } =
    useHeaderHome();

  return (
    <div id="top" className="w-full mx-auto h-[80px] items-center flex px-5 md:px-20 ">
      <div className="w-full h-full flex justify-between items-center border-b-[1px] border-gray-300 ">
        <div className="text-2xl font-bold cursor-pointer">Logo</div>
        <div className="flex flex-row items-center gap-10 ">
          <div className="items-center text-md gap-6 hidden lg:flex">
            {navLinks.map((link, index) => (
              <div
                key={index}
                onClick={() => scrollToSection(link.path)}
                className="hover:text-gray-700 cursor-pointer">
                {link.name}
              </div>
            ))}
          </div>

          <div className="items-center gap-4 hidden lg:flex">
            <div
              onClick={() => navigate('/auth/login')}
              className="w-[140px] h-[40px] bg-gray-600 text-white rounded-md cursor-pointer flex  justify-center items-center gap-2 hover:bg-gray-700">
              <div className="text-md">Iniciar sesión</div>
            </div>
          </div>
          <IoIosMenu className="lg:hidden text-[40px]" onClick={handleOpenMenu} />

          <div
            className={`fixed top-0 right-0 w-full h-full z-50 lg:hidden bg-white transform transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
            <div className="w-full h-full flex flex-col p-5">
              <div className="flex justify-end w-full">
                <IoIosClose className="text-[40px] cursor-pointer" onClick={handleCloseMenu} />
              </div>
              
              <div className="flex flex-col items-center gap-8 mt-10">
                <div className="flex flex-col items-center">
                  <h1 className="text-2xl font-bold">Logo</h1>
                </div>

                {navLinks.map((link, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      scrollToSection(link.path);
                      handleCloseMenu();
                    }}
                    className="text-lg hover:text-gray-700 cursor-pointer">
                    {link.name}
                  </div>
                ))}

                <div
                  onClick={() => navigate('/auth/login')}
                  className="w-[140px] h-[40px] bg-gray-700 text-white rounded-md cursor-pointer flex justify-center items-center hover:bg-gray-600">
                  <div className="text-md">Iniciar sesión</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderHome;
