import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config"; // Import the Firestore instance

// Create
export const createUserInDB = async (user) => {
  const { uid, email, displayName, photoURL } = user;
  try {
    await setDoc(doc(db, "users", uid), {
      email,
      username: displayName || "Anonymous",
      photo: photoURL || "",
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

// Read
export const getUserFromDB = async (uid) => {
  try {
    const docSnap = await getDoc(doc(db, "users", uid));
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

// Update
export const updateUserInDB = async (uid, updates) => {
  try {
    await updateDoc(doc(db, "users", uid), updates);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

// Delete
export const deleteUserFromDB = async (uid) => {
  try {
    await deleteDoc(doc(db, "users", uid));
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
