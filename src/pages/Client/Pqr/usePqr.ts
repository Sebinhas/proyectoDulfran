import { useState, useEffect } from "react";
import { getPqr, createPqr } from "../../../api/axios.helper";
import { useAuthStore } from "../../../hooks/authStore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const usePqr = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [pqr, setPqr] = useState([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const response = async () => {
      const response = await getPqr();
      setPqr(response);
    };
    response();
  }, []);

  useEffect(() => {
    console.log(pqr);
  }, [pqr]);

  const createNewPqr = async (data: any) => {
    try {
      const payload = {
        'type': String(data.requestType),
        'category': 'general',
        'sub_category': String(data.category),
        'description': String(data.description),
        'client_cedula': String(user?.id)
      }

      const response = await createPqr(payload);
      if (response) {
        toast.success('PQR creada exitosamente');
        reset()
      } else {
        toast.error('Error al crear la PQR');
      }
    } catch (error: any) {
      console.error('Error al crear PQR:', error);
      toast.error(error);
    }
  };

  return {
    pqr,
    register,
    handleSubmit,
    user,
    createNewPqr,
    errors
  };
};

export default usePqr;
