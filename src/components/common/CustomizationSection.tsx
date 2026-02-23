'use client';

import { useState } from 'react';
import GradientBg from '../ui/GradientBg';

type Tab = 'conversation' | 'visual';

const CARD_GRADIENT =
  'linear-gradient(156deg, #FFF 43.17%, #FFF6EC 68.96%, #FFD9EA 93.13%, #FFE0E7 100%, #CFD0FF 100%)';

interface CardProps {
  title: string;
  description: string;
  image: string;
  imageClassName?: string;
  alt: string;
}

function FeatureCard({
  title,
  description,
  image,
  imageClassName = 'w-full h-auto',
  alt,
}: CardProps) {
  return (
    <div
      className="relative rounded-xl overflow-hidden flex flex-col flex-1"
      style={{ background: CARD_GRADIENT }}
    >
      <div className="p-4 flex flex-col gap-1.5">
        <h3 className="text-[22px] font-bold leading-[1.43] tracking-[0.236px] text-[#1D1D1D]">
          {title}
        </h3>
        <p className="text-[15px] font-normal leading-[1.43] tracking-[0.161px] text-[#333]">
          {description}
        </p>
      </div>
      <div className="flex-1 flex items-end justify-center overflow-hidden px-4 pb-0">
        <img src={image} alt={alt} className={imageClassName} />
      </div>
    </div>
  );
}

// Tone options displayed as pills inside the Tone Selection card
const TONE_OPTIONS = [
  { label: 'Professional', active: false },
  { label: 'Friendly', active: true },
  { label: 'Witty', active: false },
  { label: 'Empathetic', active: false },
  { label: 'Formal', active: false },
  { label: 'Casual', active: false },
  { label: 'Concise', active: false },
  { label: 'Enthusiastic', active: false },
];

const visualCards = [
  {
    title: 'Bot Profile',
    description: 'Set display name and avatar for a recognizable bot identity.',
    image: '/images/appr1.png',
    alt: 'bot profile mockup',
    badge: '👤 Identity',
  },
  {
    title: 'Bot Appearance',
    description: 'Control font, theme, and visual style to match your brand.',
    image: '/images/appr2.png',
    alt: 'bot appearance mockup',
    badge: '🎨 Design',
  },
  {
    title: 'Features',
    description: 'Toggle feedback, file upload, and sound based on your use case.',
    image: '/images/appr3.png',
    alt: 'features toggle mockup',
    badge: '⚙️ Controls',
  },
  {
    title: 'Deploy Settings',
    description: 'Set publish and embed webchat settings for your website.',
    image: '/images/appr4.png',
    alt: 'deploy settings mockup',
    badge: '🚀 Publish',
  },
];

