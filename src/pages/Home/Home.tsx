import HeaderHome from "../../components/Headers/HeaderHome/HeaderHome";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import imgPagos from "../../../public/Pagos.svg"
import { useHome } from "./useHome";

SwiperCore.use([Autoplay]);

const Home = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    showPassword,
    setShowPassword,
  } = useHome();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full flex justify-center items-center h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Swiper
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          loop={true}
          className="w-full h-full select-none"
        >
          <SwiperSlide>
            <img
              src="https://fastly.picsum.photos/id/220/1280/300.jpg?hmac=HW4IYvLjFy1SjwfI5XDWU5QCV_qda9wNZXwR-vJ_jjg"
              alt="Slide 1"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://fastly.picsum.photos/id/402/1280/300.jpg?hmac=Ec8q3VKxu7xFfZm3AEWwzD8OVibG_qa1rcTCGdXPRfg"
              alt="Slide 2"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://fastly.picsum.photos/id/704/1280/300.jpg?hmac=1T2_HECA72Kmk1AXaFObcLTcjw9ZjZRzxkH0sbrt1tM"
              alt="Slide 3"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <HeaderHome />
      <div className="w-full h-[500px] sm:h-[600px] lg:h-[700px] flex flex-row  ">
        <div className="w-1/2 h-full hidden lg:block">
          <div className="w-full h-full flex justify-center items-center">
            <img src={imgPagos} alt="" className="w-[600px] h-[600px] select-none"/>
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-full flex flex-col items-center shadow-lg">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="text-5xl sm:text-6xl font-bold">Iniciar sesión</div>
            <form className="w-full flex flex-col items-center py-9 gap-6 sm:gap-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="relative">
                <input
                  autoComplete="on"
                  type="text"
                  id="username"
                  {...register('username', { required: 'El usuario es requerido' })}
                  className="w-[270px] sm:w-[320px] block px-2.5 pb-2.5 pt-4 pl-10 text-sm text-gray-900 bg-transparent rounded-lg border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="username"
                  className="pl-10 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Usuario
                </label>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <input
                  autoComplete="on"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register('password', { required: 'La contraseña es requerida' })}
                  className="w-[270px] sm:w-[320px] block px-2.5 pb-2.5 pt-4 pl-10 text-sm text-gray-900 bg-transparent rounded-lg border-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="pl-10 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Contraseña
                </label>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {
                    showPassword ?
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setShowPassword(false)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-500 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setShowPassword(true)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-500 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  }
                </div>
              </div>
              <button className="w-[270px] sm:w-[320px] h-[40px] bg-[#001540] text-white rounded-lg">
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
