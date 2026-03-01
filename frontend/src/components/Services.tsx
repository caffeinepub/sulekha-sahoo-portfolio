import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PenTool, Image, Share2 } from 'lucide-react';

const services = [
  {
    icon: PenTool,
    title: 'Logo Design',
    description:
      'Crafting memorable, versatile logos that capture your brand\'s essence and make a lasting first impression.',
    features: ['Brand Identity', 'Vector Files', 'Multiple Concepts'],
    color: 'sky',
  },
  {
    icon: Image,
    title: 'Poster Design',
    description:
      'Eye-catching posters and print materials that communicate your message with clarity and visual impact.',
    features: ['Print Ready', 'Custom Layouts', 'High Resolution'],
    color: 'coral',
  },
  {
    icon: Share2,
    title: 'Social Media Management',
    description:
      'Consistent, on-brand social media graphics that engage your audience and elevate your online presence.',
    features: ['All Platforms', 'Content Calendar', 'Brand Consistency'],
    color: 'violet',
  },
];

export default function Services() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-24 md:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-0.5 bg-sky rounded-full" />
          <span className="text-sky text-sm font-semibold tracking-widest uppercase">Services</span>
        </div>

        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="font-display text-4xl md:text-5xl font-black text-ink leading-tight">
            What I <span className="text-sky">Offer</span>
          </h2>
          <p className="text-ink/60 mt-3 text-lg max-w-xl">
            Comprehensive design services tailored to make your brand shine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  delay,
}: {
  service: (typeof services)[0];
  delay: number;
}) {
  const { ref, isVisible } = useScrollAnimation();
  const Icon = service.icon;

  const colorMap: Record<string, { bg: string; text: string; ring: string; dot: string }> = {
    sky: { bg: 'bg-sky/10', text: 'text-sky', ring: 'hover:ring-sky/30', dot: 'bg-sky' },
    coral: { bg: 'bg-coral/10', text: 'text-coral', ring: 'hover:ring-coral/30', dot: 'bg-coral' },
    violet: { bg: 'bg-violet-100', text: 'text-violet-600', ring: 'hover:ring-violet-200', dot: 'bg-violet-500' },
  };

  const c = colorMap[service.color];

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`group bg-white rounded-3xl p-8 border border-ink/8 hover:ring-2 ${c.ring} hover:shadow-lg transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-7 h-7 ${c.text}`} />
      </div>
      <h3 className="font-display font-bold text-ink text-xl mb-3">{service.title}</h3>
      <p className="text-ink/60 text-sm leading-relaxed mb-6">{service.description}</p>
      <ul className="space-y-2">
        {service.features.map((feat) => (
          <li key={feat} className="flex items-center gap-2 text-sm text-ink/70">
            <span className={`w-1.5 h-1.5 rounded-full ${c.dot} flex-shrink-0`} />
            {feat}
          </li>
        ))}
      </ul>
    </div>
  );
}
