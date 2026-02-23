'use client';

import { useEffect, useRef, useState } from 'react';

// ─── Reuse avatar dari original ──────────────────────────────────────────────

const MiniAvatar = () => (
  <div
    style={{
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #1a1a2e, #0f0f23)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1.5px solid rgba(167,139,250,0.4)',
      flexShrink: 0,
    }}
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="8" width="14" height="10" rx="3" fill="#a78bfa" />
      <rect x="9" y="5" width="6" height="4" rx="1.5" fill="#7c3aed" />
      <circle cx="9" cy="13" r="1.5" fill="white" />
      <circle cx="15" cy="13" r="1.5" fill="white" />
    </svg>
  </div>
);

const UserAvatar = () => (
  <div
    style={{
      width: 28,
      height: 28,
      borderRadius: '50%',
      flexShrink: 0,
      background: 'linear-gradient(135deg, #c7c2f4, #9b8ff0)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '11px',
      fontWeight: 700,
      color: '#4c3fa0',
    }}
  >
    J
  </div>
);

// ─── Conversation script ──────────────────────────────────────────────────────

const SCRIPT = [
  { from: 'bot', text: 'Hi! is there anything I can help you with?' },
  { from: 'user', text: 'Do you shipping International?' },
  { from: 'bot', text: 'Yes ✨' },
  { from: 'user', text: 'Lets go..' },
] as const;

// Delay between each bubble appearing (ms)
const BUBBLE_INTERVAL = 1800;
const ENTER_MS = 420;

// ─── Types ────────────────────────────────────────────────────────────────────

type Bubble = {
  id: number;
  from: 'bot' | 'user';
  text: string;
  state: 'entering' | 'visible';
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroChatBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const scriptIndex = useRef(0);
  const bubbleId = useRef(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const schedule = (callback: () => void, delay: number) => {
    const timeout = setTimeout(callback, delay);
    timeoutsRef.current.push(timeout);
    return timeout;
  };

  const clearAllScheduled = () => {
    timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    timeoutsRef.current = [];
  };

  const addNext = () => {
    if (scriptIndex.current >= SCRIPT.length) return;

    const idx = scriptIndex.current;
    const msg = SCRIPT[idx];
    const id = ++bubbleId.current;

    // Add new bubble in "entering" state
    setBubbles((prev) => [
      ...prev,
      { id, from: msg.from, text: msg.text, state: 'entering' as const },
    ]);

    // Trigger enter transition on next frame-ish tick
    schedule(() => {
      setBubbles((prev) => prev.map((b) => (b.id === id ? { ...b, state: 'visible' } : b)));
    }, 16);

    scriptIndex.current++;

    // Schedule next bubble once; no looping
    if (scriptIndex.current < SCRIPT.length) {
      schedule(addNext, BUBBLE_INTERVAL);
    }
  };

  useEffect(() => {
    schedule(addNext, 600);
    return () => {
      clearAllScheduled();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="w-full lg:w-[46%]"
      style={{
        position: 'relative',
        minHeight: '420px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: '24px',
        overflow: 'hidden',
      }}
    >
      {/* Subtle ambient glow behind bubbles */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `
          radial-gradient(ellipse 60% 50% at 30% 70%, rgba(167,139,250,0.10) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 75% 40%, rgba(246,50,154,0.07) 0%, transparent 70%)
        `,
        }}
      />

      {/* Bubble stack */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '0 8px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {bubbles.map((bubble) => {
          const isBot = bubble.from === 'bot';

          const enterStyle: React.CSSProperties =
            bubble.state === 'entering'
              ? {
                  opacity: 0,
                  transform: 'translate3d(0, 18px, 0) scale(0.97)',
                  transition: `opacity ${ENTER_MS}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${ENTER_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                }
              : {
                  opacity: 1,
                  transform: 'translate3d(0, 0, 0) scale(1)',
                  transition:
                    'opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                };

          return (
            <div
              key={bubble.id}
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '8px',
                flexDirection: isBot ? 'row' : 'row-reverse',
                willChange: 'transform, opacity',
                ...enterStyle,
              }}
            >
              {/* Avatar */}
              {isBot ? <MiniAvatar /> : <UserAvatar />}

              {/* Bubble */}
              <div
                style={{
                  maxWidth: '72%',
                  padding: '11px 16px',
                  borderRadius: isBot ? '18px 18px 18px 4px' : '18px 18px 4px 18px',
                  background: isBot
                    ? 'rgba(255,255,255,0.92)'
                    : 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                  color: isBot ? '#2d2d2d' : '#fff',
                  fontSize: '14px',
                  lineHeight: '1.55',
                  fontWeight: 500,
                  boxShadow: isBot
                    ? '0 4px 20px rgba(0,0,0,0.10)'
                    : '0 4px 20px rgba(124,58,237,0.30)',
                  backdropFilter: isBot ? 'blur(8px)' : 'none',
                }}
              >
                {bubble.text}
              </div>
            </div>
          );
        })}

        {/* Typing indicator — shows briefly before each bot message */}
        <TypingDots
          visible={
            bubbles.length > 0 &&
            bubbles[bubbles.length - 1]?.from === 'user' &&
            bubbles[bubbles.length - 1]?.state === 'visible' &&
            scriptIndex.current < SCRIPT.length &&
            SCRIPT[scriptIndex.current]?.from === 'bot'
          }
        />
      </div>

      <style>{`
        @keyframes typingBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%            { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── Typing dots ─────────────────────────────────────────────────────────────

function TypingDots({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '8px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        height: visible ? 'auto' : 0,
        overflow: 'hidden',
      }}
    >
      <MiniAvatar />
      <div
        style={{
          padding: '10px 14px',
          borderRadius: '18px 18px 18px 4px',
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          display: 'flex',
          gap: '5px',
          alignItems: 'center',
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#a78bfa',
              animation: `typingBounce 1.2s ${i * 0.2}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
