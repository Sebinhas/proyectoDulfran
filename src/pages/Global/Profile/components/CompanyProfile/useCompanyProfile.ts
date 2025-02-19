import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface EditableFields {
    phone: string;
    email: string;
    wompi_public_key?: string;
    wompi_private_key?: string;
    wompi_integrity_secret?: string;
    prod_wompi_public_key?: string;
    prod_wompi_private_key?: string;
    prod_wompi_integrity_secret?: string;
}

interface CompanyData {
    address: string;
    phone: string;
    email: string;
    location: string;
    nit: string;
    name: string;
    logo_url?: string;
    wompi_public_key?: string;
    wompi_private_key?: string;
    wompi_integrity_secret?: string;
    prod_wompi_public_key?: string;
    prod_wompi_private_key?: string;
    prod_wompi_integrity_secret?: string;
}

export const useCompanyProfile = (company: CompanyData) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<EditableFields>();
    const [editForm, setEditForm] = useState<EditableFields>({
        phone: company.phone,
        email: company.email,
        wompi_public_key: company.wompi_public_key || '',
        wompi_private_key: company.wompi_private_key || '',
        wompi_integrity_secret: company.wompi_integrity_secret || '',
        prod_wompi_public_key: company.prod_wompi_public_key || '',
        prod_wompi_private_key: company.prod_wompi_private_key || '',
        prod_wompi_integrity_secret: company.prod_wompi_integrity_secret || ''
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
            setIsLoading(true);
            setIsEditing(false);
        } catch (error) {
            console.error('Error al guardar los cambios:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setEditForm({
            phone: company.phone,
            email: company.email,
            wompi_public_key: company.wompi_public_key || '',
            wompi_private_key: company.wompi_private_key || '',
            wompi_integrity_secret: company.wompi_integrity_secret || '',
            prod_wompi_public_key: company.prod_wompi_public_key || '',
            prod_wompi_private_key: company.prod_wompi_private_key || '',
            prod_wompi_integrity_secret: company.prod_wompi_integrity_secret || ''
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


    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowPasswordForm(false);
    };

    return {
        isEditing,
        editForm,
        setIsEditing,
        handleChange,
        handleSave,
        handleCancel,
        getCompanyInitials,
        showPasswordForm,
        setShowPasswordForm,
        handlePasswordSubmit,
        isLoading,
        setIsLoading,
        register,
        handleSubmit,
        errors
    };
}; 

export default useCompanyProfile;
