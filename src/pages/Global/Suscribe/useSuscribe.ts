import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DTOSubscribe } from "./DTOSuscribe";
import { createCompany } from "../../../api/axios.helper";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const useSuscribe = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<DTOSubscribe>();
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const convertToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result as string);
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const base64 = await convertToBase64(file);
        setPreviewUrl(base64);
        setValue("logo_url", base64);
      } catch (error) {
        console.error("Error converting image:", error);
      }
    }
  };

  const onSubmit = async (data: DTOSubscribe) => {
    try {
      // Mostrar loading primero
      Swal.fire({
        title: "Creando nueva empresa",
        html: `
          <div class="flex flex-col items-center gap-4">
            <div class="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <div class="text-lg font-semibold text-gray-700">
              Procesando datos...
            </div>
            <div class="text-sm text-gray-500">
              Estamos validando que todo esté bien, espera un momento...
            </div>
            <div class="flex items-center gap-2 text-xs text-gray-400 mt-2">
              <span>Configuración segura</span>
            </div>
          </div>
        `,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        // didOpen: () => {
        //   Swal.showLoading(null);
        // },
      });

      // Realizar la petición
      const response = await createCompany(data);

      // Cerrar el loading
      await Swal.close();

      if (response.status === "success") {
        await Swal.fire({
          html: `
                <div class="w-[550px] space-y-8 px-4">
                  <div class="ml-6 text-center space-y-3">
                    <h2 class="text-3xl font-bold text-[#2d3748] ">
                      ¡Registro Exitoso! <span class=" inline-block">🚀</span>
                    </h2>
                    <p class="text-[#718096]">
                      Tu empresa ha sido registrada en Monedix Colombia
                    </p>
                  </div>
      
                  <div class="w-[550px] bg-[#EBF5FF] p-6 rounded-lg">
                    <h4 class="text-left text-[#1a56db] font-semibold mb-3">
                      Próximos pasos:
                    </h4>
                    <div class="space-y-2 text-left text-[#2b6cb0]">
                      <p class="flex items-center gap-2">
                        <span class="text-blue-500">⏰</span>
                        Revisaremos tu solicitud en las próximas 24-48 horas
                      </p>
                      <p class="flex items-center gap-2">
                        <span class="text-blue-500">📧</span>
                        Recibirás un email con tus credenciales de acceso
                      </p>
                    </div>
                  </div>
      
                  <div class="text-sm text-[#718096] ">
                    <p class="text-center">
                      ¿Tienes dudas? Contáctanos en soporte@monedix.com
                    </p>
                  </div>
                </div>
              `,
          showConfirmButton: true,
          confirmButtonText: "Entendido",
          confirmButtonColor: "#101C42",
          width: 700,
          padding: "2em",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          customClass: {
            container: "font-sans",
            popup: "rounded-xl",
            confirmButton: "px-6 py-2.5 text-sm font-medium rounded-lg",
          },
        });
        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      await Swal.close();
      toast.error("Ocurrió un error al registrar la empresa");
    }
  };

  return {
    navigate,
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    previewUrl,
    handleImageChange,
    onSubmit,
  };
};

export default useSuscribe;
