import { useAuthStore } from '../../../hooks/authStore';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useLocalStorage from '../../../hooks/useLocalStorage';

interface LoginFormInputs {
  email: string;
  password: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { setItem } = useLocalStorage();
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { user } = useAuthStore();

  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.email, data.password);
      console.log("Intentando navegar", user);

    //   if(user?.role === 'admin'){
    //     navigate('/dashboard/users');
    //   }
    //   if(user?.role === 'user'){
    //     navigate('/dashboard/invoices');
    //   }
      toast.success(`¡Bienvenido! ${user?.role}`);
    //   navigate('/dashboard');
    } catch (error) {
      toast.error('Credenciales inválidas');
    }
  };

  return {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    navigate,
    showPassword,
    setShowPassword
  };
};