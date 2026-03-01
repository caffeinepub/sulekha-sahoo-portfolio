import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation();

  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
    toast.success('Message sent! Sulekha will get back to you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-0.5 bg-sky rounded-full" />
          <span className="text-sky text-sm font-semibold tracking-widest uppercase">Contact</span>
        </div>

        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="font-display text-4xl md:text-5xl font-black text-ink leading-tight">
            Let's <span className="text-sky">Work Together</span>
          </h2>
          <p className="text-ink/60 mt-3 text-lg max-w-xl">
            Have a project in mind? I'd love to hear about it. Send me a message!
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div
            ref={infoRef as React.RefObject<HTMLDivElement>}
            className={`md:col-span-2 transition-all duration-700 ${
              infoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="space-y-6">
              <ContactInfoItem
                icon={Mail}
                label="Email"
                value="sulekhasaho09865@gmail.com"
                href="mailto:sulekhasaho09865@gmail.com"
              />
              <ContactInfoItem
                icon={Phone}
                label="Phone"
                value="+91 XXXXX XXXXX"
                href="tel:+91XXXXXXXXXX"
              />
              <ContactInfoItem
                icon={MapPin}
                label="Location"
                value="Pasarbindha, Balasore, Odisha"
              />
            </div>

            {/* Availability badge */}
            <div className="mt-10 p-5 rounded-2xl bg-sky/5 border border-sky/15">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-semibold text-ink">Available for Work</span>
              </div>
              <p className="text-sm text-ink/60">
                Currently accepting new projects. Let's create something amazing together!
              </p>
            </div>
          </div>

          {/* Form */}
          <div
            ref={formRef as React.RefObject<HTMLDivElement>}
            className={`md:col-span-3 transition-all duration-700 delay-200 ${
              formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 bg-white rounded-3xl border border-sky/15">
                <CheckCircle className="w-16 h-16 text-sky mb-4" />
                <h3 className="font-display font-bold text-2xl text-ink mb-2">Message Sent!</h3>
                <p className="text-ink/60 mb-6">Thank you for reaching out. I'll get back to you soon.</p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}
                  className="px-6 py-2.5 rounded-full bg-sky text-white font-semibold text-sm hover:bg-sky-dark transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-ink/8 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1.5">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-ink placeholder:text-ink/30 bg-surface focus:outline-none focus:ring-2 focus:ring-sky/30 focus:border-sky transition-all ${
                      errors.name ? 'border-red-400' : 'border-ink/15'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-ink mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-ink placeholder:text-ink/30 bg-surface focus:outline-none focus:ring-2 focus:ring-sky/30 focus:border-sky transition-all ${
                      errors.email ? 'border-red-400' : 'border-ink/15'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-ink mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell me about your project..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-ink placeholder:text-ink/30 bg-surface focus:outline-none focus:ring-2 focus:ring-sky/30 focus:border-sky transition-all resize-none ${
                      errors.message ? 'border-red-400' : 'border-ink/15'
                    }`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-sky text-white font-bold text-sm hover:bg-sky-dark transition-all duration-200 shadow-sky-sm hover:shadow-sky-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactInfoItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-ink/8 hover:border-sky/30 hover:shadow-xs transition-all duration-200">
      <div className="w-10 h-10 rounded-xl bg-sky/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-sky" />
      </div>
      <div>
        <p className="text-xs font-semibold text-ink/40 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-sm font-medium text-ink">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }
  return content;
}
