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

interface IndustriesSectionProps {
  onGetStarted: () => void;
}

const industries = [
  {
    id: 'ecommerce',
    label: 'E-commerce',
    image: '/images/ecom.png',
    headline: 'Turn Browsers Into Buyers — 24/7',
    subtext: 'Increase conversion rates by guiding every visitor from curiosity to checkout.',
    features: [
      'Recommend products based on behavior',
      'Recover abandoned carts instantly',
      'Answer sizing and shipping questions',
    ],
  },
  {
    id: 'saas',
    label: 'SaaS',
    image: '/images/saas.webp',
    headline: 'Streamline Onboarding. Slash Support Tickets.',
    subtext: 'Streamline onboarding and user success while keeping support tickets low.',
    features: [
      'Guide users through feature tours',
      'Recommend plans based on use case',
      'Troubleshoot issues automatically',
    ],
  },
  {
    id: 'b2b',
    label: 'B2B Services',
    image: '/images/b2b.jpg',
    headline: 'Qualify Leads Faster. Close Deals Smarter.',
    subtext:
      'Let your chatbot handle the top of your funnel so your sales team only talks to serious buyers.',
    features: [
      'Qualify leads with discovery questions',
      'Book demos directly from chat',
      'Sync qualified leads to CRM',
    ],
  },
];

export default function IndustriesSection({ onGetStarted }: IndustriesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);

  // Debounce ringan supaya terasa responsif tapi tetap stabil saat scroll cepat
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debouncedSetIndex = useCallback((index: number) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setActiveIndex(index);
    }, 40);
  }, []);

  const active = industries[activeIndex];

  useGSAP(
    () => {
      const triggers = gsap.utils.toArray<HTMLDivElement>('.industry-trigger');

      triggers.forEach((trigger, index) => {
        ScrollTrigger.create({
          trigger: trigger,
          // Aktifkan saat item sejajar dengan top sticky panel kanan (lg:top-32)
          start: 'top top+=128',
          end: 'bottom top+=128',
          onEnter: () => debouncedSetIndex(index),
          onEnterBack: () => debouncedSetIndex(index),
        });
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: sectionRef }
  );

  // Animasi panel kanan setiap ganti industry
  useGSAP(
    () => {
      gsap.fromTo(
        '.industry-detail-anim',
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: 'power3.out',
        }
      );
    },
    { scope: detailPanelRef, dependencies: [activeIndex], revertOnUpdate: true }
  );

  return (
    <section
      className="w-full py-20 md:py-28 relative"
      style={{
        background: `
          radial-gradient(ellipse 65% 60% at 12% 62%, rgba(255, 80, 130, 0.255) 0%, transparent 65%),
          radial-gradient(ellipse 60% 65% at 52% 18%, rgba(150, 80, 220, 0.221) 0%, transparent 65%),
          radial-gradient(ellipse 60% 55% at 90% 58%, rgba(170, 145, 240, 0.204) 0%, transparent 65%),
          radial-gradient(ellipse 42% 42% at 4% 14%, rgba(255, 120, 170, 0.136) 0%, transparent 60%),
          #F5F4F0
        `,
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[36px] md:text-[48px] font-bold text-[#1A1A1A] mb-4 tracking-tight">
            Built for Every Industry
          </h2>
          <p className="text-lg font-normal text-gray-500 max-w-xl mx-auto">
            Whether you're selling fashion, software, or online courses — train it once and it works
            24/7 without burning out.
          </p>
        </div>

        {/* Layout: Kiri (Scroll) & Kanan (Sticky) */}
        <div className="flex flex-col lg:flex-row items-start gap-8 relative">
          {/* KIRI: Trigger area
              Setiap trigger min-h 80vh → user harus scroll cukup jauh
              sebelum industry berikutnya aktif. Ini fix root cause sensitivity-nya. */}
          <div className="w-full lg:w-[25%] flex flex-col">
            {industries.map((ind, i) => {
              const isActive = activeIndex === i;
              return (
                <div
                  key={ind.id}
                  className="industry-trigger flex flex-col justify-center"
                  style={{ minHeight: '80vh' }}
                >
                  <button
                    onClick={() => setActiveIndex(i)}
                    className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 w-full text-left ${
                      isActive
                        ? 'bg-[#1A1A1A] text-white shadow-xl scale-105'
                        : 'bg-transparent text-gray-500 hover:bg-black/5'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        isActive ? 'bg-white/20' : 'bg-black/5'
                      }`}
                    >
                      <div className="w-5 h-5 bg-current rounded-sm opacity-80" />
                    </div>
                    <span className="font-semibold text-lg">{ind.label}</span>
                    {isActive && (
                      <svg
                        className="ml-auto shrink-0"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    )}
                  </button>
                </div>
              );
            })}

            {/* Padding bawah supaya industry terakhir
                punya ruang scroll sebelum sticky panel terlepas */}
            <div style={{ minHeight: '30vh' }} />
          </div>

          {/* KANAN: Sticky detail panel */}
          <div className="w-full lg:w-[75%] lg:sticky lg:top-32 h-auto">
            <div
              ref={detailPanelRef}
              className="bg-[#1A1A1A] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl min-h-[460px] md:h-[460px]"
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 relative bg-gray-800">
                <Image
                  src={active.image}
                  alt={active.label}
                  className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="industry-detail-anim bg-white/20 text-white/90 px-4 py-1.5 rounded-full text-xs font-medium w-fit mb-3 backdrop-blur-md">
                    Active Industry
                  </span>
                  <h3 className="industry-detail-anim text-4xl font-bold text-white tracking-tight">
                    {active.label}
                  </h3>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <h4 className="industry-detail-anim text-2xl font-bold text-white mb-3 leading-snug">
                    {active.headline}
                  </h4>
                  <p className="industry-detail-anim text-white/60 mb-8 leading-relaxed">
                    {active.subtext}
                  </p>

                  <div className="space-y-4 mb-8">
                    {active.features.map((feat, i) => (
                      <div key={i} className="industry-detail-anim flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-white/80 text-sm">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="industry-detail-anim pt-6 border-t border-white/10">
                  <Button
                    text="Try Chatify for FREE"
                    onClick={onGetStarted}
                    className="bg-white text-black rounded-full px-8 py-3 text-base font-bold hover:bg-gray-200 transition-colors w-full sm:w-auto"
                  />
                </div>
              </div>
            </div>

            {/* Dot navigator */}
            <div className="flex justify-center gap-2 mt-5">
              {industries.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  style={{
                    width: i === activeIndex ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '100px',
                    background: i === activeIndex ? '#1A1A1A' : 'rgba(0,0,0,0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
