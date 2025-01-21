export interface ProductPopupProps {
    isOpen: boolean;
    onClose: () => void;
    product: {
      title: string;
      description: string;
      features: string[];
    } | null;
  }
  