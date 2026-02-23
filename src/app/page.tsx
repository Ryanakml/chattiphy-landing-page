import { Metadata } from 'next';
import LandingPage from './LandingPage';

export const metadata: Metadata = {
  title: 'Chattiphy Chat Agent - AI-Powered Business Chatbot Solutions',
  description:
    'Transform your business with Chattiphy Chat Agent - 24/7 AI-powered chatbot solutions for customer engagement, lead generation, and automated support across all industries.',
  keywords:
    'AI chatbot, business automation, customer support, lead generation, conversational commerce, chat agent, AI assistant, business chat solutions',

  openGraph: {
    title: 'Chattiphy Chat Agent - AI-Powered Business Chatbot Solutions',
    description:
      'Revolutionize customer engagement with Chattiphy Chat Agent. Get 24/7 automated support, intelligent lead generation, and customizable AI chatbot solutions for your business.',
  },
};

export default function Page() {
  return <LandingPage />;
}
