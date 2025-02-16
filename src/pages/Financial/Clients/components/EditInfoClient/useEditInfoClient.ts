import { useForm } from "react-hook-form";
import { ClientsDTO } from "../../DTOClients";
import { updateClient } from "../../../../../api/axios.helper";
import Swal from "sweetalert2";

const useEditInfoUser = (
    setIsLoading?: (value: boolean) => void,
    loading?: boolean,
    closeModalActionEditInfoClient?: () => void,
    client?: any
) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        try {
            Swal.fire({
                title: "Actualizando cliente",
                html: `
                    <div class="flex flex-col items-center gap-4">
                        <div class="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                        <div class="text-lg font-semibold text-gray-700">
                            Actualizando información...
                        </div>
                        <div class="text-sm text-gray-500">
                            Verificando y guardando cambios
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

            const response = await updateClient(data);
            
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
                        confirmButton: "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg",
                    },
                });

                if (setIsLoading) {
                    closeModalActionEditInfoClient?.();
                    setIsLoading(!loading);
                }
            }
        } catch (error) {
            console.error("Error al actualizar cliente:", error);
            Swal.fire({
                title: "Error de Actualización",
                html: `
                    <div class="flex flex-col items-center gap-3">
                        <div class="text-gray-600">
                            No se pudieron guardar los cambios
                        </div>
                    </div>
                `,
                icon: "error",
                confirmButtonText: "Entendido",
                customClass: {
                    confirmButton: "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg",
                },
            });
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        onSubmit
    }
}

export default useEditInfoUser;


