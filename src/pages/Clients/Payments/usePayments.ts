import { useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import { toast } from "react-toastify";

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
import { usePaymentContext } from "../../../context/PaymentContext";

const usePayments = () => {
  const { user, token } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<any>(null);
  const [invoicesData, setInvoicesData] = useState<any[]>([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const { paymentData, setPaymentData } = usePaymentContext();

  const {
    toggleModal: toggleModalDownloadInvoice,
    closeModalAction: closeModalActionDownloadInvoice,
    Render: RenderDownloadInvoice,
  } = Modal({ title: "Desacargar Factura", size: "lg" });

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
      const response = await fetch(
        `http://localhost:3000/api/payments/invoice/${row.no_invoice}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener el historial de pagos");
      }

      const historyData = await response.json();

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

  const handleDownload = (row: DTOPayment): void => {
    toast.success(`Orden vista, estado: ${row}`);
    toggleModalDownloadInvoice();
    // console.log("row", row);
    setInvoice(row);
  };

  const handlePay = (row: DTOPayment): void => {
    console.log("row", row);
    setPaymentData({
      invoice_id: row.no_invoice,
      amount_in_cents: parseInt(row.amount) * 100,
      customer_email: row.client_email,
      buyer_name: row.client_first_name + " " + row.client_second_name,
      buyer_phone: row.client_phone,
      legal_id: row.client_cedula,
      legal_id_type: "CC",
      user_type: "PERSON",
      payment_description: `Pago factura ${row.no_invoice}`,
    });
    console.log("paymentData1", paymentData);

    row.status === "pagada"
      ? toast.success("Factura pagada")
      : navigate(`/dashboard/payments/payment_method`);
  };

  const handleView = async (payment: DTOPayment) => {
    try {
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

      const formattedData = {
        id: data.id,
        invoice_id: data.invoice_id,
        wompi_transaction_id: data.wompi_transaction_id,
        reference: data.reference,
        amount: data.amount,
        payment_method: data.payment_method,
        status: data.status,
        buyer_email: data.buyer_email,
        buyer_name: data.buyer_name,
        buyer_phone: data.buyer_phone,
        currency: data.currency,
        transaction_created_at: data.transaction_created_at,
        transaction_finalized_at: data.transaction_finalized_at,
        status_message: data.status_message,
        payment_method_data: data.payment_method_data,
        customer_data: data.customer_data,
        payment_data: data.payment_data,
        user_type: data.user_type,
        invoice: data.invoice,
        other_attempts: data.other_attempts,
      };

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
