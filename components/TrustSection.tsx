'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const partners = [
  { name: 'Lepu Medical', logo: '/assets/companies/lepu.png', width: 408, height: 104 },
  { name: 'Astana Hub', logo: '/assets/companies/astanahub.png', width: 408, height: 104 },
  { name: 'Medical Center', logo: '/assets/companies/med.png', width: 408, height: 104 }
];

export default function TrustSection() {
  const { t } = useLanguage();

  return (
    <section className="flex flex-col items-center w-full gap-2.5 px-5 py-20">
      <div className="flex flex-col items-center gap-20 w-full">
        <h2 className="text-[#1a1b25] font-bold text-[24px] md:text-[28px] lg:text-[32px] text-center -tracking-[0.32px] leading-[1.2]">
          {t.trustText}
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-[69px] flex-wrap w-full">
          {partners.map((partner) => (
            <div 
              key={partner.name}
              className="relative w-[250px] md:w-[300px] lg:w-[408px] h-[60px] md:h-[80px] lg:h-[104px] flex items-center justify-center"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}