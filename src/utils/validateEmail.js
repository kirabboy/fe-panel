const validateEmail = (rule, value) => {
  if (!value || value.trim() === '') {
    return Promise.resolve(); // Allow empty fields
  }

  if (!value.endsWith('@okvip.com')) {
    return Promise.reject('Địa chỉ email phải kết thúc bằng @okvip.com');
  }

  return Promise.resolve();
};
export default validateEmail;
