import React, { useState, useEffect } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { MdDownload } from "react-icons/md";

import { FaMessage } from "react-icons/fa6";
import { Tooltip } from 'react-tooltip';
import { SlOptions } from 'react-icons/sl';
import { ClientsDTO } from '../../pages/Admin/Users/DTOUser';

interface Column {
  header: string;
  accessor: string;
  cell?: (row: any) => React.ReactNode;
}

interface TableGlobalProps {
  columns: Column[];
  data: ClientsDTO[];
  itemsPerPage?: number;
  activateOptions?: {
    options?: (row: ClientsDTO) => void;
    setOptions?: (type: string, row: ClientsDTO) => void;
  };
  filters?: {
    name?: boolean;
    username?: boolean;
    createdAt?: boolean;
    no_contract?: boolean;
    status?: boolean;
    date?: boolean;
    cedula?: boolean;
  };
  actions?: {
    edit?: (row: ClientsDTO) => void;
    delete?: (row: ClientsDTO) => void;
    view?: (row: ClientsDTO) => void;
    custom?: (row: ClientsDTO) => React.ReactNode;
    message?: (row: ClientsDTO) => void;
    download?: (row: ClientsDTO) => void;
  };
  isLoading?: boolean;
  emptyMessage?: string;
}

const TableGlobal = ({
  columns,
  data,
  itemsPerPage = 4,
  actions,
  activateOptions,
  filters,
  isLoading = false,
  emptyMessage = 'No hay datos disponibles',
}: TableGlobalProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [filterValues, setFilterValues] = useState({
    name: '',
    status: '',
    createdAt: '',
    date: '',
    cedula: '',
    username: '',
    no_contract: '',
  });

  // Filtrar los datos antes de paginar
  const filteredData = React.useMemo(() => {
    let results = [...data];

    if (filterValues.name) {
      results = results.filter(item =>
        item.first_name?.toLowerCase().includes(filterValues.name.toLowerCase())
      );
    }

    if (filterValues.status) {
      results = results.filter(item =>
        item.status === filterValues.status
      );
    }

    if (filterValues.cedula) {
      results = results.filter(item =>
        item.cedula?.includes(filterValues.cedula)
      );
    }

    if (filterValues.username) {
      results = results.filter(item =>
        item.username?.toLowerCase().includes(filterValues.username.toLowerCase()) ||
        item.cedula?.toLowerCase().includes(filterValues.username.toLowerCase())
      );
    }

    if (filterValues.no_contract) {
      results = results.filter(item =>
        item.no_contract?.includes(filterValues.no_contract)
      );
    }

    if (filterValues.createdAt) {
      results = results.filter(item =>
        item.createdAt?.includes(filterValues.createdAt)
      );
    }

    if (filterValues.date) {
      results = results.filter(item =>
        item.date_contract?.includes(filterValues.date)
      );
    }

    return results;
  }, [filterValues, data]);

  // Calcular la paginación con los datos filtrados
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleFilterChange = (filterName: string, value: string, secondFilterName?: string) => {
    setFilterValues(prev => ({
      ...prev,
      [filterName]: value,
      ...(secondFilterName ? { [secondFilterName]: value } : {})
    }));
    setCurrentPage(1); // Resetear a la primera página cuando se filtra
  };

  const handleOptionsClick = (rowId: number) => {
    setSelectedRow(rowId); // Actualiza siempre al ID de la fila seleccionada
  };
  
  const handleOptionAction = (type: string, row: ClientsDTO) => {
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
                onChange={(e) => handleFilterChange('name','cedula', e.target.value)}
              />
          </div>
        )}
        {filters?.username && (
          <div className="w-full h-14 ">
              <div className="text-[18px] font-medium text-gray-600">Buscar</div>
              <input
                type="text"
                placeholder="Ingrese nombre de usuario o cédula"
                className="w-full p-2 border border-gray-300 outline-none rounded-md"
                value={filterValues.username}
                onChange={(e) => handleFilterChange('username', e.target.value)}
              />
          </div>
        )}
        {filters?.cedula && (
          <div className="w-full h-14 ">
            <div className="text-[18px] font-medium text-gray-600">Cédula</div>
            <input
              type="text"
              placeholder="Ingrese cédula"
              className="w-full p-2 border border-gray-300 outline-none rounded-md"
              value={filterValues.cedula}
              onChange={(e) => handleFilterChange('cedula', e.target.value)}
            />
          </div>
        )}
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
        {filters?.no_contract && (
          <div className="w-full h-14 ">
              <div className="text-[18px] font-medium text-gray-600">Contrato</div>
              <input
                type="text"
                placeholder="Ingrese contrato"
                className="w-full p-2 border border-gray-300 outline-none rounded-md"
                value={filterValues.no_contract}
                onChange={(e) => handleFilterChange('no_contract', e.target.value)}
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
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
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
                {(actions?.view || actions?.download || actions?.edit || actions?.message) && <th className="px-6 py-3 text-right">Acciones</th>}
              </tr>
            </thead>
            {/* Cuerpo */}
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.length > 0 ? (
                currentData.map((row, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-gray-50">
                    {columns.map((column, colIdx) => (
                      <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {column.cell ? column.cell(row) : row[column.accessor as keyof ClientsDTO]}
                      </td>
                    ))}
                    {(actions?.view || actions?.download || actions?.edit || actions?.message) && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        <div className="flex justify-end gap-2">
                          {actions?.view && (
                            <button
                              onClick={() => actions?.view?.(row)}
                              className="p-1.5  hover:bg-blue-50 rounded-full"
                              data-tooltip-id="tooltip"
                              data-tooltip-content="Ver detalles"
                            >
                              <FaEye className="text-lg" />
                            </button>
                          )}
                          {actions?.download && (
                            <button
                              onClick={() => actions?.download?.(row)}
                              className="p-1.5 hover:bg-green-50 rounded-full"
                              data-tooltip-id="tooltip"
                              data-tooltip-content="Descargar"
                            >
                              <MdDownload className="text-lg" />
                            </button>
                          )}
                          {actions?.edit && (
                            <button
                              onClick={() => actions?.edit?.(row)}
                              className="p-1.5  hover:bg-yellow-50 rounded-full"
                              data-tooltip-id="tooltip"
                              data-tooltip-content="Editar"
                            >
                              <FaEdit className="text-lg" />
                            </button>
                          )}
                          {actions?.message && (
                            <button
                              onClick={() => actions?.message?.(row)}
                              className="p-1.5  hover:bg-purple-50 rounded-full"
                              data-tooltip-id="tooltip"
                              data-tooltip-content="PQR"
                            >
                              <FaMessage className="text-lg" />
                            </button>
                          )}
                        </div>
                        <Tooltip id="tooltip" />
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
          <div className="flex items-center text-sm select-none text-gray-700">
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
                    className={`px-3 py-1 rounded-md select-none ${
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
