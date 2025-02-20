import axios from "axios";
import { useAuthStore } from "../hooks/authStore";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const BASE_URL =
  "https://b658-2800-e2-9c00-398-816-65ba-4713-367b.ngrok-free.app/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Agregar el interceptor de respuesta
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.code === "ECONNREFUSED" ||
      error.message.includes("Network Error")
    ) {
      toast.error(
        "No se pudo conectar con el servidor. Por favor, verifica que esté activo."
      );
    }

    if (error.response?.data?.statusCode === 400) {
      toast.error(error.response.data.message);
    }

    if (error.response?.status === 401) {
      // Limpiar el estado de autenticación
      toast.error("Tu sesión ha expirado");
      useAuthStore.getState().logout();
      // Redirigir al login
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// Obtener lista de clientes de una empresa
export const getClients = async () => {
  try {
    const response = await axiosInstance.get(`/admin/clients`);

    // Accedemos específicamente a response.data.clients
    const clients = response.data?.clients || [];

    // Verificamos si clients es un array antes de usar map
    if (!Array.isArray(clients)) {
      console.error("La respuesta no es un array:", clients);
      return [];
    }

    return clients.map((item: any) => ({
      username: item.user?.username || "",
      password: item.user?.password || "",
      status: item.user?.status || "",
      address: item.address || "",
      cedula: item.cedula || "",
      createdAt: item.createdAt || "",
      date_contract: item.date_contract || "",
      email: item.email || "",
      first_lastname: item.first_lastname || "",
      first_name: item.first_name || "",
      no_contract: item.no_contract || "",
      phone: item.phone || "",
      second_lastname: item.second_lastname || "",
      second_name: item.second_name || "",
      updatedAt: item.updatedAt || "",
      stratum: item.stratum || "",
    }));
  } catch (error: any) {
    console.error("Error al obtener clientes:", error);
    toast.error("Hubo un error al obtener clientes");
    return [];
  }
};

export const getInvoices = async () => {
  try {
    const response = await axiosInstance.get(`/invoices`);
    const invoices = response.data?.invoice || [];

    if (!Array.isArray(invoices)) {
      console.error("La respuesta no es un array:", invoices);
      return [];
    }

    return invoices.map((item: any) => ({
      no_invoice: item.no_invoice || "",
      period_start: item.period_start || "",
      period_end: item.period_end || "",
      amount: item.amount || "",
      status: item.status || "",
      createdAt: item.createdAt || "",
      updatedAt: item.updatedAt || "",
      client_cedula: item.client?.cedula || "",
      client_first_name: item.client?.first_name || "",
      client_second_name: item.client?.second_name || "",
      client_first_lastname: item.client?.first_lastname || "",
      client_second_lastname: item.client?.second_lastname || "",
      client_phone: item.client?.phone || "",
      client_email: item.client?.email || "",
      admin_nit: item.admin?.nit || "",
    }));
  } catch (error: any) {
    toast.error("Hubo un error al obtener las facturas");
    throw error;
  }
};

export const createInvoice = async (data: any) => {
  try {
    const response = await axiosInstance.post("/invoices", data);
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    console.error("Error al crear factura:", error);
    throw error;
  }
};

// // Obtener lista de facturas de una empresa
// export const getInvoices = async () => {
//   const currentNit = useAuthStore.getState().user?.admin_nit;

//   if (!currentNit) {
//     console.error("No hay NIT seleccionado");
//     return [];
//   }

//   try {
//     const response = await axiosInstance.get(
//       `/admin/companies/${currentNit}/invoices`
//     );

//     // Accedemos específicamente a response.data.clients
//     const invoices = response.data?.invoices || [];

//     // Verificamos si clients es un array antes de usar map
//     if (!Array.isArray(invoices)) {
//       console.error("La respuesta no es un array:", invoices);
//       return [];
//     }

//     return invoices.map((item: any) => ({
//       id: item.id || "",
//       user: item.user || "",
//       email: item.email || "",
//       documentNumber: item.documentNumber || "",
//       documentType: item.documentType || "",
//     }));
//   } catch (error) {
//     console.error("Error al obtener clientes:", error);
//     return [];
//   }
// };

// Obtener usuarios de una empresa
export const getUsers = async () => {
  try {
    const response = await axiosInstance.get(`/admin/admin-users`);
    const users = response.data?.users || [];
    return users.map((item: any) => ({
      cedula: item.cedula || "",
      first_name: item.first_name || "",
      second_name: item.second_name || "",
      last_name: item.last_name || "",
      second_lastname: item.second_lastname || "",
      email: item.email || "",
      phone: item.phone || "",
      username: item.username || "",
      profile_type: item.profile_type || "",
      status: item.status || "",
      createdAt: item.createdAt || "",
      updatedAt: item.updatedAt || "",
    }));
  } catch (error: any) {
    toast.error("Hubo un error al obtener usuarios");
    console.error("Error al obtener usuarios:", error);
    return [];
  }
};

// Crear usuarios individuales
export const createUser = async (data: any) => {
  try {
    const response = await axiosInstance.post(`/admin/create-admin-user`, data);
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    throw error;
  }
};

export const updateUser = async (data: any, cedula: string) => {
  try {
    const response = await axiosInstance.patch(
      `/admin/update-admin-user/${cedula}`,
      data
    );
    return response.data;
  } catch (error: any) {
    console.error("Error al actualizar usuario:", error);
    toast.error(error.response.data.message);
    throw error;
  }
};

export const updateClient = async (data: any) => {
  try {
    const dataToUpdate = {
      address: data?.address,
      stratum: data?.stratum,
      status: data?.status,
      email: data?.email,
      phone: data?.phone,
    };
    const response = await axiosInstance.patch(
      `/client/update-client/${data.cedula}`,
      dataToUpdate
    );
    return response.data;
  } catch (error: any) {
    console.error("Error al actualizar usuario:", error);
    toast.error(error.response.data.message);
    throw error;
  }
};

export const updateUserProfileAdmin = async (data: any) => {
  try {
    const response = await axiosInstance.patch(
      `/admin/update-profile-admin-user`,
      data
    );
    return response.data;
  } catch (error: any) {
    console.error("Error al actualizar usuario:", error);
    toast.error(error.response.data.message);
    throw error;
  }
};

export const updateUserProfileClient = async (data: any) => {
  try {
    const response = await axiosInstance.patch(
      `/client/update-profile-client`,
      data
    );
    return response.data;
  } catch (error: any) {
    console.error("Error al actualizar usuario:", error);
    toast.error(error.response.data.message);
    throw error;
  }
};

export const uploadExcel = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosInstance.post(`/client/massive`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // Agrupar errores por cédula solo si existen errores
    const errorsByClient =
      response.data.details?.errors?.reduce((acc: any, curr: any) => {
        if (!acc[curr.client_cedula]) {
          acc[curr.client_cedula] = [];
        }
        acc[curr.client_cedula].push(curr.error);
        return acc;
      }, {}) || {};

    return {
      message: response.data.message,
      createdClients: response.data.details?.createdClients || [],
      successCount: response.data.details?.createdClients > 0 ? 1 : 0,
      errorCount: response.data.details?.errors?.length || 0,
      errors: errorsByClient,
    };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Error al subir el archivo";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

// Subir excel de facturas
export const uploadInvoiceExcel = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosInstance.post(`/invoices/massive`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Agrupar errores por cédula solo si existen errores
    const errorsByClient =
      response.data.details?.errors?.reduce((acc: any, curr: any) => {
        if (!acc[curr.client_cedula]) {
          acc[curr.client_cedula] = [];
        }
        acc[curr.client_cedula].push(curr.error);
        return acc;
      }, {}) || {};

    return {
      message: response.data.message,
      createdInvoices: response.data.details?.createdInvoices || [],
      successCount: response.data.details?.createdInvoices > 0 ? 1 : 0,
      errorCount: response.data.details?.errors?.length || 0,
      errors: errorsByClient,
    };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Error al subir el archivo";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

// Obtener mensajes de un chat específico
export const getMessagesByNumber = async (number: string) => {
  try {
    const response = await axiosInstance.get(`/messages?number=${number}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages for number:", error);
    return [];
  }
};

export const getPqrByClient = async (company: string, client: string) => {
  const response = await axiosInstance.get(
    `/pqr/company/${company}/client/${client}`
  );
  return response.data;
};

export const getPqrById = async (company: string) => {
  const response = await axiosInstance.get(`/pqr/company/${company}`);
  return response.data;
};

export const createPqr = async (data: {
  type: string;
  category: string;
  sub_category: string;
  description: string;
  client_cedula: string;
}) => {
  const response = await axiosInstance.post("/pqr", data);
  return response.data;
};

export const responsePqr = async (data: {
  admin_nit: string;
  id: string;
  response: string;
  status: string;
  response_type: string;
  pqr_id: string;
}) => {
  const response = await axiosInstance.patch(
    `/pqr/company/${data.admin_nit}/client/${data.id}/id/${data.pqr_id}`,
    data
  );
  return response.data;
};

export const login = async (data: { username: string; password: string }) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const getBancsPse = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/pse/banks", {
      headers: {
        Authorization: `Bearer pub_test_bLkXQsR8dmrSTeoPCJJzGLckXmAHYLIY`,
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response.data?.statusCode === 401) {
      toast.error("Tu sesión ha expirado");
    }
    console.error("Error al obtener perfil:", error);
    return [];
  }
};

export const getCurrentProfile = async (token: string): Promise<any> => {
  try {
    const response = await axiosInstance.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const profile = response.data.profile;

    return {
      cedula: profile.cedula,
      first_name: profile.first_name,
      second_name: profile.second_name,
      first_lastname: profile.first_lastname,
      second_lastname: profile.second_lastname,
      address: profile.address,
      phone: profile.phone,
      email: profile.email,
      location: profile.location || "",
      stratum: profile.stratum || "",
      profile_type: profile.profile_type || "",
      nit: profile.admin?.nit || profile.nit || "",
      name: profile.admin?.name || profile.name || "",
      logo_url: profile.admin?.logo_url || profile.logo_url || "",
      username: profile.user?.username || profile.username || "",
      status: profile.user?.status || profile.status || "",
    };
  } catch (error: any) {
    if (error.response.data?.statusCode === 401) {
      toast.error("Tu sesión ha expirado");
    }
    console.error("Error al obtener perfil:", error);
    return [];
  }
};

interface PaymentStatusResponse {
  id: string;
  wompi_transaction_id: string;
  created_at: string;
  amount: string;
  reference: string;
  buyer_email: string;
  customer_email: string;
  status: string;
  buyer_phone: string;
  phone_number: string;
  legal_id: string;
  buyer_name: string;
  customer_name: string;
  legal_id_type: string;
  payment_method: {
    type: string;
    phone_number: string;
    payment_description: string;
  };
}

// Funciones de API
export const paymentAPI = {
  checkStatus: async (reference: string) => {
    try {
      const { data } = await axiosInstance.get<PaymentStatusResponse>(
        `/payments/status/${reference}`
      );

      if (data.status !== "PENDING") {
        const formattedData = {
          payment_id: data.id,
          wompi_data: {
            id: data.wompi_transaction_id || data.reference,
            created_at: data.created_at || new Date().toISOString(),
            amount_in_cents: parseFloat(data.amount || "0") * 100,
            reference: data.reference,
            customer_email: data.buyer_email || data.customer_email,
            status: data.status,
            payment_method: {
              type: "NEQUI",
              phone_number:
                data.buyer_phone || data.phone_number || "0000000000",
              payment_description:
                data.payment_method?.payment_description || "Pago Nequi",
            },
            customer_data: {
              legal_id: data.legal_id || "No disponible",
              full_name:
                data.buyer_name || data.customer_name || "No disponible",
              phone_number:
                data.buyer_phone || data.phone_number || "0000000000",
              legal_id_type: data.legal_id_type || "CC",
            },
          },
        };
        return { status: data.status, data: formattedData };
      }
      return { status: "PENDING", data: null };
    } catch (error) {
      console.error("Error checking payment status:", error);
      return { status: "ERROR", data: null };
    }
  },
};

interface NequiPaymentRequest {
  invoice_id: string;
  amount_in_cents: number;
  customer_email: string;
  buyer_name: string;
  buyer_phone: string;
  legal_id: string;
  legal_id_type: string;
  user_type: string;
  payment_method: {
    type: string;
    phone_number: string;
  };
  payment_description: string;
}

export const createNequiPayment = async (
  paymentRequest: NequiPaymentRequest
) => {
  try {
    const response = await axiosInstance.post("/payments", paymentRequest);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
      ? Array.isArray(error.response.data.message)
        ? error.response.data.message.join(", ")
        : error.response.data.message
      : "Error desconocido";

    Swal.fire({
      title: "Error al crear el pago",
      text: errorMessage,
      icon: "error",
    });

    throw error;
  }
};

export const getPaymentsHistory = async (invoice_id: string) => {
  try {
    const response = await axiosInstance.get(`/payments/invoice/${invoice_id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener el historial de pagos:", error);
    toast.error(error.response.data.message);
    throw error;
  }
};

export const createCompany = async (data: any) => {
  try {
    const response = await axiosInstance.post("/admin/create-company", data);
    return response.data;
  } catch (error: any) {
    if (error.response.data.message.length > 0) {
      error.response.data.message.forEach((message: any) => {
        toast.error(message);
      });
    } else {
      toast.error("Ocurrió un error al crear la empresa");
    }
    throw error;
  }
};

export const getCompany = async () => {
  try {
    const response = await axiosInstance.get("/admin/company");
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    throw error;
  }
};

export const getInvoiceFinancial = async (invoice_id: string) => {
  try {
    const response = await axiosInstance.get(`/payments/invoice/${invoice_id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener el historial de pagos:", error);
    toast.error(error.response.data.message);
    throw error;
  }
};
