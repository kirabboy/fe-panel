import formatDate from "./formatDate";

const formValidation = {
  firstName: { required: "Tên không được để trống" },
  lastName: { required: "Họ không được để trống" },
  fullName: { required: "Họ và tên không được để trống" },
  phone: {
    required: "SĐT không được để trống",
    pattern: {
      value: /(84|0)+([0-9]{9})\b/g,
      message: "Số điện thoại không hợp lệ",
    },
  },
  email: {
    required: "Email không được để trống",
    pattern: {
      value: /^[a-zA-Z0-9._-]+@okvip\.com$/,
      message: "Email phải có đuôi @okvip.com",
    },
  },

  password: {
    required: "Mật khẩu không được để trống",
    minLength: {
      value: 6,
      message: "Độ dài mật khẩu tối thiểu là 6 ký tự",
    },
  },
  passwordConfirm: (password) => ({
    required: "Xác nhận mật khẩu không được để trống",
    validate: (value) => value === password || "Mật khẩu không khớp",
    maxLength: {
      value: 20,
      message: "Độ dài mật khẩu tối đa là 20 ky tự",
    },
    minLength: {
      value: 6,
      message: "Độ dài mật khẩu tối thiểu là 6 ký tự",
    },
  }),

  userName: { required: "Tài khoản không được để trống" },
  vpsIpAddress: { required: "Vps IP address không được để trống" },
  port: { required: "Port không được để trống" },
  readTimeOut: { required: "Read time out không được để trống" },
  birthday: {
    required: "Ngày sinh không được để trống",
    validate: (birthday) => {
      const dateBirthday = formatDate(new Date(birthday));
      const currentDate = formatDate(new Date());
      if (dateBirthday && dateBirthday >= currentDate) {
        return "Vui lòng chọn ngày sinh không lớn hơn hoặc bằng với ngày hiện tại";
      }
    },
  },
  roles: { required: "Phân quyền không được để trống" },
  gender: { required: "Giới tính không được để trống" },
};

export default formValidation;
