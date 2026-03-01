import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  return (
    <div className="min-h-screen bg-surface font-sans">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}
