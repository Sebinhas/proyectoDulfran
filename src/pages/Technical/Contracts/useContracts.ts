import { useState } from 'react';
import { 
  ContractCell,
  ClientNameCell,
  StatusCell,
  SpeedPlanCell,
  CreatedAtCell 
} from './templates/cellTemplates';

const useContracts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const columns = [
    {
      header: 'No. Contrato',
      accessor: 'no_contract',
      cell: ContractCell
    },
    {
      header: 'Cliente',
      accessor: 'first_name',
      cell: ClientNameCell
    },
    {
      header: 'Plan de Internet',
      accessor: 'speed_plan',
      cell: SpeedPlanCell
    },
    {
      header: 'Estado',
      accessor: 'status',
      cell: StatusCell
    },
    {
      header: 'Fecha de Registro',
      accessor: 'createdAt',
      cell: CreatedAtCell
    }
  ]

  return {
    columns,
    isOpen,
    setIsOpen
  }
}

export default useContracts;