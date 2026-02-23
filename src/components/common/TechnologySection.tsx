'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import GradientBg from '../ui/GradientBg';

interface ResourceHighlight {
  label: string;
  title: string;
  description: string;
  points: string[];
  image: string;
}

const resourceHighlights: ResourceHighlight[] = [
  {
    label: 'Unified Inbox',
    title: 'One Inbox for Every Conversation',
    description:
      'Centralize website chat, social messages, and support requests into one clean workspace.',
    points: [
      'Unify incoming conversations across channels',
      'Assign chats instantly to the right team member',
      'Prioritize urgent requests automatically',
    ],
    image: '/images/tech1.png',
  },
  {
    label: 'AI-Powered Answers',
    title: 'Respond Instantly With Context',
    description:
      'Answer faster with knowledge-driven responses grounded in your product and policy data.',
    points: [
      'Use your resource center as the AI knowledge base',
      'Reduce repetitive replies for support teams',
      'Keep answers consistent and brand-aligned',
    ],
    image: '/images/tech2.png',
  },
  {
    label: 'Lead Qualification',
    title: 'Qualify Leads Before Sales Steps In',
    description:
      'Collect intent, budget, and use-case details automatically so your team talks to better leads.',
    points: [
      'Ask smart qualification questions in flow',
      'Capture high-intent leads in real time',
      'Route sales-ready prospects immediately',
    ],
    image: '/images/tech3.png',
  },
  {
    label: 'Team Escalation',
    title: 'Hand Off Smoothly to Human Agents',
    description:
      'Move complex conversations to your team with full context, no repeated questions needed.',
    points: [
      'Escalate based on intent or confidence score',
      'Pass full conversation history automatically',
      'Reduce resolution time for complex cases',
    ],
    image: '/images/tech4.png',
  },
  {
    label: 'Performance Insights',
    title: 'Track What Actually Drives Results',
    description:
      'Measure response quality, lead conversion, and team output to improve performance every week.',
    points: [
      'Monitor response and resolution trends',
      'Track conversion impact by channel',
      'Spot drop-offs and optimize fast',
    ],
    image: '/images/tech5.png',
  },
];

export default function TechnologySection() {
  const [selectedResourceIndex, setSelectedResourceIndex] = useState<number>(0);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const selectedHighlight = resourceHighlights[selectedResourceIndex];

  useGSAP(
    () => {
      gsap.fromTo(
        '.tech-detail-anim',
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
    { scope: detailPanelRef, dependencies: [selectedResourceIndex], revertOnUpdate: true }
  );

  return (
    <GradientBg base="#F5F4F0" intensity={0.85}>
      <section className="w-full py-12 sm:py-16 md:py-20">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[1202px] mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-[24px] sm:text-[36px] md:text-[48px] font-bold leading-9xl text-text-tertiary mb-2">
                Smart tech. Smarter conversations.
              </h2>
              <p className="text-lg font-normal leading-2xl text-text-quaternary">
                Here&apos;s what makes Chattiphy Chat Agent more than just another chatbot.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div
                className="w-full lg:w-[260px] flex-shrink-0 flex flex-col gap-1 p-2"
                style={{
                  background: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <p className="text-xs font-semibold text-text-light uppercase tracking-widest px-4 pt-2 pb-1">
                  Resource Hub
                </p>

                {resourceHighlights.map((highlight, index) => (
                  <button
                    key={highlight.label}
                    type="button"
                    onClick={() => setSelectedResourceIndex(index)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      selectedResourceIndex === index
                        ? 'bg-text-tertiary text-text-white shadow-md'
                        : 'text-text-quaternary hover:bg-black/4 hover:text-text-tertiary'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 transition-all ${
                        selectedResourceIndex === index
                          ? 'bg-text-white'
                          : 'bg-transparent border border-text-light'
                      }`}
                    />
                    <span className="text-md font-semibold leading-2xl">{highlight.label}</span>
                    {selectedResourceIndex === index && (
                      <svg
                        className="ml-auto flex-shrink-0"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>

              <div
                key={selectedResourceIndex}
                ref={detailPanelRef}
                className="flex-1 overflow-hidden bg-background-white border border-border-light"
                style={{ minHeight: '500px' }}
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div
                    className="order-1 md:order-2 w-full md:w-[62%] overflow-hidden flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FF 100%)',
                    }}
                  >
                    <div className="tech-detail-anim w-full aspect-[16/9] my-auto">
                      <img
                        src={selectedHighlight.image}
                        alt={selectedHighlight.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="order-2 md:order-1 flex flex-col justify-center p-8 md:p-10 w-full md:w-[38%]">
                    <span
                      className="tech-detail-anim text-xs font-semibold uppercase tracking-widest mb-4 inline-block w-fit px-3 py-1 rounded-full"
                      style={{ background: 'rgba(107,63,160,0.08)', color: '#6B3FA0' }}
                    >
                      {selectedHighlight.label}
                    </span>

                    <h3 className="tech-detail-anim text-2xl font-bold leading-5xl text-text-tertiary mb-3">
                      {selectedHighlight.title}
                    </h3>
                    <p className="tech-detail-anim text-md font-normal leading-3xl text-text-quaternary mb-6">
                      {selectedHighlight.description}
                    </p>

                    <div className="flex flex-col gap-3">
                      {selectedHighlight.points.map((point, index) => (
                        <div key={index} className="tech-detail-anim flex items-start gap-3">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: 'rgba(107,63,160,0.12)' }}
                          >
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#6B3FA0"
                              strokeWidth="3"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <span className="text-sm font-normal leading-2xl text-text-quaternary">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {resourceHighlights.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedResourceIndex(i)}
                  style={{
                    width: i === selectedResourceIndex ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '100px',
                    background: i === selectedResourceIndex ? '#6B3FA0' : 'rgba(0,0,0,0.15)',
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
      </section>
    </GradientBg>
  );
}
