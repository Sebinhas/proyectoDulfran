import { useForm } from "react-hook-form";
import { ClientsDTO } from "../../DTOClients";
const useEditInfoUser = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();



    const onSubmit = (data: any) => {
        console.log(data);
    }


    return {
        register,
        handleSubmit,
        errors,
        onSubmit
    }


}


export default useEditInfoUser;


