import { GoPencil} from "react-icons/go";
import { useUserProfile } from './useUserProfile';

interface BaseUser {
    cedula?: string;
    first_name?: string;
    second_name?: string;
    last_name?: string;
    second_lastname?: string;
    email: string;
    phone: string;
    profile_type: string;
    no_contract?: string;
    address?: string;
    speed_plan?: string;
    stratum?: string;
    trust_value?: number;
}

// interface AdminUser extends BaseUser {
//     profile_type: 'soporte' | 'administrativo';
// }

// interface ClientUser extends BaseUser {
//     profile_type: 'cliente';
//     no_contract: string;
//     address: string;
//     speed_plan: string;
//     stratum: string;
//     trust_value: number;
// }

interface Props {
    user: BaseUser;
}

const UserProfile = ({ user }: Props) => {
    const {
        isEditing,
        editForm,
        showPasswordForm,
        setIsEditing,
        setShowPasswordForm,
        handleChange,
        handleSave,
        handleCancel,
        getInitials,
        getFullName,
        isClient,
        handlePasswordSubmit,
        isLoading
    } = useUserProfile({ user });

    return (
        <div className="flex flex-col gap-4">
            <div className="w-full bg-white rounded-lg p-6">
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <h2 className="text-2xl font-semibold">Perfil de Usuario</h2>
                        <p className="text-gray-500">Gestiona tu información personal</p>
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
                            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                        >
                            Editar Perfil
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-4 my-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 shadow-inner border-2 border-white">
                            <span className="text-3xl font-bold text-indigo-600">
                                {getInitials(getFullName(user))}
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-xl font-semibold">{getFullName(user)}</h3>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cédula</label>
                        <input 
                            type="text" 
                            value={user.cedula} 
                            disabled 
                            className="w-full p-2 border rounded-lg bg-gray-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                        <input 
                            type="text" 
                            value={getFullName(user)} 
                            disabled 
                            className="w-full p-2 border rounded-lg bg-gray-50"
                        />
                    </div>

                    {isClient(user) && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">No. Contrato</label>
                                <input 
                                    type="text" 
                                    value={user.no_contract} 
                                    disabled 
                                    className="w-full p-2 border rounded-lg bg-gray-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                                <input 
                                    type="text" 
                                    value={user.address} 
                                    disabled 
                                    className="w-full p-2 border rounded-lg bg-gray-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Plan de Velocidad</label>
                                <input 
                                    type="text" 
                                    value={user.speed_plan} 
                                    disabled 
                                    className="w-full p-2 border rounded-lg bg-gray-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Estrato</label>
                                <input 
                                    type="text" 
                                    value={user.stratum} 
                                    disabled 
                                    className="w-full p-2 border rounded-lg bg-gray-50"
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                        <input 
                            type="tel" 
                            name="phone"
                            value={editForm.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-gray-200 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
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
                            className={`w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-gray-200 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                        />
                    </div>
                </div>
            </div>

            <div className="w-full bg-white rounded-lg p-6">
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

export default UserProfile;