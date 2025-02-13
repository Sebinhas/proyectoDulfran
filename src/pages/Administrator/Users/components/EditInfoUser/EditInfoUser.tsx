import useEditInfoUser from "./useEditInfoUser";


const EditInfoUser = ({ user, closeModalActionEditInfoUser, setIsLoading, loading }: { user: any | null, closeModalActionEditInfoUser: () => void, setIsLoading: (value: boolean) => void, loading: boolean }) => {



    const { register, handleSubmit, errors, onSubmit } = useEditInfoUser(setIsLoading, loading, closeModalActionEditInfoUser);


    useEffect(() => {
        const fetchClients = async () => {
            const clients = await getClients();
            // console.log('clients', clients);
        };
        fetchClients();
    }, []);
    const { register, handleSubmit, errors, onSubmit } = useEditInfoUser(setIsLoading, loading, closeModalActionEditInfoUser, user);

    if (!user) return null;

    return (
        <div className="w-full p-4">
            <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                        <div className="text-sm font-medium pb-0.5">Correo Electrónico</div>
                        <input 
                            {...register('email')} 
                            defaultValue={user.email} 
                            className="w-full border rounded-md p-2 outline-none border-gray-300" 
                        />
                    </div>
                    <div className="w-full">
                        <div className="text-sm font-medium pb-0.5">Teléfono</div>
                        <input 
                            {...register('phone')} 
                            defaultValue={user.phone} 
                            className="w-full border rounded-md p-2 outline-none border-gray-300" 
                        />
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                        <div className="text-sm font-medium pb-0.5">Nombre de Usuario</div>
                        <input 
                            disabled={true}
                            {...register('username')} 
                            defaultValue={user.username} 
                            className="w-full border rounded-md p-2 outline-none border-gray-300" 
                        />
                    </div>
                    <div className="w-full">
                        <div className="text-sm font-medium pb-0.5">Tipo de Perfil</div>
                        <select 
                            {...register('profile_type')} 
                            defaultValue={user.profile_type} 
                            className="w-full border rounded-md p-2 outline-none border-gray-300"
                        >
                            <option value="financiero">Financiero</option>
                            <option value="tecnico">Técnico</option>
                        </select>
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                        <div className="text-sm font-medium pb-0.5">Estado</div>
                        <select 
                            {...register('status')} 
                            defaultValue={user.status} 
                            className="w-full border rounded-md p-2 outline-none border-gray-300"
                        >
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </div>
                    <div className="w-full">
                        {/* Espacio vacío para mantener el grid balanceado */}
                    </div>
                </div>

                <div className="w-full flex flex-row items-center justify-end gap-4 mt-4">
                    <button 
                        type="button"
                        onClick={() => closeModalActionEditInfoUser()} 
                        className="w-24 h-12 flex flex-row items-center justify-center gap-2 rounded-md cursor-pointer select-none hover:bg-gray-600 bg-gray-500"
                    >
                        <div className="text-[18px] text-white">Cancelar</div>
                    </button>
                    
                    <button 
                        type="submit"
                        className="w-24 h-12 flex flex-row items-center justify-center gap-2 rounded-md cursor-pointer select-none hover:bg-blue-600 bg-blue-500"
                    >
                        <div className="text-[18px] text-white">Guardar</div>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditInfoUser;