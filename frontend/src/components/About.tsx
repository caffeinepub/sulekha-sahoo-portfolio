import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Quote, Globe } from 'lucide-react';

export default function About() {
  const { ref: imgRef, isVisible: imgVisible } = useScrollAnimation();
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="w-8 h-0.5 bg-sky rounded-full" />
          <span className="text-sky text-sm font-semibold tracking-widest uppercase">About Me</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div
            ref={imgRef as React.RefObject<HTMLDivElement>}
            className={`relative transition-all duration-700 ${
              imgVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[5/4] bg-sky/5">
              <img
                src="/assets/generated/about-illustration.dim_600x500.png"
                alt="Graphic design workspace illustration"
                className="w-full h-full object-cover"
              />
              {/* Decorative frame */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-sky/10" />
            </div>
            {/* Decorative dot grid */}
            <div className="absolute -top-4 -left-4 w-24 h-24 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle, oklch(0.7 0.18 220) 1.5px, transparent 1.5px)',
                backgroundSize: '12px 12px'
              }}
            />
          </div>

          {/* Text */}
          <div
            ref={textRef as React.RefObject<HTMLDivElement>}
            className={`transition-all duration-700 delay-200 ${
              textVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <h2 className="font-display text-4xl md:text-5xl font-black text-ink leading-tight mb-6">
              Passion for Design,{' '}
              <span className="text-sky">Purpose in Every Pixel</span>
            </h2>

            <p className="text-ink/70 text-lg leading-relaxed mb-6">
              A creative graphics designer who loves color and helping brands look professional.
              I bring ideas to life through thoughtful design that communicates, captivates, and converts.
            </p>

            {/* Declaration quote */}
            <div className="relative pl-5 border-l-4 border-sky rounded-r-xl bg-sky/5 py-4 pr-4 mb-8">
              <Quote className="absolute -top-2 -left-2 w-5 h-5 text-sky fill-sky" />
              <p className="text-ink/80 italic font-medium leading-relaxed">
                "Designs that reflect creativity, skill, and an understanding of design principles."
              </p>
            </div>

            {/* Languages */}
            <div className="flex items-center gap-3 mb-8">
              <Globe className="w-5 h-5 text-sky flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-ink mb-1">Languages</p>
                <div className="flex gap-2">
                  {['Odia', 'Hindi'].map((lang) => (
                    <span
                      key={lang}
                      className="px-3 py-1 rounded-full bg-sky/10 text-sky text-xs font-semibold border border-sky/20"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-ink/10">
              {[
                { value: '50+', label: 'Projects Done' },
                { value: '30+', label: 'Happy Clients' },
                { value: '4', label: 'Design Tools' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-2xl font-black text-sky">{stat.value}</p>
                  <p className="text-xs text-ink/50 font-medium mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
