export const convertToBytes = (size) => {
  // Kiểm tra nếu size không phải là chuỗi
  if (typeof size !== "string") {
    console.error("Invalid input: Expected a string, but got", typeof size);
    return 0; // Trả về 0 nếu đầu vào không hợp lệ
  }

  const unit = size.replace(/[0-9.]/g, "").trim(); // Lấy đơn vị (Gi, Mi, Ti,...)
  const value = parseFloat(size); // Lấy giá trị số (ví dụ: 7.8 từ "7.8Gi")

  switch (unit) {
    case "Gi": // Gibibyte
      return value * Math.pow(1024, 3);
    case "Mi": // Mebibyte
      return value * Math.pow(1024, 2);
    case "Ti": // Tebibyte
      return value * Math.pow(1024, 4);
    case "Ki": // Kibibyte
      return value * 1024;
    default: // Byte
      return value;
  }
};
