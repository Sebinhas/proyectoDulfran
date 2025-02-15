import { useEffect, useState } from "react";
import {
  NameCell,
  CedulaCell,
  UsernameCell,
  StatusCell,
  EmailCell,
  date_createdAt,
  profile_type,
} from "./templates/cellTemplates";
import { useForm } from "react-hook-form";
import Modal from "../../../components/Modal/Modal";
import { toast } from "react-toastify";
import { ClientsDTO } from "./DTOUsers";

import { createUser, getUsers } from "../../../api/axios.helper";
import Swal from "sweetalert2";

const useUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<ClientsDTO | null>(null);
  const [dataUsers, setDataUsers] = useState<ClientsDTO[]>([]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    toggleModal: toggleModalUploadUser,
    closeModalAction: closeModalActionUploadUser,
    Render: RenderUploadUser,
  } = Modal({ title: "Subir Usuarios" });
  const {
    toggleModal: toggleModalViewDetailUser,
    closeModalAction: closeModalActionViewDetailUser,
    Render: RenderViewDetailUser,
  } = Modal({ title: "Datos Personales" });

  const {
    toggleModal: toggleModalEditInfoUser,
    closeModalAction: closeModalActionEditInfoUser,
    Render: RenderEditInfoUser,
  } = Modal({ title: "Editar Información" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientsDTO>();

  const onSubmit = async (data: ClientsDTO) => {
    try {
      Swal.fire({
        title: "Creando nuevo usuario",
        html: `
          <div class="flex flex-col items-center gap-4">
            <div class="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <div class="text-lg font-semibold text-gray-700">
              Procesando datos...
            </div>
            <div class="text-sm text-gray-500">
              Verificando permisos y credenciales
            </div>
            <div class="flex items-center gap-2 text-xs text-gray-400 mt-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              <span>Configuración segura</span>
            </div>
          </div>
        `,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        customClass: {
          popup: "rounded-lg",
          container: "p-4",
        },
      });

      const response = await createUser(data);
      Swal.close();

      if (response) {
        await Swal.fire({
          title: "¡Usuario Creado Exitosamente!",
          html: `
            <div class="flex flex-col items-center gap-3">
              <div class="text-gray-600">
                El usuario ha sido creado y configurado correctamente
              </div>
            </div>
          `,
          icon: "success",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton:
              "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg",
          },
        });

        closeModalActionUploadUser();
        reset();

        try {
          const updatedUsers = await getUsers();
          if (updatedUsers) {
            setDataUsers(updatedUsers);
          }
        } catch (error) {
          console.error("Error al actualizar la lista:", error);
          Swal.fire({
            title: "Error de Actualización",
            text: "No se pudo actualizar la lista de usuarios",
            icon: "error",
            confirmButtonText: "Entendido",
          });
        }
      }
    } catch (error) {
      Swal.close();
      console.error("Error al crear usuario:", error);
      Swal.fire({
        title: "Error",
        html: `
          <div class="flex flex-col items-center gap-3">
            <div class="text-gray-600">
              Hubo un error al crear el usuario
            </div>
          </div>
        `,
        icon: "error",
        confirmButtonText: "Entendido",
        customClass: {
          confirmButton:
            "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg",
        },
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
          console.error("Error fetching clients:", error);
          Swal.fire({
            title: "Error",
            text: "Hubo un error al cargar los datos",
            icon: "error",
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
      header: "Nombre",
      accessor: "first_name",
      cell: NameCell,
    },
    {
      header: "Cédula",
      accessor: "cedula",
      cell: CedulaCell,
    },
    {
      header: "Nombre de Usuario",
      accessor: "username",
      cell: UsernameCell,
    },
    {
      header: "Estado",
      accessor: "status",
      cell: StatusCell,
    },

    {
      header: "Email",
      accessor: "email",
      cell: EmailCell,
    },
    {
      header: "Tipo de Perfil",
      accessor: "profile_type",
      cell: profile_type,
    },
    {
      header: "Fecha de Creación",
      accessor: "createdAt",
      cell: date_createdAt,
    },

    // {
    //   header: 'Fecha de Actualización',
    //   accessor: 'updatedAt',
    //   cell: date_updatedAt
    // },
  ];

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
    setSelectedFile,
  };
};

export default useUsers;
