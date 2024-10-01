import variables from "./variables";

const getUserProfile = () => {
  const dataProfile =
    sessionStorage.getItem(variables.USER_LOGIN_LOCAL_STORAGE) ||
    localStorage.getItem(variables.USER_LOGIN_LOCAL_STORAGE);
  const profile = dataProfile ? JSON.parse(dataProfile) : {};

  return profile;
};

const getAccessToken = () =>
  sessionStorage.getItem(variables.ACCESS_TOKEN) ||
  localStorage.getItem(variables.ACCESS_TOKEN);

const getUserRole = () =>
  sessionStorage.getItem(variables.ROLE) ||
  localStorage.getItem(variables.ROLE);

export { getUserProfile, getAccessToken, getUserRole };
