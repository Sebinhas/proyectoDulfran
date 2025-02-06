import { GoPencil } from "react-icons/go";
import { IoStar } from "react-icons/io5";
import useSettings from "./UseProfile";    
import MiPerfil from "./Options/MiPerfil/MiPerfil";
import CambioContraseña from "./Options/CambioContrasena/CambioContrasena";
import Notificaciones from "./Options/Notificaciones/Notificaciones";
import Opiniones from "./Options/Opiniones/Opiniones";

const Profile = () => {
    const {
        reviews,
        trustValue,
        handleTrustChange,
        currentOption,
        setCurrentOption
    } = useSettings();

    return (
        <div className="w-full flex flex-col gap-4 p-4">
            <div className="text-[25px] font-semibold text-gray-600">Mi perfil</div>
            <div className="w-full flex flex-row gap-6"> 
                <div className="w-[400px] h-[500px] max-h-[500px] p-12 flex flex-col gap-3 items-center  bg-white rounded-md shadow-md shadow-gray-300">
                    <div className="w-40 h-40 bg-slate-400 rounded-full"></div>
                    <div className="flex flex-col  items-center pb-1">
                        <div className="text-[20px] font-semibold text-gray-600">Dr. Juan Perez</div>
                        <div className="text-[16px] text-gray-600">Odontólogo</div>
                    </div>
                    <div className="p-2 flex flex-row items-center justify-center gap-1 rounded-md cursor-pointer hover:bg-gray-600 bg-gray-500">
                        <GoPencil className="text-xl text-white" />
                        <div className="text-[16px] text-white">Editar perfil</div>
                    </div>
                    <div className="flex flex-col items-center pt-1">
                        <div className="w-full flex flex-row items-center justify-center gap-2">
                            {134} Tarifa
                        </div>
                        <div className="flex items-center gap-2">
                            {[0, 1, 2, 3, 4].map((rating, index) => (
                            <IoStar
                                key={index}
                                aria-hidden="true"
                                className={` ${
                                reviews.average > rating ? 'text-yellow-400' : 'text-gray-300'
                                } size-5 shrink-0`}
                            />
                            ))}
                        </div>
                    </div>
                    <div className="w-44 flex flex-col gap-1">
                        <div className="flex flex-row items-center justify-between">
                            <div className="text-[16px] font-medium text-gray-600">Confianza</div>
                            <div className="text-[16px] font-medium text-gray-600">{trustValue}%</div>
                        </div>
                        <div className="w-full">
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={trustValue}
                                onChange={handleTrustChange}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full max-w-[650px] select-none justify-center items-center  flex flex-row px-4 py-2 gap-3 rounded-md bg-white shadow-md shadow-gray-300">
                        <div className={`${currentOption === 1 ? 'bg-gray-300' : 'bg-white'} cursor-pointer px-3 py-1 hover:bg-gray-300  rounded-md`} onClick={() => setCurrentOption(1)}>Mi perfil</div>
                        <div className={`${currentOption === 2 ? 'bg-gray-300' : 'bg-white'} cursor-pointer px-3 py-1 hover:bg-gray-300  rounded-md`} onClick={() => setCurrentOption(2)}>Cambio de contraseña</div>
                        <div className={`${currentOption === 3 ? 'bg-gray-300' : 'bg-white'} cursor-pointer px-3 py-1 hover:bg-gray-300  rounded-md`} onClick={() => setCurrentOption(3)}>notificaciones</div>
                        <div className={`${currentOption === 4 ? 'bg-gray-300' : 'bg-white'} cursor-pointer px-3 py-1 hover:bg-gray-300  rounded-md`} onClick={() => setCurrentOption(4)}>Opiniones</div>
                    </div>
                    {
                        currentOption === 1 && <MiPerfil /> ||  
                        currentOption === 2 && <CambioContraseña /> ||
                        currentOption === 3 && <Notificaciones /> ||
                        currentOption === 4 && <Opiniones />
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile;