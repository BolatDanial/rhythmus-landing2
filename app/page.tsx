'use client';

import { useState, useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Carousel from '@/components/Carousel';
import TrustSection from '@/components/TrustSection';
import ProductsSection from '@/components/ProductsSection';
import StepsSection from '@/components/StepsSection';
import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';
import DemoDialog from '@/components/DemoDialog';

function HomeContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [demoDialogOpen, setDemoDialogOpen] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-[9999]">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#fe7d1a] rounded-full spinner" />
      </div>
    );
  }

  return (
    <div className="bg-[#f5f6fa] min-h-screen">
      <Header />
      <main className="flex flex-col">
        <HeroSection onDemoClick={() => setDemoDialogOpen(true)} />
        <Carousel />
        <TrustSection />
        <ProductsSection />
        <StepsSection />
        <BlogSection />
        <Footer />
      </main>
      <DemoDialog isOpen={demoDialogOpen} onClose={() => setDemoDialogOpen(false)} />
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}