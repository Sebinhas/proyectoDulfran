import { useState } from "react";
import usePqr from "./usePqr.ts";
import PqrCard from "./Components/PqrCard/PqrCard.tsx";
import PqrDetail from "./Components/PqrDetails/PqrDetails.tsx";
import NewPqrModal from "./Components/NewPqrModal/NewPqrModal.tsx";

const Pqr = () => {
  const { pqr } = usePqr();
  const [selectedPqr, setSelectedPqr] = useState<any>(null);
  const [isNewPqrModalOpen, setIsNewPqrModalOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col p-6 select-none">
  
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis PQR</h1>
        <button 
          onClick={() => setIsNewPqrModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <span>+</span> Nueva PQR
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar PQR..."
          className="border rounded-md px-4 py-2 outline-none flex-1"
        />
        <select className="border rounded-md px-4 py-2 w-44 outline-none">
          <option value="">Estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="en_proceso">En Proceso</option>
          <option value="cerrado">Cerrado</option>
        </select>
      </div>

      <div className="space-y-4 overflow-y-auto max-h-[700px]">
        {pqr.map((item: any) => (
          <PqrCard 
            key={item.id} 
            data={item} 
            onClick={() => setSelectedPqr(item)}
          />
        ))}
      </div>

      {isNewPqrModalOpen && (
        <NewPqrModal 
          onClose={() => setIsNewPqrModalOpen(false)}
        />
      )}

      {selectedPqr && (
        <PqrDetail 
          data={selectedPqr} 
          onClose={() => setSelectedPqr(null)} 
        />
      )}
    </div>
  );
};

export default Pqr;
