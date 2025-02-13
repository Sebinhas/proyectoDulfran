import { useEffect, useState } from "react";
import { 
  CedulaCell, 
  StatusCell, 
  EmailCell, 
  CreatedAtCell,
  FirstNameCell,
  PhoneCell
} from './templates/cellTemplates';
import { useForm } from 'react-hook-form';
import Modal from "../../../components/Modal/Modal";
import { toast } from 'react-toastify';
import { ClientsDTO } from "./DTOClients";
import { getClients, uploadExcel } from '../../../api/axios.helper';
import Swal from 'sweetalert2';

const useClients = () => {


  const [isLoading, setIsLoading] = useState(true);
  // const [options, setOptions] = useState('');
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

      const result = await uploadExcel(file);
      Swal.close();

      if (result) {
        let htmlContent = `<p>${result.message}</p>
          <p>Total procesados: ${result.totalProcessed}</p>
          <p>Exitosos: ${result.successCount}</p>
          <p>Errores: ${result.errorCount}</p>`;

        // Si hay errores, mostrar detalles
        if (result.errors && result.errors.length > 0) {
          result.errors.forEach((error: any) => {
            htmlContent += `
              <div class="mt-4">
                <p class="text-red-500 font-bold">${error.type} (${error.count})</p>
                ${error.cedulas ? `
                  <div class="mt-2 max-h-40 overflow-y-auto text-left">
                    <p class="font-semibold mb-2">Cédulas afectadas:</p>
                    <div class="grid grid-cols-3 gap-2 text-sm">
                      ${error.cedulas.map((cedula: any) => `
                        <span class="bg-red-50 p-1 rounded">${cedula}</span>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}
              </div>
            `;
          });
        }

        // Mostrar el modal con el resumen
        await Swal.fire({
          title: result.successCount > 0 ? '¡Proceso Completado!' : 'Proceso Completado con Errores',
          html: htmlContent,
          icon: result.successCount > 0 ? 'success' : 'warning',
          confirmButtonText: 'Aceptar',
          width: '800px',
          customClass: {
            htmlContainer: 'swal-html-container',
          },
          didOpen: () => {
            // Agregar estilos personalizados al contenedor
            const style = document.createElement('style');
            style.textContent = `
              .swal-html-container {
                max-height: 70vh;
                overflow-y: auto;
              }
              .swal-html-container::-webkit-scrollbar {
                width: 8px;
              }
              .swal-html-container::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 10px;
              }
              .swal-html-container::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 10px;
              }
            `;
            document.head.appendChild(style);
          }
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
      header: 'Cédula',
      accessor: 'cedula',
      cell: CedulaCell
    },
    {
      header: 'Nombres',
      accessor: 'first_name',
      cell: FirstNameCell
    },
    // {
    //   header: 'Dirección',
    //   accessor: 'address',
    //   cell: AddressCell
    // },
    {
      header: 'Teléfono',
      accessor: 'phone',
      cell: PhoneCell
    },
    {
      header: 'Correo',
      accessor: 'email',
      cell: EmailCell
    },
    {
      header: 'Estado',
      accessor: 'status',
      cell: StatusCell
    },
    {
      header: 'Fecha de Registro',
      accessor: 'createdAt',
      cell: CreatedAtCell
    }
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
    // console.log(row);
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

export default useClients;
