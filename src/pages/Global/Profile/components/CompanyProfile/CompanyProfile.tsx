import { GoPencil, GoCheck, GoX } from "react-icons/go";
import { useCompanyProfile } from './useCompanyProfile';

interface CompanyData {
    address: string;
    phone: string;
    email: string;
    location: string;
    nit: string;
    name: string;
    logo_url?: string;
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
        getCompanyInitials
    } = useCompanyProfile(company);

    return (
        <div className="w-full bg-white rounded-lg p-6">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h2 className="text-2xl font-semibold">Perfil de Empresa</h2>
                    <p className="text-gray-500">Gestiona la información de tu empresa</p>
                </div>
                {isEditing ? (
                    <div className="flex gap-2">
                        <button 
                            onClick={handleSave}
                            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-green-50 text-green-600 border-green-600"
                        >
                            <GoCheck /> Guardar
                        </button>
                        <button 
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-red-50 text-red-600 border-red-600"
                        >
                            <GoX /> Cancelar
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
    );
};

export default CompanyProfile;