import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const queryClient = new QueryClient();

// Root layout
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster position="bottom-right" />
    </>
  ),
});

// Home page
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

function HomePage() {
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
    </div>
  );
}

// Admin login page
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminLogin,
});

// Admin dashboard page
const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/dashboard',
  component: AdminDashboard,
});

const routeTree = rootRoute.addChildren([homeRoute, adminLoginRoute, adminDashboardRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
