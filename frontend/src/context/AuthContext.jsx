import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createUserInDB } from "../services/user.service"; // Import the function to create user in DB

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const googleProvider = new GoogleAuthProvider();

// Auth Provider
export const AuthProvide = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register user
  const registerUser = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await createUserInDB(userCredential.user); // Save to Firestore
    return userCredential;
  };

  // Login user
  const loginUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await createUserInDB(userCredential.user); // Save to Firestore
    return userCredential;
  };

  // Google Sign-In
  const signInWithGoogle = async () => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    await createUserInDB(userCredential.user); // ✅ Save to Firestore
    return userCredential;
  };

  // Logout
  const logout = () => signOut(auth);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        await createUserInDB(user); // ✅ Save user on auth change
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    loading,
    registerUser,
    loginUser,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
export default AuthProvide;