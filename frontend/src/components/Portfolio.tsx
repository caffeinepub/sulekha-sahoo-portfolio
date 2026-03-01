import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { usePortfolioItems } from '../hooks/usePortfolioItems';
import { ExternalLink, ImageOff } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type Category = 'All' | 'Branding' | 'Social Media' | 'Print Media';
const categories: Category[] = ['All', 'Branding', 'Social Media', 'Print Media'];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { data: items, isLoading } = usePortfolioItems();

  const filtered =
    activeCategory === 'All'
      ? (items ?? [])
      : (items ?? []).filter((item) => item.category === activeCategory);

  return (
    <section id="work" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-0.5 bg-sky rounded-full" />
          <span className="text-sky text-sm font-semibold tracking-widest uppercase">Portfolio</span>
        </div>

        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`mb-10 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="font-display text-4xl md:text-5xl font-black text-ink leading-tight">
            My <span className="text-sky">Work</span>
          </h2>
          <p className="text-ink/60 mt-3 text-lg max-w-xl">
            A curated selection of logos, posters, and social media designs.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-sky text-white shadow-sky-sm'
                  : 'bg-surface text-ink/60 hover:text-sky hover:bg-sky/10 border border-ink/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="break-inside-avoid rounded-2xl min-h-[300px] w-full" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-sky/10 flex items-center justify-center mb-4">
              <ImageOff className="w-8 h-8 text-sky/50" />
            </div>
            <p className="font-semibold text-ink/50 text-lg">
              {activeCategory === 'All'
                ? 'No work uploaded yet — check back soon!'
                : `No ${activeCategory} items yet.`}
            </p>
            <p className="text-ink/35 text-sm mt-2">
              Sulekha will be adding her designs here shortly.
            </p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && filtered.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filtered.map((item, i) => (
              <PortfolioItem
                key={item.id}
                title={item.title}
                category={item.category}
                imageUrl={item.imageData.getDirectURL()}
                delay={i * 80}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PortfolioItem({
  title,
  category,
  imageUrl,
  delay,
}: {
  title: string;
  category: string;
  imageUrl: string;
  delay: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`break-inside-avoid group relative overflow-hidden rounded-2xl bg-surface border border-ink/8 hover:border-sky/30 hover:shadow-sky-sm transition-all duration-500 min-h-[300px] ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="min-h-[300px] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/50 transition-all duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
          <ExternalLink className="w-8 h-8 text-white mx-auto mb-2" />
          <p className="text-white font-bold text-sm">{title}</p>
        </div>
      </div>
      {/* Category badge */}
      <div className="absolute top-3 left-3">
        <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-ink text-xs font-semibold shadow-xs">
          {category}
        </span>
      </div>
    </div>
  );
}
