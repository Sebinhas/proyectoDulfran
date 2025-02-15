import { useState } from 'react';
import { updateUserProfileAdmin, updateUserProfileClient } from '../../../../../api/axios.helper';
import { toast } from 'react-toastify';
import { useAuthStore } from '../../../../../hooks/authStore';

interface EditableFields {
    phone: string;
    email: string;
}

interface BaseUser {
    cedula?: string;
    first_name?: string;
    second_name?: string;
    last_name?: string;
    second_lastname?: string;
    email: string;
    phone: string;
    profile_type: string;
    no_contract?: string;
    address?: string;
    speed_plan?: string;
    stratum?: string;
    trust_value?: number;
    status?: string;
}

interface UseUserProfileProps {
    user: BaseUser;
}

export const useUserProfile = ({ user }: UseUserProfileProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [editForm, setEditForm] = useState<EditableFields>({
        phone: user.phone,
        email: user.email
    });
    const [isLoading, setIsLoading] = useState(false);

    const updateUser = useAuthStore(state => state.updateUser);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        if(editForm.phone === user.phone && editForm.email === user.email){
            toast.warning('Debes modificar al menos un campo para guardar los cambios');
            return;
        }

        setIsLoading(true);
        const payload = {
            phone: editForm.phone,
            email: editForm.email,
        }

        try {
            if(user.profile_type === 'cliente'){
                await updateUserProfileClient(payload);
            }else{
                await updateUserProfileAdmin(payload);
            }
            setIsEditing(false);
            updateUser(payload);
            toast.success('Perfil actualizado exitosamente');
        } catch (error: any) {
            setIsEditing(false);
            toast.error('Error al actualizar el perfil');
            console.error('Error al guardar:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setEditForm({
            phone: user.phone,
            email: user.email
        });
        setIsEditing(false);
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase();
    };

    const getFullName = (user: BaseUser) => {
        return `${user.first_name || ''} ${user.second_name || ''} ${user.last_name || ''} ${user.second_lastname || ''}`.trim();
    };

    const isClient = (user: BaseUser): user is BaseUser & { profile_type: 'cliente' } => {
        return user.profile_type === 'cliente';
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica para cambiar la contraseña
        console.log('Cambiando contraseña...');
        setShowPasswordForm(false);
    };

    return {
        isEditing,
        editForm,
        showPasswordForm,
        setIsEditing,
        setShowPasswordForm,
        handleChange,
        handleSave,
        handleCancel,
        getInitials,
        getFullName,
        isClient,
        handlePasswordSubmit,
        isLoading
    };
};
