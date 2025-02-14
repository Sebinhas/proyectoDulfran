import { IoArrowBack } from "react-icons/io5";
import usePayments from "./usePayments";
import TableGlobal from "../../../components/TableData/TableGlobal";
import { useEffect } from "react";
import PaymentReceipt from "../../Pasarela/components/PaymentInvoice/PaymentInvoice";
import GenerateInvoice from "./components/GenerateInvoice/GenerateInvoice";
import PaymentHistoryView from './PaymentHistoryView/PaymentHistoryView';

const Payments = () => {
  const {
    columns,
    handleDownload,
    user,
    showDetail,
    handleBack,
    handlePay,
    RenderDownloadInvoice,
    invoice,
    invoicesData,
    handleViewInvoice,
    selectedPayment,
  } = usePayments();

  useEffect(() => {
    // console.log(user);
  }, [user]);

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4 overflow-hidden">
      {!showDetail ? (
        <>
          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-row items-center justify-start">
              <div className="text-[25px] font-semibold text-gray-600">
                Lista de Pagos
              </div>
            </div>
          </div>

          <div className="overflow-auto ">
            <TableGlobal
              columns={columns}
              data={invoicesData}
              itemsPerPage={8}
              actions={{
                view: (row) => handleViewInvoice(row),
                download: (row) => handleDownload(row),
                pay: (row) => handlePay(row),
              }}
              filters={{
                status_payment: true,
              }}
            />
          </div>
          <RenderDownloadInvoice>
            <div className="w-full h-full flex flex-col gap-4 py-4">
              <GenerateInvoice invoice={invoice} />
            </div>
          </RenderDownloadInvoice>
        </>
      ) : (
        <PaymentHistoryView 
          paymentData={selectedPayment} 
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default Payments;
