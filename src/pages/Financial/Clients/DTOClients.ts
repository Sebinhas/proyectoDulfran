export interface ClientsDTO {
    username: string;
    password: string;
    cedula: string;
    first_name: string;
    second_name: string;
    first_lastname: string;
    second_lastname: string;
    no_contract: string;
    address: string;
    date_contract: string;
    phone: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    status: 'activo' | 'inactivo' ;
    stratum: string;
  }
