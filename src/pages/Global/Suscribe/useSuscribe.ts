import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DTOSubscribe } from "./DTOSuscribe";






const useSuscribe = () => {
  

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<DTOSubscribe>();
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const convertToBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (reader.result) {
                    resolve(reader.result as string);
                }
            };
            reader.onerror = error => reject(error);
        });
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            try {
                const base64 = await convertToBase64(file);
                setPreviewUrl(base64);
                setValue('logo_url', base64);
            } catch (error) {
                console.error('Error converting image:', error);
            }
        }
    };

    const onSubmit = () => {

    };

    return { 
        navigate,
        register,
        handleSubmit,
        errors,
        watch,
        setValue,
        previewUrl,
        handleImageChange,
        onSubmit,
    };
};

export default useSuscribe;
