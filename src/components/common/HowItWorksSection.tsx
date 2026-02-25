'use client';

import { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Button from '../ui/Button';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HowItWorksSectionProps {
  onGetStarted: () => void;
}

const howItWorksSteps = [
  {
    title: 'Sign Up with Chattiphy',
    description: 'Create your account and start setup in minutes.',
    image: '/images/step1.png',
  },
  {
    title: 'Build Your Resource Center',
    description: 'Upload knowledge so your bot can answer accurately.',
    image: '/images/step2.png',
  },
  {
    title: 'Customize Your Bot',
    description: 'Set tone, behavior, and responses to fit your brand.',
    image: '/images/step3.png',
  },
  {
    title: 'Deploy It Anywhere',
    description: 'Publish across channels where your customers engage.',
    image: '/images/step4.png',
  },
  {
    title: 'Engage and Convert',
    description: 'Turn visitors into leads and customers with seamless automation.',
    image: '/images/step5.png',
  },
];

export default function HowItWorksSection({ onGetStarted }: HowItWorksSectionProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagePanelRef = useRef<HTMLDivElement>(null);

  // Debounce supaya scroll cepat tidak loncat-loncat
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debouncedSetStep = useCallback((index: number) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => setActiveStep(index), 40);
  }, []);

  useGSAP(
    () => {
      const steps = gsap.utils.toArray<HTMLDivElement>('.step-item');
      steps.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'center center', // lebih stabil dari "top center"
          end: 'bottom center',
          onEnter: () => debouncedSetStep(index),
          onEnterBack: () => debouncedSetStep(index),
        });
      });
      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      gsap.fromTo(
        '.howitworks-visual-anim',
        { y: 16, opacity: 0, scale: 0.985 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: 'power3.out',
          stagger: 0.06,
        }
      );
    },
    { scope: imagePanelRef, dependencies: [activeStep], revertOnUpdate: true }
  );

  return (
    <section className="w-full py-16 sm:py-20 md:py-24 bg-background-dark-primary relative">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="w-full max-w-[1202px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-[24px] sm:text-[36px] md:text-[48px] font-bold leading-9xl text-text-white mb-4">
              How Chattiphy Chat Agent Works?
            </h2>
            <p className="text-lg font-normal leading-2xl text-text-disabled max-w-2xl mx-auto">
              Launch your own AI Chat Agent in minutes. From setup to real-time engagement,
              it&apos;s built for speed and simplicity.
            </p>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 relative">
            {/* KIRI: Steps */}
            <div className="w-full lg:w-[40%] flex flex-col">
              {/* Step counter */}
              <p className="text-sm font-medium text-text-disabled mb-8 tracking-widest uppercase">
                Step {activeStep + 1} of {howItWorksSteps.length}
              </p>

              {/* Steps dengan vertical progress line */}
              <div className="relative">
                {/* Track line background */}
                <div
                  className="absolute left-[19px] top-0 w-[2px] rounded-full"
                  style={{
                    height: 'calc(100% - 30vh)',
                    background: 'rgba(255,255,255,0.08)',
                  }}
                />
                {/* Active progress line */}
                <div
                  className="absolute left-[19px] top-0 w-[2px] rounded-full transition-all duration-500 ease-in-out"
                  style={{
                    height: `${((activeStep + 0.5) / howItWorksSteps.length) * 100}%`,
                    background: 'linear-gradient(to bottom, #ac46ff, #f6329a)',
                  }}
                />

                {/* Step items */}
                <div className="flex flex-col pb-[30vh]">
                  {howItWorksSteps.map((step, index) => {
                    const isActive = activeStep === index;
                    const isPast = index < activeStep;
                    return (
                      <div
                        key={step.title}
                        className="step-item min-h-[60vh] flex flex-col justify-center"
                      >
                        <div
                          className="flex gap-5 items-start transition-all duration-400"
                          style={{ opacity: isActive ? 1 : isPast ? 0.5 : 0.35 }}
                        >
                          {/* Step number badge */}
                          <div
                            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 z-10"
                            style={{
                              background: isActive
                                ? 'linear-gradient(135deg, #ac46ff, #f6329a)'
                                : isPast
                                  ? 'rgba(255,255,255,0.15)'
                                  : 'rgba(255,255,255,0.06)',
                              color: isActive
                                ? '#fff'
                                : isPast
                                  ? 'rgba(255,255,255,0.6)'
                                  : 'rgba(255,255,255,0.3)',
                              boxShadow: isActive ? '0 0 20px rgba(172,70,255,0.5)' : 'none',
                              border: isActive ? 'none' : '1px solid rgba(255,255,255,0.1)',
                            }}
                          >
                            {isPast ? (
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            ) : (
                              index + 1
                            )}
                          </div>

                          {/* Card */}
                          <div
                            className="flex-1 rounded-xl p-6 transition-all duration-400"
                            style={{
                              background: isActive
                                ? 'rgba(255,255,255,0.07)'
                                : 'rgba(255,255,255,0.02)',
                              border: isActive
                                ? '1px solid rgba(172,70,255,0.3)'
                                : '1px solid rgba(255,255,255,0.06)',
                              boxShadow: isActive ? '0 8px 32px rgba(172,70,255,0.12)' : 'none',
                            }}
                          >
                            <h3 className="text-xl font-bold text-text-white mb-2">{step.title}</h3>
                            <p className="text-md font-normal text-text-disabled leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* KANAN: Sticky image panel */}
            <div className="w-full lg:w-[58%] lg:sticky lg:top-28 h-auto">
              {/* Step counter kecil di atas image — konteks posisi */}
              <div className="flex items-center gap-2 mb-3 justify-end">
                {howItWorksSteps.map((_, i) => (
                  <div
                    key={i}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: i === activeStep ? '24px' : '8px',
                      height: '8px',
                      background:
                        i === activeStep
                          ? 'linear-gradient(to right, #ac46ff, #f6329a)'
                          : 'rgba(255,255,255,0.15)',
                    }}
                  />
                ))}
              </div>

              {/* Image container — hapus double border, satu layer saja */}
              <div
                ref={imagePanelRef}
                className="relative w-full overflow-hidden rounded-2xl"
                style={{
                  aspectRatio: '4/3',
                  background:
                    'linear-gradient(135deg, rgba(172,70,255,0.12) 0%, rgba(246,50,154,0.08) 50%, rgba(253,199,0,0.06) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <Image
                  key={howItWorksSteps[activeStep].image}
                  src={howItWorksSteps[activeStep].image}
                  alt={howItWorksSteps[activeStep].title}
                  className="howitworks-visual-anim absolute inset-0 w-full h-full object-contain p-6"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />

                {/* Step label overlay di pojok image */}
                <div
                  key={howItWorksSteps[activeStep].title}
                  className="howitworks-visual-anim absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(8px)',
                    color: 'rgba(255,255,255,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {howItWorksSteps[activeStep].title}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-20 relative z-10">
            <Button
              text="Start the Process Now"
              onClick={onGetStarted}
              className="bg-background-accent-primary text-text-white rounded-md px-8 py-4 text-lg font-bold hover:opacity-90 transition-opacity"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
