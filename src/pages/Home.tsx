import React from 'react';
import Hero from '../components/home/Hero';
import { EmergencyBanner } from '../components/home/EmergencyBanner';
import Features from '../components/home/Features';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <EmergencyBanner />
      <Features />
    </div>
  );
};

export default Home;
