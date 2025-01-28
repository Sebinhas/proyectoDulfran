import { CreatedByCell, TipoCell, CategoriaCell, AsuntoCell, DescripcionCell, EstadoCell, FechaCreacionCell } from './template/cellTemplate'
import { getPqr } from "../../../api/axios.helper";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../../../components/Modal/Modal';
const usePqrResponse = () => {
   const [pqr, setPqr] = useState([]);
   const { toggleModal: toggleModalResponsePqr, closeModalAction: closeModalActionResponsePqr, Render: RenderResponsePqr } = Modal({ title: 'Responder PQR' });

   useEffect(() => {
      const response = async () => {
        const response = await getPqr();
        setPqr(response);
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

    const handleEdit = (row: any): void => {
      toast.success(`Orden vista, estado: ${row.status}`);
      toggleModalResponsePqr();
      console.log(row);
        //toggleModalEditInfoUser();
        // navigate(`/dashboard/ordenes/${row.id}`);
    };

   return {
      columns,
      pqr,
      handleEdit,
      toggleModalResponsePqr,
      closeModalActionResponsePqr,
      RenderResponsePqr
   }
}

export default usePqrResponse;
