import { useForm } from "react-hook-form";
import { updateUser } from "../../../../../api/axios.helper";
import Swal from "sweetalert2";



const useEditInfoUser = (setIsLoading?: (value: boolean) => void, loading?: boolean, closeModalActionEditInfoUser?: () => void) => {


    const { register, handleSubmit, formState: { errors } } = useForm();



    const onSubmit = async (data: any) => {
        try {
            // Mostrar loading mientras se procesa
            Swal.fire({
                title: 'Actualizando usuario',
                text: 'Por favor espere...',
                didOpen: () => {
                    Swal.showLoading();
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false
            });

            const response = await updateUser(data);
            
            // Cerrar el loading
            Swal.close();

            if (response) {
                await Swal.fire({
                    title: '¡Usuario Actualizado!',
                    text: 'El usuario ha sido actualizado exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                
                // Activar el loading de la tabla para refrescar los datos
                if (setIsLoading) {
                    closeModalActionEditInfoUser?.();
                    setIsLoading(!loading);
                }
            }
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al actualizar el usuario',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    }


    return {
        register,
        handleSubmit,
        errors,
        onSubmit
    }


}


export default useEditInfoUser;


