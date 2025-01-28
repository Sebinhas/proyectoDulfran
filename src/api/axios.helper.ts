import axios from "axios";

export const BASE_URL = "https://e43c-2800-e2-9c00-1c5e-c882-b291-7d70-7c87.ngrok-free.app/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'application/json',
  },
});

// Obtener lista de chats
export const getClients = async () => {
  try {
    const response = await axiosInstance.get('/client');
    return response.data.map((item: any) => ({
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
    console.error('Error fetching clients:', error);
    return [];
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

export const getPqr = async () => {
  const response = await axiosInstance.get('/pqr');
  return response.data;
};

export const createPqr = async (data: any) => {
  const response = await axiosInstance.post('/pqr', data);
  return response.data;
};
