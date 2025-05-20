import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { 
  SignedIn, 
  SignedOut, 
  RedirectToSignIn
} from '@clerk/clerk-react';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import ComparisonPage from './pages/ComparisonPage';
import SmartBasketPage from './pages/SmartBasketPage';
import VendorFormPage from './pages/VendorFormPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="compare/:productQuery" element={<ComparisonPage />} />
        </Route>
        
        {/* Authentication routes */}
        <Route path="/login/*" element={<LoginPage />} />
        <Route path="/register/*" element={<RegisterPage />} />
        
        {/* Protected routes */}
        <Route path="/" element={<MainLayout />}>
          <Route path="smart-basket" element={
            <ProtectedRoute>
              <SmartBasketPage />
            </ProtectedRoute>
          } />
          <Route path="vendor" element={
            <ProtectedRoute>
              <VendorFormPage />
            </ProtectedRoute>
          } />
          <Route path="profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="admin" element={
            <ProtectedRoute isAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

// Protected route component
function ProtectedRoute({ children, isAdmin = false }) {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

export default App;