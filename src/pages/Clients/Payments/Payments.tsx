import { IoAddSharp, IoCloudUploadOutline, IoDocumentOutline, IoEyeOutline, IoEyeOffOutline, IoArrowBack } from "react-icons/io5";
import usePayments from "./usePayments";
import TableGlobal from "../../../components/TableData/TableGlobal";
import { useEffect, useState } from "react";
import ViewDetailUser from "../../Administrator/Users/components/ViewDetailUser/ViewDetailUser";
import { ClientsDTO } from "../../Administrator/Users/DTOUsers";
import { uploadExcel } from "../../../api/axios.helper";
import ViewPaymentDetail from "./viewPaymentsDetail/viewPaymentsDetails";

import { toast } from "react-toastify";



const Payments = () => {

  const mockPayments = [
    {
      id: 1,
      invoice_number: "FAC-2024-001",
      client: {
        first_name: "Juan",
        second_name: "Carlos",
        first_lastname: "Pérez",
        second_lastname: "Gómez",
        cedula: "1234567890",
        no_contract: "CON-2024-001",
      },
      amount: 85000,
      payment_date: "2024-03-15",
      due_date: "2024-03-20",
      status: "pendiente",
      payment_method: "PSE",
      period: "Marzo 2024",
      speed_plan: "50 MB",
      invoice_url: "https://example.com/facturas/FAC-2024-001.pdf"
    },
    {
      id: 2,
      invoice_number: "FAC-2024-002",
      client: {
        first_name: "María",
        second_name: "Fernanda",
        first_lastname: "González",
        second_lastname: "López",
        cedula: "2345678901",
        no_contract: "CON-2024-002",
      },
      amount: 120000,
      payment_date: "2024-03-10",
      due_date: "2024-03-15",
      status: "pagado",
      payment_method: "Tarjeta de Crédito",
      period: "Marzo 2024",
      speed_plan: "100 MB",
      invoice_url: "https://example.com/facturas/FAC-2024-002.pdf"
    },
    {
      id: 3,
      invoice_number: "FAC-2024-003",
      client: {
        first_name: "Pedro",
        second_name: "",
        first_lastname: "Ramírez",
        second_lastname: "Silva",
        cedula: "3456789012",
        no_contract: "CON-2024-003",
      },
      amount: 150000,
      payment_date: null,
      due_date: "2024-03-25",
      status: "vencido",
      payment_method: null,
      period: "Marzo 2024",
      speed_plan: "200 MB",
      invoice_url: "https://example.com/facturas/FAC-2024-003.pdf"
    },
    {
      id: 4,
      invoice_number: "FAC-2024-004",
      client: {
        first_name: "Ana",
        second_name: "María",
        first_lastname: "Castro",
        second_lastname: "Ruiz",
        cedula: "4567890123",
        no_contract: "CON-2024-004",
      },
      amount: 65000,
      payment_date: "2024-03-05",
      due_date: "2024-03-10",
      status: "pagado",
      payment_method: "Efectivo",
      period: "Marzo 2024",
      speed_plan: "30 MB",
      invoice_url: "https://example.com/facturas/FAC-2024-004.pdf"
    },
    {
      id: 5,
      invoice_number: "FAC-2024-005",
      client: {
        first_name: "Luis",
        second_name: "Alberto",
        first_lastname: "Mendoza",
        second_lastname: "Torres",
        cedula: "5678901234",
        no_contract: "CON-2024-005",
      },
      amount: 135000,
      payment_date: null,
      due_date: "2024-03-18",
      status: "pendiente",
      payment_method: null,
      period: "Marzo 2024",
      speed_plan: "150 MB",
      invoice_url: "https://example.com/facturas/FAC-2024-005.pdf"
    },
    {
      id: 6,
      invoice_number: "FAC-2024-006",
      client: {
        first_name: "Carmen",
        second_name: "Elena",
        first_lastname: "Vargas",
        second_lastname: "Díaz",
        cedula: "6789012345",
        no_contract: "CON-2024-006",
      },
      amount: 95000,
      payment_date: "2024-02-28",
      due_date: "2024-03-05",
      status: "pagado",
      payment_method: "PSE",
      period: "Marzo 2024",
      speed_plan: "80 MB",
      invoice_url: "https://example.com/facturas/FAC-2024-006.pdf"
    }
  ];

  const [showPassword, setShowPassword] = useState(false);

  const {
    setIsLoading,
    isLoading,
    dataUsers,
    columns,
    handleView,
    handleEdit,
    handleMessage,
    handleDownload,
    onSubmit,
    toggleModalUploadUser,
    closeModalActionUploadUser,
    RenderUploadUser,
    toggleModalViewDetailUser,
    closeModalActionViewDetailUser,
    RenderViewDetailUser,
    toggleModalEditInfoUser,
    closeModalActionEditInfoUser,
    RenderEditInfoUser,
    user,
    register,
    handleSubmit,
    reset,
    errors,
    selectedPayment,
    showDetail,
    handleBack,
  } = usePayments();



  useEffect(() => {
    console.log(user);
  }, [user]);


  


  return (
    <div className="w-full h-full flex flex-col gap-4 p-4 overflow-hidden">
      {!showDetail ? (
        <>
          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-row items-center justify-start">
              <div className="text-[25px] font-semibold text-gray-600">
                Lista de Pagos
              </div>
            </div>
          </div>

          <div className="overflow-auto flex-1">
            <TableGlobal
              columns={columns}
              data={mockPayments ?? []}
              itemsPerPage={8}
              actions={{
                view: (row) => handleView(row),
                download: (row) => handleDownload(row)
              }}
              filters={{
                status: true,
              }}
            />
          </div>
        </>
      ) : (
        <div className="w-full h-full overflow-auto">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <IoArrowBack className="text-xl" />
            <span>Volver a la lista</span>
          </button>
          
          <ViewPaymentDetail payment={selectedPayment} />
        </div>
      )}
    </div>
  )
}

export default Payments;