import React from 'react';
import '../styles/index.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: {
    default: 'Chattiphy Chat Agent',
    template: 'Chattiphy Chat Agent | %s',
  },
  description:
    'Transform your business with Chattiphy Chat Agent - 24/7 AI-powered chatbot solutions for customer engagement, lead generation, and automated support across all industries.',
  keywords:
    'AI chatbot, business automation, customer support, lead generation, conversational commerce, chat agent, AI assistant, business chat solutions',

  openGraph: {
    type: 'website',
    title: {
      default: 'Chattiphy Chat Agent',
      template: 'Chattiphy Chat Agent | %s',
    },
    description:
      'Revolutionize customer engagement with Chattiphy Chat Agent. Get 24/7 automated support, intelligent lead generation, and customizable AI chatbot solutions for your business.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <script
          type="module"
          async
          src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fchattiphycha3674back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.17"
        />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" />
      </body>
    </html>
  );
}
