"use client";

import { FaFacebook, FaYoutube, FaInstagram, FaLinkedin } from 'react-icons/fa';

interface SocialLinksProps {
  iconSize?: number;
  hoverColor?: string;
  className?: string;
  links?: Partial<Record<'facebook' | 'youtube' | 'instagram' | 'linkedin', string>>;
}

const SocialLinks = ({ 
  iconSize = 30, 
  hoverColor = "text-white", 
  className = "",
  links = {}
}: SocialLinksProps) => {
  return (
    <div className={`flex space-x-6 ${className}`}>
      <a 
        href={links.facebook || "https://www.facebook.com/asadullahil.galib.01/"}
        target="_blank" 
        rel="noopener noreferrer"
        className={`text-gray-300 hover:${hoverColor} transition-colors`}
        aria-label="Facebook"
      >
        <FaFacebook size={iconSize} />
      </a>
      <a 
        href={links.youtube || "https://www.youtube.com/@GalibOnLens"}
        target="_blank" 
        rel="noopener noreferrer"
        className={`text-gray-300 hover:${hoverColor} transition-colors`}
        aria-label="YouTube"
      >
        <FaYoutube size={iconSize} />
      </a>
      <a 
        href={links.instagram || "https://www.instagram.com/asadullahil_galib_01/"}
        target="_blank" 
        rel="noopener noreferrer"
        className={`text-gray-300 hover:${hoverColor} transition-colors`}
        aria-label="Instagram"
      >
        <FaInstagram size={iconSize} />
      </a>
      <a 
        href={links.linkedin || "https://www.linkedin.com/in/asadullahilgalib01/"}
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
