'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface Step {
  number: number;
  titleKey: 'step1Title' | 'step2Title' | 'step3Title' | 'step4Title';
  descKey: 'step1Desc' | 'step2Desc' | 'step3Desc' | 'step4Desc';
  mediaUrl: string;
  isVideo: boolean;
}

const steps: Step[] = [
  { number: 1, titleKey: 'step1Title', descKey: 'step1Desc', mediaUrl: '/assets/steps/step1.mp4', isVideo: true },
  { number: 2, titleKey: 'step2Title', descKey: 'step2Desc', mediaUrl: '/assets/steps/step2.mp4', isVideo: true },
  { number: 3, titleKey: 'step3Title', descKey: 'step3Desc', mediaUrl: '/assets/steps/step3.mp4', isVideo: true },
  { number: 4, titleKey: 'step4Title', descKey: 'step4Desc', mediaUrl: '/assets/steps/step4.png', isVideo: false }
];

const IMAGE_DISPLAY_DURATION = 10000; // 10 seconds for images

export default function StepsSection() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationFrameRef = useRef<number>();
  const imageTimerRef = useRef<NodeJS.Timeout>();
  const imageProgressIntervalRef = useRef<NodeJS.Timeout>();

  const currentStep = steps[activeStep - 1];

  // Calculate top margin for text content based on step number (only for lg screens)
  // Text moves down to align with the active step button in vertical layout
  const getTextMarginClass = (stepNumber: number) => {
    // Each step button is 70px + vertical line 31px = ~101px spacing
    // Step 1: 0px, Step 2: ~101px, Step 3: ~202px, Step 4: ~303px
    const marginMap: { [key: number]: string } = {
      1: 'lg:mt-0',
      2: 'lg:mt-[120px]',
      3: 'lg:mt-[240px]',
      4: 'lg:mt-[360px]'
    };
    return marginMap[stepNumber] || 'lg:mt-0';
  };

  const advanceToNextStep = () => {
    setActiveStep((prev) => (prev % 4) + 1);
    setProgress(0);
  };

  useEffect(() => {
    // Clean up previous timers and animation frames
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
    if (imageTimerRef.current) {
      clearTimeout(imageTimerRef.current);
      imageTimerRef.current = undefined;
    }
    if (imageProgressIntervalRef.current) {
      clearInterval(imageProgressIntervalRef.current);
      imageProgressIntervalRef.current = undefined;
    }
  
    // Reset progress immediately
    setProgress(0);
  
    if (currentStep.isVideo && videoRef.current) {
      const video = videoRef.current;
      
      // Reset video to start
      video.currentTime = 0;
      
      const updateProgress = () => {
        if (video.duration && !video.paused) {
          setProgress((video.currentTime / video.duration) * 100);
          animationFrameRef.current = requestAnimationFrame(updateProgress);
        }
      };
  
      const handlePlaying = () => {
        updateProgress();
      };
  
      const handleEnded = () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        setProgress(100);
        setTimeout(advanceToNextStep, 200);
      };
  
      video.addEventListener('playing', handlePlaying);
      video.addEventListener('ended', handleEnded);
  
      return () => {
        video.removeEventListener('playing', handlePlaying);
        video.removeEventListener('ended', handleEnded);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    } else {
      // Handle image with better timing control
      const startTime = Date.now();
      const duration = IMAGE_DISPLAY_DURATION;
      let isActive = true; // Flag to prevent updates after cleanup
  
      const updateImageProgress = () => {
        if (!isActive) return;
        
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);
      };
  
      imageProgressIntervalRef.current = setInterval(updateImageProgress, 50);
  
      imageTimerRef.current = setTimeout(() => {
        if (!isActive) return;
        setProgress(100);
        setTimeout(advanceToNextStep, 200);
      }, duration);
  
      return () => {
        isActive = false; // Prevent any pending updates
        if (imageTimerRef.current) {
          clearTimeout(imageTimerRef.current);
          imageTimerRef.current = undefined;
        }
        if (imageProgressIntervalRef.current) {
          clearInterval(imageProgressIntervalRef.current);
          imageProgressIntervalRef.current = undefined;
        }
      };
    }
  }, [activeStep, currentStep.isVideo]);

  const handleStepClick = (stepNumber: number) => {
    // Clean up existing timers
    if (imageTimerRef.current) {
      clearTimeout(imageTimerRef.current);
    }
    if (imageProgressIntervalRef.current) {
      clearInterval(imageProgressIntervalRef.current);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    setActiveStep(stepNumber);
    setProgress(0);
  };

  return (
    <section className="flex flex-col items-center w-full px-5">
      <div className="inline-flex items-center justify-center gap-2.5 px-2.5 pb-12 pt-2.5">
        <h2 className="text-[#1a1b25] font-bold text-[30px] md:text-[34px] lg:text-[48px] text-center -tracking-[0.4px] leading-[1.2]">
          {t.stepsTitle}
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row w-full max-w-[1520px] items-start justify-start gap-8 sm:gap-10 md:gap-14 lg:gap-24 xl:gap-32 2xl:gap-36 pb-20">
        {/* Steps and Text */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 w-full lg:w-auto">
          {/* Step Buttons */}
          <div className="flex flex-row lg:flex-col items-center gap-4 lg:gap-1.5 justify-center w-full lg:w-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <button
                  onClick={() => handleStepClick(step.number)}
                  className="relative w-[70px] h-[70px] flex items-center justify-center rounded-full bg-transparent cursor-pointer transition-transform hover:-translate-y-0.5 flex-shrink-0"
                  aria-label={`Go to step ${step.number}`}
                >
                  {/* Base Circle - always visible for all steps with light orange glow */}
                  <svg className="absolute inset-0 w-[70px] h-[70px]">
                    <defs>
                      <filter id={`glow-${step.number}`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <circle
                      cx="35"
                      cy="35"
                      r="32"
                      fill="none"
                      stroke="#FFB380"
                      strokeWidth="2"
                      opacity="0.6"
                      filter={`url(#glow-${step.number})`}
                    />
                  </svg>
                  
                  {/* Progress Ring - shows for active step only */}
                  {activeStep === step.number && (
                    <svg className="absolute inset-0 w-[70px] h-[70px] progress-ring">
                      <circle
                        cx="35"
                        cy="35"
                        r="32"
                        className="progress-ring__background"
                      />
                      <circle
                        cx="35"
                        cy="35"
                        r="32"
                        className="progress-ring__progress"
                        style={{
                          strokeDasharray: `${(progress / 100) * 201} 201`
                        }}
                      />
                    </svg>
                  )}
                  <span className={`text-2xl font-semibold relative z-10 ${activeStep === step.number ? 'text-[#fe7d1a]' : 'text-[#1a1b25]'}`}>
                    {step.number}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div className="w-8 h-[2px] lg:w-full lg:h-[31px] flex-shrink-0">
                    <Image
                      src="/assets/elements/vertical_line.png"
                      alt=""
                      width={54}
                      height={31}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step Content - with progressive top margin on large screens to align with step buttons */}
          <div className={`flex flex-col items-end w-full max-w-[301px] gap-5 transition-all duration-300 ${getTextMarginClass(activeStep)}`}>
            <h3 className="text-[#1a1b25] font-bold text-[32px] -tracking-[0.28px] leading-[36px]">
              {t[currentStep.titleKey]}
            </h3>
            <p className="text-[#525470] font-medium text-xl leading-[31px]">
              {t[currentStep.descKey]}
            </p>
          </div>
        </div>

        {/* Media Content - Fixed size container */}
        <div className="relative w-full lg:w-[782px] lg:flex-shrink-0 h-[300px] md:h-[400px] lg:h-[548px] bg-[#f4f5f6] rounded-[40px] overflow-hidden border-[10px] border-[#35374d] transform rotate-180">
          {currentStep.isVideo ? (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover rotate-180"
              src={currentStep.mediaUrl}
              autoPlay
              muted
              playsInline
              key={activeStep} // Force remount on step change
              onLoadedData={(e) => {
                e.currentTarget.play().catch(() => {});
              }}
            />
          ) : (
            <Image
              src={currentStep.mediaUrl}
              alt={t[currentStep.titleKey]}
              fill
              className="object-cover rotate-180"
              priority
            />
          )}
        </div>
      </div>
    </section>
  );
}