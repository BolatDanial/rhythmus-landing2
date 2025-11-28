# Rhythmus Landing - Next.js Application

## Overview
This is a modern, production-ready conversion of your Rhythmus landing page built with:
- **Next.js 14** - React framework with server-side rendering
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Multi-language support** (KZ, RU, EN)

## Project Structure
```
rhythmus-landing/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Header.tsx          # Navigation header
│   ├── HeroSection.tsx     # Hero banner
│   ├── Carousel.tsx        # Video carousel
│   ├── TrustSection.tsx    # Partners section
│   ├── ProductsSection.tsx # Products/Solutions
│   ├── StepsSection.tsx    # 4-step process
│   ├── BlogSection.tsx     # News/Blog posts
│   ├── Footer.tsx          # Footer with CTA
│   └── DemoDialog.tsx      # Demo request modal
├── contexts/
│   └── LanguageContext.tsx # Language state management
├── lib/
│   └── translations.ts     # All language translations
├── types/
│   └── index.ts            # TypeScript type definitions
└── public/                 # Static assets (you need to add)
    └── assets/
        ├── logo.png
        ├── videos/
        ├── steps/
        ├── blog/
        ├── companies/
        ├── icons/
        └── ...
```

## Setup Instructions

### 1. Initial Setup
```bash
# Navigate to project directory
cd rhythmus-landing

# Install dependencies
npm install
```

### 2. Add Your Assets
You need to copy all your static assets to the `public` folder:

Create the following directory structure in `public`:
```
public/
├── assets/
│   ├── logo.png
│   ├── videos/
│   │   ├── main_footage.mp4
│   │   ├── outsource_model.mp4
│   │   └── saas.mp4
│   ├── steps/
│   │   ├── step1.mp4
│   │   ├── step2.mp4
│   │   ├── step3.mp4
│   │   └── step4.png
│   ├── blog/
│   │   ├── blog1.png
│   │   ├── blog2.jpg
│   │   └── blog3.jpg
│   ├── companies/
│   │   ├── lepu.png
│   │   ├── astanahub.png
│   │   └── med.png
│   ├── icons/
│   │   ├── linkedin.png
│   │   └── insta.png
│   ├── section/
│   │   └── section.png
│   ├── elements/
│   │   └── vertical_line.png
│   └── our_solutions.png
└── Политика_конфиденциальности_сайта_https_rhythmus.pdf
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## Key Features

### 🌍 Multi-language Support
- Seamless switching between Kazakh, Russian, and English
- All translations centralized in `/lib/translations.ts`
- Context-based state management

### 🎨 Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Smooth animations and transitions

### 🎬 Interactive Components
- Video carousel with autoplay
- Step-by-step process with progress indicators
- Demo request modal
- Smooth scroll navigation

### ⚡ Performance Optimized
- Next.js Image optimization
- Lazy loading for videos
- Server-side rendering for SEO

## Deployment Options

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build command
npm run build

# Publish directory
.next
```

### Docker
Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## Environment Variables (Optional)
Create a `.env.local` file for any environment variables:
```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Maintenance

### Update Dependencies
```bash
npm update
```

### Add New Translations
Edit `/lib/translations.ts` to add new text content.

### Add New Components
Create new components in `/components` directory and import in `page.tsx`.

## Troubleshooting

### Assets Not Loading
- Ensure all assets are in the `public` folder
- Check file paths (should start with `/assets/...` not `./assets/...`)

### Build Errors
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Performance Issues
- Optimize video files (compress, use appropriate formats)
- Use Next.js Image component for all images
- Enable caching headers in production

## Support
For any issues or questions, please check:
- Next.js Documentation: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

---
Built with ❤️ using Next.js