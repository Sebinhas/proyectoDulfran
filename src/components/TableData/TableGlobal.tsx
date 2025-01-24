import React, { useState, useEffect } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { SlOptions } from 'react-icons/sl';

interface Column {
  header: string;
  accessor: string;
  cell?: (row: any) => React.ReactNode;
}

interface TableGlobalProps {
  columns: Column[];
  data: any[];
  itemsPerPage?: number;
  activateOptions?: {
    options?: (row: any) => void;
    setOptions?: (type: string, row: any) => void;
  };
  filters?: {
    patient?: boolean;
    createdAt?: boolean;
    name?: boolean;
    status?: boolean;
    date?: boolean;
    nit?: boolean;
  };
  options?: {
    edit?: boolean;
    delete?: boolean;
    view?: boolean;
    download?: boolean;
    actions?: boolean;
  };
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
  options,
  actions,
  activateOptions,
  filters,
  isLoading = false,
  emptyMessage = 'No hay datos disponibles',
}: TableGlobalProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [filterValues, setFilterValues] = useState({
    patient: '',
    status: '',
    createdAt: '',
    name: '',
    date: '',
    nit: '',
  });

  // Filtrar los datos antes de paginar
  const filteredData = React.useMemo(() => {
    let results = [...data];

    if (filterValues.patient) {
      results = results.filter(item => 
        item.patient?.toLowerCase().includes(filterValues.patient.toLowerCase())
      );
    }

    if (filterValues.name) {
      results = results.filter(item =>
        item.name?.toLowerCase().includes(filterValues.name.toLowerCase())
      );
    }

    if (filterValues.status) {
      results = results.filter(item =>
        item.status === filterValues.status
      );
    }

    if (filterValues.nit) {
      results = results.filter(item =>
        item.nit?.includes(filterValues.nit)
      );
    }

    if (filterValues.createdAt) {
      results = results.filter(item =>
        item.createdAt?.includes(filterValues.createdAt)
      );
    }

    if (filterValues.date) {
      results = results.filter(item =>
        item.date?.includes(filterValues.date)
      );
    }

    return results;
  }, [filterValues, data]);

  // Calcular la paginación con los datos filtrados
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilterValues(prev => ({
      ...prev,
      [filterName]: value
    }));
    setCurrentPage(1); // Resetear a la primera página cuando se filtra
  };

  const handleOptionsClick = (rowId: number) => {
    setSelectedRow(rowId); // Actualiza siempre al ID de la fila seleccionada
  };
  
  const handleOptionAction = (type: string, row: any) => {
    activateOptions?.setOptions?.(type, row);
    setSelectedRow(null); // Cierra el menú después de realizar una acción
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.querySelector('.options-menu');
      if (menu && !menu.contains(event.target as Node)) {
        setSelectedRow(null); // Cierra el menú al hacer clic fuera
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const shouldShowMenuUpwards = (rowIdx: number) => {
    const rowsVisible = currentData.length;
    return rowIdx >= rowsVisible - 2;
  };

  const handleFilter = (filter: string, value: string) => {
    console.log(filter, value);
  };
  

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Filtros y Búsqueda */}
      <div className="w-full flex flex-row gap-4 pb-4">
        {filters?.name && (
          <div className="w-full h-14 ">
              <div className="text-[18px] font-medium text-gray-600">Nombre</div>
              <input
                type="text"
                placeholder="Ingrese nombre"
                className="w-full p-2 border border-gray-300 outline-none rounded-md"
                value={filterValues.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
              />
          </div>
        )}
        {filters?.patient && (
          <div className="w-full h-14 ">
            <div className="text-[18px] font-medium text-gray-600">Paciente</div>
            <input
              type="text"
              placeholder="Ingrese nombre del paciente"
              className="w-full p-2 border border-gray-300 outline-none rounded-md"
              value={filterValues.patient}
              onChange={(e) => handleFilterChange('patient', e.target.value)}
            />
          </div>
        )}
        {filters?.nit && (
          <div className="w-full h-14 ">
            <div className="text-[18px] font-medium text-gray-600">Nit</div>
            <input
              type="text"
              placeholder="Ingrese nit"
              className="w-full p-2 border border-gray-300 outline-none rounded-md"
              value={filterValues.nit}
              onChange={(e) => handleFilterChange('nit', e.target.value)}
            />
          </div>
        )}
        {filters?.status && (
          <div className="w-full h-14 ">
            <div className="text-[18px] font-medium text-gray-600">Estado</div>
            <select
              value={filterValues.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full p-2 border border-gray-300 outline-none rounded-md">
              <option value="">Seleccione un estado</option>
              <option value="1">Activo</option>
              <option value="2">Inactivo</option>
            </select>
          </div>
        )}
        {filters?.createdAt && (
          <div className="w-full h-14 ">
            <div className="text-[18px] font-medium text-gray-600">Fecha de Creación</div>
            <input
              type="date"
              className="w-full px-2 py-[7px] border border-gray-300 outline-none rounded-md"
              value={filterValues.createdAt}
              onChange={(e) => handleFilterChange('createdAt', e.target.value)}
            />
          </div>
        )}
        {filters?.date && (
          <div className="w-full h-14 ">
            <div className="text-[18px] font-medium text-gray-600">Fecha</div>
            <input
              type="date"
              className="w-full px-2 py-[7px] border border-gray-300 outline-none rounded-md"
              value={filterValues.date}
              onChange={(e) => handleFilterChange('date', e.target.value)}
            />
          </div>
        )}
      </div>
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
                {options?.actions && <th className="px-6 py-3 text-right">Acciones</th>}
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
                    {options?.actions && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex gap-2 justify-center items-center">
                          {activateOptions && (
                            <button
                              onClick={() => handleOptionsClick(row.id)}
                              className="relative text-slate-600"
                          >
                              <SlOptions className="text-xl" />
                              {selectedRow === row.id && (
                                <div className={`absolute ${shouldShowMenuUpwards(rowIdx) ? 'bottom-0' : 'top-0'} z-50 right-0 w-44 flex flex-col bg-white shadow-lg rounded-md py-2 options-menu`}>
                                  {/* {options?.view && (
                                  <div
                                    onClick={() => handleOptionAction('ver', row)}
                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                  >
                                    Ver
                                  </div>
                                  )} */}
                                  {options?.edit && (
                                    <div
                                      onClick={() => handleOptionAction('editar', row)}
                                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                    >
                                      Editar
                                    </div>
                                  )}
                                  {options?.delete && (
                                    <div
                                      onClick={() => handleOptionAction('eliminar', row)}
                                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                    >
                                      Eliminar
                                    </div>
                                  )}
                                  {options?.download && (
                                    <div
                                      onClick={() => handleOptionAction('descargar', row)}
                                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                    >
                                      Ver
                                    </div>
                                  )}
                                </div>
                              )}
                          </button>
                          )}
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
      </div>

      {/* Paginador */}
      {data.length > 0 && (
        <div className="flex justify-between items-center px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
          <div className="flex items-center text-sm text-gray-700">
            Mostrando{' '}
            <span className="font-medium mx-1">
              {startIndex + 1}
            </span>
            a
            <span className="font-medium mx-1">
              {Math.min(endIndex, filteredData.length)}
            </span>
            de
            <span className="font-medium mx-1">{filteredData.length}</span>
            resultados
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <BiChevronLeft className="text-xl" />
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === pageNumber
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <BiChevronRight className="text-xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableGlobal;
