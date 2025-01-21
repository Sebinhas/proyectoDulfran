import { ProductPopupProps } from "./DTOPopup";
import { usePopup } from "./usePopup";
// import img1 from "../../../../assets/images/teeth.png"

export const ProductPopup = ({ isOpen, onClose, product }: ProductPopupProps) => {
  const { handleModalClick } = usePopup(isOpen);

  if (!isOpen || !product) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        onClick={handleModalClick}
        className="bg-white rounded-lg p-8 mx-auto m-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        <div className="flex flex-row gap-10 justify-center items-center">
        <div className="space-y-2 pb-[100px]">
          <h3 className="font-semibold text-gray-700">Características:</h3>
          <ul className="list-disc pl-5">
            {product.features.map((feature, index) => (
              <li key={index} className="text-gray-600">{feature}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-row gap-4 justify-center items-center">
          <img src={''} alt="product" className="w-[200px] h-[200px]"/>
          <img src={''} alt="product" className="w-[200px] h-[200px]"/>
        </div>
        </div>
      </div>
    </div>
  );
};
