'use client';

interface LandingPageProps {
  onStartQuiz: () => void;
}

export function LandingPage({ onStartQuiz }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white">
      {/* Nav */}
      <nav className="container mx-auto px-4 py-6" role="navigation" aria-label="Main navigation">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold"
            aria-hidden="true"
          >
            TFF
          </div>
          <span className="font-semibold text-white/90">The Funnel Flippers</span>
        </div>
      </nav>

      {/* Hero */}
      <header className="container mx-auto px-4 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-medium mb-6 border border-indigo-500/30">
            Free personalized blueprint — takes 2 minutes
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Find out what we&apos;d
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              build for your business
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Answer 8 quick questions and get a custom blueprint showing the
            exact HighLevel systems we&apos;d build to automate your business.
            No fluff, no generic advice — just what actually needs to happen.
          </p>

          <button
            onClick={onStartQuiz}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-400 hover:to-purple-400 transition-all duration-200 shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            aria-label="Start the Build Blueprint quiz"
          >
            Get My Build Blueprint
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* What You Get */}
      <section className="container mx-auto px-4 pb-16 md:pb-24" aria-labelledby="what-you-get-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="what-you-get-heading" className="text-center text-sm font-semibold uppercase tracking-widest text-indigo-400 mb-10">
            What you&apos;ll get in your blueprint
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div
                className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4"
                aria-hidden="true"
              >
                <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">3 Custom Systems</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                The exact HighLevel systems we&apos;d build based on your business model, pain points, and goals.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div
                className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4"
                aria-hidden="true"
              >
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Time You&apos;ll Save</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Real estimates of hours saved per week based on systems we&apos;ve built for businesses like yours.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div
                className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4"
                aria-hidden="true"
              >
                <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">AI-Personalized Insights</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Not generic templates. We analyze your answers and tell you exactly what&apos;s broken and how to fix it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-t border-white/10 bg-white/[0.02]" aria-labelledby="social-proof-heading">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="social-proof-heading" className="sr-only">Our track record</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">Hundreds</p>
                <p className="text-sm text-slate-400 mt-1">of HighLevel builds delivered</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">10-20hrs</p>
                <p className="text-sm text-slate-400 mt-1">saved per week on average</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">2 min</p>
                <p className="text-sm text-slate-400 mt-1">to get your custom blueprint</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto px-4 py-16 md:py-20" aria-labelledby="bottom-cta-heading">
        <div className="max-w-2xl mx-auto text-center">
          <h2 id="bottom-cta-heading" className="text-2xl md:text-3xl font-bold mb-4">
            Ready to see what&apos;s possible?
          </h2>
          <p className="text-slate-400 mb-8">
            8 questions. No BS. Just a real look at the systems your business actually needs.
          </p>
          <button
            onClick={onStartQuiz}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-400 hover:to-purple-400 transition-all duration-200 shadow-xl shadow-indigo-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            aria-label="Start the Build Blueprint quiz"
          >
            Start the Quiz
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} The Funnel Flippers. Kylee + Sami | HighLevel Build Experts.
          </p>
        </div>
      </footer>
    </div>
  );
}
