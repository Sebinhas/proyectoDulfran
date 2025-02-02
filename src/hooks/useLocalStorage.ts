import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'clave_predeterminada_desarrollo';

if (!import.meta.env.VITE_ENCRYPTION_KEY) {
  console.warn('⚠️ ADVERTENCIA: Usando clave de encriptación predeterminada. Configure VITE_ENCRYPTION_KEY en el archivo .env para producción.');
}

const encrypt = (text: string) => {
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(text), ENCRYPTION_KEY).toString();
  } catch (error) {
    console.error('Error en la encriptación:', error);
    return null;
  }
};

const decrypt = (encryptedText: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, ENCRYPTION_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Error en la desencriptación:', error);
    return null;
  }
};

const useLocalStorage = () => {
  const setItem = (key: string, value: string) => {
    try {
      const encryptedValue: string | null = encrypt(value);
      if (!encryptedValue) return;
      // Añadimos un prefijo para "ofuscar" las keys
      const encryptedKey: string = `_secure_${btoa(key)}`;
      window.localStorage.setItem(encryptedKey, encryptedValue);
    } catch (error) {
      console.error('Error guardando en localStorage:', error);
    }
  };

  const getItem = (key: string) => {
    try {
      const encryptedKey = `_secure_${btoa(key)}`;
      const encryptedValue = window.localStorage.getItem(encryptedKey);
      if (!encryptedValue) return null;
      return decrypt(encryptedValue);
    } catch (error) {
      console.error('Error obteniendo de localStorage:', error);
      return null;
    }
  };

  const removeItem = (key: string) => {
    try {
      const encryptedKey = `_secure_${btoa(key)}`;
      window.localStorage.removeItem(encryptedKey);
    } catch (error) {
      console.error('Error eliminando de localStorage:', error);
    }
  };

  const clear = () => {
    try {
      // Solo limpiamos los items que empiezan con nuestro prefijo
      Object.keys(window.localStorage).forEach((key) => {
        if (key.startsWith('_secure_')) {
          window.localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error limpiando localStorage:', error);
    }
  };

  return {
    setItem,
    getItem,
    removeItem,
    clear
  };
};

export default useLocalStorage;
