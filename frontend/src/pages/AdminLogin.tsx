import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Palette, Shield, LogIn, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLogin() {
  const { login, clear, loginStatus, identity, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isInitializing) {
      navigate({ to: '/admin/dashboard' });
    }
  }, [isAuthenticated, isInitializing, navigate]);

  const handleLogin = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: unknown) {
        const err = error as Error;
        if (err?.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-sky" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-sky/8 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-coral/8 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-sky flex items-center justify-center shadow-sky-sm">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-ink tracking-tight">
              Sulekha<span className="text-sky">.</span>
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sky-sm border border-ink/8 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-sky/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-sky" />
            </div>
            <h1 className="font-display text-2xl font-black text-ink mb-2">Admin Panel</h1>
            <p className="text-ink/60 text-sm leading-relaxed">
              Sign in securely to manage your portfolio, upload new work, and update your content.
            </p>
          </div>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full h-12 bg-sky hover:bg-sky-dark text-white font-semibold rounded-xl shadow-sky-sm transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Login with Internet Identity
              </>
            )}
          </Button>

          {/* Info */}
          <div className="mt-6 p-4 rounded-xl bg-surface border border-ink/8">
            <p className="text-xs text-ink/50 text-center leading-relaxed">
              🔐 Internet Identity uses your device's passkey, Face ID, or fingerprint — no password needed. Only the registered admin can access this panel.
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-ink/50 hover:text-sky transition-colors duration-200"
          >
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
