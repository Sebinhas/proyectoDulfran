import React, { useState, useRef } from 'react';
import { IoClose, IoImage } from "react-icons/io5";

interface ImageUploadProps {
  maxImages?: number;
  onImagesChange: (files: File[]) => void;
  maxSizeInMB?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  maxImages = 2,
  onImagesChange,
  maxSizeInMB = 5
}) => {
  const [previews, setPreviews] = useState<{ file: File; preview: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validar número máximo de imágenes
    if (files.length + previews.length > maxImages) {
      alert(`Solo puedes subir un máximo de ${maxImages} imágenes`);
      return;
    }

    // Validar cada archivo
    const validFiles = files.filter(file => {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} no es una imagen válida`);
        return false;
      }

      // Validar tamaño
      if (file.size > maxSizeInMB * 1024 * 1024) {
        alert(`${file.name} excede el tamaño máximo de ${maxSizeInMB}MB`);
        return false;
      }

      return true;
    });

    // Crear previews para los archivos válidos
    const newPreviews = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setPreviews(prev => [...prev, ...newPreviews]);
    onImagesChange([...previews.map(p => p.file), ...validFiles]);

    // Limpiar input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    // Liberar URL del preview
    URL.revokeObjectURL(previews[index].preview);
    
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    onImagesChange(newPreviews.map(p => p.file));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const imageFiles = droppedFiles.filter(file => file.type.startsWith('image/'));
    
    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      imageFiles.forEach(file => dataTransfer.items.add(file));
      fileInputRef.current.files = dataTransfer.files;
      handleFileChange({ target: { files: dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="w-full">
      {/* Área de preview */}
      {previews.length > 0 && (
        <div className="mb-4 grid grid-cols-2 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview.preview}
                alt={`Preview ${index + 1}`}
                className="h-40 w-full rounded-lg object-cover"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
              >
                <IoClose className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Área de upload */}
      {previews.length < maxImages && (
        <div
          className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 hover:bg-gray-100"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <IoImage className="mb-3 h-10 w-10 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click para subir</span> o arrastra y suelta
          </p>
          <p className="text-xs text-gray-500">
            PNG, JPG (Max. {maxSizeInMB}MB)
          </p>
          {previews.length > 0 && (
            <p className="mt-2 text-xs text-gray-500">
              {previews.length} de {maxImages} imágenes
            </p>
          )}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;