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
import {
  NumberContractCell,
  TotalCell,
  PaymentPeriodCell,
  StatusCell,
  numberInvoicesCell
}
  from './templates/cellTemplates';




const usePayments = () => {
  const currentNit = useAuthStore.getState().currentNit;
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState('');
  const [user, setUser] = useState<ClientsDTO | null>(null);
  const [dataUsers, setDataUsers] = useState<ClientsDTO[]>([]);
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);



  const { toggleModal: toggleModalUploadUser, closeModalAction: closeModalActionUploadUser, Render: RenderUploadUser } = Modal({ title: 'Subir Usuarios' });
  const { toggleModal: toggleModalViewDetailUser, closeModalAction: closeModalActionViewDetailUser, Render: RenderViewDetailUser } = Modal({ title: 'Datos Personales' });

  const { toggleModal: toggleModalEditInfoUser, closeModalAction: closeModalActionEditInfoUser, Render: RenderEditInfoUser } = Modal({ title: 'Editar Información' });

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ClientsDTO>();

  const [selectedPayment, setSelectedPayment] = useState<DTOPayment | null>(null);
  const [showDetail, setShowDetail] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
        if (isLoading) {
            try {
                const response = await getUsers();
                if (response) {
                    setDataUsers(response);
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

  const onSubmit = async (data: ClientsDTO) => {
    try {
      // Mostrar loading mientras se procesa
      Swal.fire({
        title: 'Creando usuario',
        text: 'Por favor espere...',
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false
      });

      const nit = currentNit || 0;
      data.admin_nit = nit;
      const response = await createUser(data);

      // Cerrar el loading
      Swal.close();

      if (response) {
        // Mostrar mensaje de éxito
        await Swal.fire({
          title: '¡Usuario Creado!',
          text: 'El usuario ha sido creado exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        // Cerrar el modal y limpiar el formulario
        closeModalActionUploadUser();
        reset();

        // Actualizar la lista de usuarios
        try {
          const updatedUsers = await getUsers();
          if (updatedUsers) {
            setDataUsers(updatedUsers);
          }
        } catch (error) {
          console.error('Error al actualizar la lista:', error);
          Swal.fire({
            title: 'Error',
            text: 'Error al actualizar la lista de usuarios',
            icon: 'error'
          });
        }
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al crear el usuario',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };





  const columns = [
    {
      header: 'No. Factura',
      accessor: 'numberInvoices',
      cell: numberInvoicesCell
    },
    {
      header: 'No. Contrato',
      accessor: 'numberContract',
      cell: NumberContractCell
    },
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
      total: 85000,
      paymentPeriod: "01/03/2024 - 31/03/2024",
      status: "pendiente"

    },
    {
      numberInvoices: 2,
      numberContract: "FAC-2024-001",
      total: 85000,
      paymentPeriod: "01/04/2024 - 31/04/2024",
      status: "pendiente"
    },

    {
      numberInvoices: 3,
      numberContract: "FAC-2024-001",
      total: 85000,
      paymentPeriod: "01/05/2024 - 31/05/2024",
      status: "pendiente"


    },
    {
      numberInvoices: 4,
      numberContract: "FAC-2024-001",
      total: 85000,
      paymentPeriod: "01/06/2024 - 31/06/2024",
      status: "pendiente"
    },

    {
      numberInvoices: 5,
      numberContract: "FAC-2024-001",
      total: 85000,
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


  const handleDownload = (row: ClientsDTO): void => {
    toast.success(`Orden vista, estado: ${row}`);
    // navigate(`/dashboard/ordenes/${row.id}`);
  };

  const handlePay = (row: ClientsDTO): void => {
    toast.success(`Orden vista, estado: ${row}`);
    navigate(`/pasarela`, { state: { row } });
  };



  const handleEdit = (row: ClientsDTO): void => {
    toast.success(`Orden vista, estado: ${row.name}`);
    setUser(row);
    console.log(row);
    toggleModalEditInfoUser();
    // navigate(`/dashboard/ordenes/${row.id}`);
  };


  return {
    columns,
    dataUsers,
    isLoading,
    setIsLoading,
    handleView,
    handleMessage,
    handleDownload,

    handleEdit,
    toggleModalUploadUser,
    closeModalActionUploadUser,
    RenderUploadUser,
    register,
    handleSubmit,
    reset,
    onSubmit,
    errors,
    toggleModalViewDetailUser,
    closeModalActionViewDetailUser,
    RenderViewDetailUser,
    toggleModalEditInfoUser,
    closeModalActionEditInfoUser,
    RenderEditInfoUser,
    handlePay,


    user,
    selectedFile,
    setSelectedFile,
    selectedPayment,
    showDetail,
    handleBack,
    mockPayments



  }
}

export default usePayments;
