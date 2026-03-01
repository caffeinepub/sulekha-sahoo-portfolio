import { useScrollAnimation } from '../hooks/useScrollAnimation';

const skills = [
  {
    name: 'Adobe Photoshop',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect width="48" height="48" rx="10" fill="#001E36"/>
        <path d="M14 32V16h5.5c1.4 0 2.5.3 3.3.9.8.6 1.2 1.5 1.2 2.7 0 .7-.2 1.3-.5 1.8-.3.5-.8.9-1.4 1.1.7.2 1.3.6 1.7 1.2.4.6.6 1.3.6 2.1 0 1.3-.4 2.3-1.3 3-.9.7-2.1 1.1-3.6 1.1H14zm2.8-9.3h2.5c.8 0 1.4-.2 1.8-.5.4-.3.6-.8.6-1.5 0-.7-.2-1.2-.6-1.5-.4-.3-1-.5-1.9-.5h-2.4v4zm0 7h2.8c.9 0 1.6-.2 2-.6.5-.4.7-1 .7-1.7 0-.8-.2-1.3-.7-1.7-.5-.4-1.1-.6-2-.6h-2.8v4.6zM28 32V16h5.2c1.8 0 3.2.5 4.2 1.5 1 1 1.5 2.4 1.5 4.2v4.6c0 1.8-.5 3.2-1.5 4.2-1 1-2.4 1.5-4.2 1.5H28zm2.8-2.3h2.4c1 0 1.8-.3 2.3-.9.5-.6.8-1.5.8-2.7v-4.6c0-1.2-.3-2.1-.8-2.7-.5-.6-1.3-.9-2.3-.9h-2.4v11.8z" fill="#31A8FF"/>
      </svg>
    ),
    color: 'bg-blue-50',
    border: 'border-blue-100',
    level: 90,
  },
  {
    name: 'Adobe Illustrator',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect width="48" height="48" rx="10" fill="#330000"/>
        <path d="M20.5 27.5h-6l-1.2 3.5H10l5.8-16h3.6l5.8 16h-3.5l-1.2-3.5zm-5.1-2.5h4.2l-2.1-6.2-2.1 6.2zM30 31V15h3v16h-3z" fill="#FF9A00"/>
      </svg>
    ),
    color: 'bg-orange-50',
    border: 'border-orange-100',
    level: 85,
  },
  {
    name: 'CorelDRAW',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect width="48" height="48" rx="10" fill="#006B38"/>
        <circle cx="24" cy="24" r="10" stroke="#00B140" strokeWidth="2.5" fill="none"/>
        <circle cx="24" cy="24" r="5" fill="#00B140"/>
        <path d="M24 10v4M24 34v4M10 24h4M34 24h4" stroke="#00B140" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: 'bg-green-50',
    border: 'border-green-100',
    level: 80,
  },
  {
    name: 'Adobe InDesign',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect width="48" height="48" rx="10" fill="#49021F"/>
        <path d="M15 31V15h3v16h-3zM20 31V15h5.5c2 0 3.5.6 4.6 1.7 1.1 1.1 1.7 2.7 1.7 4.7v3.2c0 2-.6 3.6-1.7 4.7-1.1 1.1-2.6 1.7-4.6 1.7H20zm3-2.5h2.5c1.1 0 2-.3 2.6-1 .6-.7.9-1.7.9-3v-3.2c0-1.3-.3-2.3-.9-3-.6-.7-1.5-1-2.6-1H23v11.2z" fill="#FF3366"/>
      </svg>
    ),
    color: 'bg-pink-50',
    border: 'border-pink-100',
    level: 75,
  },
];

export default function Skills() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="skills" className="py-24 md:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-0.5 bg-sky rounded-full" />
          <span className="text-sky text-sm font-semibold tracking-widest uppercase">Skills</span>
        </div>

        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="font-display text-4xl md:text-5xl font-black text-ink leading-tight">
            Tools I <span className="text-sky">Master</span>
          </h2>
          <p className="text-ink/60 mt-3 text-lg max-w-xl">
            Proficient in industry-leading design software to bring any creative vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  skill,
  delay,
}: {
  skill: (typeof skills)[0];
  delay: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`group p-6 rounded-2xl bg-white border ${skill.border} hover:border-sky/40 hover:shadow-sky-sm transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`w-16 h-16 rounded-xl ${skill.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        {skill.icon}
      </div>
      <h3 className="font-display font-bold text-ink text-base mb-3">{skill.name}</h3>
      {/* Progress bar */}
      <div className="h-1.5 bg-ink/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-sky rounded-full transition-all duration-1000"
          style={{ width: isVisible ? `${skill.level}%` : '0%', transitionDelay: `${delay + 300}ms` }}
        />
      </div>
      <p className="text-xs text-ink/40 mt-1.5 text-right font-medium">{skill.level}%</p>
    </div>
  );
}
