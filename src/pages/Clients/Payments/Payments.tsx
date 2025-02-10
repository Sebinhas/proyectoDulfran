import { IoArrowBack } from "react-icons/io5";
import usePayments from "./usePayments";
import TableGlobal from "../../../components/TableData/TableGlobal";
import { useEffect } from "react";
import ViewPaymentDetail from "./viewPaymentsDetail/viewPaymentsDetails";
import { LuDownload, LuPrinter } from "react-icons/lu";
import GenerateInvoice from "./components/GenerateInvoice/GenerateInvoice";

const Payments = () => {

  const {
    columns,
    handleView,
    handleDownload,
    user,
    selectedPayment,
    showDetail,
    handleBack,
    handlePay,
    mockPayments,
    RenderDownloadInvoice,
    closeModalActionDownloadInvoice,
    toggleModalDownloadInvoice,
    invoice
  } = usePayments();

  useEffect(() => {
    console.log(user);
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

          <div className="overflow-auto flex-1">
            <TableGlobal
              columns={columns}
              data={mockPayments ?? []}
              itemsPerPage={8}
              actions={{
                view: (row) => handleView(row),
                download: (row) => handleDownload(row),
                pay: (row) => handlePay(row)
              }}
              filters={{
                status: true,
              }}
            />
          </div>
          <RenderDownloadInvoice>
            <GenerateInvoice invoice={invoice} />
          </RenderDownloadInvoice>
        </>
      ) : (
        <div className="w-full h-full overflow-auto">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <IoArrowBack className="text-xl" />
            <span>Volver a la lista</span>
          </button>
          
          <ViewPaymentDetail payment={selectedPayment} />
        </div>
      )}
    </div>
  )
}

export default Payments;