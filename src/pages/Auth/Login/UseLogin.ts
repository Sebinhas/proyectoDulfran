import { useForm } from "react-hook-form"
import useLocalStorage  from "../../../hooks/useLocalStorage.ts"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { toast } from "react-toastify";

export const useLogin = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setItem } = useLocalStorage();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data: any) => {
        // Guardar la información del usuario
        setItem('userData', data);
        // También puedes guardar elementos individuales
        setItem('userEmail', data.email);

        toast.success('Bienvenido, '+ data.email)
        

        console.log('Usuario registrado:', data);
        navigate('/dashboard');
    }

    return { 
        register, 
        handleSubmit, 
        errors, 
        onSubmit, 
        showPassword,
        setShowPassword, 
        navigate 
    }
}