import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface SignaturePadProps {
  onSave: (signatureData: string) => void;
  width?: number;
  height?: number;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, width = 500, height = 200 }) => {
  const signatureRef = useRef<SignatureCanvas>(null);

  const handleClear = () => {
    signatureRef.current?.clear();
  };

  const handleSave = () => {
    if (signatureRef.current) {
      if (signatureRef.current.isEmpty()) {
        alert('Por favor, realice una firma antes de guardar');
        return;
      }
      const signatureData = signatureRef.current.toDataURL('image/png');
      onSave(signatureData);
    }
  };

  return (
    <div className="w-full">
      <div className="border rounded-md bg-white">
        <SignatureCanvas
          ref={signatureRef}
          canvasProps={{
            className: "w-full signature-canvas",
            width: width,
            height: height,
            style: {
              border: 'none',
              backgroundColor: 'white',
            }
          }}
          backgroundColor="white"
        />
      </div>
      <div className="mt-2 flex justify-end space-x-2">
        <button 
          onClick={handleClear}
          className="rounded px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
        >
          Limpiar
        </button>
        <button 
          onClick={handleSave}
          className="rounded bg-gray-800 px-3 py-1 text-sm text-white hover:bg-gray-700"
        >
          Guardar Firma
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;