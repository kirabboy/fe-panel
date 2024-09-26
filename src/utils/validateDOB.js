import formatDate from './formatDate.js';
const validateDOB = (rule, value) => {
  const date = value !== null && formatDate(new Date(value));
  const currentDate = formatDate(new Date());
  if (date && date >= currentDate) {
    return Promise.reject(
      'Vui lòng chọn ngày sinh không lớn hơn hoặc bằng với ngày hiện tại'
    );
  }

  return Promise.resolve();
};
export default validateDOB;
