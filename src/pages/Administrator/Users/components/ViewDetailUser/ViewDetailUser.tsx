import { useEffect } from "react";
import { getClients } from "../../../../../api/axios.helper";



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
    <div className="w-full flex flex-col gap-3 p-4">
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">Nombre Completo</div>
          <input disabled value={user.name} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>
        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">Cedula</div>
          <input disabled value={user.cedula} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>

      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">Correo</div>
          <input disabled value={user.email} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>
        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">Nombre de Usuario</div>
          <input disabled value={user.username} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">  
        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">Rol</div>
          <input disabled value={user.profile_type} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>
        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">Estado</div>
          <input disabled value={user.status} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4"> 
        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">Fecha Creacion</div>
          <input disabled value={new Date(user.createdAt).toLocaleDateString()} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>


        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">Fecha Actualizacion</div>
          <input disabled value={new Date(user.updatedAt).toLocaleDateString()} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>
      </div>

  

    </div>
  );
};

export default ViewDetailUser;