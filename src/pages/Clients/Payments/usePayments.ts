import { useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import { toast } from "react-toastify";
import { ClientsDTO } from "../../Administrator/Users/DTOUsers";

import { useNavigate } from "react-router-dom";
import { DTOPayment } from "./DTOPayment";

import { getInvoices } from "../../../api/axios.helper";
import Swal from "sweetalert2";
import { useAuthStore } from "../../../hooks/authStore";
import {
  TotalCell,
  PaymentPeriodCell,
  StatusCell,
  numberInvoicesCell,
} from "./templates/cellTemplates";
import { CreatedAtCell } from "../../Financial/Invoices/templates/cellTemplates";
import PaymentReceipt from "../../Pasarela/components/PaymentInvoice/PaymentInvoice";

const usePayments = () => {
  const { user, token } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<any>(null);
  const [invoicesData, setInvoicesData] = useState<any[]>([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const {
    toggleModal: toggleModalDownloadInvoice,
    closeModalAction: closeModalActionDownloadInvoice,
    Render: RenderDownloadInvoice,
  } = Modal({ title: "Desacargar Factura", size: "lg" });

  const {
    toggleModal: toggleModalEditInfoUser,
    closeModalAction: closeModalActionEditInfoUser,
    Render: RenderEditInfoUser,
  } = Modal({ title: "Editar Información" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInvoices();
        if (response) {
          setInvoicesData(response);
          // console.log("invoicesData", response);
        }
      } catch (error: any) {
        console.error("Error fetching invoices:", error);
        if (error.response.data?.statusCode === 401) {
          toast.error("Sesión expirada. Por favor, inicie sesión nuevamente.");
        } else {
          Swal.fire({
            title: "Error",
            text: "Hubo un error al cargar los datos",
            icon: "error",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

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

  const handleViewInvoice = async (row: DTOPayment) => {
    try {
      // console.log("Iniciando handleView con payment:", row);
      
      // Primero intentamos obtener el historial de pagos de la factura
      const paymentsResponse = await fetch(
        `http://localhost:3000/api/payments/invoice/${row.no_invoice}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!paymentsResponse.ok) {
        throw new Error("Error al obtener el historial de pagos");
      }

      const historyData = await paymentsResponse.json();
      // console.log("Historial de pagos:", historyData);

      // Si no hay historial o está vacío
      if (!historyData || !historyData.payment_history) {
        const formattedData = {
          payment_id: null,
          wompi_data: {
            id: null,
            created_at: new Date().toISOString(),
            amount_in_cents: parseFloat(row.amount) * 100,
            reference: row.no_invoice,
            customer_email: row.client_email,
            status: row.status.toUpperCase(),
            payment_method: {
              type: "PENDIENTE",
              phone_number: row.client_phone || "",
            },
            customer_data: {
              legal_id: row.client_cedula,
              full_name: `${row.client_first_name} ${row.client_second_name}`,
              phone_number: row.client_phone || "",
              legal_id_type: "CC",
            },
            payment_history: [],
          },
        };
        setSelectedPayment(formattedData);
        setShowDetail(true);
        return;
      }

      // Usar la información del último intento directamente del historyData
      const latestAttempt = historyData.latest_attempt;
      
      // Formatear los datos para el comprobante
      const formattedData = {
        payment_id: latestAttempt?.id || null,
        wompi_data: {
          id: latestAttempt?.wompi_transaction_id || null,
          created_at: latestAttempt?.created_at || new Date().toISOString(),
          amount_in_cents: parseFloat(row.amount) * 100,
          reference: row.no_invoice,
          customer_email: latestAttempt?.buyer_email || row.client_email,
          status: historyData.latest_status || row.status.toUpperCase(),
          payment_method: {
            type: latestAttempt?.payment_method || "NO ESPECIFICADO",
            phone_number: latestAttempt?.buyer_phone || row.client_phone || "",
          },
          customer_data: {
            legal_id: latestAttempt?.legal_id || row.client_cedula,
            full_name: latestAttempt?.buyer_name || `${row.client_first_name} ${row.client_second_name}`,
            phone_number: latestAttempt?.buyer_phone || row.client_phone || "",
            legal_id_type: latestAttempt?.legal_id_type || "CC",
          },
          error_message: latestAttempt?.error_message,
          payment_history: historyData.payment_history || [], // Usar el historial completo
          total_attempts: historyData.total_attempts,
          latest_status: historyData.latest_status,
        },
      };

      // console.log("Datos formateados:", formattedData);
      setSelectedPayment(formattedData);
      setShowDetail(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al obtener los detalles del pago");
      
      // En caso de error, mostramos la información básica de la factura
      const formattedData = {
        payment_id: null,
        wompi_data: {
          id: null,
          created_at: new Date().toISOString(),
          amount_in_cents: parseFloat(row.amount) * 100,
          reference: row.no_invoice,
          customer_email: row.client_email,
          status: row.status.toUpperCase(),
          payment_method: {
            type: "PENDIENTE",
            phone_number: row.client_phone || "",
          },
          customer_data: {
            legal_id: row.client_cedula,
            full_name: `${row.client_first_name} ${row.client_second_name}`,
            phone_number: row.client_phone || "",
            legal_id_type: "CC",
          },
          payment_history: [],
          total_attempts: 0,
          latest_status: row.status.toUpperCase(),
        },
      };
      setSelectedPayment(formattedData);
      setShowDetail(true);
    }
  };

  const handleBack = () => {
    setShowDetail(false);
    setSelectedPayment(null);
  };

  const handleMessage = (row: ClientsDTO): void => {
    toggleModalEditInfoUser();
    toast.success(`Orden vista, estado: ${row}`);
    // navigate(`/dashboard/ordenes/${row.id}`);
  };

  const handleDownload = (row: DTOPayment): void => {
    toast.success(`Orden vista, estado: ${row}`);
    toggleModalDownloadInvoice();
    // console.log("row", row);
    setInvoice(row);
  };

  const handlePay = (row: DTOPayment): void => {
    // toast.success(`Orden vista, estado: ${row}`);
    const paymentData = {
      invoice_id: row.no_invoice,
      amount: row.amount,
      buyer_email: row.client_email,
      buyer_name: row.client_first_name + " " + row.client_second_name,
      buyer_phone: row.client_phone,
      legal_id: row.client_cedula,
      legal_id_type: "CC",
    };
    row.status == "pagada"
      ? toast.success("Factura pagada")
      : navigate(`/dashboard/payments/payment_method`, {
          state: { paymentData },
        });
  };

  const handleView = async (payment: DTOPayment) => {
    try {
      // console.log("Iniciando handleView con payment:", payment); // Debug log

      const response = await fetch(
        `http://localhost:3000/api/payments/status?reference=${payment.no_invoice}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          toast.warning("No se encontró la factura, o no se ha pagado");
          throw new Error("No se encontró la factura, o no se ha pagado");
        }
      }

      const data = await response.json();
      // console.log("Datos recibidos del backend:", data); // Debug log

      const formattedData = {
        payment_id: data.id,
        wompi_data: {
          id: data.wompi_transaction_id,
          created_at: data.created_at,
          amount_in_cents: parseFloat(data.amount) * 100,
          reference: data.reference,
          customer_email: data.buyer_email,
          status: data.status,
          payment_method: {
            type: data.payment_method,
            phone_number: data.buyer_phone,
          },
          customer_data: {
            legal_id: data.legal_id,
            full_name: data.buyer_name,
            phone_number: data.buyer_phone,
            legal_id_type: data.legal_id_type,
          },
        },
      };

      // console.log("Datos formateados:", formattedData); // Debug log
      setSelectedPayment(formattedData);
      setShowDetail(true);
    } catch (error) {
      console.error("Error detallado:", error);
    }
  };

  return {
    columns,
    handleView,
    handleDownload,
    user,
    showDetail,
    handleBack,
    handlePay,
    toggleModalDownloadInvoice,
    closeModalActionDownloadInvoice,
    RenderDownloadInvoice,
    invoice,
    invoicesData,
    handleViewInvoice,
    selectedPayment,
    isLoading,
  };
};

export default usePayments;
