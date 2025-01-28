import TableGlobal from "../../../components/TableData/TableGlobal";
import usePqrResponse from "./usePqrResponse";

const PqrResponse = () => {
  const { columns, pqr } = usePqrResponse();
  return (
    <div className="w-full flex flex-col p-4">
      <TableGlobal
        columns={columns}
        data={pqr ?? []}
        itemsPerPage={8}
        actions={{
          view: (row) => {},
          
        }}
      />
    </div>
  );
};

export default PqrResponse;