import { useNavigate } from 'react-router-dom';
import useFooter from './useFooter';

const Footer = () => {
  const navigate = useNavigate();
  const { socialLinks, companyLinks, legalLinks, contactInfo } = useFooter();
  const renderSocialIcon = (Icon: React.ElementType) => <Icon className="w-4 h-4" />;

  return (
    <footer className="w-full bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Información de la empresa */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <img src={''} alt="Logo Laboratorio" className="w-10 h-10 rounded" />
              <span className="text-xl font-bold">
                Dev-Tronn
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Una empresa de desarrollo crea soluciones tecnológicas como 
              software, apps y sitios web para optimizar procesos y resolver necesidades.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 transition-colors"
                  aria-label={social.name}>
                  {renderSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Links de la empresa */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Empresa</h3>
            <nav className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className="text-sm  transition-colors text-left w-fit">
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Links legales */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
            <nav className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className="text-sm  transition-colors text-left w-fit">
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Contacto */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Contacto</h3>
            <div className="flex flex-col gap-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition-colors">
                  {renderSocialIcon(info.icon)}
                  <span>{info.text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
