import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DTOSubscribe } from "./DTOSubscribe";

const Subscribe = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<DTOSubscribe>();


    const onSubmit = (data: DTOSubscribe) => {
        console.log(data);
    }

    return (
        <div className="w-full h-screen relative px-40 flex flex-col gap-12 items-center py-10 ">
            <div onClick={() => navigate("/")} className="absolute top-0 left-0 w-10 h-10 cursor-pointer bg-black/50"> 
                atras
            </div>
            <div className="w-full border-2 border-emerald-500 bg-emerald-100 text-emerald-700 rounded-lg p-4">
                ¡Registra tu empresa en Monedix Colombia y facilita los pagos de tus clientes! 🚀 Antes de comenzar, 
                necesitamos verificar tus credenciales para garantizar la seguridad de tu negocio. Completa el formulario 
                con la información de tu empresa y da el primer paso para recibir pagos de manera rápida y segura.
            </div>
            <div className="w-full ">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full  h-[600px] rounded-2xl shadow-md shadow-slate-400  bg-slate-100">
                    <div className="w-full flex flex-col gap-3 p-4">
                        <div className="w-full flex flex-col md:flex-row gap-4">
                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">
                                    NIT <span className="text-red-500">*</span>
                                </div>
                                <input
                                    {...register("nit", { required: true })}
                                    placeholder="Ej: 1234567"
                                    className={`w-full border rounded-md p-2 outline-none ${
                                    errors.nit ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                            </div>

                            <div className="w-full">
                            <div className="text-sm font-medium pb-0.5">
                                Nombre <span className="text-red-500">*</span>
                            </div>
                            <input
                                {...register("name", { required: true })}
                                placeholder="Ej: 3178901234"
                                className={`w-full border rounded-md p-2 outline-none ${
                                errors.name ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            </div>
                        </div>

                        <div className="w-full flex flex-col md:flex-row gap-4">
                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">
                                    Dirección <span className="text-red-500">*</span>
                                </div>
                                <input
                                    {...register("address", { required: true })}
                                    placeholder="Ej: Juan"
                                    className={`w-full border rounded-md p-2 outline-none ${
                                    errors.address ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                            </div>

                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">Teléfono</div>
                                <input
                                    {...register("phone")}
                                    placeholder="Ej: Pérez"
                                    className={`w-full border rounded-md p-2 outline-none ${
                                    errors.phone ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                            </div>
                        </div>

                        <div className="w-full flex flex-col md:flex-row gap-4">
                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">
                                    Ubicación <span className="text-red-500">*</span>
                                </div>
                                <input
                                    {...register("location")}
                                    placeholder="Ej: Pérez"
                                    className={`w-full border rounded-md p-2 outline-none ${
                                    errors.location ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                            </div>

                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">Correo Electrónico</div>
                                <input
                                    {...register("email")}
                                    placeholder="Ej: Pérez"
                                    className={`w-full border rounded-md p-2 outline-none ${
                                    errors.email ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                            </div>
                        </div>

                        <div className="w-full flex flex-col md:flex-row gap-4">
                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">
                                    Usuario <span className="text-red-500">*</span>
                                </div>
                                <input
                                    {...register("username", {
                                    required: true,
                                    })}
                                    placeholder="Ej: email@example.com"
                                    className={`w-full border rounded-md p-2 outline-none ${
                                    errors.username ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                            </div>

                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">
                                    Contraseña <span className="text-red-500">*</span>
                                </div>
                                <input
                                    {...register("password", { required: true })}
                                    className={`w-full border rounded-md p-2 outline-none ${
                                    errors.password ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row gap-4">
                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">
                                    Confirmar Contraseña <span className="text-red-500">*</span>
                                </div>
                                <input
                                    type="password"
                                    {...register("email", {
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Correo inválido",
                                    },
                                    })}
                                    placeholder="Ej: email@example.com"
                                    className={`w-full border rounded-md p-2 outline-none ${
                                    errors.email ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                            </div>

                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">
                                    Tipo de Perfil <span className="text-red-500">*</span>
                                </div>
                                <select
                                    {...register("profile_type", { required: true })}
                                    className={`w-full border rounded-md p-2 outline-none ${
                                    errors.profile_type ? "border-red-500" : "border-gray-300"
                                    }`}
                                >
                                    <option value="">Seleccione un tipo</option>
                                    <option value="financiero">Financiero</option>
                                    <option value="tecnico">Técnico</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row gap-4">
                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">
                                    Key Public <span className="text-red-500">*</span>
                                </div>
                                <input
                                    {...register("WOMPI_PUBLIC_KEY", {
                                    required: true,
                                    })}
                                    placeholder="Ej: email@example.com"
                                    className={`w-full border rounded-md p-2 outline-none ${
                                    errors.WOMPI_PUBLIC_KEY ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                            </div>

                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">
                                    Key Private <span className="text-red-500">*</span>
                                </div>  
                                <input
                                    {...register("WOMPI_PRIVATE_KEY", { required: true })}
                                    className={`w-full border rounded-md p-2 outline-none ${
                                    errors.WOMPI_PRIVATE_KEY ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row gap-4">
                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">
                                    Integrity Secret <span className="text-red-500">*</span>
                                </div>
                                <input
                                    {...register("WOMPI_INTEGRITY_SECRET", { required: true })}
                                    placeholder="Ej: email@example.com"
                                    className={`w-full border rounded-md p-2 outline-none ${
                                    errors.WOMPI_INTEGRITY_SECRET ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                            </div>

                        </div>

                        <div className="w-full flex flex-row items-center justify-end gap-4 mt-4">
                            <button
                                type="button"
                                onClick={() => navigate("/")}
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
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Subscribe;
