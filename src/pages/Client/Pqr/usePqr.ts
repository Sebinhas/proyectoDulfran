import { useState, useEffect } from "react";
import { getPqr } from "../../../api/axios.helper";
import { useAuthStore } from "../../../hooks/authStore";
import { useForm } from "react-hook-form";

const usePqr = () => {
  const { register, handleSubmit } = useForm();
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

  const createPqr = (data: any) => {
    console.log(user);
    console.log(data);
  };

  return {
    pqr,
    register,
    handleSubmit,
    user,
    createPqr,
  };
};

export default usePqr;
