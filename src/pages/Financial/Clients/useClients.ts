import { useEffect, useState } from "react";
import {
  CedulaCell,
  StatusCell,
  EmailCell,
  CreatedAtCell,
  FirstNameCell,
  PhoneCell,
} from "./templates/cellTemplates";
import Modal from "../../../components/Modal/Modal";
import { toast } from "react-toastify";
import { ClientsDTO } from "./DTOClients";
import { getClients, uploadExcel } from "../../../api/axios.helper";
import Swal from "sweetalert2";

const useClients = () => {
  const [isLoading, setIsLoading] = useState(true);
  // const [options, setOptions] = useState('');
  const [user, setUser] = useState<ClientsDTO | null>(null);
  const [clients, setClients] = useState<ClientsDTO[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    toggleModal: toggleModalUploadClient,
    closeModalAction: closeModalActionUploadClient,
    Render: RenderUploadClient,
  } = Modal({ title: "Subir Usuarios" });
  const {
    toggleModal: toggleModalViewDetailClient,
    closeModalAction: closeModalActionViewDetailClient,
    Render: RenderViewDetailClient,
  } = Modal({ title: "Datos Personales" });

  const {
    toggleModal: toggleModalEditInfoClient,
    closeModalAction: closeModalActionEditInfoClient,
    Render: RenderEditInfoClient,
  } = Modal({ title: "Editar Información" });


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar que sea un archivo Excel
      if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel"
      ) {
        setSelectedFile(file);
      } else {
        alert("Por favor, seleccione un archivo Excel válido (.xlsx, .xls)");
        e.target.value = ""; // Limpiar el input
      }
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const fileSizeInMB = file.size / (1024 * 1024);
      const estimatedMinutes = Math.ceil(fileSizeInMB * 0.5);
      let timeLeft = estimatedMinutes * 60; // Convertir a segundos

      Swal.fire({
        title: "Procesando Clientes",
        html: `
          <div class="flex flex-col items-center gap-4">
            <div class="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <div class="text-sm text-gray-500">
              Tiempo estimado: ${estimatedMinutes} ${
          estimatedMinutes === 1 ? "minuto" : "minutos"
        }
            <div class="text-sm text-gray-600" id="timeLeft">
              Tiempo restante: ${estimatedMinutes} ${
          estimatedMinutes === 1 ? "minuto" : "minutos"
        } y 0 segundos
            </div>
          </div>
        `,
        didOpen: () => {
          const timeLeftText = document.getElementById("timeLeft");

          const timer = setInterval(() => {
            timeLeft -= 1;
            if (timeLeft > 0) {
              if (timeLeftText) {
                timeLeftText.textContent = `Tiempo restante: ${Math.floor(
                  timeLeft / 60
                )} ${
                  Math.floor(timeLeft / 60) === 1 ? "minuto" : "minutos"
                } y ${timeLeft % 60} segundos`;
              }
            } else {
              clearInterval(timer);
            }
          }, 1000);
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        customClass: {
          popup: "rounded-lg",
          container: "p-4",
          cancelButton:
            "px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300",
        },
      });

      const result = await uploadExcel(file);
      Swal.close();

      const errorsHtml = Object.entries(result.errors)
        .map(
          ([cedula, errors]) => `
          <div class="mt-2 p-3 bg-red-50 rounded-lg">
            <p class="font-semibold text-red-700">Cliente ${cedula}:</p>
            <ul class="list-disc list-inside mt-1">
              ${(errors as string[])
                .map(
                  (error: string) => `
                <li class="text-red-600 text-sm">${error}</li>
              `
                )
                .join("")}
            </ul>
          </div>
        `
        )
        .join("");

      await Swal.fire({
        title: "Proceso Completado",
        html: `
          <div class="text-left">
              <div class="mb-4">
              <div class="grid grid-cols-2 gap-4 mt-3">
                <div class="p-3 bg-green-50 rounded-lg">
                  <p class="text-green-700">Clientes creados: ${
                    result.createdClients.length > 0
                      ? result.createdClients.length
                      : "0"
                  }</p>
                </div>
                <div class="p-3 bg-red-50 rounded-lg">
                  <p class="text-red-700">Errores: ${result.errorCount}</p>
                </div>
              </div>
            </div>
            ${
              result.errorCount > 0
                ? `
              <div class="mt-4">
                <h4 class="text-lg font-semibold text-red-600 mb-2">Detalles de errores:</h4>
                ${errorsHtml}
              </div>
            `
                : ""
            }
          </div>
        `,
        icon: result.errorCount > 0 ? "warning" : "success",
        confirmButtonText: "Aceptar",
        customClass: {
          container: "p-4",
          popup: "rounded-lg",
          confirmButton:
            "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded",
        },
      });

      closeModalActionUploadClient();
      setSelectedFile(null);

      // Actualizar la lista de clientes
      try {
        const response = await getClients();
        if (response) {
          setClients(response);
        }
      } catch (error) {
        console.error("Error al actualizar los datos:", error);
        Swal.fire({
          title: "Error",
          text: "Error al actualizar la lista de clientes",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error al subir archivo:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al procesar el archivo",
        icon: "error",
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
          console.error("Error fetching clients:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [isLoading]);

  const columns = [
    {
      header: "Cédula",
      accessor: "cedula",
      cell: CedulaCell,
    },
    {
      header: "Nombres",
      accessor: "first_name",
      cell: FirstNameCell,
    },
    {
      header: "Teléfono",
      accessor: "phone",
      cell: PhoneCell,
    },
    {
      header: "Correo",
      accessor: "email",
      cell: EmailCell,
    },
    {
      header: "Estado",
      accessor: "status",
      cell: StatusCell,
    },
    {
      header: "Fecha de Registro",
      accessor: "createdAt",
      cell: CreatedAtCell,
    },
  ];

  const handleView = (row: ClientsDTO): void => {
    toast.success(`Orden vista, estado: ${row.status}`);
    setUser(row);
    toggleModalViewDetailClient();
    // navigate(`/dashboard/ordenes/${row.id}`);
  };

  const handleMessage = (row: ClientsDTO): void => {
    toast.success(`No habilitado al momento, estado: ${row.status}`);
    // navigate(`/dashboard/ordenes/${row.id}`);
  };

  const handleEdit = (row: ClientsDTO): void => {
    toast.success(`Orden vista, estado: ${row.status}`);
    setUser(row);
    // console.log(row);
    toggleModalEditInfoClient();
    // navigate(`/dashboard/ordenes/${row.id}`);
  };

  return {
    clients,
    columns,
    handleView,
    handleEdit,
    handleMessage,
    toggleModalUploadClient,
    closeModalActionEditInfoClient,
    RenderUploadClient,
    RenderViewDetailClient,
    RenderEditInfoClient,
    user,
    handleFileChange,
    isLoading,
    handleFileUpload,
    selectedFile,
    setSelectedFile,
  };
};

export default useClients;
