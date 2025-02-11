import axios from "axios";
import { useAuthStore } from "../hooks/authStore";
import { toast } from "react-toastify";


export const BASE_URL = "http://62.72.5.152:3000/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Obtener lista de clientes de una empresa
export const getClients = async () => {
  const currentNit = useAuthStore.getState().user?.admin_nit;
  console.log(currentNit);
  
  if (!currentNit) {
    console.error('No hay NIT seleccionado');
    return [];
  }

  try {
    const response = await axiosInstance.get(`/admin/companies/${currentNit}/clients`);
    
    // Accedemos específicamente a response.data.clients
    const clients = response.data?.clients || [];
    
    // Verificamos si clients es un array antes de usar map
    if (!Array.isArray(clients)) {
      console.error('La respuesta no es un array:', clients);
      return [];
    }

    return clients.map((item: any) => ({
      username: item.user?.username || '',
      password: item.user?.password || '',
      status: item.user?.status || '',
      address: item.address || '',
      cedula: item.cedula || '',
      createdAt: item.createdAt || '',
      date_contract: item.date_contract || '',
      email: item.email || '',
      first_lastname: item.first_lastname || '',
      first_name: item.first_name || '',
      no_contract: item.no_contract || '',
      phone: item.phone || '',
      second_lastname: item.second_lastname || '',
      second_name: item.second_name || '',
      updatedAt: item.updatedAt || ''
    }));
  } catch (error: any) {
    console.error('Error al obtener clientes:', error);
    toast.error(error.response.data.message);
    return [];
  }

};


// Obtener lista de facturas de una empresa
export const getInvoices = async () => {
  const currentNit = useAuthStore.getState().user?.admin_nit;
  

  if (!currentNit) {
    console.error('No hay NIT seleccionado');
    return [];
  }

  try {
    const response = await axiosInstance.get(`/admin/companies/${currentNit}/invoices`);
    

    // Accedemos específicamente a response.data.clients
    const invoices = response.data?.invoices || [];
    

    // Verificamos si clients es un array antes de usar map
    if (!Array.isArray(invoices)) {
      console.error('La respuesta no es un array:', invoices);
      return [];
    }


    return invoices.map((item: any) => ({
      id: item.id || '',
      user: item.user || '',
      email: item.email || '',
      documentNumber: item.documentNumber || '',
      documentType: item.documentType || '',
    }));
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    return [];
  }
};

// Obtener usuarios de una empresa
export const getUsers = async () => {
  try {
    const response = await axiosInstance.get(`/admin/admin-users`);
    const users = response.data?.users || [];
    return users.map((item: any) => ({
      "cedula": item.cedula || '',
      "first_name": item.first_name || '',
      "second_name": item.second_name || '',
      "first_lastname": item.first_lastname || '',
      "second_lastname": item.second_lastname || '',
      "email": item.email || '',
      "username": item.username || '',
      "profile_type": item.profile_type || '',
      "status": item.status || '',
      "createdAt": item.createdAt || '',
      "updatedAt": item.updatedAt || ''
    }));

  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
};

// Crear usuarios individuales
export const createUser = async (data: any) => {
  try {
    const response = await axiosInstance.post(`/admin/create-admin-user`, data);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }

};

export const updateUser = async (data: any) => {
  try {
    const response = await axiosInstance.patch(`/admin/update-admin-users/${data.cedula}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }

};


export const uploadExcel = async (file: File) => {
  const currentNit = useAuthStore.getState().user?.admin_nit;
  const formData = new FormData();


  formData.append('file', file);

    try {
        const response = await axiosInstance.post(`/client/companies/${currentNit}/massive`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }

        });
        const errors = response?.data?.errors;
        errors.forEach((error: any) => {
            toast.warning(error.type);
        });
        console.log('Respuesta:', response.data);
        return response.data;
    } catch (error: any) {
        toast.error(error.response.data.message);
        throw error;
    }

};

// Obtener mensajes de un chat específico
export const getMessagesByNumber = async (number: string) => {
  try {
    const response = await axiosInstance.get(`/messages?number=${number}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages for number:', error);
    return [];
  }
};

export const getPqrByClient = async (company: string, client: string) => {
  const response = await axiosInstance.get(`/pqr/company/${company}/client/${client}`);
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
  const response = await axiosInstance.post('/pqr', data);
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
  const response = await axiosInstance.patch(`/pqr/company/${data.admin_nit}/client/${data.id}/id/${data.pqr_id}`, data);
  return response.data;
};

export const login = async (data: {
  username: string;
  password: string;
}) => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data;
};

export const getCurrentProfile = async () => {
  const response = await axiosInstance.get('/auth/profile')
  return response.data;
};


