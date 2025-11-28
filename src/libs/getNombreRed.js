export const getNombreRed = (red) => {
  switch (red.toLowerCase()) {
    case "facebook":
      return "Facebook";
    case "instagram":
      return "Instagram";
    case "tiktok":
      return "TikTok";
    case "whatsapp":
      return "WhatsApp";
    default:
      return red.charAt(0).toUpperCase() + red.slice(1);
  }
};
