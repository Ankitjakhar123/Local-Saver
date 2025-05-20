import React, { createContext, useContext } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerkAuth();
  
  // Simplified user data for compatibility with existing code
  const currentUser = isSignedIn ? {
    uid: user?.id,
    email: user?.primaryEmailAddress?.emailAddress,
    displayName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
    photoURL: user?.imageUrl,
    isAdmin: user?.publicMetadata?.isAdmin || false,
    isVendor: user?.publicMetadata?.isVendor || false
  } : null;

  // Compatibility methods for existing code
  const logout = () => {
    return signOut();
  };

  const getUserData = async () => {
    if (!currentUser) return null;
    return {
      ...currentUser,
      savedSearches: user?.privateMetadata?.savedSearches || [],
      priceAlerts: user?.privateMetadata?.priceAlerts || []
    };
  };

  const value = {
    currentUser,
    logout,
    getUserData,
    isLoaded
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoaded && children}
    </AuthContext.Provider>
  );
}