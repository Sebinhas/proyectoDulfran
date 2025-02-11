import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import Modal from "../../../components/Modal/Modal";
import { toast } from 'react-toastify';
import { ClientsDTO } from "../../Administrator/Users/DTOUsers";

import { useNavigate } from "react-router-dom";
import { DTOPayment } from "./DTOPayment";

import { getClients, uploadExcel, createUser, getUsers } from '../../../api/axios.helper';
import Swal from 'sweetalert2';
import { useAuthStore } from "../../../hooks/authStore";
import { getInvoicesForClient } from "../../../api/axios.helper";
import {
  NumberContractCell,
  TotalCell,
  PaymentPeriodCell,
  StatusCell,
  numberInvoicesCell
}
  from './templates/cellTemplates';

  



const usePayments = () => {
  const {user} = useAuthStore();
  const currentNit = useAuthStore.getState().currentNit;
  const [isLoading, setIsLoading] = useState(true);
  // const [options, setOptions] = useState('');
  // const [user, setUser] = useState<ClientsDTO | null>(null);
  // const [dataUsers, setDataUsers] = useState<ClientsDTO[]>([]);
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<any>(null);
  const [invoicesData, setInvoicesData] = useState<any[]>([]);




  const { toggleModal: toggleModalDownloadInvoice, closeModalAction: closeModalActionDownloadInvoice, Render: RenderDownloadInvoice } = Modal({ title: 'Desacargar Factura', size: 'lg' });

  const { toggleModal: toggleModalEditInfoUser, closeModalAction: closeModalActionEditInfoUser, Render: RenderEditInfoUser } = Modal({ title: 'Editar Información' });

  const [selectedPayment, setSelectedPayment] = useState<DTOPayment | null>(null);
  const [showDetail, setShowDetail] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
        if (isLoading) {
            try {
                const response = await getInvoicesForClient();
                if (response) {
                    setInvoicesData(response);
                    console.log('invoicesData',response);
                }
            } catch (error) {
                console.error('Error fetching clients:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un error al cargar los datos',
                    icon: 'error'
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    fetchData();
}, [isLoading]);



useEffect(() => {
  
  const fetchData = async () => {
    try {
      const response = await getInvoicesForClient();
      if (response) {
      setInvoicesData(response);
    }
  } catch (error) {
    console.error('Error fetching clients:', error);
  }
  };
  fetchData();
}, []);


  const columns = [
    {
      header: 'No. Factura',
      accessor: 'no_invoice',
      cell: numberInvoicesCell
    },
    // {
    //   header: 'No. Contrato',
    //   accessor: 'numberContract',
    //   cell: NumberContractCell
    // },
    {
      header: 'Estado',
      accessor: 'status',
      cell: StatusCell
    },
    {
      header: 'Periodo',
      accessor: 'period_start',
      cell: PaymentPeriodCell
    },
    {
      header: 'Total',
      accessor: 'amount',
      cell: TotalCell
    },


  ]


  const mockPayments: DTOPayment[] = [
    {
      no_invoice: "FACT-2025-#0001",
      period_start: "2025-01-01",
      period_end: "2025-01-31",
      amount: "120000",
      status: "pendiente",
      createdAt: "2025-01-05T10:30:00.000Z",
      updatedAt: "2025-01-05T10:30:00.000Z",
      client_cedula: "1111112",
      client_first_name: "Camila",
      client_second_name: "",
      client_first_lastname: "López",
      client_second_lastname: "Molina",
      client_phone: "573217925734",
      client_email: "camila.lopez@example.com",
      admin_nit: "901844427-1"
    },
    {
      no_invoice: "FACT-2025-#0002",
      period_start: "2025-01-01",
      period_end: "2025-01-31",
      amount: "85000",
      status: "pagado",
      createdAt: "2025-01-05T11:15:00.000Z",
      updatedAt: "2025-01-15T14:20:00.000Z",
      client_cedula: "1111113",
      client_first_name: "Juan",
      client_second_name: "Carlos",
      client_first_lastname: "Martínez",
      client_second_lastname: "Ruiz",
      client_phone: "573218456789",
      client_email: "juan.martinez@example.com",
      admin_nit: "901844427-1"
    },
    {
      no_invoice: "FACT-2025-#0003",
      period_start: "2025-01-01",
      period_end: "2025-01-31",
      amount: "95000",
      status: "vencido",
      createdAt: "2025-01-06T09:00:00.000Z",
      updatedAt: "2025-02-01T00:00:00.000Z",
      client_cedula: "1111114",
      client_first_name: "Ana",
      client_second_name: "María",
      client_first_lastname: "García",
      client_second_lastname: "Pérez",
      client_phone: "573219876543",
      client_email: "ana.garcia@example.com",
      admin_nit: "901844427-1"
    },
    {
      no_invoice: "FACT-2025-#0004",
      period_start: "2025-01-01",
      period_end: "2025-01-31",
      amount: "150000",
      status: "pagado",
      createdAt: "2025-01-06T10:45:00.000Z",
      updatedAt: "2025-01-20T16:30:00.000Z",
      client_cedula: "1111115",
      client_first_name: "Pedro",
      client_second_name: "",
      client_first_lastname: "Ramírez",
      client_second_lastname: "Soto",
      client_phone: "573214567890",
      client_email: "pedro.ramirez@example.com",
      admin_nit: "901844427-1"
    },
    {
      no_invoice: "FACT-2025-#0005",
      period_start: "2025-02-01",
      period_end: "2025-02-28",
      amount: "175000",
      status: "pendiente",
      createdAt: "2025-02-05T08:20:00.000Z",
      updatedAt: "2025-02-05T08:20:00.000Z",
      client_cedula: "1111116",
      client_first_name: "Laura",
      client_second_name: "Isabel",
      client_first_lastname: "Vargas",
      client_second_lastname: "Torres",
      client_phone: "573213456789",
      client_email: "laura.vargas@example.com",
      admin_nit: "901844427-1"
    },
    {
      no_invoice: "FACT-2025-#0006",
      period_start: "2025-02-01",
      period_end: "2025-02-28",
      amount: "200000",
      status: "pendiente",
      createdAt: "2025-02-05T09:15:00.000Z",
      updatedAt: "2025-02-05T09:15:00.000Z",
      client_cedula: "1111117",
      client_first_name: "Carlos",
      client_second_name: "Alberto",
      client_first_lastname: "Mendoza",
      client_second_lastname: "Luna",
      client_phone: "573215678901",
      client_email: "carlos.mendoza@example.com",
      admin_nit: "901844427-1"
    },
    {
      no_invoice: "FACT-2025-#0007",
      period_start: "2025-02-01",
      period_end: "2025-02-28",
      amount: "145000",
      status: "pagado",
      createdAt: "2025-02-06T11:30:00.000Z",
      updatedAt: "2025-02-15T14:45:00.000Z",
      client_cedula: "1111118",
      client_first_name: "María",
      client_second_name: "Fernanda",
      client_first_lastname: "Ortiz",
      client_second_lastname: "Díaz",
      client_phone: "573216789012",
      client_email: "maria.ortiz@example.com",
      admin_nit: "901844427-1"
    },
    {
      no_invoice: "FACT-2025-#0008",
      period_start: "2025-02-01",
      period_end: "2025-02-28",
      amount: "165000",
      status: "vencido",
      createdAt: "2025-02-06T13:20:00.000Z",
      updatedAt: "2025-03-01T00:00:00.000Z",
      client_cedula: "1111119",
      client_first_name: "Ricardo",
      client_second_name: "",
      client_first_lastname: "González",
      client_second_lastname: "Herrera",
      client_phone: "573217890123",
      client_email: "ricardo.gonzalez@example.com",
      admin_nit: "901844427-1"
    },
    {
      no_invoice: "FACT-2025-#0009",
      period_start: "2025-03-01",
      period_end: "2025-03-31",
      amount: "180000",
      status: "pendiente",
      createdAt: "2025-03-05T10:00:00.000Z",
      updatedAt: "2025-03-05T10:00:00.000Z",
      client_cedula: "1111120",
      client_first_name: "Patricia",
      client_second_name: "Elena",
      client_first_lastname: "Jiménez",
      client_second_lastname: "Castro",
      client_phone: "573218901234",
      client_email: "patricia.jimenez@example.com",
      admin_nit: "901844427-1"
    },
    {
      no_invoice: "FACT-2025-#0010",
      period_start: "2025-03-01",
      period_end: "2025-03-31",
      amount: "135000",
      status: "pendiente",
      createdAt: "2025-03-05T11:45:00.000Z",
      updatedAt: "2025-03-05T11:45:00.000Z",
      client_cedula: "1111121",
      client_first_name: "Miguel",
      client_second_name: "Ángel",
      client_first_lastname: "Rojas",
      client_second_lastname: "Morales",
      client_phone: "573219012345",
      client_email: "miguel.rojas@example.com",
      admin_nit: "901844427-1"
    },
    {
      no_invoice: "FACT-2025-#0011",
      period_start: "2025-03-01",
      period_end: "2025-03-31",
      amount: "190000",
      status: "pagado",
      createdAt: "2025-03-06T09:30:00.000Z",
      updatedAt: "2025-03-15T16:20:00.000Z",
      client_cedula: "1111122",
      client_first_name: "Andrea",
      client_second_name: "Carolina",
      client_first_lastname: "Silva",
      client_second_lastname: "Medina",
      client_phone: "573210123456",
      client_email: "andrea.silva@example.com",
      admin_nit: "901844427-1"
    },
    {
      no_invoice: "FACT-2025-#0012",
      period_start: "2025-03-01",
      period_end: "2025-03-31",
      amount: "160000",
      status: "pendiente",
      createdAt: "2025-03-06T14:15:00.000Z",
      updatedAt: "2025-03-06T14:15:00.000Z",
      client_cedula: "1111123",
      client_first_name: "Diego",
      client_second_name: "Alejandro",
      client_first_lastname: "Parra",
      client_second_lastname: "Navarro",
      client_phone: "573211234567",
      client_email: "diego.parra@example.com",
      admin_nit: "901844427-1"
    }
  ];




  const handleView = (payment: DTOPayment) => {
    setSelectedPayment(payment);
    setShowDetail(true);
  };


  const handleBack = () => {
    setShowDetail(false);
    setSelectedPayment(null);
  };

  const handleMessage = (row: ClientsDTO): void => {
    toast.success(`Orden vista, estado: ${row}`);
    // navigate(`/dashboard/ordenes/${row.id}`);
  };


  const handleDownload = (row: DTOPayment): void => {
    toast.success(`Orden vista, estado: ${row}`);
    toggleModalDownloadInvoice();
    console.log('row',row);
    setInvoice(row);
  };

  useEffect(() => {
    console.log('factura final',invoice);
  }, [invoice]);


  const handlePay = (row: DTOPayment): void => {
    // toast.success(`Orden vista, estado: ${row}`);
    row.status == 'pagado'? toast.success('Factura pagada'):navigate(`/pasarela`, { state: { row } });
  };



  const handleEdit = (row: ClientsDTO): void => {
    toast.success(`Orden vista, estado: ${row.name}`);
    // setUser(row);
    console.log(row);
    toggleModalEditInfoUser();
    // navigate(`/dashboard/ordenes/${row.id}`);
  };


  return {

    columns,
    handleView,
    handleDownload,
    user,
    selectedPayment,
    showDetail,
    handleBack,
    handlePay,
    mockPayments,

    toggleModalDownloadInvoice,
    closeModalActionDownloadInvoice,
    RenderDownloadInvoice,
    invoice

  }
}

export default usePayments;
