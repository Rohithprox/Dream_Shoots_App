import React from "react";
import "@/App.css";
import "@/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import Marquee from "@/components/Marquee";
import PricingSection from "@/components/PricingSection";
import LocationsSection from "@/components/LocationsSection";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";
import ReelsSection from "@/components/ReelsSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import AdminPage from "@/components/AdminPage";
import LoginPage from "@/components/LoginPage";
import { Navigate } from "react-router-dom";

const LandingPage = () => {
  return (
    <div data-testid="landing-page" style={{ background: 'var(--ds-bg)', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <PricingSection />
      <Marquee />
      <ReelsSection />
      <LocationsSection />
      <BookingSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('ds_admin_auth') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
