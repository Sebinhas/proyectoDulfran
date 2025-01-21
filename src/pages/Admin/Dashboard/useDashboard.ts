import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../../hooks/useLocalStorage';
// Nuevo archivo para tipos
export interface OrderData {
  id: number;
  patient: string;
  email: string;
  date: string;
  status: 'Completada' | 'Pendiente' | 'Cancelada';
  value: number;
}

import { PatientCell, DateCell, StatusCell, ValueCell } from './templates/cellTemplates';
import { toast } from 'react-toastify';

export const useDashboard = () => {
  const navigate = useNavigate();
  const { getItem } = useLocalStorage();
  const [isLoading, setIsLoading] = useState(true);

  const userData = getItem('userData');

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const columns = [
    {
      header: 'Paciente',
      accessor: 'patient',
      cell: PatientCell
    },
    {
      header: 'Fecha de Creación',
      accessor: 'date',
      cell: DateCell
    },
    {
      header: 'Estado',
      accessor: 'status',
      cell: StatusCell
    },
    {
      header: 'Valor Total',
      accessor: 'value',
      cell: ValueCell
    }
  ];

  const mockData: OrderData[] = [
    {
      id: 1,
      patient: 'Juan Pérez',
      email: 'juan@example.com',
      date: '2024-03-20',
      status: 'Completada',
      value: 215000
      },
      {
        id: 2,
        patient: 'María García',
        email: 'maria@example.com',
        date: '2024-03-21',
        status: 'Pendiente',
        value: 100000
    },
    {
      id: 3,
      patient: 'Pedro López',
      email: 'pedro@example.com',
      date: '2024-03-22',
      status: 'Cancelada',
      value: 100000
    },
    {
      id: 4,
      patient: 'Ana Martínez',
      email: 'ana@example.com',
      date: '2024-03-23',
      status: 'Completada',
      value: 100000
    },
    {
      id: 5,
      patient: 'Carlos Sánchez',
      email: 'carlos@example.com',
      date: '2024-03-24',
      status: 'Pendiente',
      value: 100000
    },
    {
      id: 6,
      patient: 'Laura Rodríguez',
      email: 'laura@example.com',
      date: '2024-03-25',
      status: 'Cancelada',
      value: 100000
    }
  ];

  const handleView = (row: OrderData): void => {
    toast.success(`Orden vista, estado: ${row.status}`);
    // navigate(`/dashboard/ordenes/${row.id}`);
  };


  return {
    userData,
    columns,
    mockData,
    isLoading,
    handleView,
    navigate
  };
};
