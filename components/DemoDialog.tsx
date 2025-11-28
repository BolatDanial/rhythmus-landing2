'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface DemoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoDialog({ isOpen, onClose }: DemoDialogProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Demo request submitted:', formData);
    alert(t.demoSuccessMessage);
    onClose();
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-[10000] flex items-center justify-center p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-[540px] w-full p-10 transform scale-100 transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <h2 className="text-[#1a1b25] font-bold text-[30px] mb-5">
            {t.demoDialogTitle}
          </h2>
          
          <p className="text-[#525470] font-medium text-lg leading-relaxed mb-8">
            {t.demoDialogDesc}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-[300px] mx-auto">
            <input
              type="text"
              required
              placeholder={t.demoNamePlaceholder}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#fe7d1a] transition-colors"
            />
            
            <input
              type="email"
              required
              placeholder={t.demoEmailPlaceholder}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#fe7d1a] transition-colors"
            />
            
            <input
              type="tel"
              required
              placeholder={t.demoPhonePlaceholder}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#fe7d1a] transition-colors"
            />
            
            <textarea
              placeholder={t.demoMessagePlaceholder}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#fe7d1a] transition-colors resize-none"
            />
            
            <button
              type="submit"
              className="bg-[#fe7d1a] text-white px-6 py-4 rounded-xl font-semibold text-base hover:bg-[#e66a0a] transition-colors"
            >
              {t.demoSubmitButton}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}