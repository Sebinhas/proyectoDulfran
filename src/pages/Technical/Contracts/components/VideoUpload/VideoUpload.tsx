import React, { useState, useRef } from 'react';
import { IoClose, IoVideocam } from "react-icons/io5";

interface VideoUploadProps {
  onVideoChange: (file: File | null) => void;
  maxSizeInMB?: number;
  containerHeight?: string;
  acceptedFormats?: string[];
}

const VideoUpload: React.FC<VideoUploadProps> = ({
  onVideoChange,
  maxSizeInMB = 100,
  containerHeight = '400px',
  acceptedFormats = ['.mp4', '.mov', '.avi', '.mkv']
}) => {
  const [preview, setPreview] = useState<{
    file: File;
    preview: string;
    thumbnail: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const generateThumbnail = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = URL.createObjectURL(file);
      video.onloadeddata = () => {
        video.currentTime = 1; // Captura el frame al segundo 1
      };
      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0);
        const thumbnail = canvas.toDataURL('image/jpeg');
        URL.revokeObjectURL(video.src);
        resolve(thumbnail);
      };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    if (!acceptedFormats.includes(fileExtension)) {
      alert(`Formato no válido. Formatos aceptados: ${acceptedFormats.join(', ')}`);
      return;
    }

    // Validar tamaño
    if (file.size > maxSizeInMB * 1024 * 1024) {
      alert(`El video excede el tamaño máximo de ${maxSizeInMB}MB`);
      return;
    }

    try {
      const thumbnail = await generateThumbnail(file);
      const newPreview = {
        file,
        preview: URL.createObjectURL(file),
        thumbnail
      };
      
      if (preview) {
        URL.revokeObjectURL(preview.preview);
      }
      
      setPreview(newPreview);
      onVideoChange(file);
    } catch (error) {
      console.error('Error al generar la vista previa:', error);
      alert('Error al procesar el video');
    }

    // Limpiar input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeVideo = () => {
    if (preview) {
      URL.revokeObjectURL(preview.preview);
    }
    setPreview(null);
    onVideoChange(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
        handleFileChange({ target: { files: dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full" style={{ height: containerHeight }}>
      <div className="h-full overflow-y-auto">
        {preview ? (
          <div className="relative">
            {/* Vista previa del video */}
            <div className="rounded-lg border border-gray-300 bg-black">
              <video
                ref={videoRef}
                src={preview.preview}
                className="w-full rounded-lg"
                controls
                poster={preview.thumbnail}
              />
            </div>
            
            {/* Información del archivo */}
            <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
              <span>{preview.file.name}</span>
              <span>{formatFileSize(preview.file.size)}</span>
            </div>

            {/* Botón eliminar */}
            <button
              onClick={removeVideo}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
            >
              <IoClose className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div
            className="flex h-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 hover:bg-gray-100"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <IoVideocam className="mb-3 h-10 w-10 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click para subir</span> o arrastra y suelta
            </p>
            <p className="text-xs text-gray-500">
              Formatos: {acceptedFormats.join(', ')} (Max. {maxSizeInMB}MB)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
