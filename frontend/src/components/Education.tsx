import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { GraduationCap, Award } from 'lucide-react';

const timeline = [
  {
    year: '2010',
    title: 'High School (BSE)',
    institution: 'Nimatpur Girls High School',
    description: 'Completed secondary education with a focus on arts and sciences.',
    icon: GraduationCap,
    type: 'school',
  },
  {
    year: '2012',
    title: 'Higher Secondary (CHSE)',
    institution: 'CHSE Board',
    description: 'Completed +2 higher secondary education, building a strong academic foundation.',
    icon: GraduationCap,
    type: 'school',
  },
  {
    year: '2015',
    title: '+3 Degree',
    institution: 'Degree College',
    description: 'Earned a Bachelor\'s degree, developing analytical and creative thinking skills.',
    icon: GraduationCap,
    type: 'degree',
  },
  {
    year: '2016',
    title: 'PGDCA & Multimedia',
    institution: 'Mayuri Multimedia',
    description: 'Specialized training in graphic design, multimedia production, and digital tools.',
    icon: Award,
    type: 'certification',
  },
];

export default function Education() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="education" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-0.5 bg-sky rounded-full" />
          <span className="text-sky text-sm font-semibold tracking-widest uppercase">Education</span>
        </div>

        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="font-display text-4xl md:text-5xl font-black text-ink leading-tight">
            My Academic <span className="text-sky">Journey</span>
          </h2>
          <p className="text-ink/60 mt-3 text-lg max-w-xl">
            A path of continuous learning and creative development.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-sky/20 -translate-x-1/2" />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: (typeof timeline)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation();
  const isEven = index % 2 === 0;
  const Icon = item.icon;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative flex items-start gap-6 md:gap-0 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Content card */}
      <div className={`flex-1 ml-12 md:ml-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
        <div className={`inline-block bg-white border border-sky/15 rounded-2xl p-6 shadow-xs hover:shadow-sky-sm hover:border-sky/30 transition-all duration-300 max-w-sm ${isEven ? 'md:ml-auto' : ''}`}>
          <div className={`flex items-center gap-2 mb-2 ${isEven ? 'md:flex-row-reverse' : ''}`}>
            <span className="px-2.5 py-0.5 rounded-full bg-sky/10 text-sky text-xs font-bold">
              {item.year}
            </span>
            {item.type === 'certification' && (
              <span className="px-2.5 py-0.5 rounded-full bg-coral/10 text-coral text-xs font-bold">
                Certification
              </span>
            )}
          </div>
          <h3 className="font-display font-bold text-ink text-lg mb-1">{item.title}</h3>
          <p className="text-sky font-semibold text-sm mb-2">{item.institution}</p>
          <p className="text-ink/60 text-sm leading-relaxed">{item.description}</p>
        </div>
      </div>

      {/* Center dot */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-sky flex items-center justify-center shadow-sky-sm ring-4 ring-white">
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Empty side for desktop alternating layout */}
      <div className="hidden md:block flex-1" />
    </div>
  );
}
