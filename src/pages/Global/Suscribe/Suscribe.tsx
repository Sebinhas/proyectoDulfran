import useSuscribe from "./useSuscribe";
import { MdKeyboardBackspace } from "react-icons/md";

const Suscribe = () => {

    const { 
        navigate, 
        register, 
        handleSubmit, 
        errors, 
        watch, 
        setValue, 
        previewUrl, 
        handleImageChange, 
        onSubmit 
    } = useSuscribe();

    return (
        <div className="w-full min-h-screen h-full relative px-4 sm:px-10 md:px-40 flex flex-col gap-12 items-center py-10 ">
            <div onClick={() => navigate("/")} className="absolute top-6 left-6 w-12 h-12 flex items-center justify-center cursor-pointer rounded-full  bg-[#101C42] hover:opacity-80 transition-all duration-300"> 
                <MdKeyboardBackspace className="text-white text-2xl" />
            </div>
            <div className="w-full border-2 border-[#101C42] bg-[#cfdaff] text-[#101C42] shadow-md shadow-slate-400 rounded-lg p-4">
                ¡Registra tu empresa en Monedix Colombia y facilita los pagos de tus clientes! 🚀 Antes de comenzar, 
                necesitamos verificar tus credenciales para garantizar la seguridad de tu negocio. Completa el formulario 
                con la información de tu empresa y da el primer paso para recibir pagos de manera rápida y segura.
            </div>
            <div className="w-full ">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full  rounded-2xl shadow-md shadow-slate-400  bg-slate-50">
                    <div className="w-full flex flex-col gap-4 md:gap-5  p-6">
                        <div className="w-full flex flex-col md:flex-row gap-5">
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
                                placeholder="Ej: Juan Pérez"
                                className={`w-full border rounded-md p-2 outline-none ${
                                errors.name ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            </div>
                        </div>

                        <div className="w-full flex flex-col md:flex-row gap-5">
                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">
                                    Dirección <span className="text-red-500">*</span>
                                </div>
                                <input
                                    {...register("address", { required: true })}
                                    placeholder="Ej: Calle 123"
                                    className={`w-full border rounded-md p-2 outline-none ${
                                    errors.address ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                            </div>

                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">Teléfono</div>
                                <input
                                    {...register("phone", { 
                                        required: true,
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "Solo se permiten números"
                                        },
                                        minLength: {
                                            value: 10,
                                            message: "El teléfono debe tener al menos 10 dígitos"
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: "El teléfono no puede tener más de 10 dígitos"
                                        }
                                    })}
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    placeholder="Ej: 3178901234"
                                    className={`w-full border rounded-md p-2 outline-none ${
                                    errors.phone ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                                {errors.phone && (
                                    <span className="text-red-500 text-xs mt-1">
                                        {errors.phone.message || "Este campo es requerido"}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="w-full flex flex-col md:flex-row gap-5">
                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">
                                    Ubicación <span className="text-red-500">*</span>
                                </div>
                                <input
                                    {...register("location")}
                                    placeholder="Ej: Bogotá"
                                    className={`w-full border rounded-md p-2 outline-none ${
                                    errors.location ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                            </div>

                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">Correo Electrónico</div>
                                <input
                                    {...register("email")}
                                    placeholder="Ej: email@example.com"
                                    className={`w-full border rounded-md p-2 outline-none ${
                                    errors.email ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                            </div>
                        </div>

                        <div className="w-full flex flex-col md:flex-row gap-5">
                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">
                                    Usuario <span className="text-red-500">*</span>
                                </div>
                                <input
                                    {...register("username", {
                                    required: true,
                                    })}
                                    placeholder="Ej: usuario"
                                    className={`w-full border rounded-md p-2 outline-none ${
                                    errors.username ? "border-red-500" : "border-gray-300"
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
                        <div className="w-full flex flex-col md:flex-row gap-5">
                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">
                                    Key Public <span className="text-red-500">*</span>
                                </div>
                                <input
                                    {...register("WOMPI_PUBLIC_KEY", {
                                    required: true,
                                    })}
                                    placeholder="Ej: pk_test_1234567890"
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
                                    placeholder="Ej: sk_test_1234567890"
                                    className={`w-full border rounded-md p-2 outline-none ${
                                    errors.WOMPI_PRIVATE_KEY ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row gap-5">
                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">
                                    Integrity Secret <span className="text-red-500">*</span>
                                </div>
                                <input
                                    {...register("WOMPI_INTEGRITY_SECRET", { required: true })}
                                    placeholder="Ej: 1234567890"
                                    className={`w-full border rounded-md p-2 outline-none ${
                                    errors.WOMPI_INTEGRITY_SECRET ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                            </div>

                        </div>
                        <div className="w-full flex flex-col md:flex-row gap-5">
                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">
                                    Contraseña <span className="text-red-500">*</span>
                                </div>
                                <input
                                    {...register("password", {
                                    required: true,
                                    })}
                                    placeholder="Ej: contraseña"
                                    className={`w-full border rounded-md p-2 outline-none ${
                                    errors.password ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                            </div>
                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">
                                    Confirmar Contraseña <span className="text-red-500">*</span>
                                </div>
                                <input
                                    {...register("confirm_password", { required: true })}
                                    className={`w-full border rounded-md p-2 outline-none ${
                                    errors.confirm_password ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row gap-5">
                            <div className="w-full">
                                <div className="text-sm font-medium pb-0.5">
                                    Logo <span className="text-red-500">*</span>
                                </div>
                                <label
                                    htmlFor="logo-upload"
                                    className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-emerald-500 transition-colors cursor-pointer"
                                >
                                    <div className="space-y-1 text-center">
                                        {previewUrl ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <img
                                                    src={previewUrl}
                                                    alt="Logo preview"
                                                    className="w-20 h-20 object-contain"
                                                />
                                                <p className="text-sm text-gray-500">
                                                    Imagen cargada
                                                </p>
                                            </div>
                                        ) : (
                                            <>
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <span className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                                                        Sube un archivo
                                                    </span>
                                                    <p className="pl-1">o arrastra y suelta</p>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    PNG, JPG, GIF hasta 10MB
                                                </p>
                                            </>
                                        )}
                                        <input
                                            id="logo-upload"
                                            type="file"
                                            className="sr-only"
                                            accept="image/*"
                                            onChange={(e) => {
                                                register("logo_url").onChange(e);
                                                handleImageChange(e);
                                            }}
                                        />
                                    </div>
                                </label>
                                {errors.logo_url && (
                                    <span className="text-red-500 text-xs mt-1">
                                        Este campo es requerido
                                    </span>
                                )}
                            </div>
                            <div className="w-full">
                                
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

export default Suscribe;
