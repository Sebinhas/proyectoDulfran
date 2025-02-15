import { useEffect, useState } from "react";
import { CreatedAtCell, StatusCell, TotalCell } from "./templates/cellTemplates";
import { toast } from "react-toastify";
import Modal from "../../../components/Modal/Modal";
import Swal from "sweetalert2";
import { uploadInvoiceExcel, getInvoices } from "../../../api/axios.helper";
import { numberInvoicesCell, PaymentPeriodCell } from "./templates/cellTemplates";
export interface InvoiceData {
  numberInvoice: number;
  user: string;
  createdAt: string;
  status: "Completada" | "Pendiente";
  total: number;
}

const useInvoices = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    toggleModal: toggleModalUploadInvoice,
    closeModalAction: closeModalActionUploadInvoice,
    Render: RenderUploadInvoice,
  } = Modal({ title: "Subir Facturas" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await getInvoices();
        if (response) {
          setInvoices(response);
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un error al cargar los datos",
          icon: "error",
        });
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
      // Mostrar loading inicial
      Swal.fire({
        title: "Subiendo archivo",
        text: "Procesando usuarios...",
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
      });

      // Realizar el post
      const result = await uploadInvoiceExcel(file);

      // Cerrar el loading inicial
      Swal.close();

      if (result) {
        // Mostrar resumen del proceso
        await Swal.fire({
          title: "¡Proceso Completado!",
          html: `
                      <p>${result.message}</p>
                      <p>Total procesados: ${result.totalProcessed}</p>
                      <p>Exitosos: ${result.successCount}</p>
                      <p>Errores: ${result.errorCount}</p>
                  `,
          icon: "success",
          confirmButtonText: "Aceptar",
        });

        closeModalActionUploadInvoice();
        setSelectedFile(null);

        // Actualizar la lista de clientes
        try {
          const response = await getInvoices();
          if (response) {
            setInvoices(response);
          }
        } catch (error) {
          console.error("Error al actualizar los datos:", error);
          Swal.fire({
            title: "Error",
            text: "Error al actualizar la lista de clientes",
            icon: "error",
          });
        }
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

  const handleView = (row: InvoiceData): void => {
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
  };
};

export default useInvoices;
