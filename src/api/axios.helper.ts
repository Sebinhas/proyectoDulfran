import axios from "axios";
import { useAuthStore } from "../hooks/authStore";

export const BASE_URL = "https://ad06-2800-e2-9c00-398-f9a5-d895-eec8-1501.ngrok-free.app/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'application/json',
  },
});

// Obtener lista de clientes de una empresa
export const getClients = async () => {
  const currentNit = useAuthStore.getState().currentNit;
  
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
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    return [];
  }
};

// Obtener usuarios de una empresa
export const getUsers = async () => {
  const currentNit = useAuthStore.getState().currentNit;
  try {
    const response = await axiosInstance.get(`/admin/companies/${currentNit}/admin-users`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
};

// Crear usuarios individuales

export const createUser = async (data: any) => {
  const currentNit = useAuthStore.getState().currentNit;
  try {
    const response = await axiosInstance.post(`/admin/companies/${currentNit}/admin-users`, data);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }

};

export const uploadExcel = async (file: File) => {
    const formData = new FormData();

    formData.append('file', file);

    try {
        const response = await axiosInstance.post('/client/massive', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        console.log('Respuesta:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
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

export const responsePqr = async (data: any) => {
  const response = await axiosInstance.patch(`/pqr/${data.id}`, data);
  return response.data;
};
