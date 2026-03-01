import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ArrowDown, Sparkles } from 'lucide-react';

export default function Hero() {
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: subRef, isVisible: subVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.1 });

  const scrollToWork = () => {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/assets/generated/hero-bg.dim_1920x1080.png')" }}
      />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-sky/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-coral/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sky/5 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky/10 border border-sky/20 text-sky text-sm font-medium mb-8 transition-all duration-700 ${
            headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Professional Graphic Designer
        </div>

        {/* Main Headline — enlarged for greater visual impact */}
        <h1
          ref={subRef as React.RefObject<HTMLHeadingElement>}
          className={`font-display text-6xl md:text-8xl lg:text-9xl font-black text-ink leading-[1.02] tracking-tight mb-6 transition-all duration-700 delay-150 ${
            subVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Creative Design,{' '}
          <span className="text-sky relative">
            Unique Ideas
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 9C50 3 100 1 150 5C200 9 250 7 298 3"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-sky/50"
              />
            </svg>
          </span>
        </h1>

        {/* Subheading */}
        <p
          className={`text-lg md:text-xl text-ink/60 max-w-xl mx-auto mb-4 font-light leading-relaxed transition-all duration-700 delay-300 ${
            subVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Hi, I'm <span className="font-semibold text-ink">Sulekha Sahoo</span> — a creative designer
          who transforms ideas into stunning visual experiences.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 transition-all duration-700 delay-500 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <button
            onClick={scrollToWork}
            className="px-8 py-4 rounded-full bg-sky text-white font-bold text-base hover:bg-sky-dark transition-all duration-200 shadow-sky-md hover:shadow-sky-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            View My Work
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-full border-2 border-ink/20 text-ink font-bold text-base hover:border-sky hover:text-sky transition-all duration-200"
          >
            Get In Touch
          </button>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToAbout}
          className="mt-16 flex flex-col items-center gap-2 text-ink/40 hover:text-sky transition-colors duration-200 mx-auto"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
