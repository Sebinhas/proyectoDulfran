import { useState, useEffect } from "react";
import { getPqrByClient, createPqr } from "../../../api/axios.helper";
import { useAuthStore } from "../../../hooks/authStore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const usePqr = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [pqr, setPqr] = useState([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchPqrs = async () => {
      try {
        const response = await getPqrByClient(String(user?.nit), String(user?.id));
        if (response.status === 'success') {
          const userPqrs = response.pqrs.filter((pqr: any) => 
            pqr.client?.cedula === String(user?.id)
          );
          setPqr(userPqrs);
        }
      } catch (error) {
        toast.error('Error al obtener las PQRs');
        console.error('Error:', error);
      }
    };

    if (user?.id) {
      fetchPqrs();
    }
  }, [user?.id]);

  useEffect(() => {
    console.log(pqr);
    console.log(user)
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
      toast.error(error.response.data.message || 'Error al crear la PQR');
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
