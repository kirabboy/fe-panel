import { useEffect, useState } from 'react';
import { createContext } from 'react';
import { USER_LOGIN_LOCAL_STORAGE } from '@/utils/contants.js';
export const UserContext = createContext({
  user: null,
  setUserInformation: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to set the user information
  const setUserInformation = (userInfo) => {
    setUser(userInfo);
  };

  useEffect(() => {
    const userLocal = localStorage.getItem(USER_LOGIN_LOCAL_STORAGE);

    userLocal && setUserInformation(JSON.parse(userLocal));
  }, []);
  return (
    <UserContext.Provider value={{ user, setUserInformation }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
