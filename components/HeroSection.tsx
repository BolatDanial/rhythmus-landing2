'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HeroSection({ onDemoClick }: { onDemoClick: () => void }) {
  const { t } = useLanguage();

  return (
    <section className="w-full max-w-[1520px] mx-auto px-5">
      <div className="relative w-full min-h-[647px] flex justify-center items-center">
        <div className="flex flex-col items-center gap-[34px] text-center max-w-[1020px] px-5">
          <h1 
            className="text-[#1a1b25] font-bold text-[34px] md:text-[52px] lg:text-[72px] leading-[1.2] -tracking-[0.64px]"
            dangerouslySetInnerHTML={{ __html: t.heroTitle }}
          />
          
          <p className="text-[#525470] font-medium text-base md:text-lg lg:text-xl leading-[1.6] -tracking-[0.2px]">
            {t.heroSubtitle}
          </p>
          
          <div className="flex flex-col items-center gap-6">
            <p 
              className="text-[#525470] font-semibold text-base md:text-lg lg:text-xl text-center -tracking-[0.2px] leading-[1.6]"
              dangerouslySetInnerHTML={{ __html: t.heroDescription }}
            />
            
            <button
              onClick={onDemoClick}
              className="bg-[#fe7d1a] text-white px-6 py-4 rounded-2xl font-medium text-lg hover:bg-[#e66a0a] transition-colors"
            >
              {t.heroButton}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}