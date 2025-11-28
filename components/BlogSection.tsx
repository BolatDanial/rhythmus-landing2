'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogPost {
  id: number;
  imageUrl: string;
  titleKey: 'blog1Title' | 'blog2Title' | 'blog3Title';
  fullDescription: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    imageUrl: '/assets/blog/blog1.png',
    titleKey: 'blog1Title',
    fullDescription: 'Компания Rhythmus заключила стратегическое партнёрство с Lepu Medical и реализовала интеграцию многопараметрического холтера Multi-parameter Holter M12 в свою платформу. Это сотрудничество открывает новые возможности для автоматизированной загрузки, анализа и хранения ЭКГ-данных в соответствии со стандартами DICOM и PACS. Интеграция усиливает технологический потенциал Rhythmus и расширяет экосистему решений для медицинских учреждений. Партнёрство направлено на развитие совместных ИИ-технологий и повышение качества диагностики сердечно-сосудистых заболеваний.'
  },
  {
    id: 2,
    imageUrl: '/assets/blog/blog2.jpg',
    titleKey: 'blog2Title',
    fullDescription: 'Одно из крупнейших мировых событий в сфере медицинских технологий. Участие позволило изучить ключевые тенденции рынка, включая внедрение искусственного интеллекта в диагностику, развитие облачных решений и стандартизацию медицинских данных. Особое внимание было уделено вопросам МИС-интеграции и сертификации по международным стандартам FDA и CE. Посещение выставки дало ценные инсайты о направлениях развития цифрового здравоохранения и помогло установить новые профессиональные контакты. Полученные результаты станут основой для дальнейших технологических и партнерских инициатив проекта Rhythmus.'
  },
  {
    id: 3,
    imageUrl: '/assets/blog/blog3.jpg',
    titleKey: 'blog3Title',
    fullDescription: 'В мае 2024 года компания Rhythmus заключила Меморандум о стратегическом партнёрстве с Больницей Медицинского центра Управления делами Президента Республики Казахстан. Соглашение направлено на развитие сотрудничества в области цифровизации кардиологической службы, консультирования, интеграции и внедрения системы Rhythmus в медицинскую инфраструктуру учреждения.<br>Партнёрство предусматривает совместную работу по адаптации функционала системы под потребности клинической практики, повышение эффективности анализа ЭКГ-данных и применение технологий искусственного интеллекта для поддержки врачебных решений. Реализация меморандума станет важным шагом в развитии отечественных медицинских ИТ-решений и внедрении инновационных инструментов в клиническую практику Казахстана.'
  }
];

export default function BlogSection() {
  const { t } = useLanguage();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog-section" className="flex flex-col items-center w-full px-5 pb-24">
      <div className="inline-flex items-center justify-center gap-2.5 px-2.5 pb-12 pt-2.5">
        <h2 className="text-[#1a1b25] font-bold text-[30px] md:text-[34px] lg:text-[48px] text-center -tracking-[0.4px] leading-[1.2]">
          {t.blogTitle}
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch gap-6 w-full max-w-[1520px] justify-between">
        {blogPosts.map((post) => (
          <article key={post.id} className="flex flex-col w-full lg:max-w-[437px] gap-7 flex-1">
            <div className="relative w-full h-[320px] rounded-[40px] overflow-hidden bg-gradient-to-b from-[#dedfeebf] to-[#dedfeebf]">
              <Image
                src={post.imageUrl}
                alt={t[post.titleKey]}
                fill
                className="object-cover"
              />
            </div>
            
            <h3 className="text-[#1a1b25] font-bold text-2xl -tracking-[0.24px] leading-[32px]">
              {t[post.titleKey]}
            </h3>
            
            <button
              onClick={() => setSelectedPost(post)}
              className="mt-auto w-full px-5 py-5 border border-black rounded-[23px] hover:bg-[#35374d] hover:text-white transition-colors"
            >
              <span className="font-medium text-lg">{t.readMore}</span>
            </button>
          </article>
        ))}
      </div>

      {/* Blog Dialog/Modal - image on right at 40% width */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black/80 z-[10000] flex items-center justify-center p-5 backdrop-blur-sm"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-[1440px] w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center z-10 hover:bg-white hover:scale-110 transition-all"
            >
              <span className="text-2xl">&times;</span>
            </button>
            
            <div className="flex flex-col lg:flex-row">
              {/* Text content on left - 60% */}
              <div className="flex-1 lg:w-3/5 p-10 overflow-y-auto max-h-[90vh]">
                <h2 className="text-[#1a1b25] font-bold text-2xl mb-5">
                  {t[selectedPost.titleKey]}
                </h2>
                <p className="text-[#525470] font-medium text-base leading-relaxed">
                  {selectedPost.fullDescription}
                </p>
              </div>
              
              {/* Image on right - 40% with less padding */}
              <div className="lg:w-2/5 bg-[#dbd9dc] p-5 flex items-center justify-center">
                <div className="relative w-full h-[300px] lg:h-[500px]">
                  <Image
                    src={selectedPost.imageUrl}
                    alt={t[selectedPost.titleKey]}
                    fill
                    className="object-contain rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}