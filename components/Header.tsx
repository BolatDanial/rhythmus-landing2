'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/types';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <header className="sticky top-0 bg-[#f5f6fa] z-50">
      <div className="max-w-[1520px] mx-auto flex items-end px-5 py-3 h-[90px]">
        {/* Logo */}
        <div className="w-[196px] h-[60px] relative self-start mb-1 -translate-y-1">
          <Image
            src="/assets/logo.png"
            alt="Rhythmus"
            width={196}
            height={60}
            className="object-contain"
            priority
          />
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center gap-11 mb-2.5 flex-1 justify-center">
          <button
            onClick={() => handleNavClick('products-section')}
            className="px-2.5 pt-2.5 hover:opacity-80 transition-opacity"
          >
            <span className="text-[#35374d] text-lg font-medium">{t.products}</span>
          </button>
          <button
            onClick={() => handleNavClick('contact-section')}
            className="px-2.5 pt-2.5 hover:opacity-80 transition-opacity"
          >
            <span className="text-[#35374d] text-lg font-medium">{t.contact}</span>
          </button>
          <button
            onClick={() => handleNavClick('blog-section')}
            className="px-2.5 pt-2.5 hover:opacity-80 transition-opacity"
          >
            <span className="text-[#35374d] text-lg font-medium">{t.blog}</span>
          </button>
        </nav>

        {/* Desktop Login Button and Language Switcher */}
        <div className="hidden md:flex items-center gap-3 mb-1">
          <button className="px-4 mr-6 py-2 text-[#35374d] text-base font-medium hover:bg-[#35374d0a] rounded-md transition-all">
            {t.login}
          </button>

          {/* Desktop Language Switcher */}
          <div className="flex ml-4 relative items-center justify-center p-0.5 bg-[#8588ab] rounded-full overflow-hidden">
            {/* Sliding indicator */}
            <div
              className="absolute top-0.5 bottom-0.5 left-0.5 w-10 bg-[#f4f5f6] rounded-full transition-transform duration-300 z-10"
              style={{
                transform: `translateX(${
                  language === 'kz' ? 0 : language === 'ru' ? 'calc(100% + 0px)' : 'calc(200% + 0px)'
                })`
              }}
            />
            
            {/* Language buttons */}
            {(['kz', 'ru', 'en'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`relative z-20 w-10 h-7 rounded-full flex items-center justify-center transition-colors ${
                  language === lang ? 'text-[#35374d]' : 'text-[#d6d8f0]'
                }`}
              >
                <span className="text-sm font-medium uppercase">{lang}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center p-2 mb-2.5"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-[#35374d]" />
          ) : (
            <Menu className="w-6 h-6 text-[#35374d]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[90px] left-0 right-0 bg-white shadow-lg z-40 p-5 animate-slideDown">
          <nav className="flex flex-col gap-4">
            <button
              onClick={() => handleNavClick('products-section')}
              className="text-left py-4 border-b border-gray-100 text-[#35374d] text-lg font-medium"
            >
              {t.products}
            </button>
            <button
              onClick={() => handleNavClick('blog-section')}
              className="text-left py-4 border-b border-gray-100 text-[#35374d] text-lg font-medium"
            >
              {t.blog}
            </button>
            <button
              onClick={() => handleNavClick('contact-section')}
              className="text-left py-4 border-b border-gray-100 text-[#35374d] text-lg font-medium"
            >
              {t.contact}
            </button>
            
            {/* Mobile Login Button */}
            <button 
              className="text-left py-4 border-b border-gray-100 text-[#35374d] text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.login}
            </button>

            {/* Mobile Language Switcher */}
            <div className="py-4 flex items-center gap-3">
              <div className="relative flex items-center justify-center p-0.5 bg-[#8588ab] rounded-full overflow-hidden">
                <div
                  className="absolute top-0.5 bottom-0.5 left-0.5 w-10 bg-[#f4f5f6] rounded-full transition-transform duration-300 z-10"
                  style={{
                    transform: `translateX(${
                      language === 'kz' ? 0 : language === 'ru' ? 'calc(100% + 0px)' : 'calc(200% + 0px)'
                    })`
                  }}
                />
                {(['kz', 'ru', 'en'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`relative z-20 w-10 h-7 rounded-full flex items-center justify-center transition-colors ${
                      language === lang ? 'text-[#35374d]' : 'text-[#d6d8f0]'
                    }`}
                  >
                    <span className="text-sm font-medium uppercase">{lang}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}