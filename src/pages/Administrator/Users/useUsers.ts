import { useEffect, useState } from "react";
import { NameCell, CedulaCell, UsernameCell, StatusCell, EmailCell, date_createdAt, profile_type } from './templates/cellTemplates';
import { useForm } from 'react-hook-form';
import Modal from "../../../components/Modal/Modal";
import { toast } from 'react-toastify';
import { ClientsDTO } from "./DTOUsers";


import { createUser, getUsers } from '../../../api/axios.helper';
  import Swal from 'sweetalert2';



const useUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<ClientsDTO | null>(null);
  const [dataUsers, setDataUsers] = useState<ClientsDTO[]>([]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);



  const { toggleModal: toggleModalUploadUser, closeModalAction: closeModalActionUploadUser, Render: RenderUploadUser } = Modal({ title: 'Subir Usuarios' });
  const { toggleModal: toggleModalViewDetailUser, closeModalAction: closeModalActionViewDetailUser, Render: RenderViewDetailUser } = Modal({ title: 'Datos Personales' });

  const { toggleModal: toggleModalEditInfoUser, closeModalAction: closeModalActionEditInfoUser, Render: RenderEditInfoUser } = Modal({ title: 'Editar Información' });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ClientsDTO>();

  const onSubmit = async (data: ClientsDTO) => {
    try {
      // Mostrar loading mientras se procesa
      Swal.fire({
        title: 'Creando usuario',
        text: 'Por favor espere...',
        didOpen: () => {
          Swal.showLoading(null);
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false
      });
      
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

    // {
    //   header: 'Fecha de Actualización',
    //   accessor: 'updatedAt',
    //   cell: date_updatedAt
    // },
    


  ]

  const handleView = (row: ClientsDTO): void => {
    setUser(row);
    toggleModalViewDetailUser();
  };

  const handleMessage = (row: ClientsDTO): void => {
    toast.success(`Orden vista, estado: ${row}`);
  };


  const handleDownload = (row: ClientsDTO): void => {
    toast.success(`Orden vista, estado: ${row}`);
  };


  const handleEdit = (row: ClientsDTO): void => {
    setUser(row);
    toggleModalEditInfoUser();
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



    user,
    selectedFile,
    setSelectedFile


  }
}

export default useUsers;