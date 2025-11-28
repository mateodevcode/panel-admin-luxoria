export const handleResponse = (success, message, data = null, error = null) => {
  return {
    success,
    message,
    data,
    error,
    status: success ? 200 : 401,
  };
};
