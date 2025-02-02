import { useEffect, useState } from "react";
import { NameCell, CedulaCell, ContractCell, StatusCell, EmailCell, date_contract, Users } from './templates/cellTemplates';
import { useForm } from 'react-hook-form';
import Modal from "../../../components/Modal/Modal";
import { toast } from 'react-toastify';
import { ClientsDTO } from "./DTOUser";
import { getClients, uploadExcel } from '../../../api/axios.helper';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../../hooks/authStore';

const UseUsers = () => {
  const currentNit = useAuthStore.getState().currentNit;

  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState('');
  const [user, setUser] = useState<ClientsDTO | null>(null);
  const [clients, setClients] = useState<ClientsDTO[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const { toggleModal: toggleModalUploadUser, closeModalAction: closeModalActionUploadUser, Render: RenderUploadUser } = Modal({ title: 'Subir Usuarios' });
  const { toggleModal: toggleModalViewDetailUser, closeModalAction: closeModalActionViewDetailUser, Render: RenderViewDetailUser } = Modal({ title: 'Datos Personales' });

  const { toggleModal: toggleModalEditInfoUser, closeModalAction: closeModalActionEditInfoUser, Render: RenderEditInfoUser } = Modal({ title: 'Editar Información' });

  const { register, handleSubmit, reset } = useForm<ClientsDTO>();
  

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar que sea un archivo Excel
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
          file.type === 'application/vnd.ms-excel') {
        setSelectedFile(file);
      } else {
        alert('Por favor, seleccione un archivo Excel válido (.xlsx, .xls)');
        e.target.value = ''; // Limpiar el input
      }
    }
  };



  const handleFileUpload = async (file: File) => {
    try {
        // Mostrar loading inicial
        Swal.fire({
            title: 'Subiendo archivo',
            text: 'Procesando usuarios...',
            didOpen: () => {
                Swal.showLoading();
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        });

        // Realizar el post
        const result = await uploadExcel(file);
        
        // Cerrar el loading inicial
        Swal.close();

        if (result) {
            // Mostrar resumen del proceso
            await Swal.fire({
                title: '¡Proceso Completado!',
                html: `
                    <p>${result.message}</p>
                    <p>Total procesados: ${result.totalProcessed}</p>
                    <p>Exitosos: ${result.successCount}</p>
                    <p>Errores: ${result.errorCount}</p>
                `,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });

            closeModalActionUploadUser();
            setSelectedFile(null);

            // Actualizar la lista de clientes
            try {
                const response = await getClients();
                if (response) {
                    setClients(response);
                }


            } catch (error) {
                console.error('Error al actualizar los datos:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Error al actualizar la lista de clientes',
                    icon: 'error'
                });
            }
        }
    } catch (error) {
        console.error('Error al subir archivo:', error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un error al procesar el archivo',
            icon: 'error'
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
        if (isLoading) {
            try {
                const response = await getClients();
                if (response) {
                    setClients(response);
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

  const columns = [
    {
      header: 'Contrato',
      accessor: 'no_contract',
      cell: ContractCell
    },
    {
      header: 'Nombre',
      accessor: 'first_name',
      cell: NameCell
    },
    {
      header: 'Cédula',
      accessor: 'cedula',
      cell: CedulaCell
    },
    {
      header: 'Estado',
      accessor: 'status',
      cell: StatusCell
    },
    {
      header: 'Email',
      accessor: 'email',
      cell: EmailCell
    },
    {
      header: 'Fecha de Creación',
      accessor: 'date_contract',
      cell: date_contract
    },


  ]

  const handleView = (row: ClientsDTO): void => {
    toast.success(`Orden vista, estado: ${row.status}`);
    // console.log(row);
    setUser(row);
    toggleModalViewDetailUser();
    // navigate(`/dashboard/ordenes/${row.id}`);
  };

  const handleMessage = (row: ClientsDTO): void => {
    toast.success(`Orden vista, estado: ${row.status}`);
    // navigate(`/dashboard/ordenes/${row.id}`);
  };

  const handleDownload = (row: ClientsDTO): void => {
    toast.success(`Orden vista, estado: ${row.status}`);
    // navigate(`/dashboard/ordenes/${row.id}`);
  };

  const handleEdit = (row: ClientsDTO): void => {
    toast.success(`Orden vista, estado: ${row.status}`);
    setUser(row);
    console.log(row);
    toggleModalEditInfoUser();
    // navigate(`/dashboard/ordenes/${row.id}`);
  };

  return {
    columns,
    clients,
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
    toggleModalViewDetailUser,
    closeModalActionViewDetailUser,
    RenderViewDetailUser,
    toggleModalEditInfoUser,
    closeModalActionEditInfoUser,
    RenderEditInfoUser,
    user,
    handleFileChange,
    handleFileUpload,
    selectedFile,
    setSelectedFile
  }
}

export default UseUsers;
