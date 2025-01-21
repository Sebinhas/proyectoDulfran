import { useState, useEffect } from "react";

export const useHeaderHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Controlar el scroll del body
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Inicio", path: "hero" },
    { name: "Servicios", path: "services" },
    { name: "Sobre Nosotros", path: "about" },
    { name: "Certificaciones", path: "certifications" },
    { name: "Testimonios", path: "userReviews" },
    { name: "Contacto", path: "contact" },
  ];

  const handleOpenMenu = () => setIsMenuOpen(true);
  const handleCloseMenu = () => setIsMenuOpen(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      handleCloseMenu();
    }
  };

  const scrollFixed = () => {
    const element = document.getElementById("hero");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return {
    isMenuOpen,
    handleOpenMenu,
    handleCloseMenu,
    navLinks,
    scrollToSection,
    scrollFixed,
  };
};
