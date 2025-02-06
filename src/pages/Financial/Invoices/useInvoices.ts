import { useEffect, useState } from "react";
import { PatientCell, DateCell, StatusCell, CreatedByCell, ValueCell } from './templates/cellTemplates';
import { toast } from 'react-toastify';
import { useAuthStore } from '../../../hooks/authStore';
import Modal from "../../../components/Modal/Modal";
import Swal from 'sweetalert2';
import { uploadExcel, getInvoices } from '../../../api/axios.helper';


export interface Orders {
    id: number;
    user: string;
    email: string;
    documentNumber: string;
    documentType: string;
    createdAt: string;
    createdBy: string;
    status: 'Completada' | 'Pendiente' | 'Cancelada';
    total: number;
  }


const useOrders = () => {
    const currentNit = useAuthStore.getState().currentNit;
    const [isLoading, setIsLoading] = useState(true);
    const { toggleModal: toggleModalUploadInvoice, closeModalAction: closeModalActionUploadInvoice, Render: RenderUploadInvoice } = Modal({ title: 'Subir Facturas' });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [invoices, setInvoices] = useState<any[]>([]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        console.log(currentNit);
    }, [currentNit]);

    useEffect(() => {
      const fetchData = async () => {
          if (isLoading) {
              try {
                  const response = await getInvoices();
                  if (response) {
                      setInvoices(response);
                  }
              } catch (error) {
                  console.error('Error fetching clients:', error);
                  Swal.fire({
                      title: 'Error',
                      text: 'Hubo un error al cargar los datos',
                      icon: 'error'
                  });
              } finally {
                  setIsLoading(false);
              }
          }
      };
  
      fetchData();
  }, [isLoading]);

    const columns = [
        {
            header: 'Usuario',

            accessor: 'user',
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
            header: 'Emitida por',
            accessor: 'createdBy',
            cell: CreatedByCell
        },
        {
            header: 'Total',
            accessor: 'total',
            cell: ValueCell
        }
    ]

    const userData: Orders[] = [
        {
          id: 1,
          user: "María José Rodríguez Sánchez",
          email: "maria@example.com",
          documentNumber: "45678912",
          documentType: "DNI",
          createdAt: "2024-03-15",
          createdBy: "Santiago Marin",
          status: 'Completada',
          total: 1000000
        },
        {
          id: 2,
          user: "Juan Carlos Pérez López",
          email: "juan@example.com",
          documentNumber: "72345678",
          documentType: "DNI",
          createdAt: "2024-03-14",
          createdBy: "Santiago Marin",
          status: 'Pendiente',
          total: 9800000
        },
        {
          id: 3,
          user: "Ana Lucía Torres Vega",
          email: "ana@example.com",
          documentNumber: "CE789456",
          documentType: "Carné de Extranjería",
          createdAt: "2024-03-13",
          createdBy: "Santiago Marin",
          status: 'Cancelada',
          total: 210000
        },
        {
          id: 4,
          user: "Pedro Miguel Castro Díaz",
          email: "pedro@example.com",
          documentNumber: "89012345",
          documentType: "DNI",
          createdAt: "2024-03-12",
          createdBy: "Santiago Marin",
          status: 'Completada',
          total: 1000000
        },
        {
          id: 5,
          user: "Carmen Rosa Flores Vargas",
          email: "carmen@example.com",
          documentNumber: "PTP234567",
          documentType: "PTP",
          createdAt: "2024-03-11",
          createdBy: "Dr. Jorge Ramírez",
          status: 'Completada',
          total: 4200000
        },
        {
          id: 6,
          user: "Luis Alberto Mendoza Ríos",
          email: "luis@example.com",
          documentNumber: "34567890",
          documentType: "DNI",
          createdAt: "2024-03-10",
          createdBy: "Dra. Patricia Luna",
          status: 'Completada',
          total: 1200000
        },
        {
          id: 7,
          user: "Sandra Patricia Quiroz Mora",
          email: "sandra@example.com",
          documentNumber: "CE567890",
          documentType: "Carné de Extranjería",
          createdAt: "2024-03-09",
          createdBy: "Dr. Roberto Vargas",
          status: 'Completada',
          total: 10000
        },
        {
          id: 8,
          user: "Jorge Eduardo Paz Guerra",
          email: "jorge@example.com",
          documentNumber: "23456789",
          documentType: "DNI",
          createdAt: "2024-03-08",
          createdBy: "Dra. Carmen Ortiz",
          status: 'Completada',
          total: 300000
        },
        {
          id: 9,
          user: "Mónica Andrea León Cruz",
          email: "monica@example.com",
          documentNumber: "90123456",
          documentType: "DNI",
          createdAt: "2024-03-07",
          createdBy: "Dr. Miguel Soto",
          status: 'Completada',
          total: 720000
        },
        {
          id: 10,
          user: "Roberto Carlos Benítez Silva",
          email: "roberto@example.com",
          documentNumber: "PTP789012",
          documentType: "PTP",
          createdAt: "2024-03-06",
          createdBy: "Dra. Laura Vásquez",
          status: 'Completada',
          total: 300000
        }
    ];

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        // Validar que sea un archivo Excel
        if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
            file.type === 'application/vnd.ms-excel') {
          setSelectedFile(file);
        } else {
          alert('Por favor, seleccione un archivo Excel válido (.xlsx, .xls)');
          e.target.value = ''; // Limpiar el input
        }
      }
    };
  
    const handleFileUpload = async (file: File) => {
      try {
          // Mostrar loading inicial
          Swal.fire({
              title: 'Subiendo archivo',
              text: 'Procesando usuarios...',
              didOpen: () => {
                  Swal.showLoading();
              },
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              showCancelButton: true,
              cancelButtonText: 'Cancelar'
          });
  
          // Realizar el post
          const result = await uploadExcel(file);
          
          // Cerrar el loading inicial
          Swal.close();
  
          if (result) {
              // Mostrar resumen del proceso
              await Swal.fire({
                  title: '¡Proceso Completado!',
                  html: `
                      <p>${result.message}</p>
                      <p>Total procesados: ${result.totalProcessed}</p>
                      <p>Exitosos: ${result.successCount}</p>
                      <p>Errores: ${result.errorCount}</p>
                  `,
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
              });
  
              closeModalActionUploadInvoice();
              setSelectedFile(null);
  

              // Actualizar la lista de clientes
              try {
                  const response = await getInvoices();
                  if (response) {
                      setInvoices(response);
                  }

  
  
              } catch (error) {
                  console.error('Error al actualizar los datos:', error);
                  Swal.fire({
                      title: 'Error',
                      text: 'Error al actualizar la lista de clientes',
                      icon: 'error'
                  });
              }
          }
      } catch (error) {
          console.error('Error al subir archivo:', error);
          Swal.fire({
              title: 'Error',
              text: 'Hubo un error al procesar el archivo',
              icon: 'error'
          });
      }
    };



    const handleView = (row: Orders): void => {
        toast.success(`Orden vista, estado: ${row.status}`);
        // navigate(`/dashboard/ordenes/${row.id}`);
      };


    return {
        columns,
        userData,
        isLoading,
        handleView,
        toggleModalUploadInvoice,
        closeModalActionUploadInvoice,
        RenderUploadInvoice,
        selectedFile,
        setSelectedFile,
        handleFileChange,
        handleFileUpload,
        invoices
    }
}   




export default useOrders;
