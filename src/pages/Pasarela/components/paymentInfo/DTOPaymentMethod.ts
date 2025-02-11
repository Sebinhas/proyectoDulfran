export interface DTOCreditCardInfoForm {
    card_number: string
    month: string
    year: string
    cvv: string
    card_name: string
    document_type: string

    document_number: string
    installments: string
    accept_terms: boolean
    accept_privacy: boolean
  }


export interface DTOBancolombiaInfoForm {
  type_person: string
  accept_terms: boolean
  accept_privacy: boolean
}

  
export interface DTONequiInfoForm {
  phone_number: string
  accept_terms: boolean
  accept_privacy: boolean
}