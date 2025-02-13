const ViewDetailUser = ({ user }: { user: any | null }) => {



  useEffect(() => {
    const fetchClients = async () => {
      const clients = await getClients();
      // console.log('clients', clients);
    };
    fetchClients();
  }, []);

  if (!user) return null;

    return (
        <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-sm">
            {/* Encabezado */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Información del Usuario</h2>
                <div className="mt-1 text-sm text-gray-500">Detalles completos del perfil</div>
            </div>

            {/* Contenedor principal de la información */}
            <div className="bg-gray-50 rounded-lg p-4 shadow-inner space-y-4">
                {/* Datos Personales */}
                <div className="bg-gray-100 rounded-lg p-3">
                    <h3 className="text-base font-medium text-gray-700 mb-2">Datos Personales</h3>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="grid grid-cols-2 gap-5">
                            <div className="text-sm">
                                <span className="font-medium text-gray-500">Primer Nombre:</span>
                                <span className="ml-1 text-gray-900">{user.first_name}</span>
                            </div>
                            <div className="text-sm">
                                <span className="font-medium text-gray-500">Segundo Nombre:</span>
                                <span className="ml-1 text-gray-900">{user.second_name || '-'}</span>
                            </div>
                            <div className="text-sm">
                                <span className="font-medium text-gray-500">Primer Apellido:</span>
                                <span className="ml-1 text-gray-900">{user.last_name}</span>
                            </div>
                            <div className="text-sm">
                                <span className="font-medium text-gray-500">Segundo Apellido:</span>
                                <span className="ml-1 text-gray-900">{user.second_lastname || '-'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Información de Contacto */}
                <div className="bg-gray-100 rounded-lg p-3">
                    <h3 className="text-base font-medium text-gray-700 mb-2">Información de Contacto</h3>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="grid grid-cols-2 gap-5">
                            <div className="text-sm">
                                <span className="font-medium text-gray-500">Correo:</span>
                                <span className="ml-1 text-gray-900">{user.email}</span>
                            </div>
                            <div className="text-sm">
                                <span className="font-medium text-gray-500">Teléfono:</span>
                                <span className="ml-1 text-gray-900">{user.phone || '-'}</span>
                            </div>
                            <div className="text-sm">
                                <span className="font-medium text-gray-500">Cédula:</span>
                                <span className="ml-1 text-gray-900">{user.cedula}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detalles de la Cuenta */}
                <div className="bg-gray-100 rounded-lg p-3">
                    <h3 className="text-base font-medium text-gray-700 mb-2">Detalles de la Cuenta</h3>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="grid grid-cols-2 gap-5">
                            <div className="text-sm">
                                <span className="font-medium text-gray-500">Usuario:</span>
                                <span className="ml-1 text-gray-900">{user.username}</span>
                            </div>
                            <div className="text-sm">
                                <span className="font-medium text-gray-500">Perfil:</span>
                                <span className="ml-1">
                                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {user.profile_type}
                                    </span>
                                </span>
                            </div>
                            <div className="text-sm">
                                <span className="font-medium text-gray-500">Estado:</span>
                                <span className="ml-1">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                        user.status === 'activo' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {user.status}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetailUser;