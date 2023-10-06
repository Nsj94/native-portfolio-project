import React, {createContext, useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import Snackbar from 'react-native-snackbar';

export const AuthContext: any = createContext(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email: string, password: string) => {
    // if (!email || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
    if (!email) {
      Snackbar.show({
        text: 'Invalid Email',
      });
      return;
    }
    if (!password) {
      Snackbar.show({
        text: 'Password is required ',
      });
      return;
    }
    try {
      await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: email,
          password: password,
          expiresInMins: 10,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.message === 'Invalid credentials') {
            setIsLoggedIn(false);
            Snackbar.show({
              text: data.message,
            });
          } else {
            console.log(data);
            setIsLoggedIn(true);
            storeUserSession(data);
            Snackbar.show({
              text: 'Logged In Succesful',
            });
          }
        });
    } catch (error) {
      Snackbar.show({
        text: `Something Went Wrong ${error}`,
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };
  const logout = async () => {
    await EncryptedStorage.removeItem('user_session')
      .then(() => {
        setIsLoggedIn(false);
        Snackbar.show({
          text: 'Logout Succesful',
          duration: Snackbar.LENGTH_LONG,
        });
      })
      .catch(e =>
        Snackbar.show({
          text: `Something Went Wrong ${e}`,
          duration: Snackbar.LENGTH_LONG,
        }),
      );
  };

  async function storeUserSession(data: any) {
    try {
      await EncryptedStorage.setItem('user_session', JSON.stringify(data));
    } catch (error) {
      Snackbar.show({
        text: `Something Went Wrong ${error}`,
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  useEffect(() => {
    async function retrieveUserSession() {
      try {
        const session = await EncryptedStorage.getItem('user_session');
        session !== undefined ? setIsLoggedIn(true) : setIsLoggedIn(false);
      } catch (error) {
        Snackbar.show({
          text: `Something Went Wrong ${error}`,
          duration: Snackbar.LENGTH_LONG,
        });
      }
    }
    retrieveUserSession();
  }, []);

  return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
