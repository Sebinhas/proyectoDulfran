export interface DTOSubscribe {
  nit?: string;
  name: string;
  address: string;
  phone: string;
  location?: string;
  email: string;
  logo_url: string;
  wompi_public_key: string;
  wompi_private_key: string;
  wompi_integrity_secret: string;
  prod_wompi_public_key: string;
  prod_wompi_private_key: string;
  prod_wompi_integrity_secret: string;
}
