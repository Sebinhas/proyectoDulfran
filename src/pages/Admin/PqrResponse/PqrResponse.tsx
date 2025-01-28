import TableGlobal from "../../../components/TableData/TableGlobal";
import usePqrResponse from "./usePqrResponse";

const PqrResponse = () => {
  const { columns, pqr, handleEdit, closeModalActionResponsePqr, RenderResponsePqr } = usePqrResponse();
  return (
    <div className="w-full flex flex-col p-4">
      <TableGlobal
        columns={columns}
        data={pqr ?? []}
        itemsPerPage={8}
        actions={{
          edit: (row) => handleEdit(row)
        }}
      />
      <RenderResponsePqr>
        <div className="w-full h-96 flex justify-center items-center gap-4">
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <div className="font-medium text-gray-600">
              Responder PQR
            </div>
          </div>
        </div>
      </RenderResponsePqr>
    </div>
  );
};

export default PqrResponse;