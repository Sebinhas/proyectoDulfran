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
      accessor: 'numberInvoices',
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
      accessor: 'paymentPeriod',
      cell: PaymentPeriodCell
    },
    {
      header: 'Total',
      accessor: 'total',
      cell: TotalCell
    },


  ]


  const mockPayments: DTOPayment[] = [
    {
      numberInvoices: 1,
      numberContract: "FAC-2024-001",
      total: 120000,
      paymentPeriod: "01/03/2024 - 31/03/2024",
      status: "pagado"

    },
    {
      numberInvoices: 2,
      numberContract: "FAC-2024-001",
      total: 85000,
      paymentPeriod: "01/04/2024 - 31/04/2024",
      status: "pagado"
    },

    {
      numberInvoices: 3,
      numberContract: "FAC-2024-001",
      total: 90000,
      paymentPeriod: "01/05/2024 - 31/05/2024",
      status: "pagado"



    },
    {
      numberInvoices: 4,
      numberContract: "FAC-2024-001",
      total: 110000,
      paymentPeriod: "01/06/2024 - 31/06/2024",
      status: "vencido"
    },

    {
      numberInvoices: 5,
      numberContract: "FAC-2024-001",
      total: 80000,
      paymentPeriod: "01/07/2024 - 31/07/2024",
      status: "pendiente"
    },

    {
      numberInvoices: 6,
      numberContract: "FAC-2024-001",
      total: 85000,
      paymentPeriod: "01/08/2024 - 31/08/2024",
      status: "pendiente"


    },




    

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


  const handleDownload = (row: any): void => {
    toast.success(`Orden vista, estado: ${row}`);
    toggleModalDownloadInvoice();
    console.log('row',row);
    // Inicializar invoice si es null
    const invoiceData = {
      client_cedula: user?.documentNumber || '',
      email: user?.email || '',
      name: user?.name || '',
      nit: user?.nit || '',
      phone: user?.phone || ''
    };

    setInvoice(invoiceData);

    const invoiceFinal = {
      ...row,
      ...invoiceData
    };

    setInvoice(invoiceFinal);
  };

  useEffect(() => {
    console.log('factura final',invoice);
  }, [invoice]);


  const handlePay = (row: ClientsDTO): void => {
    toast.success(`Orden vista, estado: ${row}`);
    navigate(`/pasarela`, { state: { row } });
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
