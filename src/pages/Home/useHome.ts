import { useState, useEffect } from 'react';

interface ProductInfo {
  id: number;
  title: string;
  description: string;
  features: string[];
}

interface Reviews {
  average: number;
  totalCount: number;
  counts: { rating: number; count: number }[];
  featured: { id: number; rating: number; content: string; author: string; avatarSrc: string }[];
}

export const useHome = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductInfo | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar el botón cuando el scroll baje más de 200px
      const show = window.scrollY > 200;
      setShowScrollTop(show);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const reviews: Reviews = {
    average: 4,
    totalCount: 4,
    counts: [
      { rating: 5, count: 3 },
      { rating: 4, count: 1 },
      { rating: 3, count: 0 },
      { rating: 2, count: 0 },
      { rating: 1, count: 0 }
    ],
    featured: [
      {
        id: 1,
        rating: 5,
        content: `
          <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
        `,
        author: 'Emily Selman',
        avatarSrc:
          'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
      },
      {
        id: 2,
        rating: 4,
        content: `
          <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
        `,
        author: 'Estela',
        avatarSrc:
          'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
      },
      {
        id: 3,
        rating: 5,
        content: `
          <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
        `,
        author: 'Maria',
        avatarSrc:
          'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
      },
      {
        id: 3,
        rating: 5,
        content: `
          <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
        `,
        author: 'Maria',
        avatarSrc:
          'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
      }
    ]
  };

  const productsInfo: ProductInfo[] = [
    {
      id: 1,
      title: 'Protesis',
      description: 'Soluciones protésicas de alta calidad para restaurar su sonrisa',
      features: ['Materiales de primera calidad', 'Ajuste personalizado', 'Durabilidad garantizada']
    },
    {
      id: 2,
      title: 'Placas',
      description: 'Placas dentales diseñadas con precisión',
      features: ['Diseño ergonómico', 'Materiales hipoalergénicos', 'Ajuste cómodo']
    },
    {
      id: 3,
      title: 'Retenedores',
      description: 'Retenedores para mantener tus dientes en su lugar',
      features: ['Materiales de primera calidad', 'Ajuste personalizado', 'Durabilidad garantizada']
    },
    {
      id: 4,
      title: 'Ceromeros',
      description: 'Ceromeros para mantener tus dientes en su lugar',
      features: ['Materiales de primera calidad', 'Ajuste personalizado', 'Durabilidad garantizada']
    },
    {
      id: 5,
      title: 'Reparaciones',
      description: 'Reparaciones para mantener tus dientes en su lugar',
      features: ['Materiales de primera calidad', 'Ajuste personalizado', 'Durabilidad garantizada']
    },
    {
      id: 6,
      title: 'Adicionales',
      description: 'Productos adicionales para mantener tus dientes en su lugar',
      features: ['Materiales de primera calidad', 'Ajuste personalizado', 'Durabilidad garantizada']
    }
  ];

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPopup = (productId: number) => {
    const product = productsInfo.find((p) => p.id === productId);
    setSelectedProduct(product || null);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedProduct(null);
  };

  return {
    isPopupOpen,
    selectedProduct,
    handleOpenPopup,
    handleClosePopup,
    scrollToHero,
    reviews,
    showScrollTop,
  };
};
