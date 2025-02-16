import { useEffect, useState } from "react";
import {
  CreatedAtCell,
  FirstNameCell,
  StatusCell,
  TotalCell,
} from "./templates/cellTemplates";
import { toast } from "react-toastify";
import Modal from "../../../components/Modal/Modal";
import Swal from "sweetalert2";
import { uploadInvoiceExcel, getInvoices, getInvoiceFinancial } from "../../../api/axios.helper";
import {
  numberInvoicesCell,
  PaymentPeriodCell,
} from "./templates/cellTemplates";
import { DTOInvoices } from "./DTOInvoices";
export interface InvoiceData {
  numberInvoice: number;
  user: string;
  createdAt: string;
  status: "Completada" | "Pendiente";
  total: number;
}

const useInvoices = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [invoices, setInvoices] = useState<any[]>([]);  
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [invoiceDetail, setInvoiceDetail] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);
  
  
  const {
    toggleModal: toggleModalUploadInvoice,
    closeModalAction: closeModalActionUploadInvoice,
    Render: RenderUploadInvoice,
  } = Modal({ title: "Subir Facturas" });
  const {
    toggleModal: toggleModalDownloadInvoice,
    closeModalAction: closeModalActionDownloadInvoice,
    Render: RenderDownloadInvoice,
  } = Modal({ title: "Descargar Factura" });




  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await getInvoices();
        if (response) {
          setInvoices(response);
        }
      } catch (error: any) {
        console.error("Error fetching invoices:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const columns = [
    {
      header: "No. Factura",
      accessor: "no_invoice",
      cell: numberInvoicesCell,
    },
    // {
    //   header: 'No. Contrato',
    //   accessor: 'numberContract',
    //   cell: NumberContractCell
    // },
    {
      header: "Cliente",
      accessor: "client_first_name",
      cell: FirstNameCell,
    },
    {
      header: "Estado",
      accessor: "status",
      cell: StatusCell,
    },
    {
      header: "Periodo",
      accessor: "period_start",
      cell: PaymentPeriodCell,
    },
    {
      header: "Total",
      accessor: "amount",
      cell: TotalCell,
    },
    {
      header: "Fecha de Creación",
      accessor: "createdAt",
      cell: CreatedAtCell,
    },
  ];

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
        title: "Procesando Facturas",
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

      const result = await uploadInvoiceExcel(file);
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
                  <p class="text-green-700">Facturas creadas: ${
                    result.createdInvoices > 0 ? result.createdInvoices : "0"
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

      closeModalActionUploadInvoice();
      setSelectedFile(null);

      // Actualizar la lista
      const response = await getInvoices();
      if (response) {
        setInvoices(response);
      }
    } catch (error: any) {
      console.error("Error al subir archivo:", error);
      Swal.fire({
        title: "Error",
        text: error.message || "Hubo un error al procesar el archivo",
        icon: "error",
      });
    }
  };

  const handleViewInvoice = async (row: DTOInvoices) => {
    
    try {
      const response = await getInvoiceFinancial(row.no_invoice);
      const historyData = response;
      // Si hay datos, los usamos directamente ya que vienen en el formato correcto
      if (historyData) {
        setSelectedPayment(historyData);
        setShowDetail(true);
        return;
      }

      // Si no hay datos, creamos una estructura base
      const defaultData = {
        invoice_id: row.no_invoice,
        total_attempts: 0,
        latest_status: row.status.toUpperCase(),
        latest_attempt: null,
        payment_history: {
          approved: [],
          pending: [],
          failed: [],
        },
        all_payments: [],
      };

      setSelectedPayment(defaultData);
      setShowDetail(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al obtener los detalles del pago");

      // En caso de error, mostramos una estructura base
      const errorData = {
        invoice_id: row.no_invoice,
        total_attempts: 0,
        latest_status: row.status.toUpperCase(),
        latest_attempt: null,
        payment_history: {
          approved: [],
          pending: [],
          failed: [],
        },
        all_payments: [],
      };

      setSelectedPayment(errorData);
      setShowDetail(true);
    }
  };



  const handleBack = () => {
    setShowDetail(false);
    setSelectedPayment(null);
  };

  const handleView = (row: InvoiceData): void => {
    toast.success(`Orden vista, estado: ${row.status}`);
    // navigate(`/dashboard/ordenes/${row.id}`);
  };

  const handleDownload = (row: InvoiceData): void => {
    toast.success(`Orden vista, estado: ${row.status}`);
    toggleModalDownloadInvoice();
    setInvoiceDetail(row);
  };

  const handleEdit = (row: InvoiceData): void => {
    toast.success(`Orden vista, estado: ${row.status}`);
    // navigate(`/dashboard/ordenes/${row.id}`);
  };

  return {
    columns,
    isLoading,
    handleView,
    toggleModalUploadInvoice,
    closeModalActionUploadInvoice,
    RenderUploadInvoice,
    selectedFile,
    setSelectedFile,
    handleFileChange,
    handleFileUpload,
    invoices,
    handleDownload,
    handleEdit,
    showDetail,
    handleViewInvoice,
    selectedPayment,
    handleBack,
    toggleModalDownloadInvoice,
    closeModalActionDownloadInvoice,
    RenderDownloadInvoice,
    invoiceDetail,
  };
};

export default useInvoices;
