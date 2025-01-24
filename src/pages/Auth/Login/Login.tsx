import { Link } from 'react-router-dom'
import { useLogin } from './UseLogin'

const Login = () => {
  const { 
   register, 
   handleSubmit, 
   onSubmit, 
   showPassword, 
   setShowPassword, 
   navigate } = useLogin();

  return (
   <div className="w-full min-h-screen flex flex-row">
      <div className="w-[55%] h-full bg-slate-600"></div>
      <div className="relative w-[45%] min-w-[400px] p-8 rounded-lg shadow-md flex flex-col items-center bg-white">
         <div 
            onClick={() => navigate('/')}
            className="absolute px-4 py-2 top-5 right-5 cursor-pointer bg-slate-500 rounded-md duration-200 hover:bg-slate-700 hover:-translate-x-2 hover:text-white shadow-md shadow-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-corner-up-left">
               <polyline points="9 14 4 9 9 4"/>
               <path d="M20 20v-7a4 4 0 0 0-4-4H4"/>
            </svg>
         </div>
         <div className="w-[150px] h-[150px] bg-slate-600 rounded-full mb-6">
            <div className="w-full h-full object-cover" >
            </div>
         </div>
         <form className="w-full max-w-[350px] flex flex-col gap-14" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-3xl font-medium text-center">Iniciar Sesión</h2>
            <div className="flex flex-col gap-4">
               <div className="relative">
                  <input 
                  type="email" 
                  id="email" 
                  {...register('email', { required: 'El correo es requerido' })}
                  className="block outline-none px-2.5 pl-11 h-11 pb-2.5 pt-4 w-full text-md text-gray-700 
                              bg-white rounded-lg border border-gray-300 appearance-none 
                              focus:outline-none focus:border-[2px] focus:border-indigo-300 peer
                              caret-gray-700" 
                  placeholder=" " 
                  />
                  <label 
                  htmlFor="email" 
                  className="absolute select-none cursor-text rounded-lg text-md text-gray-400 
                              duration-300 transform -translate-y-4 scale-75 top-2 
                              z-10 origin-[0] bg-white px-2 peer-focus:px-2 
                              peer-focus:text-indigo-400 peer-placeholder-shown:scale-100 
                              peer-placeholder-shown:-translate-y-1/2 
                              peer-placeholder-shown:top-1/2 peer-focus:top-2 
                              peer-focus:scale-75 peer-focus:-translate-y-4 
                              rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-10"
                  >
                     Correo
                  </label>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                     </svg>
                  </div>
               </div>
               <div className="relative">
                  <input 
                  type={showPassword ? 'text' : 'password'} 
                  id="password" 
                  {...register('password', { required: 'La contraseña es requerida' })}
                  className="block outline-none px-2.5 pl-11 h-11 pb-2.5 pt-4 w-full text-md text-gray-700 
                              bg-white rounded-lg border border-gray-300
                              focus:border-[2px] focus:border-indigo-300 peer
                              caret-gray-700" 
                  placeholder=" " 
                  />
                  <label 
                  htmlFor="password" 
                  className="absolute select-none cursor-text rounded-lg text-md text-gray-400 
                              duration-300 transform -translate-y-4 scale-75 top-2 
                              z-10 origin-[0] bg-white px-2 peer-focus:px-2 
                              peer-focus:text-indigo-400 peer-placeholder-shown:scale-100 
                              peer-placeholder-shown:-translate-y-1/2 
                              peer-placeholder-shown:top-1/2 peer-focus:top-2 
                              peer-focus:scale-75 peer-focus:-translate-y-4 
                              rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-10"
                  >
                     Contraseña
                  </label>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                     <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="12" cy="16" r="1"/><rect width="18" height="12" x="3" y="10" rx="2"/>
                        <path d="M7 10V7a5 5 0 0 1 9.33-2.5"/>
                     </svg>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                     {showPassword ? <div onClick={() => setShowPassword(!showPassword)} className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                           <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                           <circle cx="12" cy="12" r="3"/>
                        </svg>
                     </div> : <div onClick={() => setShowPassword(!showPassword)} className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                           <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/>
                           <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>
                           <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/>
                           <path d="m2 2 20 20"/>
                        </svg>
                     </div>
                     }
                  </div>
               </div>
            </div>
            <button
               type="submit"
               className="w-full flex  justify-center py-2.5 px-4 border border-transparent rounded-md  text-sm font-medium shadow-md shadow-slate-600 text-white bg-slate-600 hover:bg-slate-700"
            >
               Ingresar
            </button>
         </form>
         <div className="flex flex-row justify-center items-center mt-4">
         <p className="text-sm text-gray-500">¿No tienes una cuenta? <Link to="/auth/register" className="text-blue-500">Registrate</Link></p>
         </div>
      </div>
   </div>
  )
}

export default Login; 