import { CheckIcon } from '@heroicons/react/24/solid'
import { usePasarela } from './usePasarela'
import { PaymentMethodSection } from './components/PaymentMethodSection'
import { PersonalInfoDetails } from './components/InfoPersonalDetails'
import { PaymentConfirmation } from './components/PaymentConfirmation'

export default function Pasarela() {
  const { 
    getSteps, 
    currentStep, 
    handlePaymentMethodSelect,
    handleNext,
    handleBack,
    selectedPaymentMethod,
    handlePersonalDataChange,
    personalData
  } = usePasarela()
  
  const steps = getSteps()
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PaymentMethodSection 
            onMethodSelect={handlePaymentMethodSelect} 
            onNext={handleNext}
            onBack={handleBack}
            isFirstStep={true}
          />
        )
      case 2:
        return (
          <PersonalInfoDetails
            onNext={handleNext}
            onBack={handleBack}
            selectedMethod={selectedPaymentMethod}
            onPersonalDataChange={handlePersonalDataChange}
            initialData={personalData}
          />
        )
      case 3:
        return (
          <PaymentConfirmation
            onBack={handleBack}
            selectedMethod={selectedPaymentMethod}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Proceso de Pago</h2>
          
          <nav aria-label="Progress">
            <ol role="list" className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0">
              {steps.map((step, stepIdx) => (
                <li key={step.name} className="relative md:flex md:flex-1">
                  {step.status === 'complete' ? (
                    <a href={step.href} className="group flex w-full items-center">
                      <span className="flex items-center px-6 py-4 text-sm font-medium">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                          <CheckIcon className="size-6 text-white" />
                        </span>
                        <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
                      </span>
                    </a>
                  ) : step.status === 'current' ? (
                    <a href={step.href} aria-current="step" className="flex items-center px-6 py-4 text-sm font-medium">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                        <span className="text-indigo-600">{step.id}</span>
                      </span>
                      <span className="ml-4 text-sm font-medium text-indigo-600">{step.name}</span>
                    </a>
                  ) : (
                    <a href={step.href} className="group flex items-center">
                      <span className="flex items-center px-6 py-4 text-sm font-medium">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                          <span className="text-gray-500 group-hover:text-gray-900">{step.id}</span>
                        </span>
                        <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.name}</span>
                      </span>
                    </a>
                  )}

                  {stepIdx !== steps.length - 1 ? (
                    <>
                      <div aria-hidden="true" className="absolute right-0 top-0 hidden h-full w-5 md:block">
                        <svg fill="none" viewBox="0 0 22 80" preserveAspectRatio="none" className="size-full text-gray-300">
                          <path
                            d="M0 -2L20 40L0 82"
                            stroke="currentcolor"
                            vectorEffect="non-scaling-stroke"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </>
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-8">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  )
}