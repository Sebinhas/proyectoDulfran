import { useState } from 'react';

interface EditableFields {
    phone: string;
    email: string;
}

interface CompanyData {
    address: string;
    phone: string;
    email: string;
    location: string;
    nit: string;
    name: string;
    logo_url?: string;
}

export const useCompanyProfile = (company: CompanyData) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<EditableFields>({
        phone: company.phone,
        email: company.email
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            setIsEditing(false);
        } catch (error) {
            console.error('Error al guardar los cambios:', error);
        }
    };

    const handleCancel = () => {
        setEditForm({
            phone: company.phone,
            email: company.email
        });
        setIsEditing(false);
    };

    const getCompanyInitials = (name: string) => {
        // Limpia el nombre de caracteres especiales y obtiene las palabras
        const words = name
            .replace(/[^a-zA-Z\s]/g, '')
            .split(' ')
            .filter(word => word.length > 0);
        
        // Toma las dos primeras palabras y obtiene sus iniciales
        return words
            .slice(0, 2)
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase();
    };

    return {
        isEditing,
        editForm,
        setIsEditing,
        handleChange,
        handleSave,
        handleCancel,
        getCompanyInitials
    };
}; 

export default useCompanyProfile;
