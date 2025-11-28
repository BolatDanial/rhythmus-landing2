'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProductsSection() {
  const { t } = useLanguage();

  return (
    <>
      {/* Products Section */}
      <section id="products-section" className="flex flex-col items-center w-full px-5 pb-8">
        <div className="inline-flex items-center justify-center gap-2.5 px-2.5 pb-6 pt-2.5">
          <h2 className="text-[#1a1b25] font-bold text-[30px] md:text-[34px] lg:text-[48px] text-center -tracking-[0.4px] leading-[1.2]">
            {t.solutionsTitle}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-16 w-full max-w-[1520px]">
          {/* Left Image */}
          <div className="relative w-full lg:w-[820px] h-[320px] lg:h-[420px] rounded-[40px] overflow-hidden bg-gradient-to-b from-[#cecedf] to-[#cecedf]">
            <Image
              src="/assets/our_solutions.png"
              alt="Our solutions"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Text Block */}
          <div className="flex flex-col gap-5 max-w-full lg:max-w-[473px]">
            <h3 className="text-[#1a1b25] font-bold text-[26px] lg:text-[32px] -tracking-[0.28px] leading-[1.4]">
              {t.outsourcingSubtitle}
            </h3>
            <p className="text-[#525470] font-medium text-base lg:text-lg -tracking-[0.18px] leading-[1.5]">
              {t.outsourcingDescription}
            </p>
          </div>
        </div>
      </section>

      {/* AI Platform Section */}
      <section className="flex flex-col items-center w-full px-5 py-20">
        <div className="flex flex-col lg:flex-row items-start justify-between w-full max-w-[1520px] gap-4 lg:gap-6">
          <div className="flex flex-col w-full max-w-[578px] gap-5">
            <h3 
              className="text-[#1a1b25] font-bold text-[26px] lg:text-[32px] -tracking-[0.28px] leading-[1.4]"
              dangerouslySetInnerHTML={{ __html: t.aiTitle }}
            />
            <p className="text-[#525470] font-medium text-lg leading-[29px] -tracking-[0.18px]">
              {t.aiDescription}
            </p>
            
            <div className="flex flex-col mt-4">
              <div className="flex items-center justify-center gap-2.5 pb-4">
                <h4 className="text-[#1a1b25] font-bold text-[26px] -tracking-[0.22px] leading-[46px]">
                  {t.advantagesTitle}
                </h4>
              </div>
              
              <div className="flex flex-col gap-4">
                {[t.advantage1, t.advantage2, t.advantage3].map((advantage, index) => (
                  <div key={index} className="flex items-center gap-3 pb-4">
                    <p className="text-[#525470] font-medium text-lg leading-6">
                      {advantage}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative w-full lg:min-w-[700px] h-[500px] lg:h-[650px]">
            <Image
              src="/assets/section/section.png"
              alt="AI Platform"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>
    </>
  );
}