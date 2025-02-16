import { CreatedByCell, TipoCell, CategoriaCell, AsuntoCell, DescripcionCell, EstadoCell, FechaCreacionCell } from './template/cellTemplate'
import { getPqrById , responsePqr } from "../../../api/axios.helper";
import { useEffect, useState } from 'react';
import Modal from '../../../components/Modal/Modal';
import { useForm } from "react-hook-form";
import { useAuthStore } from '../../../hooks/authStore';
import { toast } from 'react-toastify';

interface PqrType {
  id: number;
  type: string;
  category: string;
  sub_category: string;
  description: string;
  status: string;
  response?: string;
  created_at: string;
  client: {
    cedula: string;
    no_contract: string;
    first_name: string;
    second_name: string;
    first_lastname: string;
    second_lastname: string;
    phone: string;
    email: string;
    speed_plan: string;
  };
}

const usePqrResponse = () => {
   
   const [pqr, setPqr] = useState([]);
   const { toggleModal: toggleModalResponsePqr, closeModalAction: closeModalActionResponsePqr, Render: RenderResponsePqr } = Modal({ title: 'Responder PQR' });
   const [selectedPqr, setSelectedPqr] = useState<PqrType | null>(null);
   const [response, setResponse] = useState('');
   const [status, setStatus] = useState('pendiente');
   const { user } = useAuthStore();
   const {  register, handleSubmit, reset } = useForm({
    defaultValues: {
      status: selectedPqr?.status,
      response: ''
    }
  });

  useEffect(() => {
  }, [selectedPqr]);

   useEffect(() => {
      const response = async () => {
        const response = await getPqrById(user?.id || '');
        if(response.status === 'success'){
          setPqr(response.pqrs);
        }
      };
      response();
    }, []);

   const columns = [
      {
        header: 'Creado por',
        accessor: 'createdBy',
        cell: CreatedByCell
      },
      {
        header: 'Tipo',
        accessor: 'tipo',
        cell: TipoCell
      },
      {
        header: 'Categoría',
        accessor: 'categoria',
        cell: CategoriaCell
      },
      {
        header: 'Estado',
        accessor: 'estado',
        cell: EstadoCell
      },
      {
        header: 'Asunto',
        accessor: 'asunto',
        cell: AsuntoCell
      },
      {
        header: 'Descripción',
        accessor: 'descripcion',
        cell: DescripcionCell
      },
      {
        header: 'Fecha de Creación',
        accessor: 'fechaCreacion',
        cell: FechaCreacionCell
      },
    ]

    const handleEdit = (row: any) => {
      setSelectedPqr(row);
      setStatus(row.status);
      toggleModalResponsePqr();
    };

    const handleSubmitResponse = async (data: any) => {
      
      try {
        const payload = {
          'id': String(selectedPqr?.client?.cedula || ''),
          'pqr_id': String(selectedPqr?.id || ''),
          'response': data.response,
          'status': data.status,
          'admin_nit': String(user?.nit),
          'response_type': 'ADMIN'
        }
        
        const response = await responsePqr(payload);
        if (response) {
          toast.success('PQR respondida exitosamente');
          closeModalActionResponsePqr();
          const updatedPqr = await getPqrById(String(user?.id));
          setPqr(updatedPqr.pqrs);
          reset();
        } else {
          toast.error('Error al responder la PQR');
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Error al responder la PQR');
        console.error('Error al responder PQR:', error.response?.data?.message);
      }
    };

   return {
      columns,
      pqr,
      handleEdit,
      toggleModalResponsePqr,
      closeModalActionResponsePqr,
      RenderResponsePqr,
      selectedPqr,
      status,
      setStatus,
      response,
      setResponse,
      handleSubmitResponse,
      register,
      handleSubmit
   }
}

export default usePqrResponse;
