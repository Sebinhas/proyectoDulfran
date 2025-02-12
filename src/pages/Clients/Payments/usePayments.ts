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

const usePayments = () => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  // const [options, setOptions] = useState('');
  // const [user, setUser] = useState<ClientsDTO | null>(null);
  // const [dataUsers, setDataUsers] = useState<ClientsDTO[]>([]);
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<any>(null);
  const [invoicesData, setInvoicesData] = useState<any[]>([]);

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

  const [selectedPayment, setSelectedPayment] = useState<DTOPayment | null>(
    null
  );
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoading) {
        try {
          const response = await getInvoices();
          if (response) {
            setInvoicesData(response);
            console.log("invoicesData", response);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInvoices();
        if (response) {
          setInvoicesData(response);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchData();
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

  const handleView = (payment: DTOPayment) => {
    setSelectedPayment(payment);
    setShowDetail(true);
  };

  const handleBack = () => {
    setShowDetail(false);
    setSelectedPayment(null);
  };

  const handleMessage = (row: ClientsDTO): void => {
    toast.success(`Orden vista, estado: ${row}`);
    // navigate(`/dashboard/ordenes/${row.id}`);
  };

  const handleDownload = (row: DTOPayment): void => {
    toast.success(`Orden vista, estado: ${row}`);
    toggleModalDownloadInvoice();
    console.log("row", row);
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
      : navigate(`/dashboard/payments/payment_method`, { state: { paymentData } });
  };

  const handleEdit = (row: ClientsDTO): void => {
    toast.success(`Orden vista, estado: ${row.first_name}`);
    // setUser(row);
    console.log(row);
    toggleModalEditInfoUser();
    // navigate(`/dashboard/ordenes/${row.id}`);
  };

  return {
    columns,
    handleView,
    handleDownload,
    user,
    selectedPayment,
    showDetail,
    handleBack,
    handlePay,
    toggleModalDownloadInvoice,
    closeModalActionDownloadInvoice,
    RenderDownloadInvoice,
    invoice,
    invoicesData,
  };
};

export default usePayments;
