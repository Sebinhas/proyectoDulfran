import { useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import TableSkeleton from './Skeleton/TableSkeleton';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

interface Column {
  header: string;
  accessor: string;
  cell?: (row: any) => React.ReactNode;
}

interface TableGlobalProps {
  columns: Column[];
  data: any[];
  itemsPerPage?: number;
  actions?: {
    edit?: (row: any) => void;
    delete?: (row: any) => void;
    view?: (row: any) => void;
    custom?: (row: any) => React.ReactNode;
  };
  isLoading?: boolean;
  emptyMessage?: string;
}

const TableGlobal = ({
  columns,
  data,
  itemsPerPage = 4,
  actions,
  isLoading = false,
  emptyMessage = "No hay datos disponibles"
}: TableGlobalProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Cálculos para la paginación
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Skeleton loader
  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-sm">
      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Encabezados */}
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              {actions && <th className="px-6 py-3 text-right">Acciones</th>}
            </tr>
          </thead>

          {/* Cuerpo */}
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.length > 0 ? (
              currentData.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-gray-50">
                  {columns.map((column, colIdx) => (
                    <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {column.cell ? column.cell(row) : row[column.accessor]}
                    </td>
                  ))}
                  
                  {/* Acciones */}
                  {actions && (
                    <td className="px-6  py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex gap-2 justify-center items-center">
                        {actions.view && (
                          <button
                            onClick={() => actions.view?.(row)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Tooltip id='view' place='top'style={{fontSize: '12px', backgroundColor: '#d1d5db', color: '#6b7280 '}}>
                              Ver más
                            </Tooltip>
                              <FaEye data-tooltip-id='view' className='text-xl' />
                          </button>
                        )}
                        {actions.edit && (
                          <button
                            onClick={() => actions.edit?.(row)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Tooltip id='edit' place='top'style={{fontSize: '12px', backgroundColor: '#d1d5db', color: '#6b7280 '}}>
                              Editar
                            </Tooltip>
                            <FaEdit data-tooltip-id='edit' className='text-xl' />
                          </button>
                        )}
                        {actions.delete && (
                          <button
                            onClick={() => actions.delete?.(row)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Tooltip id='delete' place='top'style={{fontSize: '12px', backgroundColor: '#d1d5db', color: '#6b7280 '}}>
                              Eliminar
                            </Tooltip>
                            <FaTrash data-tooltip-id='delete' className='text-xl' />
                          </button>
                        )}
                        {actions.custom && actions.custom(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando{' '}
                <span className="font-medium">{startIndex + 1}</span>
                {' '}a{' '}
                <span className="font-medium">
                  {Math.min(endIndex, data.length)}
                </span>
                {' '}de{' '}
                <span className="font-medium">{data.length}</span>
                {' '}resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <BiChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <BiChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableGlobal;