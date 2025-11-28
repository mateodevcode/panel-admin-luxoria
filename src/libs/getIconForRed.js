import { BsFacebook } from "react-icons/bs";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";

export const getIconForRed = (red) => {
  switch (red.toLowerCase()) {
    case "facebook":
      return <BsFacebook className="w-5 h-5" />;
    case "instagram":
      return <FiInstagram className="w-5 h-5" />;
    case "tiktok":
      return <FaTiktok className="w-5 h-5" />;
    case "whatsapp":
      return <FaWhatsapp className="w-5 h-5" />;
    default:
      return <BsFacebook className="w-5 h-5" />;
  }
};
