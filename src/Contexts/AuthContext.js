import React from "react";
import { fbAuth } from "../helpers/firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState();

  React.useEffect(() => {
    const unSubscribe = fbAuth.onAuthStateChanged((user) => {
      if (user && !!user.displayName) {
        setCurrentUser(user);
      }
    });
    return unSubscribe;
  }, []);

  const signUp = (email, password, callSign) => {
    let fbUser;
    return fbAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        fbUser = res.user;
        return fbUser.updateProfile({
          displayName: callSign,
        });
      })
      .then(() => {
        return fbAuth.signOut();
      })
      .then(() => {
        return fbAuth.updateCurrentUser(fbUser);
      });
  };

  const logIn = (email, password) => {
    return fbAuth.signInWithEmailAndPassword(email, password);
  };

  const contextValue = {
    currentUser,
    signUp,
    logIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
