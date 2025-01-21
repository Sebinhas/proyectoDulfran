import TableGlobal from '../../../components/TableData/TableGlobal';
import CardsCount from './Components/Card/CardsCount';
import { BiRightArrowAlt } from 'react-icons/bi';
import { useDashboard } from './useDashboard';

const Dashboard = () => {
  const { userData, columns, mockData, isLoading, handleView, navigate } =
    useDashboard();

  return (
    <div className="w-full p-4 bg-gray-100 flex flex-col gap-8">
      <div className="leading-6 text-gray-600">
        <h1 className="text-[25px] font-semibold">Bienvenido, Dr. {userData?.email}</h1>
        <span className="text-[16px] font-light">Que tenga buen día y un gran trabajo.</span>
      </div>
      <CardsCount />
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center justify-between text-gray-600">
          <span className="text-[20px] font-semibold">Órdenes Recientes</span>
          <div
            onClick={() => navigate('/dashboard/ordenes')}
            className="flex items-center gap-1 cursor-pointer hover:text-gray-800">
            Ver Todas
            <BiRightArrowAlt className="text-xl" />
          </div>
        </div>
        <div className="w-full h-[calc(100vh-410px)] overflow-y-auto">
          <TableGlobal
            columns={columns}
            data={mockData}
            itemsPerPage={4}
            actions={{
                view: handleView,
                // edit: handleView,
                // delete: handleView
            }}
            isLoading={isLoading}
            emptyMessage="No hay órdenes recientes"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
