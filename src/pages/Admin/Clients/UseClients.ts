import { useEffect, useState } from "react";
import { NameCell, CedulaCell, UsernameCell, StatusCell, EmailCell, date_createdAt, date_updatedAt, profile_type } from './templates/cellTemplates';
import { useForm } from 'react-hook-form';
import Modal from "../../../components/Modal/Modal";
import { toast } from 'react-toastify';
import { ClientsDTO } from "./DTOClients";


import { getClients, uploadExcel, createUser, getUsers } from '../../../api/axios.helper';
import Swal from 'sweetalert2';
import { useAuthStore } from "../../../hooks/authStore";



const UseClients = () => {
  const currentNit = useAuthStore.getState().currentNit;
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState('');
  const [user, setUser] = useState<ClientsDTO | null>(null);
  const [dataUsers, setDataUsers] = useState<ClientsDTO[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);



  const { toggleModal: toggleModalUploadUser, closeModalAction: closeModalActionUploadUser, Render: RenderUploadUser } = Modal({ title: 'Subir Usuarios' });
  const { toggleModal: toggleModalViewDetailUser, closeModalAction: closeModalActionViewDetailUser, Render: RenderViewDetailUser } = Modal({ title: 'Datos Personales' });

  const { toggleModal: toggleModalEditInfoUser, closeModalAction: closeModalActionEditInfoUser, Render: RenderEditInfoUser } = Modal({ title: 'Editar Información' });

  const { register, handleSubmit, reset, setValue } = useForm<ClientsDTO>();

  const onSubmit = async (data: ClientsDTO) => {
    const nit = currentNit || 0;
    setValue('admin_nit', nit);
    console.log(data);
    try {


      const response = await createUser(data);
      console.log(response);
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }



  }



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

  const columns = [
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
      header: 'Nombre de Usuario',
      accessor: 'username',
      cell: UsernameCell
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
      header: 'Tipo de Perfil',
      accessor: 'profile_type',
      cell: profile_type
    },
    {
      header: 'Fecha de Creación',
      accessor: 'createdAt',
      cell: date_createdAt
    },

    {
      header: 'Fecha de Actualización',
      accessor: 'updatedAt',
      cell: date_updatedAt
    },
    


  ]

  const handleView = (row: ClientsDTO): void => {
    toast.success(`Orden vista, estado: ${row}`);
    // console.log(row);
    setUser(row);
    toggleModalViewDetailUser();
    // navigate(`/dashboard/ordenes/${row.id}`);
  };

  const handleMessage = (row: ClientsDTO): void => {
    toast.success(`Orden vista, estado: ${row}`);
    // navigate(`/dashboard/ordenes/${row.id}`);
  };


  const handleDownload = (row: ClientsDTO): void => {
    toast.success(`Orden vista, estado: ${row}`);
    // navigate(`/dashboard/ordenes/${row.id}`);
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
    toggleModalViewDetailUser,
    closeModalActionViewDetailUser,
    RenderViewDetailUser,
    toggleModalEditInfoUser,
    closeModalActionEditInfoUser,
    RenderEditInfoUser,

    user,
    selectedFile,
    setSelectedFile


  }
}

export default UseClients;
