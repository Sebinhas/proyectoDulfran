import { IoAddSharp } from "react-icons/io5";
import  useOrders  from "./useInvoices";
import TableGlobal from "../../../components/TableData/TableGlobal";


const Invoices = () => {
    const { 
        userData,
        columns,
        handleView
    } = useOrders();

    return (
        <div className="w-full flex flex-col gap-4 p-4">
            <div className="w-full flex flex-col gap-8">
                <div className="flex flex-row items-center justify-start">
                    <div className="text-[25px] font-semibold text-gray-600">Lista de Facturas</div>
                </div>
                {/* Filtros y Búsqueda */}
                <div className="w-full flex flex-row gap-4 pb-4">
                    <div className="w-full h-14 ">
                        <div className="text-[18px] font-medium text-gray-600">Paciente</div>
                        <input 
                            type="text" 
                            placeholder="Ingrese nombre del paciente" 
                            className="w-full p-2 border border-gray-300 outline-none rounded-md" />
                    </div>
                    <div className="w-full h-14 ">
                        <div className="text-[18px] font-medium text-gray-600">Estado</div>
                        <select 
                            name="" 
                            id="" 
                            defaultValue="" 
                            className="w-full p-2 border border-gray-300 outline-none rounded-md"
                        >         
                            <option disabled value="">Seleccione un estado</option>
                            <option value="1">Activo</option>
                            <option value="2">Inactivo</option>
                        </select>
                    </div>
                    <div className="w-full h-14 ">
                        <div className="text-[18px] font-medium text-gray-600">Fecha de Creación</div>
                        <input 
                            type="date" 
                            className="w-full p-2 border border-gray-300 outline-none rounded-md" />
                    </div>
                </div>
            </div>
            <TableGlobal
                columns={columns}
                data={userData}
                itemsPerPage={4}
                actions={{
                    view: handleView,
                    // edit: handleView,
                }}
            />
        </div>
    )
}

export default Invoices;