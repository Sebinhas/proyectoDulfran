import { IoAddSharp } from "react-icons/io5";
import TableGlobal from "../../../components/TableData/TableGlobal";
import useContracts from "./useContracts";
import { ContractDTO } from './templates/cellTemplates';
import CreateContractModal from "./components/createContractModal/CreateContractModal";

const Contracts = () => {
  const { isOpen, setIsOpen } = useContracts();
  const contracts: ContractDTO[] = [
    {
      no_contract: "CON-001",
      client_name: "Juan Pérez Martínez",
      status: "activo",
      speed_plan: "50",
      createdAt: "2024-03-15T10:30:00"
    },
    {
      no_contract: "CON-002",
      client_name: "María González López",
      status: "suspendido",
      speed_plan: "100",
      createdAt: "2024-03-14T15:45:00"
    },
    {
      no_contract: "CON-003",
      client_name: "Carlos Rodríguez Silva",
      status: "activo",
      speed_plan: "200",
      createdAt: "2024-03-13T09:20:00"
    },
    {
      no_contract: "CON-004",
      client_name: "Ana Torres Ruiz",
      status: "inactivo",
      speed_plan: "20",
      createdAt: "2024-03-12T14:15:00"
    },
    {
      no_contract: "CON-005",
      client_name: "Luis Morales Vega",
      status: "activo",
      speed_plan: "150",
      createdAt: "2024-03-11T11:00:00"
    }
  ];
  const { columns } = useContracts();
  return (
    <div className="w-full flex flex-col gap-4 p-4">
      
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-row items-center justify-between">
          <div className="text-[25px] font-semibold text-gray-600">Lista de Contratos</div>
          <div  onClick={() => setIsOpen(true)} className="w-52 h-12 flex flex-row items-center justify-center gap-2 rounded-md cursor-pointer select-none hover:bg-gray-600 bg-gray-500">
            <IoAddSharp className="text-3xl text-white" />
            <div  className="text-[18px]  text-white">Crear Contrato</div>
          </div>
        </div>
      </div>

      <TableGlobal
        columns={columns || []}
        data={contracts || []}
        itemsPerPage={8}
        actions={{
          view: (row) => ()=>{},
          download: (row) => ()=>{},
        }}
        filters={{
          
        }}
      />
      {isOpen && (
        <CreateContractModal 
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  )
};

export default Contracts;


