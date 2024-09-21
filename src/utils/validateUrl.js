const validateUrl = (rule, value) => {
  if (!value || value.trim() === '') {
    return Promise.resolve('VUi lòng nhập Url'); // Allow empty fields
  }
  const urlRegex =
    // eslint-disable-next-line no-useless-escape
    /^(https?:\/\/)?(?:www\.)?([a-zA-Z0-9]+[\-_\.]?)+\.(?:[a-zA-Z]{2,})+$/;

  if (!urlRegex.test(value)) {
    return Promise.reject('Không đúng định dạng url');
  }

  return Promise.resolve();
};
export default validateUrl;
