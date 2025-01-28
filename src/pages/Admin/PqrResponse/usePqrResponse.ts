import { CreatedByCell, TipoCell, CategoriaCell, AsuntoCell, DescripcionCell, EstadoCell, FechaCreacionCell } from './template/cellTemplate'
import { getPqr } from "../../../api/axios.helper";
import { useEffect, useState } from 'react';
const usePqrResponse = () => {
   const [pqr, setPqr] = useState([]);

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

   return {
      columns,
      pqr
   }
}

export default usePqrResponse;
