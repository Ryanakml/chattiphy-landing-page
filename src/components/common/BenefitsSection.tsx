import Button from '../ui/Button';
import GradientBg from '../ui/GradientBg';
import Image from 'next/image';

interface BenefitFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface BenefitsSectionProps {
  features: BenefitFeature[];
  onGetStarted: () => void;
}

export default function BenefitsSection({ features, onGetStarted }: BenefitsSectionProps) {
  return (
    <GradientBg base="#F5F4F0" intensity={0.85} className="rounded-[32px]">
      <section className="w-full py-12 sm:py-16 md:py-20">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[1202px] mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-[24px] sm:text-[36px] md:text-[48px] font-bold leading-9xl text-text-tertiary mb-4 sm:mb-6">
                A 24/7 Solution – Customized
              </h2>
              <h2 className="text-[24px] sm:text-[36px] md:text-[48px] font-bold leading-9xl text-text-tertiary">
                For Your Business
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {features.map((feature) => (
                <div key={feature.id} className="bg-background-white rounded-md p-6 text-center">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold leading-5xl text-text-secondary mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-base font-normal leading-md text-text-quaternary">
                      {feature.description}
                    </p>
                  </div>
                  <Image
                    src={feature.icon}
                    className="w-full h-auto max-w-[332px] mx-auto"
                    alt={feature.title}
                    width={332}
                    height={254}
                    sizes="(max-width: 768px) 100vw, 332px"
                  />
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                text="Let's Try Today!"
                onClick={onGetStarted}
                className="bg-background-dark-secondary text-text-white border border-border-white rounded-base px-8 py-[14px] text-lg font-medium leading-3xl"
              />
            </div>
          </div>
        </div>
      </section>
    </GradientBg>
  );
}
