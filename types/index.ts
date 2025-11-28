export interface LanguageData {
    // Navigation
    products: string;
    blog: string;
    contact: string;
    login: string;
    
    // Hero section
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    heroButton: string;
    
    // Trust section
    trustText: string;
    
    // Products section
    solutionsTitle: string;
    outsourcingTitle: string;
    outsourcingSubtitle: string;
    outsourcingDescription: string;
    processTitle: string;
    processStep1: string;
    processStep2: string;
    processStep3: string;
    
    // AI Platform section
    aiTitle: string;
    aiDescription: string;
    advantagesTitle: string;
    advantage1: string;
    advantage2: string;
    advantage3: string;
    
    // Steps section
    stepsTitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    
    // Blog section
    blogTitle: string;
    blog1Title: string;
    blog2Title: string;
    blog3Title: string;
    readMore: string;
    
    // CTA section
    ctaTitle: string;
    ctaDesc: string;
    ctaButton: string;
    
    // Footer
    solutions: string;
    company: string;
    legal: string;
    contactUs: string;
    contactDesc: string;
    contactInfo: string;
    
    // Demo dialog
    demoDialogTitle: string;
    demoDialogDesc: string;
    demoNamePlaceholder: string;
    demoEmailPlaceholder: string;
    demoPhonePlaceholder: string;
    demoMessagePlaceholder: string;
    demoSubmitButton: string;
    demoSuccessMessage: string;
    copiedText: string;
  }
  
  export type Language = 'kz' | 'ru' | 'en';
  
  export interface StepData {
    title: string;
    description: string;
    mediaUrl: string;
  }
  
  export interface BlogPost {
    image: string;
    title: string;
    description: string;
    location?: string;
    name?: string;
  }