import { useForm } from "react-hook-form";
import { updateUser } from "../../../../../api/axios.helper";
import Swal from "sweetalert2";

const useEditInfoUser = (
  setIsLoading?: (value: boolean) => void,
  loading?: boolean,
  closeModalActionEditInfoUser?: () => void,
  user?: any
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      Swal.fire({
        title: "Actualizando usuario",
        html: `
          <div class="flex flex-col items-center gap-4">
            <div class="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <div class="text-lg font-semibold text-gray-700">
              Actualizando información...
            </div>
            <div class="text-sm text-gray-500">
              Verificando y guardando cambios
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2 max-w-xs">
              <div class="bg-blue-500 h-2 rounded-full animate-pulse"></div>
            </div>
            <div class="flex items-center gap-2 text-xs text-gray-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span>Sincronizando datos</span>
            </div>
          </div>
        `,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        customClass: {
          popup: "rounded-lg",
          container: "p-4",
        },
      });

      const { username, ...dataWithoutUsername } = data;

      const updatedData = {
        ...dataWithoutUsername,
        cedula: user.cedula,
      };

      const response = await updateUser(updatedData, user.cedula);

      Swal.close();

      if (response) {
        await Swal.fire({
          title: "¡Actualización Exitosa!",
          html: `
            <div class="flex flex-col items-center gap-3">
              <div class="text-gray-600">
                Los cambios han sido guardados correctamente
              </div>
            </div>
          `,
          icon: "success",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton:
              "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg",
          },
        });

        if (setIsLoading) {
          closeModalActionEditInfoUser?.();
          setIsLoading(!loading);
        }
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      Swal.fire({
        title: "Error de Actualización",
        html: `
          <div class="flex flex-col items-center gap-3">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </div>
            <div class="text-gray-600">
              No se pudieron guardar los cambios
            </div>
          </div>
        `,
        icon: "error",
        confirmButtonText: "Entendido",
        customClass: {
          confirmButton:
            "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg",
        },
      });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useEditInfoUser;
