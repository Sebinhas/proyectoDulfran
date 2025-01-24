import { IoStar } from "react-icons/io5";
import useOptions from "./UseOptions";
import Modal from "../../../../../components/Modal/Modal";

const Opiniones = () => {
    const { reviews } = useOptions();
    const { toggleModal, closeModalAction, Render } = Modal({title: 'Opinion'});
    return (
        <div className="w-full flex flex-col gap-4">
            
            <div className="w-full flex flex-col gap-8">    
                <div className="text-[25px] font-semibold text-gray-600">Opiniones</div>
                <div className="w-full h-[420px] flex flex-col gap-4 overflow-y-auto">
                    <div className="w-full min-h-40 h-40 flex flex-col gap-2 py-4 px-6 rounded-lg bg-white shadow-md shadow-gray-300 ">
                        <div className="w-full flex flex-row gap-3">
                            <div className=" min-w-14 h-14 rounded-full bg-slate-200"></div>
                            <div className="w-full flex flex-row justify-between gap-2">
                                <div className="flex flex-col">
                                    <div className="text-lg font-semibold ">Juanes Espinosa</div>
                                    <div className="">Cliente</div>
                                </div>
                                <div className="flex flex-col gap-2">
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
                                    <div className="">8 de junio 2024</div>
                                </div>
                            </div>
                        </div>
                        <div className=" rounded-lg  ">
                            <p className="w-full text-sm text-gray-600 line-clamp-2  ">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            </p>
                        </div>
                        <div className="w-full flex justify-end">
                            <button onClick={toggleModal} className="text-sm text-gray-500 hover:text-gray-900  transition-all duration-300 select-none">Ver más</button>
                        </div>
                    </div>
                    <div className="w-full min-h-32 h-32 bg-slate-500 rounded-lg"></div>
                    <div className="w-full min-h-32 h-32 bg-slate-500 rounded-lg"></div>
                    <div className="w-full min-h-32 h-32 bg-slate-500 rounded-lg"></div>
                </div>
            </div>
            <Render >
                <div className="w-full flex flex-col gap-4 p-4">
                    <p className="text-lg font-semibold">Hola</p>
                </div>
            </Render>
        </div>
    )
}

export default Opiniones;