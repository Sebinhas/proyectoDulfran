import { useAuthStore } from "../../../hooks/authStore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface LoginFormInputs {
  email: string;
  password: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        navigate("/dashboard");
      } else if (user.role === "user") {
        navigate("/dashboard/invoices");
      }
    } else {
      navigate("/auth/login");
    }
  }, [isAuthenticated, user, navigate]);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.email, data.password);
      reset();

      const currentUser = useAuthStore.getState().user;

      if (currentUser?.role === "admin") {
        navigate("/dashboard/users");

        toast.success(`¡Bienvenido ${currentUser?.role}!`);
      } else if (currentUser?.role === "user") {
        navigate("/dashboard/invoices");
        toast.success(`¡Bienvenido ${currentUser?.role}!`);
      }
    } catch (error) {
      toast.error("Credenciales inválidas");
    }
  };

  return {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    navigate,
    showPassword,
    setShowPassword,
  };
};
