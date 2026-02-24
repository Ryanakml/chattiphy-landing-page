'use client';
import { useState } from 'react';
import Header from '../components/common/Header';
import HowItWorksSection from '../components/common/HowItWorksSection';
import CustomizationSection from '../components/common/CustomizationSection';
import IndustriesSection from '../components/common/IndustriesSection';
import TechnologySection from '../components/common/TechnologySection';
import BenefitsSection from '../components/common/BenefitsSection';
import Button from '../components/ui/Button';
import EditText from '../components/ui/EditText';
import GradientBg from '../components/ui/GradientBg';
import Image from 'next/image';
import ChatAgent from '@/components/ui/agent';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
}

const DASHBOARD_URL = 'https://chattiphy.nextstackhq.app/dashboard/overview';

export default function LandingPage() {
  const [email, setEmail] = useState<string>('');

  const [faqs, setFAQs] = useState<FAQ[]>([
    {
      id: '1',
      question: 'What is chattiphy Chat Agent?',
      answer:
        'Chattiphy Chat Agent is an AI-powered chatbot platform designed to revolutionize customer engagement and drive business growth through intelligent automation.',
      isOpen: false,
    },
    {
      id: '2',
      question: 'Will this chatbot really help generate leads?',
      answer:
        'Yes, our Chat Agent is specifically designed to qualify visitors in real time and guide hot leads straight to checkout or meeting bookings.',
      isOpen: false,
    },
    {
      id: '3',
      question: 'How do I train the chatbot on my business data?',
      answer:
        'Simply upload your documents, FAQs, and business information through our intuitive dashboard. The AI learns from your content automatically.',
      isOpen: false,
    },
    {
      id: '4',
      question: 'It supports voice interactions or multiple languages?',
      answer:
        'Yes, our Speech Bot feature supports voice interactions and multiple languages for a truly global customer experience.',
      isOpen: false,
    },
    {
      id: '5',
      question: 'Is there a free trial?',
      answer:
        'Yes, we offer early access and free trial options. Contact us to get started with your personalized demo.',
      isOpen: false,
    },
  ]);

  const features: Feature[] = [
    {
      id: '1',
      title: 'Reduce Operational Costs',
      description: 'Automate routine customer questions and cut help-desk workload by up to 40%.',
      icon: '/images/img_image_w_full_gray_200.svg',
    },
    {
      id: '2',
      title: 'Boost Conversion Rates',
      description:
        'Qualify visitors in real time and guide hot leads straight to checkout or a meeting.',
      icon: '/images/img_image_w_full_gray_200_256x332.svg',
    },
    {
      id: '3',
      title: 'Save Hours Daily',
      description:
        'Auto-answer FAQs, capture leads, schedule calls—free your team for high-value work.',
      icon: '/images/img_image_w_full_gray_200_254x332.svg',
    },
  ];

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Early Beta User',
      role: 'SaaS Founder',
      company: 'Tech Startup',
      content:
        'chattiphy is like hiring a full team — without the salaries, the headaches, or the burnout.',
      avatar: '/images/img_image_blue_gray_900.svg',
    },
    {
      id: '2',
      name: 'Operations Head',
      role: 'TravelTech Startup',
      company: 'Travel Industry',
      content: 'Setup was ridiculously fast. No developers. No drama. Just results.',
      avatar: '/images/img_image_blue_gray_900.svg',
    },
    {
      id: '3',
      name: 'Startup Advisor',
      role: 'Angel Investor',
      company: 'Investment',
      content: 'Every founder needs this. I am just waiting for more products by chattiphy.',
      avatar: '/images/img_image_blue_gray_900.svg',
    },
  ];

  const toggleFAQ = (id: string): void => {
    setFAQs((prev) => prev.map((faq) => (faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq)));
  };

  const redirectToDashboard = (): void => {
    window.location.assign(DASHBOARD_URL);
  };

  const handleEmailSubmit = (): void => {
    redirectToDashboard();
  };

  const handleGetStarted = (): void => {
    redirectToDashboard();
  };

  const handleBookDemo = (): void => {
    redirectToDashboard();
  };

  return (
    <main className="min-h-screen bg-background-white">
      {/* Header */}
      {/* <Header /> */}

      {/* Hero Section */}
      <section className="w-full bg-background-cream">
        <div className="w-full max-w-[1440px] mx-auto">
          {/* Navbar — floating glass pill */}
          <div
            className="w-full sticky top-0 z-50 flex justify-center px-4 py-3"
            style={{ pointerEvents: 'none' }}
          >
            <nav
              className="flex justify-between items-center w-full max-w-[1202px] rounded-2xl px-4 py-2"
              style={{
                pointerEvents: 'auto',
                background: 'rgba(255, 255, 255, 0.72)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.07), 0 1px 2px rgba(0,0,0,0.04)',
              }}
            >
              {/* Logo */}
              <img
                src="/images/logoipsum.svg"
                className="w-[65px] sm:w-[90px] md:w-[110px] h-[28px]"
                alt="logo"
              />

              {/* Nav links */}
              <div className="hidden md:flex items-center gap-1">
                <span
                  className="text-md font-semibold leading-xl text-text-tertiary px-4 py-2 rounded-xl"
                  style={{ background: 'rgba(0,0,0,0.05)' }}
                >
                  Overview
                </span>
                <span className="text-md font-normal leading-xl text-text-tertiary px-4 py-2 rounded-xl cursor-pointer hover:bg-black/5 transition-colors">
                  Pricing
                </span>
                <span className="text-md font-normal leading-xl text-text-tertiary px-4 py-2 rounded-xl cursor-pointer hover:bg-black/5 transition-colors">
                  FAQ&apos;s
                </span>
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={handleGetStarted}
                className="bg-background-accent-primary rounded-xl px-5 py-2 cursor-pointer"
                style={{ boxShadow: '0 2px 12px rgba(107,63,160,0.30)' }}
              >
                <span className="text-md font-medium leading-xl text-text-white whitespace-nowrap">
                  Start With Chat Agent
                </span>
              </button>
            </nav>
          </div>

          {/* Hero Content */}
          <div className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
            <div className="w-full max-w-[1202px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">
              {/* Left Content */}
              <div className="flex flex-col justify-start items-center lg:items-start w-full lg:w-[44%] text-center lg:text-left">
                {/* Main Title */}
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center w-full mb-6">
                  <h1 className="text-[28px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-tight text-text-tertiary">
                    Chattiphy Chat Agent
                  </h1>
                </div>

                {/* Subtitle */}
                <div className="flex flex-col justify-center items-center lg:items-start w-full mb-6">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-5xl text-text-tertiary mb-2">
                    An AI Chatbot for Businesses that Sells, Supports
                  </h2>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-5xl text-text-tertiary">
                    & Converts, around the clock!
                  </h2>
                </div>

                {/* Description */}
                <div className="flex flex-col justify-center items-center lg:items-start w-full mb-8">
                  <p className="text-base sm:text-lg leading-2xl text-text-quaternary mb-1">
                    Tired of missed leads due to slow responses? chattiphy Chat
                  </p>
                  <p className="text-base sm:text-lg leading-2xl text-text-quaternary mb-1">
                    Agent is your 24/7 assistant trained to convert, support, and
                  </p>
                  <p className="text-base sm:text-lg leading-2xl text-text-quaternary">
                    qualify, all while sounding like part of your team.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center w-full mb-8">
                  <Button
                    text="Get Early Access"
                    onClick={handleGetStarted}
                    className="w-full sm:w-auto bg-background-accent-primary text-text-white rounded-base px-[26px] py-[14px] text-lg font-medium leading-3xl"
                  />
                  <Button
                    text="Book a Personalized Demo"
                    onClick={handleBookDemo}
                    variant="outline"
                    className="w-full sm:w-auto border border-border-dark text-text-tertiary rounded-base px-[26px] py-[14px] text-lg font-medium leading-3xl"
                  />
                </div>

                {/* No Credit Card Required */}
                <div className="flex justify-start items-center w-full">
                  <img src="/images/img_image.svg" className="w-[24px] h-[24px]" alt="check icon" />
                  <span className="text-sm font-medium leading-base text-text-quaternary ml-2">
                    No credit card required
                  </span>
                </div>
              </div>

              {/* Right Image */}
              <ChatAgent />
            </div>
          </div>
        </div>

        {/* Bottom Wave Image */}
        <img
          src="/images/img_image_pointer_events_none.png"
          className="w-full h-[50px] sm:h-[75px] md:h-[100px] object-cover -mt-[30px] sm:-mt-[45px] md:-mt-[60px]"
          alt="wave decoration"
        />
      </section>

      <div className="w-full bg-background-cream">
        {/* Features Section */}
        <section className="relative z-10 w-full -mt-2 sm:-mt-4 md:-mt-6 pt-8 sm:pt-12 md:pt-14 pb-12 sm:pb-16 md:pb-20">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Feature Cards Row */}
            <div className="w-full max-w-[1202px] mx-auto">
              <div className="bg-background-dark-secondary rounded-xl px-6 sm:px-8 md:px-[26px] py-6 sm:py-8 md:py-[26px]">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-[112px] w-full">
                  {[
                    {
                      title: 'Answers product questions',
                      icon: '/images/img_image_indigo_a100.svg',
                    },
                    {
                      title: 'Personalized brand tone & knowledge',
                      icon: '/images/img_image_indigo_a100.svg',
                    },
                    {
                      title: 'Goes live within minutes',
                      icon: '/images/img_image_indigo_a100.svg',
                    },
                    {
                      title: 'Responds instantly and naturally',
                      icon: '/images/img_image_indigo_a100.svg',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-3 justify-start items-center w-full sm:w-auto"
                    >
                      <img
                        src={item.icon}
                        className="w-[24px] h-[24px] flex-shrink-0"
                        alt="feature icon"
                      />
                      <div className="flex flex-col justify-start items-start">
                        <span className="text-md font-semibold leading-xl text-text-white">
                          {item.title.split(' ')[0]} {item.title.split(' ')[1]}
                        </span>
                        {item.title.split(' ').slice(2).length > 0 && (
                          <span className="text-md font-semibold leading-xl text-text-white">
                            {item.title.split(' ').slice(2).join(' ')}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scroll Button */}
              {/* <div className="flex justify-end items-end w-full mb-8 sm:mb-12">
                <div className="bg-background-dark-secondary rounded-3xl p-3">
                  <img
                    src="/images/img_image_js82deh.svg"
                    className="w-[32px] h-[32px]"
                    alt="scroll icon"
                  />
                </div>
              </div> */}
            </div>
          </div>
        </section>

        <BenefitsSection features={features} onGetStarted={handleGetStarted} />
      </div>

      {/* Speech Bot Section */}
      <section className="w-full bg-background-dark-primary relative overflow-hidden">
        <img
          src="/images/img_image_absolute.png"
          className="absolute right-0 bottom-0 w-[220px] md:w-[420px] h-auto opacity-70 pointer-events-none"
          alt=""
          aria-hidden="true"
        />
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
          <div className="w-full max-w-[1202px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="w-full lg:w-[45%] text-left">
              {/* Label kecil — ganti "AI Chat Bot" dari heading jadi badge */}
              <span
                className="inline-block text-sm font-semibold uppercase tracking-widest mb-5 px-4 py-1.5 rounded-full"
                style={{ background: 'rgba(107,63,160,0.25)', color: '#C4A7F7' }}
              >
                Chat Agent
              </span>

              {/* Headline yang actual menjual value, bukan nama kategori */}
              <h2 className="text-[24px] sm:text-[36px] md:text-[44px] font-bold leading-9xl text-text-white mb-4">
                Let Your Website Start the Conversation
              </h2>

              {/* Subtext yang fix — tidak lagi dua kalimat terputus */}
              <p className="text-lg font-normal leading-2xl text-text-disabled mb-3">
                Turn visitors into qualified leads with instant, context-aware chat responses —
                powered by your knowledge base.
              </p>
              <p className="text-lg font-normal leading-2xl text-text-disabled mb-10">
                When things get complex, your team takes over seamlessly. Your chatbot listens,
                understands, and responds in real time, 24/7.
              </p>

              {/* Feature pills — quick trust builders */}
              <div className="flex flex-wrap gap-2 mb-10">
                {[
                  'Context-aware',
                  'Powered by your docs',
                  'Smooth team handoff',
                  '24/7 uptime',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-sm font-medium px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      color: 'rgba(255,255,255,0.6)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Button
                text="Let's Try it Out"
                onClick={handleGetStarted}
                className="bg-background-accent-primary text-text-white rounded-sm px-[26px] py-[14px] text-lg font-normal leading-3xl"
              />
            </div>

            {/* Right: Image */}
            <div className="w-full lg:w-[55%] relative flex justify-center items-center">
              {/* Main avatar */}
              <img
                src="/images/img_image_rounded_xl.png"
                className="relative z-10 w-full max-w-[450px] h-auto object-contain"
                alt="Chattiphy AI Chat Agent"
              />

              {/* Chat bubble — diperbaiki jadi lebih product-demo feel */}
              <div
                className="absolute bottom-[12%] right-[4%] z-20 rounded-2xl px-4 py-3 shadow-[0px_25px_50px_#0000003f]"
                style={{
                  background: 'rgba(30,30,40,0.85)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                  maxWidth: '240px',
                }}
              >
                {/* User message */}
                <div className="flex gap-2 items-center mb-3">
                  <img
                    src="/images/img_image_rounded_full.png"
                    className="w-[28px] h-[28px] rounded-full object-cover flex-shrink-0"
                    alt="user"
                  />
                  <span className="text-sm font-medium text-text-white-transparent">
                    What can Chattiphy do?
                  </span>
                </div>

                {/* Bot reply */}
                <div
                  className="rounded-xl px-3 py-2 text-xs font-normal leading-relaxed"
                  style={{ background: 'rgba(107,63,160,0.35)', color: 'rgba(255,255,255,0.85)' }}
                >
                  I can qualify leads, answer questions from your docs, and hand off to your team —
                  all automatically. 🚀
                </div>

                {/* Typing indicator */}
                <div className="flex gap-1 mt-2 px-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.3)',
                        display: 'inline-block',
                        animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
                <style>{`
                  @keyframes typingDot {
                    0%, 80%, 100% { opacity: 0.3; transform: scale(1); }
                    40% { opacity: 1; transform: scale(1.3); }
                  }
                `}</style>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TechnologySection />

      <HowItWorksSection onGetStarted={handleGetStarted} />

      {/* Customization Section */}
      <CustomizationSection />

      <IndustriesSection onGetStarted={handleGetStarted} />

      {/* Security Section */}
      <GradientBg base="#F5F4F0" intensity={0.85}>
        <section className="w-full py-16 sm:py-20 md:py-24">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-[1202px] mx-auto">
              {/* Section Header */}
              <div className="text-center mb-14">
                <h2 className="text-[24px] sm:text-[36px] md:text-[48px] font-bold leading-9xl text-text-tertiary mb-3">
                  Data Security Guaranteed
                </h2>
                <h3 className="text-xl sm:text-2xl font-medium leading-5xl text-text-quaternary mb-4">
                  No Training on Your Data
                </h3>
                <p className="text-lg font-normal leading-2xl text-text-quaternary max-w-[600px] mx-auto">
                  At chattiphy, your privacy is not optional — it is built in. Your chatbot never
                  trains on your data, and all interactions are encrypted end-to-end.
                </p>
              </div>

              {/* Security Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                <div className="bg-background-white border border-border-light rounded-2xl p-8 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
                  <img
                    src="/images/img_image_size_14.png"
                    className="w-[44px] h-[44px]"
                    alt="encryption icon"
                  />
                  <div>
                    <h3 className="text-xl font-bold leading-5xl text-text-tertiary mb-2">
                      Encrypted by Default
                    </h3>
                    <p className="text-base font-normal leading-md text-text-quaternary">
                      Your chats and data are encrypted at rest (HS-256) and in transit (TLS 1.3
                      with AES-256).
                    </p>
                  </div>
                </div>

                <div className="bg-background-white border border-border-light rounded-2xl p-8 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
                  <img
                    src="/images/img_image_size_14_56x52.png"
                    className="w-[44px] h-[44px]"
                    alt="isolation icon"
                  />
                  <div>
                    <h3 className="text-xl font-bold leading-5xl text-text-tertiary mb-2">
                      Workspace-Level Isolation
                    </h3>
                    <p className="text-base font-normal leading-md text-text-quaternary">
                      Data is strictly separated by organization using advanced row-level access
                      controls.
                    </p>
                  </div>
                </div>

                <div className="bg-background-white border border-border-light rounded-2xl p-8 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
                  <img
                    src="/images/img_vector_56x48.png"
                    className="w-[44px] h-[44px]"
                    alt="audit icon"
                  />
                  <div>
                    <h3 className="text-xl font-bold leading-5xl text-text-tertiary mb-2">
                      Comprehensive Audit Logs
                    </h3>
                    <p className="text-base font-normal leading-md text-text-quaternary">
                      Every action is logged and can be reviewed for full transparency and
                      accountability.
                    </p>
                  </div>
                </div>

                <div className="bg-background-white border border-border-light rounded-2xl p-8 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
                  <img
                    src="/images/img_image_size_14_white_a700.png"
                    className="w-[44px] h-[44px]"
                    alt="redaction icon"
                  />
                  <div>
                    <h3 className="text-xl font-bold leading-5xl text-text-tertiary mb-2">
                      Sensitive Data Redaction
                    </h3>
                    <p className="text-base font-normal leading-md text-text-quaternary">
                      We never store credit card numbers, SSNs, or other sensitive personal
                      identifiers.
                    </p>
                  </div>
                </div>

                <div className="bg-background-white border border-border-light rounded-2xl p-8 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
                  <img
                    src="/images/img_image_size_14_54x56.png"
                    className="w-[44px] h-[44px]"
                    alt="retention icon"
                  />
                  <div>
                    <h3 className="text-xl font-bold leading-5xl text-text-tertiary mb-2">
                      Flexible Data Retention
                    </h3>
                    <p className="text-base font-normal leading-md text-text-quaternary">
                      You control how long your chat and workspace data stays on our servers.
                    </p>
                  </div>
                </div>

                <div className="bg-background-white border border-border-light rounded-2xl p-8 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
                  <img
                    src="/images/img_image_size_14_white_a700_56x50.png"
                    className="w-[44px] h-[44px]"
                    alt="zero retention icon"
                  />
                  <div>
                    <h3 className="text-xl font-bold leading-5xl text-text-tertiary mb-2">
                      Zero-Retention for AI Models
                    </h3>
                    <p className="text-base font-normal leading-md text-text-quaternary">
                      Our AI (Chat Agent) never trains on your data, ensuring total privacy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                {[
                  { label: 'SOC 2 Type II', icon: '🔒' },
                  { label: 'GDPR Compliant', icon: '🇪🇺' },
                  { label: 'ISO 27001', icon: '✅' },
                  { label: 'AES-256 Encrypted', icon: '🛡️' },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-2 bg-background-white border border-border-light rounded-full px-5 py-2"
                  >
                    <span className="text-base">{badge.icon}</span>
                    <span className="text-sm font-medium text-text-tertiary">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </GradientBg>

      {/* Testimonials Section */}
      <section
        className="w-full py-16 sm:py-20 md:py-24 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/img_background_images.png')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="w-full max-w-[696px] mx-auto text-center mb-16">
            <h2 className="text-[24px] sm:text-[36px] md:text-[48px] font-bold leading-9xl text-text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg font-normal leading-2xl text-text-white">
              Real results. Real voices. Here&apos;s how our Chat Agent is already helping
              businesses scale smarter.
            </p>
          </div>

          {/* Testimonials Slider */}
          <div
            id="testimonial-slider"
            className="flex gap-4 overflow-x-auto pb-4 mb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory',
            }}
          >
            <style>{`#testimonial-slider::-webkit-scrollbar { display: none; }`}</style>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-background-white rounded-xl p-8 min-w-[380px] max-w-[424px] flex-shrink-0 flex flex-col justify-between"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Stars */}
                <div>
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="#F59E0B"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote mark dekoratif */}
                  <span
                    className="text-[64px] font-bold leading-none text-text-quaternary select-none block -mb-4"
                    style={{ opacity: 0.18, lineHeight: 1 }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>

                  <p className="text-md font-normal leading-3xl text-text-quaternary mb-6">
                    {testimonial.content}
                  </p>
                </div>

                {/* Reviewer info */}
                <div className="flex items-center gap-3 pt-5 border-t border-border-light">
                  <img
                    src={testimonial.avatar}
                    className="w-[40px] h-[40px] rounded-full object-cover bg-gray-200"
                    alt={testimonial.name}
                  />
                  <div>
                    <h4 className="text-md font-medium leading-3xl text-text-tertiary">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs font-normal leading-lg text-text-quaternary">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll hint + social proof row */}
          <div className="flex items-center justify-between mb-10 px-1">
            {/* Aggregate rating */}
            <p className="text-sm font-normal text-text-white" style={{ opacity: 0.5 }}>
              ⭐ 4.9/5 from 200+ reviews
            </p>

            {/* Scroll arrow hint */}
            {/* <div className="flex items-center gap-2" style={{ opacity: 0.5 }}>
              <p className="text-xs font-normal text-text-white">Scroll to see more</p>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div> */}
          </div>

          {/* CTA Banner */}
          <div className="bg-background-white-transparent border border-border-white rounded-2xl px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-6">
            <h3 className="text-2xl sm:text-4xl font-bold leading-7xl text-text-white text-center sm:text-left">
              Ready to see results like these?
            </h3>
            <Button
              text="Let's Try it Out"
              onClick={handleGetStarted}
              className="bg-background-accent-primary text-text-white rounded-base px-6 py-[14px] text-lg font-medium leading-3xl"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 sm:py-20 md:py-24">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[1202px] mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-[24px] sm:text-[36px] md:text-[48px] font-bold leading-9xl text-text-tertiary">
                Frequently Asked Questions
              </h2>
            </div>

            {/* FAQ Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
              {/* Left Column */}
              <div className="space-y-4">
                {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq) => (
                  <div key={faq.id} className="space-y-4">
                    <div
                      className="bg-background-white rounded-md px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-background-cream transition-colors"
                      onClick={() => toggleFAQ(faq.id)}
                    >
                      <span className="text-xl font-semibold leading-4xl text-text-tertiary">
                        {faq.question}
                      </span>
                      <img
                        src="/images/img_arrow_down.svg"
                        className={`w-[24px] h-[24px] transition-transform ${faq.isOpen ? 'rotate-180' : ''}`}
                        alt="expand icon"
                      />
                    </div>
                    {faq.isOpen && (
                      <div className="px-4 py-3 text-md font-normal leading-xl text-text-quaternary">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {faqs.slice(Math.ceil(faqs.length / 2)).map((faq) => (
                  <div key={faq.id} className="space-y-4">
                    <div
                      className="bg-background-white rounded-md px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-background-cream transition-colors"
                      onClick={() => toggleFAQ(faq.id)}
                    >
                      <span className="text-xl font-semibold leading-4xl text-text-tertiary">
                        {faq.question}
                      </span>
                      <img
                        src="/images/img_arrow_down.svg"
                        className={`w-[24px] h-[24px] transition-transform ${faq.isOpen ? 'rotate-180' : ''}`}
                        alt="expand icon"
                      />
                    </div>
                    {faq.isOpen && (
                      <div className="px-4 py-3 text-md font-normal leading-xl text-text-quaternary">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Button
                text="Try Chattiphy Chat Agent for Free"
                onClick={handleGetStarted}
                className="bg-background-dark-secondary text-text-white border border-border-white rounded-base px-5 py-[14px] text-lg font-medium leading-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section
        className="w-full px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 md:mt-24"
        style={{ marginBottom: '-80px', paddingBottom: '40px', position: 'relative', zIndex: 10 }}
      >
        <div className="w-full max-w-[1202px] mx-auto">
          <div
            className="w-full rounded-3xl px-8 sm:px-12 py-12 flex flex-col lg:flex-row justify-between items-center gap-8 overflow-hidden relative"
            style={{
              background: 'linear-gradient(135deg, #1A1A2E 0%, #3B2A6E 50%, #6B3FA0 100%)',
              boxShadow: '0 24px 60px rgba(107, 63, 160, 0.35)',
            }}
          >
            {/* Dekorasi blob background supaya tidak terlalu flat */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.04)',
                top: '-80px',
                right: '20%',
                pointerEvents: 'none',
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.04)',
                bottom: '-40px',
                right: '8%',
                pointerEvents: 'none',
              }}
            />

            {/* Left Content */}
            <div className="w-full lg:w-auto text-center lg:text-left relative z-10">
              <h2 className="text-3xl font-semibold leading-6xl text-text-white mb-2">
                <span>Stay Ahead with </span>
                <span className="font-bold" style={{ color: '#D8A8FF' }}>
                  Chattiphy Insights
                </span>
              </h2>
              <p
                className="text-md font-normal leading-xl text-text-white"
                style={{ opacity: 0.65 }}
              >
                Subscribe to receive the latest updates, tips, and exclusive offers
              </p>
            </div>

            {/* Right Newsletter Form */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full lg:w-auto relative z-10">
              <EditText
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-[300px] rounded-base px-3 py-4 text-base font-normal leading-md text-text-primary"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                }}
              />
              <Button
                text="Subscribe"
                onClick={handleEmailSubmit}
                className="w-full sm:w-auto bg-background-white text-text-tertiary rounded-base px-8 py-[14px] text-lg font-medium leading-3xl hover:opacity-90 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full pt-28 sm:py-20">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[1202px] mx-auto">
            {/* Footer Top */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
              {/* Logo & Social */}
              <div className="w-full lg:w-[16%]">
                <img
                  src="/images/logoipsum.svg"
                  className="w-[122px] h-[38px] mb-8"
                  alt="footer logo"
                />
                <div className="flex gap-5 items-center">
                  <img
                    src="/images/img_vector_blue_gray_400.svg"
                    className="w-[8px] h-[16px]"
                    alt="social"
                  />
                  <img
                    src="/images/img_image_h_16px.svg"
                    className="w-[16px] h-[14px]"
                    alt="social"
                  />
                  <img
                    src="/images/img_image_h_16px_blue_gray_400.svg"
                    className="w-[14px] h-[16px]"
                    alt="social"
                  />
                  <img
                    src="/images/img_image_h_16px_indigo_a100.svg"
                    className="w-[16px] h-[16px]"
                    alt="social"
                  />
                  <img
                    src="/images/img_vector_blue_gray_400_16x12.svg"
                    className="w-[12px] h-[16px]"
                    alt="social"
                  />
                </div>
              </div>

              {/* Footer Links */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-8 lg:gap-16 w-full lg:w-auto">
                {/* Products */}
                <div className="w-full sm:w-[150px]">
                  <h3 className="text-sm font-semibold leading-sm text-text-tertiary mb-4">
                    Products
                  </h3>
                  <div className="space-y-4">
                    <p className="text-sm font-normal leading-base text-text-quaternary cursor-pointer hover:text-text-tertiary">
                      Chat Agent
                    </p>
                    <p className="text-sm font-normal leading-base text-text-quaternary cursor-pointer hover:text-text-tertiary">
                      Email Marketing Agent
                    </p>
                    <p className="text-sm font-normal leading-base text-text-quaternary cursor-pointer hover:text-text-tertiary">
                      Voice Agent
                    </p>
                    <p className="text-sm font-normal leading-base text-text-quaternary cursor-pointer hover:text-text-tertiary">
                      WhatsApp Agent
                    </p>
                    <p className="text-sm font-normal leading-base text-text-quaternary cursor-pointer hover:text-text-tertiary">
                      Social Media Agent
                    </p>
                    <p className="text-sm font-normal leading-base text-text-quaternary cursor-pointer hover:text-text-tertiary">
                      Ad Campaign Agent
                    </p>
                    <p className="text-sm font-normal leading-base text-text-quaternary cursor-pointer hover:text-text-tertiary">
                      Inbox Warm-Up Agent
                    </p>
                    <p className="text-sm font-normal leading-base text-text-quaternary cursor-pointer hover:text-text-tertiary">
                      SMS Agent
                    </p>
                  </div>
                </div>

                {/* General */}
                <div className="w-full sm:w-[130px]">
                  <h3 className="text-sm font-semibold leading-base text-text-tertiary mb-4">
                    General
                  </h3>
                  <div className="space-y-4">
                    <p className="text-sm font-normal leading-base text-text-quaternary cursor-pointer hover:text-text-tertiary">
                      Pricing
                    </p>
                    <p className="text-sm font-normal leading-base text-text-quaternary cursor-pointer hover:text-text-tertiary">
                      About Us
                    </p>
                    <p className="text-sm font-normal leading-base text-text-quaternary cursor-pointer hover:text-text-tertiary">
                      Contact Us
                    </p>
                    <p className="text-sm font-normal leading-base text-text-quaternary cursor-pointer hover:text-text-tertiary">
                      Blog
                    </p>
                    <p className="text-sm font-normal leading-base text-text-quaternary cursor-pointer hover:text-text-tertiary">
                      FAQ's
                    </p>
                    <p className="text-sm font-normal leading-base text-text-quaternary cursor-pointer hover:text-text-tertiary">
                      Terms & Conditions
                    </p>
                    <p className="text-sm font-normal leading-base text-text-quaternary cursor-pointer hover:text-text-tertiary">
                      Privacy Policy
                    </p>
                  </div>
                </div>

                {/* Contact Us */}
                <div className="w-full sm:w-auto">
                  <h3 className="text-sm font-semibold leading-sm text-text-tertiary mb-4">
                    Contact Us
                  </h3>
                  <div className="space-y-6">
                    <div className="flex gap-3 items-start">
                      <img
                        src="/images/img_image_indigo_a100_38x38.svg"
                        className="w-[38px] h-[38px]"
                        alt="email"
                      />
                      <div>
                        <p className="text-sm font-normal leading-base text-text-quaternary">
                          Email Address
                        </p>
                        <p className="text-sm font-medium leading-base text-text-tertiary">
                          business@chatify.ai
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <img
                        src="/images/img_image_38x38.svg"
                        className="w-[38px] h-[38px]"
                        alt="phone"
                      />
                      <div>
                        <p className="text-sm font-normal leading-base text-text-quaternary">
                          Phone Number
                        </p>
                        <p className="text-sm font-medium leading-base text-text-tertiary">
                          +1 978 913 8334, +91 7710713122
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <img
                        src="/images/img_image_1.svg"
                        className="w-[38px] h-[38px]"
                        alt="address"
                      />
                      <div>
                        <p className="text-sm font-normal leading-base text-text-quaternary mb-1">
                          Address
                        </p>
                        <p className="text-sm font-medium leading-base text-text-tertiary">
                          Plot F5-F6, Second Floor, Phase-8, Industrial Area, Sector 72,
                        </p>
                        <p className="text-sm font-medium leading-base text-text-tertiary">
                          Sahibzada Ajit Singh Nagar, Punjab 160055
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="text-center">
              <p className="text-sm font-normal leading-base text-text-primary">
                © 2026 Chatify.ai. All Rights Reserved
              </p>
            </div>
          </div>
        </div>

        {/* Final Footer Image - Diperbaiki */}
        <img
          src="/images/img_image_160x1438.png"
          className="w-full max-w-[1440px] mx-auto h-auto object-contain mt-12 px-4 sm:px-6 lg:px-8"
          alt="LET'S WORK TOGETHER"
        />
      </footer>
    </main>
  );
}
