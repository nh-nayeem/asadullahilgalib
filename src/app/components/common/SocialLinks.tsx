"use client";

import { FaFacebook, FaYoutube, FaInstagram, FaLinkedin } from 'react-icons/fa';

interface SocialLinksProps {
  iconSize?: number;
  hoverColor?: string;
  className?: string;
}

const SocialLinks = ({ 
  iconSize = 20, 
  hoverColor = "text-white", 
  className = "" 
}: SocialLinksProps) => {
  return (
    <div className={`flex space-x-4 ${className}`}>
      <a 
        href="https://www.facebook.com/asadullahil.galib.01/" 
        target="_blank" 
        rel="noopener noreferrer"
        className={`text-gray-300 hover:${hoverColor} transition-colors`}
        aria-label="Facebook"
      >
        <FaFacebook size={iconSize} />
      </a>
      <a 
        href="https://www.youtube.com/@FilmsByGalib" 
        target="_blank" 
        rel="noopener noreferrer"
        className={`text-gray-300 hover:${hoverColor} transition-colors`}
        aria-label="YouTube"
      >
        <FaYoutube size={iconSize} />
      </a>
      <a 
        href="https://www.instagram.com/asadullahil_galib_01/" 
        target="_blank" 
        rel="noopener noreferrer"
        className={`text-gray-300 hover:${hoverColor} transition-colors`}
        aria-label="Instagram"
      >
        <FaInstagram size={iconSize} />
      </a>
      <a 
        href="https://www.linkedin.com/in/asadullahilgalib01/" 
        target="_blank" 
        rel="noopener noreferrer"
        className={`text-gray-300 hover:${hoverColor} transition-colors`}
        aria-label="LinkedIn"
      >
        <FaLinkedin size={iconSize} />
      </a>
    </div>
  );
};

export default SocialLinks;