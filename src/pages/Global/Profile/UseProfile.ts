import { useState } from "react";
import { useAuthStore } from "../../../hooks/authStore";

interface Reviews {
    average: number;
    totalCount: number;
    counts: { rating: number; count: number }[];
  }


const useProfile = () => {
    const [trustValue, setTrustValue] = useState(95);
    const [currentOption, setCurrentOption] = useState(4);    
    const { user } = useAuthStore();
    const reviews = {
        average: 4
    };

    const handleTrustChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTrustValue(Number(e.target.value));
    };

    return {
        reviews,
        trustValue,
        handleTrustChange,
        currentOption,
        setCurrentOption,
        user
    };
};

export default useProfile;
