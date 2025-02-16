import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const useFooter = () => {
    
    
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: FaLinkedinIn,
      url: 'https://linkedin.com'
    },
    {
      name: 'Facebook',
      icon: FaFacebookF,
      url: 'https://facebook.com'
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://instagram.com'
    }
  ];

  const companyLinks = [
    { name: 'Sobre Nosotros', path: '/about' },
    { name: 'Servicios', path: '/services' },
    { name: 'Especialidades', path: '/specialties' }
  ];

  const legalLinks = [
    { name: 'Términos y Condiciones', path: '/terms' },
    { name: 'Política de Privacidad', path: '/privacy' },
    { name: 'Preguntas Frecuentes', path: '/faq' }
  ];

  const contactInfo = [
    // {
    //   icon: MdPhone,
    //   text: '+57 (300) 123-4567',
    //   link: 'tel:+573001234567'
    // },
    {
      icon: MdEmail,
      text: 'info@devtronevolution.com',
      link: 'mailto:contacto@devtronevolution.com'
    },
  ];

  return {
    socialLinks,
    companyLinks,
    legalLinks,
    contactInfo
  };
};

export default useFooter;
