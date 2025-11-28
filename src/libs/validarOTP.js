export const validarOTP = (otp) => {
  if (!otp) return "";

  return otp.replace(/\D/g, "");
};
