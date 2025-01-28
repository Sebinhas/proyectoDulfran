import { useState, useEffect } from 'react'

export type StepStatus = 'complete' | 'current' | 'upcoming'

export interface Step {
  id: string
  name: string
  href: string
  status: StepStatus
}

export interface PersonalData {
  nombre: string
  email: string
  telefono: string
  direccion: string
  ciudad: string
  documento: string
}

export const usePasarela = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [previousStep, setPreviousStep] = useState(1)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('')
  const [personalData, setPersonalData] = useState<PersonalData>({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    documento: ''
  })
  
  useEffect(() => {
    if (currentStep !== previousStep) {
      console.log('Cambio de paso:', {
        anterior: previousStep,
        actual: currentStep
      })
      setPreviousStep(currentStep)
    }
  }, [currentStep, previousStep])

  const updateStep = (stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= 3) {
      setCurrentStep(stepNumber)
    }
  }

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method)
  }

  const handlePersonalDataChange = (data: PersonalData) => {
    setPersonalData(data)
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const getSteps = (): Step[] => {
    return [
      {
        id: '01',
        name: 'Método de Pago',
        href: '#',
        status: currentStep > 1 ? 'complete' : currentStep === 1 ? 'current' : 'upcoming',
      },
      {
        id: '02',
        name: 'Información Personal',
        href: '#',
        status: currentStep > 2 ? 'complete' : currentStep === 2 ? 'current' : 'upcoming',
      },
      {
        id: '03',
        name: 'Confirmación',
        href: '#',
        status: currentStep === 3 ? 'current' : 'upcoming',
      },
    ]
  }

  return {
    currentStep,
    previousStep,
    updateStep,
    getSteps,
    selectedPaymentMethod,
    handlePaymentMethodSelect,
    handleNext,
    handleBack,
    personalData,
    handlePersonalDataChange,
  }
} 