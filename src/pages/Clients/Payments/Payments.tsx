import { IoAddSharp, IoCloudUploadOutline, IoDocumentOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import usePayments from "./usePayments";
import TableGlobal from "../../../components/TableData/TableGlobal";
import { useEffect, useState } from "react";
import ViewDetailUser from "./components/ViewDetailUser/ViewDetailUser";
import { ClientsDTO } from "./DTOUsers";
import { uploadExcel } from "../../../api/axios.helper";

import { toast } from "react-toastify";



const Payments = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {

    setIsLoading,
    isLoading,
    dataUsers,
    columns,
    handleView,

    handleEdit,
    handleMessage,
    handleDownload,
    onSubmit,
    toggleModalUploadUser,

    closeModalActionUploadUser,
    RenderUploadUser,
    toggleModalViewDetailUser,
    closeModalActionViewDetailUser,
    RenderViewDetailUser,
    toggleModalEditInfoUser,
    closeModalActionEditInfoUser,
    RenderEditInfoUser,
    user,
    register,
    handleSubmit,
    reset,
    errors,
  } = usePayments();



  useEffect(() => {
    console.log(user);
  }, [user]);


  


  return (
    <div className="w-full flex flex-col gap-4 p-4">
      
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-row items-center justify-start">
          <div className="text-[25px] font-semibold text-gray-600">Lista de Pagos</div>
        </div>
      </div>
      <TableGlobal

        columns={columns}
        data={dataUsers ?? []}
        itemsPerPage={8}

        actions={{
          view: (row) => handleView(row),
          download: (row) => handleDownload(row)
          //message: (row) => handleMessage(row)
        }}
        filters={{
          username: true,
          profile_type: true,
          status: true,
        }}
      />

      <RenderViewDetailUser>
        <ViewDetailUser user={user}  />
      </RenderViewDetailUser>


    </div>
  )
}

export default Payments;