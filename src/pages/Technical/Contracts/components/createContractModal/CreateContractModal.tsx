import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import SignaturePad from '../SignaturePad/SignaturePad';
import ImageUpload from '../ImageUpload/ImageUpload';
import VideoUpload from '../VideoUpload/VideoUpload';

interface CreateContractModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateContractModal: React.FC<CreateContractModalProps> = ({ isOpen, onClose }) => {
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [installationImages, setInstallationImages] = useState<File[]>([]);
  const [installationVideo, setInstallationVideo] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    cedula: '',
    planId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const convertToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.cedula) newErrors.cedula = 'La cédula es requerida';
    if (!formData.planId) newErrors.planId = 'Debe seleccionar un plan';
    if (!signatureData) newErrors.signature = 'La firma es requerida';
    if (installationImages.length === 0) newErrors.images = 'Debe subir al menos una imagen';
    if (!installationVideo) newErrors.video = 'El video es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      const imagesBase64 = await Promise.all(
        installationImages.map(image => convertToBase64(image))
      );

      const videoBase64 = await convertToBase64(installationVideo!);

      const payload = {
        cedula: formData.cedula,
        planId: formData.planId,
        signature: signatureData,
        installationImages: imagesBase64,
        installationVideo: videoBase64
      };

      console.log('Payload listo para enviar:', payload);
      
    } catch (error) {
      console.error('Error al procesar el formulario:', error);
      alert('Ocurrió un error al procesar el formulario');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveSignature = (signature: string) => {
    setSignatureData(signature);
    // Opcional: Mostrar alguna notificación de éxito
    alert('Firma guardada exitosamente');
  };

  const handleImagesChange = (files: File[]) => {
    setInstallationImages(files);
  };

  const handleVideoChange = (file: File | null) => {
    setInstallationVideo(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose}></div>

        <div className="relative w-full max-w-5xl rounded-lg bg-white shadow-lg">
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="text-xl font-semibold text-gray-900">Crear Nuevo Contrato</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <IoClose className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <p className="mb-8 text-gray-600">
              Complete la información del contrato para el cliente seleccionado.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Cédula del Cliente</label>
                  <input 
                    type="text"
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleInputChange}
                    placeholder="Ingrese el número de cédula"
                    className="w-full rounded-md border border-gray-300 p-2 outline-none"
                  />
                  {errors.cedula && <span className="text-sm text-red-500">{errors.cedula}</span>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Plan de Internet</label>
                  <select 
                    name="planId"
                    value={formData.planId}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 p-2 outline-none"
                  >
                    <option value="">Seleccionar plan</option>
                    <option value="1">Plan 1</option>
                    <option value="2">Plan 2</option>
                    <option value="3">Plan 3</option>
                  </select>
                  {errors.planId && <span className="text-sm text-red-500">{errors.planId}</span>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Firma del Cliente
                  </label>
                  <SignaturePad 
                    onSave={handleSaveSignature}
                    width={360}
                    height={180}
                  />
                  {signatureData && (
                    <div className="mt-2 text-sm text-green-600">
                      ✓ Firma guardada
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Fotos de Instalación (máx. 2)
                  </label>
                  <ImageUpload
                    maxImages={2}
                    onImagesChange={handleImagesChange}
                    maxSizeInMB={5}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">

                    Video de Instalación
                  </label>
                  <VideoUpload
                    onVideoChange={handleVideoChange}
                    maxSizeInMB={100}
                    containerHeight="300px"
                    acceptedFormats={['.mp4', '.mov', '.avi', '.mkv']}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button 
                type="button"

                onClick={onClose}
                className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:bg-gray-400"
              >
                {isSubmitting ? 'Procesando...' : 'Crear Contrato'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateContractModal;