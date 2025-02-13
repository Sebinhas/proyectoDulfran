import { useForm } from "react-hook-form";
import { updateUser } from "../../../../../api/axios.helper";
import Swal from "sweetalert2";



const useEditInfoUser = (setIsLoading?: (value: boolean) => void, loading?: boolean, closeModalActionEditInfoUser?: () => void, user?: any) => {


    const { register, handleSubmit, formState: { errors } } = useForm();



    const onSubmit = async (data: any) => {
        try {
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

            const { username, ...dataWithoutUsername } = data;
            
            const updatedData = {
                ...dataWithoutUsername,
                cedula: user.cedula
            };

            const response = await updateUser(updatedData);
            
            Swal.close();

            if (response) {
                await Swal.fire({
                    title: '¡Usuario Actualizado!',
                    text: 'El usuario ha sido actualizado exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                
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