export default function CustomizationSection() {
  const [activeTab, setActiveTab] = useState<Tab>('conversation');
  const [activeTone, setActiveTone] = useState('Friendly');

  return (
    <GradientBg base="#F5F4F0" intensity={1}>
      <section className="w-full py-[90px] px-4 sm:px-8 lg:px-[119px]">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-[28px] sm:text-[36px] md:text-[48px] font-bold leading-tight text-[#1D1D1D] mb-5">
              Customization That Feels Truly Yours
            </h2>
            <p className="text-[16px] sm:text-[18px] font-normal text-[#555] max-w-[720px] mx-auto mb-10">
              ItsBot Chat Agent lets you fine-tune every detail, from tone and language to design
              and behavior, so your chatbot doesn&apos;t just respond, it truly represents your
              brand.
            </p>

            {/* Tab Navigation — fixed equal width per tab */}
            <div className="inline-flex items-center border border-[#E0E0E0] rounded-xl p-1 bg-white gap-1">
              {(
                [
                  { id: 'conversation', label: 'Conversation Intelligence' },
                  { id: 'visual', label: 'Visual Customization' },
                ] as { id: Tab; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-[220px] sm:w-[240px] py-2 rounded-lg text-[16px] sm:text-[18px] font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[#1D1D1D] text-white'
                      : 'text-[#1D1D1D] bg-transparent hover:bg-[#F5F5F5]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content — animated transition */}
          <div
            key={activeTab}
            style={{
              animation: 'fadeSlideUp 0.3s ease forwards',
            }}
          >
            <style>{`
            @keyframes fadeSlideUp {
              from { opacity: 0; transform: translateY(10px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>

            {/* ── Conversation Intelligence ── */}
            {activeTab === 'conversation' ? (
              <div
                className="grid grid-cols-1 lg:grid-cols-[277px_minmax(0,1fr)_277px] gap-6"
                style={{ alignItems: 'stretch' }}
              >
                {/* Left column */}
                <div className="lg:col-start-1 lg:row-start-1">
                  <FeatureCard
                    title="Welcome Message"
                    description="Make a great first impression"
                    image="images/wellcome_message.png"
                    alt="welcome message example"
                    imageClassName="w-[222px] h-auto mx-auto"
                  />
                </div>
                <div className="lg:col-start-1 lg:row-start-2">
                  <FeatureCard
                    title="Model Selection"
                    description="Choose the AI engine that fits your needs"
                    image="images/model_selection.png"
                    alt="Model selection"
                    imageClassName="w-[228px] h-auto mx-auto"
                  />
                </div>

                {/* Top center: Tone Selection */}
                <div
                  className="relative rounded-xl overflow-hidden lg:col-start-2 lg:row-start-1"
                  style={{ background: CARD_GRADIENT, minHeight: '280px' }}
                >
                  <div className="p-4 pb-2">
                    <h3 className="text-[22px] font-bold leading-[1.43] tracking-[0.236px] text-[#1D1D1D]">
                      Tone Selection
                    </h3>
                    <p className="text-[15px] font-normal leading-[1.43] tracking-[0.161px] text-[#333] mb-5">
                      Match your brand&apos;s communication style
                    </p>
                    {/* Tone pills */}
                    <div className="flex flex-wrap gap-2">
                      {TONE_OPTIONS.map((tone) => (
                        <button
                          key={tone.label}
                          type="button"
                          onClick={() => setActiveTone(tone.label)}
                          className="px-4 py-1.5 rounded-full text-[14px] font-medium transition-all duration-150"
                          style={{
                            background:
                              activeTone === tone.label ? '#1D1D1D' : 'rgba(255,255,255,0.7)',
                            color: activeTone === tone.label ? '#fff' : '#333',
                            border:
                              activeTone === tone.label
                                ? '1.5px solid #1D1D1D'
                                : '1.5px solid #D0D0D0',
                          }}
                        >
                          {tone.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preview of selected tone */}
                  <div className="px-4 pb-5 pt-3">
                    <div
                      className="rounded-xl p-4 text-[13px] leading-relaxed text-[#444]"
                      style={{
                        background: 'rgba(255,255,255,0.65)',
                        border: '1px solid rgba(0,0,0,0.06)',
                      }}
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-[#999] block mb-1">
                        Preview — {activeTone}
                      </span>
                      {activeTone === 'Professional' &&
                        'Good afternoon. How may I assist you today?'}
                      {activeTone === 'Friendly' && 'Hey there! 👋 How can I help you today?'}
                      {activeTone === 'Witty' &&
                        "Well, well, well — look who decided to chat! What's up?"}
                      {activeTone === 'Empathetic' &&
                        "I'm here for you. Please tell me how I can help."}
                      {activeTone === 'Formal' &&
                        'Greetings. Please state your inquiry and I shall assist accordingly.'}
                      {activeTone === 'Casual' && "Hey! What's on your mind? Happy to help 😊"}
                      {activeTone === 'Concise' && 'Hi. How can I help?'}
                      {activeTone === 'Enthusiastic' &&
                        "Welcome!! So excited you're here — what can I do for you?! 🎉"}
                    </div>
                  </div>
                </div>

                {/* Top right: keep Language Support width unchanged */}
                <div className="lg:col-start-3 lg:row-start-1">
                  <FeatureCard
                    title="Language Support"
                    description="Engage with customers in their preferred language"
                    image="/images/img_image_w_auto_black_900_200x230.png"
                    alt="language support selector"
                    imageClassName="w-[230px] h-auto mx-auto"
                  />
                </div>

                {/* Bottom row now fills center + right area */}
                <div className="lg:col-start-2 lg:row-start-2">
                  <FeatureCard
                    title="User Test Prompt"
                    description="Fine-tune responses to match your expectations"
                    image="images/user_prompt.png"
                    alt="user test prompt"
                    imageClassName="w-[218px] h-auto mx-auto"
                  />
                </div>
                <div className="lg:col-start-3 lg:row-start-2">
                  <FeatureCard
                    title="Source Document Management"
                    description="Manage knowledge sources"
                    image="images/kb.png"
                    alt="source document management"
                    imageClassName="w-[213px] h-auto mx-auto"
                  />
                </div>
              </div>
            ) : (
              /* ── Visual Customization ── */
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
                style={{ alignItems: 'stretch' }}
              >
                {visualCards.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl overflow-hidden flex flex-col"
                    style={{ background: CARD_GRADIENT, minHeight: '320px' }}
                  >
                    <div className="p-4 flex flex-col gap-1.5">
                      {/* Differentiating badge */}
                      <span
                        className="text-[12px] font-semibold tracking-wide mb-1 inline-block"
                        style={{
                          background: 'rgba(255,255,255,0.7)',
                          border: '1px solid rgba(0,0,0,0.08)',
                          borderRadius: '100px',
                          padding: '2px 10px',
                          width: 'fit-content',
                          color: '#555',
                        }}
                      >
                        {item.badge}
                      </span>
                      <h3 className="text-[22px] font-bold leading-[1.43] text-[#1D1D1D]">
                        {item.title}
                      </h3>
                      <p className="text-[15px] text-[#333] leading-[1.43]">{item.description}</p>
                    </div>
                    <div className="flex-1 flex items-end justify-center px-4 pb-0 overflow-hidden">
                      <img src={item.image} alt={item.alt} className="w-full h-auto mt-auto" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="text-center mt-14">
            <p className="text-[15px] text-[#888] mb-4">
              All settings sync instantly — no re-deploy needed.
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-[#1D1D1D] text-white rounded-full px-8 py-3.5 text-[16px] font-semibold transition-all duration-200 hover:opacity-80"
            >
              Start Customizing
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </GradientBg>
  );
}
