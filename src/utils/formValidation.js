const formValidation = {
  firstName: { required: 'Tên không được để trống' },
  lastName: { required: 'Họ không được để trống' },
  fullName: { required: 'Họ và tên không được để trống' },
  phone: {
    required: 'SĐT không được để trống',
    pattern: {
      value: /(84|0)+([0-9]{9})\b/g,
      message: 'Số điện thoại không hợp lệ',
    },
  },
  email: {
    required: 'Email không được để trống',
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: 'Email không hợp lệ',
    },
  },

  password: {
    required: 'Mật khẩu không được để trống',
    minLength: {
      value: 6,
      message: 'Độ dài mật khẩu tối thiểu là 6 ký tự',
    },
  },
  passwordConfirm: (password) => ({
    required: 'Xác nhận mật khẩu không được để trống',
    validate: (value) => value === password || 'Mật khẩu không khớp',
    maxLength: {
      value: 20,
      message: 'Độ dài mật khẩu tối đa là 20 ky tự',
    },
    minLength: {
      value: 6,
      message: 'Độ dài mật khẩu tối thiểu là 6 ký tự',
    },
  }),

  userName: { required: 'UserName không được để trống' },
  vpsIpAddress: { required: 'Vps IP address không được để trống' },
  port: { required: 'Port không được để trống' },
  readTimeOut: { required: 'Read time out không được để trống' },
};

export default formValidation;
