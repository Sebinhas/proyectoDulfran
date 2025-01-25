export interface UsersDTO {
    userName: string;
    password: string;
    cedula: string;
    first_name: string;
    second_name: string;
    first_lastName: string;
    second_lastName: string;
    no_contract: string;
    address: string;
    date_contract: string;
    phone: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    status: 'activo' | 'inactivo' ;
  }
