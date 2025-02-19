import { GoPencil, GoCheck, GoX } from "react-icons/go";
import { useCompanyProfile } from './useCompanyProfile';
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { useState } from "react";

interface CompanyData {
    address: string;
    phone: string;
    email: string;
    location: string;
    nit: string;
    name: string;
    logo_url?: string;
    wompi_public_key?: string;
    wompi_private_key?: string;
    wompi_integrity_secret?: string;
    prod_wompi_public_key?: string;
    prod_wompi_private_key?: string;
    prod_wompi_integrity_secret?: string;
}

interface Props {
    company: CompanyData;
}

const CompanyProfile = ({ company }: Props) => {
    const {
        isEditing,
        editForm,
        setIsEditing,
        handleChange,
        handleSave,
        handleCancel,
        getCompanyInitials,
        showPasswordForm,
        setShowPasswordForm,
        handlePasswordSubmit,
        isLoading,
        register,
        errors
    } = useCompanyProfile(company);

    const [showKeys, setShowKeys] = useState({
        wompi_public_key: false,
        wompi_private_key: false,
        wompi_integrity_secret: false,
        prod_wompi_public_key: false,
        prod_wompi_private_key: false,
        prod_wompi_integrity_secret: false
    });


    const toggleVisibility = (field: keyof typeof showKeys) => {
        setShowKeys(prev => ({ ...prev, [field]: !prev[field] }));
    };


    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full bg-white rounded-lg p-6 shadow-md shadow-gray-300">
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <h2 className="text-2xl font-semibold">Perfil de Empresa</h2>
                        <p className="text-gray-500">Gestiona la información de tu empresa</p>
                    </div>
                    {isEditing ? (
                        <div className="flex gap-2">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isLoading}
                                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                            >
                                {isLoading ? 'Guardando...' : 'Guardar cambios'}
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                        >
                            <GoPencil /> Editar Perfil
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-4 my-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 shadow-inner border-2 border-white">
                            <span className="text-3xl font-bold text-indigo-600">
                                {getCompanyInitials(company.name)}
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-xl font-semibold">{company.name}</h3>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Empresa</label>
                        <input
                            type="text"
                            value={company.name}
                            disabled
                            className="w-full p-2 border rounded-lg bg-gray-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">NIT</label>
                        <input
                            type="text"
                            value={company.nit}
                            disabled
                            className="w-full p-2 border rounded-lg bg-gray-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                        <input
                            type="text"
                            value={company.address}
                            disabled
                            className="w-full p-2 border rounded-lg bg-gray-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                        <input
                            type="text"
                            value={company.location}
                            disabled
                            className="w-full p-2 border rounded-lg bg-gray-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                        <input
                            type="tel"
                            name="phone"
                            value={editForm.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full p-2 border rounded-lg ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={editForm.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full p-2 border rounded-lg ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                        />
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md shadow-gray-300">
                <section>
                    <h2 className="text-2xl font-semibold text-[#101C42] mb-6 pb-2 border-b border-[#e5e9f5]">
                        Credenciales Wompi (Desarrollo)
                    </h2>
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                        <p className="text-sm text-blue-800">
                            Estas son las credenciales de prueba para el ambiente de
                            desarrollo.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Public Key (Desarrollo) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    {...register("wompi_public_key", {
                                        required: "La Public Key es requerida",
                                        pattern: {
                                            value: /^pub_test_[A-Za-z0-9]+$/,
                                            message: "Formato de Public Key inválido"
                                        }
                                    })}
                                    type={showKeys.wompi_public_key ? "text" : "password"}
                                    placeholder="pub_test_..."
                                    className="w-full p-3 pr-10 border rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleVisibility('wompi_public_key')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#101C42]"
                                >
                                    {showKeys.wompi_public_key ?
                                        <MdVisibilityOff className="w-5 h-5" /> :
                                        <MdVisibility className="w-5 h-5" />
                                    }
                                </button>
                            </div>
                            {errors.wompi_public_key && (
                                <span className="text-red-500 text-xs mt-1">
                                    {errors.wompi_public_key.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Private Key (Desarrollo) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    {...register("wompi_private_key", {
                                        required: "La Private Key es requerida",
                                        pattern: {
                                            value: /^prv_test_[A-Za-z0-9]+$/,
                                            message: "Formato de Private Key inválido"
                                        }
                                    })}
                                    type={showKeys.wompi_private_key ? "text" : "password"}
                                    placeholder="prv_test_..."
                                    className="w-full p-3 pr-10 border rounded-lg "
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleVisibility('wompi_private_key')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#101C42]"
                                >
                                    {showKeys.wompi_private_key ?
                                        <MdVisibilityOff className="w-5 h-5" /> :
                                        <MdVisibility className="w-5 h-5" />
                                    }
                                </button>
                            </div>
                            {errors.wompi_private_key && (
                                <span className="text-red-500 text-xs mt-1">
                                    {errors.wompi_private_key.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Integrity Secret (Desarrollo) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    {...register("wompi_integrity_secret", {
                                        required: "El Integrity Secret es requerido",
                                        minLength: {
                                            value: 10,
                                            message: "El Integrity Secret debe tener al menos 10 caracteres"
                                        }
                                    })}
                                    type={showKeys.wompi_integrity_secret ? "text" : "password"}
                                    placeholder="test_integrity_..."
                                    className="w-full p-3 pr-10 border rounded-lg "
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleVisibility('wompi_integrity_secret')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#101C42]"
                                >
                                    {showKeys.wompi_integrity_secret ?
                                        <MdVisibilityOff className="w-5 h-5" /> :
                                        <MdVisibility className="w-5 h-5" />
                                    }
                                </button>
                            </div>
                            {errors.wompi_integrity_secret && (
                                <span className="text-red-500 text-xs mt-1">
                                    {errors.wompi_integrity_secret.message}
                                </span>
                            )}
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-[#101C42] mb-6 pb-2 border-b border-[#e5e9f5]">
                        Credenciales Wompi (Producción)
                    </h2>
                    <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
                        <p className="text-sm text-yellow-800">
                            Estas son las credenciales para el ambiente de producción.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Public Key (Producción)
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    {...register("prod_wompi_public_key", {
                                        required: "La Public Key es requerida",
                                        pattern: {
                                            value: /^pub_prod_[A-Za-z0-9]+$/,
                                            message: "Formato de Public Key inválido"
                                        }
                                    })}
                                    type={showKeys.prod_wompi_public_key ? "text" : "password"}
                                    placeholder="pub_prod_..."
                                    className="w-full p-3 pr-10 border rounded-lg "
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleVisibility('prod_wompi_public_key')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#101C42]"
                                >
                                    {showKeys.prod_wompi_public_key ?
                                        <MdVisibilityOff className="w-5 h-5" /> :
                                        <MdVisibility className="w-5 h-5" />
                                    }
                                </button>
                            </div>
                            {errors.prod_wompi_public_key && (
                                <span className="text-red-500 text-xs mt-1">
                                    {errors.prod_wompi_public_key.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Private Key (Producción)
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    {...register("prod_wompi_private_key", {
                                        required: "La Private Key es requerido",
                                        minLength: {
                                            value: 10,
                                            message: "El Private Key debe tener al menos 10 caracteres"
                                        }
                                    })}
                                    type={showKeys.prod_wompi_private_key ? "text" : "password"}
                                    placeholder="prv_prod_..."
                                    className="w-full p-3 pr-10 border rounded-lg "
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleVisibility('prod_wompi_private_key')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#101C42]"
                                >
                                    {showKeys.prod_wompi_private_key ?
                                        <MdVisibilityOff className="w-5 h-5" /> :
                                        <MdVisibility className="w-5 h-5" />
                                    }
                                </button>
                            </div>
                            {errors.prod_wompi_private_key && (
                                <span className="text-red-500 text-xs mt-1">
                                    {errors.prod_wompi_private_key.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Integrity Secret (Producción)
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    {...register("prod_wompi_integrity_secret", {
                                        required: "El Integrity Secret es requerido",
                                        minLength: {
                                            value: 10,
                                            message: "El Integrity Secret debe tener al menos 10 caracteres"
                                        }
                                    })}
                                    type={showKeys.prod_wompi_integrity_secret ? "text" : "password"}
                                    placeholder="prod_integrity_..."
                                    className="w-full p-3 pr-10 border rounded-lg "
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleVisibility('prod_wompi_integrity_secret')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#101C42]"
                                >
                                    {showKeys.prod_wompi_integrity_secret ?
                                        <MdVisibilityOff className="w-5 h-5" /> :
                                        <MdVisibility className="w-5 h-5" />
                                    }
                                </button>
                            </div>
                            {errors.prod_wompi_integrity_secret && (
                                <span className="text-red-500 text-xs mt-1">
                                    {errors.prod_wompi_integrity_secret.message}
                                </span>
                            )}
                        </div>
                    </div>
                </section>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2  text-white rounded-lg transition-colors duration-200 bg-gray-800 hover:bg-gray-700"
                    >
                        Guardar Cambios
                    </button>
                </div>

            </div>
            <div className="w-full bg-white rounded-lg p-6 shadow-md shadow-gray-300">
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <h2 className="text-2xl font-semibold">Cambiar Contraseña</h2>
                        <p className="text-gray-500">Actualiza tu contraseña para mantener tu cuenta segura</p>
                    </div>
                    {!showPasswordForm && (
                        <button
                            onClick={() => setShowPasswordForm(true)}
                            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                        >
                            <GoPencil /> Cambiar Contraseña
                        </button>
                    )}
                </div>

                {showPasswordForm ? (
                    <div className="mt-4">
                        <form onSubmit={handlePasswordSubmit} className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nueva Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirmar Nueva Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
                                />
                            </div>
                            <div className="col-span-2 flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordForm(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="mt-4">
                        <p className="text-gray-600">
                            Tu contraseña está segura. Puedes cambiarla cuando lo necesites.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanyProfile;