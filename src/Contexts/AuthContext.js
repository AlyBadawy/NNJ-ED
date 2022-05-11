import React from "react";
import { fbAuth } from "../helpers/firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const unSubscribe = fbAuth.onAuthStateChanged((user) => {
      if (user && !!user.displayName) {
        setCurrentUser(user);
      }
      setIsLoading(false);
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

  const logOut = () => {
    return fbAuth.signOut().then((res) => {
      setCurrentUser(null);
    });
  };

  const contextValue = {
    currentUser,
    signUp,
    logIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
