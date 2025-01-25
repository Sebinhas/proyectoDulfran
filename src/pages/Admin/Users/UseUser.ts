import { useEffect, useState } from "react";
import { NameCell, CedulaCell, ContractCell, StatusCell, EmailCell, date_contract, Users } from './templates/cellTemplates';
import {useForm} from 'react-hook-form';
import Modal from "../../../components/Modal/Modal";
import { toast } from 'react-toastify';
import { UsersDTO } from "./DTOUser";


const UseUsers = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [options, setOptions] = useState('');
    const [user, setUser] = useState<UsersDTO | null>(null);

    const { toggleModal:toggleModalUploadUser, closeModalAction:closeModalActionUploadUser, Render:RenderUploadUser } = Modal({ title: 'Subir Usuarios' });
    const { toggleModal:toggleModalViewDetailUser, closeModalAction:closeModalActionViewDetailUser, Render:RenderViewDetailUser } = Modal({ title: 'Ver Detalles' });

    const { toggleModal:toggleModalEditInfoUser, closeModalAction:closeModalActionEditInfoUser, Render:RenderEditInfoUser } = Modal({ title: 'Editar Información' });

    const { register, handleSubmit, reset } = useForm<UsersDTO>();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

     
  



    const columns = [
        {
            header: 'Contrato',
            accessor: 'no_contract',
            cell: ContractCell
        },
        {
            header: 'Nombre',
            accessor: 'first_name',
            cell: NameCell
        },
        {
            header: 'Cédula',
            accessor: 'cedula',
            cell: CedulaCell
        },
        {
            header: 'Estado',
            accessor: 'status',
            cell: StatusCell
        },
        {
            header: 'Email',
            accessor: 'email',
            cell: EmailCell
        },
        {
            header: 'Fecha de Creación',
            accessor: 'date_contract',
            cell: date_contract
        },


    ]

    const userData: UsersDTO[] = [
        {
          userName: "maria",
          password: "123456",
          cedula: "1234121212",
          first_name: "María",
          second_name: "José",
          first_lastName: "Rodríguez",
          second_lastName: "Sánchez",
          no_contract: "45678912",
          address: "Calle 123, Ciudad",
          date_contract: "2024-03-15",
          phone: "1234567890",
          email: "maria@example.com",
          createdAt: "2024-03-15",
          updatedAt: "2024-03-15",
          status: 'activo',
        },
        {
          userName: "juan",
          password: "123456",
          cedula: "1234234234",
          first_name: "Juan",
          second_name: "Carlos",
          first_lastName: "Pérez",
          second_lastName: "López",
          no_contract: "72345678",
          address: "Calle 123, Ciudad",
          date_contract: "2024-03-14",
          phone: "1234567890",
          email: "juan@example.com",
          createdAt: "2024-03-14",
          updatedAt: "2024-03-14",
          status: 'activo',
        },
        {
          userName: "ana",
          password: "123456",
          cedula: "1236767676",
          first_name: "Ana",
          second_name: "Lucía",
          first_lastName: "Torres",
          second_lastName: "Vega",
          no_contract: "CE789456",
          address: "Calle 123, Ciudad",
          date_contract: "2024-03-13",
          phone: "1234567890",
          email: "ana@example.com",
          createdAt: "2024-03-13",
          updatedAt: "2024-03-13",
          status: 'inactivo',
        },
        {
          userName: "pedro",
          password: "123456",
          cedula: "1234567834",
          first_name: "Pedro",
          second_name: "Miguel",
          first_lastName: "Castro",
          second_lastName: "Díaz",
          no_contract: "89012345",
          address: "Calle 123, Ciudad",
          date_contract: "2024-03-12",
          phone: "1234567890",
          email: "pedro@example.com",
          createdAt: "2024-03-12",
          updatedAt: "2024-03-12",
          status: 'activo',
        },
        {
          userName: "carmen",
          password: "123456",
          cedula: "2231231231",
          first_name: "Carmen",
          second_name: "Rosa",
          first_lastName: "Flores",
          second_lastName: "Vargas",
          no_contract: "PTP234567",
          address: "Calle 123, Ciudad",
          date_contract: "2024-03-11",
          phone: "1234567890",
          email: "carmen@example.com",
          createdAt: "2024-03-11",
          updatedAt: "2024-03-11",
          status: 'activo',
        },
        {
          userName: "luis",
          password: "123456",
          cedula: "1231231231",
          first_name: "Luis",
          second_name: "Alberto",
          first_lastName: "Mendoza",
          second_lastName: "Ríos",
          no_contract: "34567890",
          address: "Calle 123, Ciudad",
          date_contract: "2024-03-10",
          phone: "1234567890",
          email: "luis@example.com",
          createdAt: "2024-03-10",
          updatedAt: "2024-03-10",
          status: 'inactivo',
        },
        {
          userName: "sandra",
          password: "123456",
          cedula: "1234572323",
          first_name: "Sandra",
          second_name: "Patricia",
          first_lastName: "Quiroz",
          second_lastName: "Mora",
          no_contract: "CE567890",
          address: "Calle 123, Ciudad",
          date_contract: "2024-03-09",
          phone: "1234567890",
          email: "sandra@example.com",
          createdAt: "2024-03-09",
          updatedAt: "2024-03-09",
          status: 'activo',
        },
        {
          userName: "jorge",
          password: "123456",
          cedula: "456788990",
          first_name: "Jorge",
          second_name: "Eduardo",
          first_lastName: "Paz",
          second_lastName: "Guerra",
          no_contract: "23456789",
          address: "Calle 123, Ciudad",
          date_contract: "2024-03-08",
          phone: "1234567890",
          email: "jorge@example.com",
          createdAt: "2024-03-08",
          updatedAt: "2024-03-08",
          status: 'inactivo',
        },
        {
          userName: "monica",
          password: "123456",
          cedula: "1234567890",
          first_name: "Mónica",
          second_name: "Andrea",
          first_lastName: "León",
          second_lastName: "Cruz",
          no_contract: "90123456",
          address: "Calle 123, Ciudad",
          date_contract: "2024-03-07",
          phone: "1234567890",
          email: "monica@example.com",
          createdAt: "2024-03-07",
          updatedAt: "2024-03-07",
          status: 'activo',
        }
    ];

    const handleView = (row: UsersDTO): void => {
        toast.success(`Orden vista, estado: ${row.status}`);
        console.log(row);
        toggleModalViewDetailUser();
        // navigate(`/dashboard/ordenes/${row.id}`);
      };

      const handleMessage = (row: UsersDTO): void => {
        toast.success(`Orden vista, estado: ${row.status}`);
        // navigate(`/dashboard/ordenes/${row.id}`);
      };

      const handleDownload = (row: UsersDTO): void => {
        toast.success(`Orden vista, estado: ${row.status}`);
        // navigate(`/dashboard/ordenes/${row.id}`);
      };

    const handleEdit = (row: UsersDTO): void => {
        toast.success(`Orden vista, estado: ${row.status}`);
        setUser(row);
        console.log(row);
        toggleModalEditInfoUser();
        // navigate(`/dashboard/ordenes/${row.id}`);
      };

    return {
        columns,
        userData,
        isLoading,
        handleView,
        handleMessage,
        handleDownload,
        handleEdit,
        toggleModalUploadUser,
        closeModalActionUploadUser,
        RenderUploadUser,
        register,
        handleSubmit,
        reset,
        toggleModalViewDetailUser,
        closeModalActionViewDetailUser,
        RenderViewDetailUser,
        toggleModalEditInfoUser,
        closeModalActionEditInfoUser,
        RenderEditInfoUser,
        user
    }
}   

export default UseUsers;
