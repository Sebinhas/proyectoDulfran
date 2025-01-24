import { UploadCloud } from 'lucide';

export const useCardCount = () => {
  const data = [
    {
      id: 1,
      icon: UploadCloud,
      title: 'Ordenes Enviadas',
      value: 47
    },
    {
      id: 2,
      icon: UploadCloud,
      title: 'Facturas Recibidas',
      value: 40
    },
    {
      id: 3,
      icon: UploadCloud,
      title: 'Productos Disponibles',
      value: 21
    }
  ];

  return data;
};
