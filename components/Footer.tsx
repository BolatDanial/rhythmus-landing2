'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopyOrEmail = (text: string) => {
    if (text.includes('@')) {
      window.location.href = `mailto:${text}`;
    } else {
      navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 1500);
    }
  };

  const handleNavClick = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact-section" className="w-full px-5">
      {/* CTA Section */}
      <div className="max-w-[1520px] mx-auto mb-24">
        <div className="bg-[#dddfed] rounded-[40px] p-10 lg:p-20 flex flex-col items-center gap-6 text-center">
          <h2 
            className="text-[#1a1b25] font-bold text-[30px] md:text-[34px] lg:text-[48px] -tracking-[0.4px] leading-[56px]"
            dangerouslySetInnerHTML={{ __html: t.ctaTitle }}
          />
          <p className="text-[#525470] font-medium text-lg">
            {t.ctaDesc}
          </p>
          <button className="bg-[#fe7d1a] text-white px-8 py-5 rounded-2xl font-medium text-lg hover:bg-[#e66a0a] transition-colors">
            {t.ctaButton}
          </button>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-[1520px] mx-auto bg-white rounded-[30px] p-8 lg:p-14 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <div className="w-[196px] h-[60px] relative">
              <Image
                src="/assets/logo.png"
                alt="Rhythmus"
                width={196}
                height={60}
                className="object-contain"
              />
            </div>
            
            <button
              onClick={() => handleNavClick('products-section')}
              className="text-left text-black font-medium text-lg hover:opacity-80 transition-opacity w-fit"
            >
              {t.solutions}
            </button>
            
            <button
              onClick={() => handleNavClick('blog-section')}
              className="text-left text-black font-medium text-lg hover:opacity-80 transition-opacity w-fit"
            >
              {t.company}
            </button>
            
            <a
              href="/Политика_конфиденциальности_сайта_https_rhythmus.pdf"
              target="_blank"
              className="text-black font-medium text-lg hover:opacity-80 transition-opacity w-fit"
            >
              {t.legal}
            </a>
          </div>

          {/* Right Column - Contact Info */}
          <div className="flex flex-col gap-5 mt-4">
            <div className="flex flex-col gap-3">
              <h3 className="text-black font-bold text-lg">{t.contactUs}</h3>
              <p className="text-black font-medium text-lg leading-6">
                {t.contactDesc}
              </p>
            </div>
            
            <div className="bg-[#f5f6fa] rounded-[20px] p-6">
              <p className="text-black font-medium text-base mb-4 leading-6">
                {t.contactInfo}
              </p>
              
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleCopyOrEmail('+7 705 301 21 11')}
                  className="text-[#ff6e00] font-medium text-base text-left hover:opacity-80 transition-opacity relative"
                >
                  +7 705 301 21 11
                  {copiedText === '+7 705 301 21 11' && (
                    <span className="absolute left-full ml-2 text-green-600">
                      {t.copiedText}
                    </span>
                  )}
                </button>
                
                <button
                  onClick={() => handleCopyOrEmail('info@rhythmus.kz')}
                  className="text-[#ff6e00] font-medium text-base text-left hover:opacity-80 transition-opacity relative"
                >
                  info@rhythmus.kz
                  {copiedText === 'info@rhythmus.kz' && (
                    <span className="absolute left-full ml-2 text-green-600">
                      {t.copiedText}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 mt-10">
          <a
            href="https://www.linkedin.com/company/rhythmus-medical"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 hover:scale-110 transition-all"
          >
            <Image
              src="/assets/icons/linkedin.png"
              alt="LinkedIn"
              width={64}
              height={64}
            />
          </a>
          
          <a
            href="https://www.instagram.com/rhythmus.kz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 hover:scale-110 transition-all"
          >
            <Image
              src="/assets/icons/insta.png"
              alt="Instagram"
              width={64}
              height={64}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}