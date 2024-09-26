/**
 * @param {new Date} date
 * @returns {string} 'MM/DD/YYYY'
 */
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0, nên cộng 1 và thêm số 0 đằng trước nếu cần
  const day = String(date.getDate()).padStart(2, '0');

  return `${month}/${day}/${year}`;
};

export default formatDate;
