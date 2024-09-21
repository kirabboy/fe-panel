const validatePhoneNumber = (rule, value) => {
  if (!value || value.trim() === '') {
    return Promise.resolve(); // Cho phép trường trống
  }

  // Ví dụ: Kiểm tra số điện thoại Việt Nam 10 số
  if (!/^\d{10}$/.test(value)) {
    return Promise.reject('Số điện thoại phải là 10 chữ số');
  }

  return Promise.resolve();
};

export default validatePhoneNumber;
