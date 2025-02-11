import { useEffect, useState } from "react";
import { UserCell, DateCell, StatusCell, TotalCell, NumberInvoiceCell } from './templates/cellTemplates';
import { toast } from 'react-toastify';
import { useAuthStore } from '../../../hooks/authStore';
import Modal from "../../../components/Modal/Modal";
import Swal from 'sweetalert2';
import { uploadExcel, getInvoices } from '../../../api/axios.helper';



export interface InvoiceData {
  numberInvoice: number;
  user: string;
  createdAt: string;
  status: 'Completada' | 'Pendiente' ;
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
        header: 'Número de Factura',
        accessor: 'numberInvoice',
        cell: NumberInvoiceCell
      },
      {
          header: 'Usuario',
          accessor: 'user',
          cell: UserCell
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
          header: 'Total',
          accessor: 'total',
          cell: TotalCell
      }
    ]

    const invoicesData: InvoiceData[] = [
        {
          numberInvoice: 1,
          user: "María José Rodríguez Sánchez",
          createdAt: "2024-03-15",
          status: 'Completada',
          total: 1000000

        },
        {
          numberInvoice: 2,
          user: "Juan Carlos Pérez López",
          createdAt: "2024-03-14",
          status: 'Pendiente',
          total: 9800000
        },
        {
          numberInvoice: 3,
          user: "Ana Lucía Torres Vega",
          createdAt: "2024-03-13",
          status: 'Completada',
          total: 210000
        },
        {
          numberInvoice: 4,
          user: "Pedro Miguel Castro Díaz",
          createdAt: "2024-03-12",
          status: 'Completada',
          total: 1000000
        },
        {
          numberInvoice: 5,
          user: "Carmen Rosa Flores Vargas",
          createdAt: "2024-03-11",
          status: 'Completada',     
          total: 4200000
        },
        {
          numberInvoice: 6,
          user: "Luis Alberto Mendoza Ríos",
          createdAt: "2024-03-10",
          status: 'Completada',
          total: 1200000
        },
        {
          numberInvoice: 7,
          user: "Sandra Patricia Quiroz Mora",
          createdAt: "2024-03-09",
          status: 'Completada',
          total: 10000
        },
        {
          numberInvoice: 8,
          user: "Jorge Eduardo Paz Guerra",
          createdAt: "2024-03-08",
          status: 'Completada',
          total: 300000
        },
          {
          numberInvoice: 9,
          user: "Mónica Andrea León Cruz",
          createdAt: "2024-03-07",
          status: 'Completada',
          total: 720000
        },
        {
          numberInvoice: 10,
          user: "Roberto Carlos Benítez Silva",
          createdAt: "2024-03-06",
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



    const handleView = (row: InvoiceData): void => {
        toast.success(`Orden vista, estado: ${row.status}`);
        // navigate(`/dashboard/ordenes/${row.id}`);
      };




    return {
        columns,
        invoicesData,
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
