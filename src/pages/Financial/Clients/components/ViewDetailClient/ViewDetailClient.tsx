import { useEffect } from "react";
import { ClientsDTO } from "../../DTOClients"; 
import { getClients } from "../../../../../api/axios.helper";


const ViewDetailUser = ({ user }: { user: ClientsDTO | null }) => {


  useEffect(() => {
    const fetchClients = async () => {
      const clients = await getClients();
      console.log('clients', clients);
    };
    fetchClients();
  }, []);

  if (!user) return null;

  return (
    <div className="w-full flex flex-col gap-3 p-4">
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">Nombre de Usuario</div>
          <input disabled value={user.username} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>
        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">Contraseña</div>
          <input disabled value={user.password} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">Primer Nombre</div>
          <input disabled value={user.first_name} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>
        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">Segundo Nombre</div>
          <input disabled value={user.second_name} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">Primer Apellido</div>
          <input disabled value={user.first_lastname} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>
        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">Segundo Apellido</div>
          <input disabled value={user.second_lastname} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">Cedula</div>
          <input disabled value={user.cedula} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>
        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">Telefono</div>
          <input disabled value={user.phone} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">Correo</div>
          <input disabled value={user.email} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>
        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">No. Contrato</div>
          <input disabled value={user.no_contract} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">Fecha Contrato</div>
          <input disabled value={user.date_contract} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>
        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">Estado</div>
          <input disabled value={user.status} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">Direccion</div>
          <input disabled value={user.address} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>
        <div className="w-full">
          <div className="text-sm font-medium pb-0.5">Fecha Creacion</div>
          <input disabled value={user.createdAt} className=" w-full border rounded-md p-2 outline-none border-gray-300 " />
        </div>
      </div>
  
    </div>
  );
};

export default ViewDetailUser;