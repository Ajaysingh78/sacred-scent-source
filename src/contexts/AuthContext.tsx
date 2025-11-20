// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/lib/firebase';

interface User {
  uid: string;
  email: string | null;
  name: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Save user data to Firestore
  const saveUserToFirestore = async (userId: string, userData: any) => {
    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, userData, { merge: true });
    } catch (error) {
      console.error('Error saving user to Firestore:', error);
      // Don't throw error - let auth continue even if Firestore fails
    }
  };

  // Get user data from Firestore
  const getUserFromFirestore = async (userId: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      return userDoc.exists() ? userDoc.data() : null;
    } catch (error) {
      console.error('Error getting user from Firestore:', error);
      return null;
    }
  };

  // Signup function
  const signup = async (email: string, password: string, name: string) => {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Update profile with name
      await updateProfile(firebaseUser, {
        displayName: name
      });

      // Save to Firestore
      await saveUserToFirestore(firebaseUser.uid, {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: name,
        photoURL: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      // Update local user state
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: name,
        photoURL: null
      });

    } catch (error: any) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Get additional user data from Firestore
      const firestoreData = await getUserFromFirestore(firebaseUser.uid);

      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firestoreData?.name || firebaseUser.displayName,
        photoURL: firestoreData?.photoURL || firebaseUser.photoURL
      });

    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Google Sign-In function with better error handling
  const loginWithGoogle = async () => {
    try {
      console.log('Starting Google sign-in...');
      
      // Request additional scopes for profile photo access
      googleProvider.addScope('profile');
      googleProvider.addScope('email');
      
      // Attempt sign in with popup
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      console.log('Google sign-in successful:', firebaseUser.email);
      console.log('Profile photo URL:', firebaseUser.photoURL);

      // Force reload user to get latest profile data
      await firebaseUser.reload();
      
      // Get the updated photo URL (sometimes it needs a larger size)
      const photoURL = firebaseUser.photoURL 
        ? firebaseUser.photoURL.replace('s96-c', 's400-c') // Get higher quality image
        : null;

      // Check if user exists in Firestore
      let firestoreData = await getUserFromFirestore(firebaseUser.uid);

      // If new user or photoURL changed, save/update to Firestore
      if (!firestoreData || firestoreData.photoURL !== photoURL) {
        console.log('Saving/updating user data to Firestore');
        await saveUserToFirestore(firebaseUser.uid, {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          photoURL: photoURL,
          createdAt: firestoreData?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }

      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        photoURL: photoURL
      });

    } catch (error: any) {
      console.error('Google sign-in error:', error);
      
      // Better error messages for common issues
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        throw new Error('Popup blocked by browser. Please allow popups for this site.');
      } else if (error.code === 'auth/unauthorized-domain') {
        throw new Error('This domain is not authorized for Google sign-in. Please contact support.');
      } else if (error.code === 'auth/operation-not-allowed') {
        throw new Error('Google sign-in is not enabled. Please contact support.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        throw new Error('Another sign-in popup is already open.');
      } else {
        throw new Error(error.message || 'Failed to sign in with Google. Please try again.');
      }
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Force reload to get latest data
        await firebaseUser.reload();
        
        // Get high quality photo URL
        const photoURL = firebaseUser.photoURL 
          ? firebaseUser.photoURL.replace('s96-c', 's400-c')
          : null;
        
        // Get additional user data from Firestore
        const firestoreData = await getUserFromFirestore(firebaseUser.uid);

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firestoreData?.name || firebaseUser.displayName,
          photoURL: firestoreData?.photoURL || photoURL
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    signup,
    login,
    logout,
    loginWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};