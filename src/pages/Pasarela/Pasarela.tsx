import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid'
import { usePasarela } from './usePasarela'
import { PaymentMethodSection } from './components/PaymentMethodSection'
import { PersonalInfoDetails } from './components/InfoPersonalDetails'
import { useNavigate } from 'react-router-dom'
import { PSEConfirmation } from './components/paymentConfirmation/PSEConfirmation'
import { BancolombiaTransferConfirmation } from './components/paymentConfirmation/BancolombiaTransferConfirmation'
import { QRConfirmation } from './components/paymentConfirmation/QRConfirmation'
import { CreditCardConfirmation } from './components/paymentConfirmation/CreditCardConfirmation'
// import { NequiConfirmation } from './components/paymentConfirmation/NequiConfirmation'
import { EfectivoConfirmation } from './components/paymentConfirmation/EfectivoConfirmation'
import { PaymentInformation } from './components/PaymentInformation'
import { CreditCardInfo } from './components/paymentInfo/CreditCardInfo'
import { PSEInfo } from './components/paymentInfo/PSEInfo'
import { QRInfo } from './components/paymentInfo/QRInfo'
import { BancolombiaTransferInfo } from './components/paymentInfo/BancolombiaTransferInfo'
import { EfectivoInfo } from './components/paymentInfo/EfectivoInfo'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Pasarela() {
    const navigate = useNavigate()

    const { state } = useLocation()
    // console.log(state)

    const {
        getSteps,
        currentStep,
        handlePaymentMethodSelect,
        handleNext,
        handleBack,
        selectedPaymentMethod,
        handlePersonalDataChange,
        personalData,
        handlePaymentInfoChange,
        paymentInfo
    } = usePasarela()


    const steps = getSteps()

    const renderPaymentInfo = () => {
        switch (selectedPaymentMethod) {
            case 'credit-card':
                return <CreditCardInfo 
                    onBack={handleBack}
                    onNext={handleNext}
                    personalData={personalData}
                />
            case 'pse':
                return <PSEInfo 
                    onBack={handleBack}
                    onNext={handleNext}
                    personalData={personalData}
                />
            case 'qr-bancolombia':
                return <QRInfo 
                    onBack={handleBack}
                    onNext={handleNext}
                    personalData={personalData}
                />
            case 'bancolombia-transfer':
                return <BancolombiaTransferInfo 
                    onBack={handleBack}
                    onNext={handleNext}
                    personalData={personalData}
                />
            case 'nequi':
                // return <NequiInfo 
                //     onBack={handleBack}
                //     onNext={handleNext}
                //     personalData={personalData}
                // />
            case 'efectivo':
                return <EfectivoInfo 
                    onBack={handleBack}
                    onNext={handleNext}
                    personalData={personalData}
                />
        }
    }

    const renderConfirmation = () => {
        switch (selectedPaymentMethod) {
            case 'credit-card':
                return (
                    <CreditCardConfirmation
                        onNext={handleNext}
                        onBack={handleBack}
                        personalData={personalData}
                    />
                )
            case 'qr-bancolombia':
                return (
                    <QRConfirmation
                        onNext={handleNext}
                        onBack={handleBack}
                        personalData={personalData}
                        paymentInfo={paymentInfo}
                    />
                )
            case 'bancolombia-transfer':
                return (
                    <BancolombiaTransferConfirmation
                        onNext={handleNext}
                        onBack={handleBack}
                        personalData={personalData}
                        paymentInfo={paymentInfo}
                    />
                )
            case 'nequi':
                return (
                    <div className=""></div>
                    // <NequiConfirmation
                    //     onNext={handleNext}
                    //     onBack={handleBack}
                    //     personalData={personalData}
                    //     paymentInfo={paymentInfo}
                    // />
                )
            case 'pse':
                return (
                    <PSEConfirmation
                        onNext={handleNext}
                        onBack={handleBack}
                        personalData={personalData}
                    />
                )
            case 'efectivo':
                return (
                    <EfectivoConfirmation
                        onNext={handleNext}
                        onBack={handleBack}
                        personalData={personalData}
                        paymentInfo={paymentInfo}
                    />
                )
            default:
                return null
        }
    }

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
                        selectedMethod={selectedPaymentMethod || ''}
                        onPersonalDataChange={handlePersonalDataChange}
                        initialData={personalData}
                    />
                )
            case 3:
                return renderPaymentInfo()
            case 4:
                return renderConfirmation()
            default:
                return null
        }
    }

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center bg-gray-50 py-8">
            <div 
                onClick={() => navigate('/dashboard/payments')} 
                className="cursor-pointer absolute top-6 left-6 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                <ArrowLeftIcon className="size-6 text-gray-500" />
            </div>
            <div className="w-full max-w-[1300px] px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Proceso de Pago</h2>
{/* 
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
                    </nav> */}

                    <div className="mt-8">
                        <PaymentMethodSection
                            onMethodSelect={handlePaymentMethodSelect}
                            onNext={handleNext}
                            onBack={handleBack}
                            isFirstStep={true}
                            paymentData={state?.paymentData}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}