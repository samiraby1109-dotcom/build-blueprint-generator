'use client';

import Image from 'next/image';

interface LandingPageProps {
  onStartQuiz: () => void;
}

export function LandingPage({ onStartQuiz }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-slate-100" role="navigation" aria-label="Main navigation">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full bg-[#4ECDC4] flex items-center justify-center text-xs font-bold text-white"
              aria-hidden="true"
            >
              TFF
            </div>
            <span className="font-semibold text-slate-800 text-sm sm:text-base">The Funnel Flippers</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            {/* Left: Copy */}
            <div className="lg:col-span-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-slate-900 leading-tight mb-6">
                The HighLevel Build Blueprint Generator
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
                Find out what&apos;s possible when you stop settling for templates and start building systems that actually work for YOUR business
              </p>

              {/* CTA — visible on mobile before the body copy */}
              <div className="mb-10 sm:hidden">
                <button
                  onClick={onStartQuiz}
                  className="w-full py-4 px-8 rounded-xl text-lg font-semibold bg-[#4ECDC4] text-white hover:bg-[#3DBDB5] transition-all duration-200 shadow-lg shadow-[#4ECDC4]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4ECDC4] focus-visible:ring-offset-2"
                  aria-label="Start your build blueprint"
                >
                  Start Your Blueprint
                </button>
              </div>
            </div>

            {/* Right: Photo */}
            <div className="lg:col-span-2 hidden lg:block">
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-[#4ECDC4]/10 border border-slate-100">
                  <Image
                    src="/sami-kylee.jpg"
                    alt="Sami and Kylee, the HighLevel build experts behind The Funnel Flippers"
                    width={600}
                    height={500}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-2.5">
                  <p className="text-sm font-semibold text-slate-800">Kylee + Sami</p>
                  <p className="text-xs text-[#4ECDC4] font-medium">HighLevel Build Experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Body Copy Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
        <div className="max-w-3xl">
          <div className="space-y-6 text-base sm:text-lg text-slate-700 leading-relaxed">
            <p className="text-lg sm:text-xl font-medium text-slate-800">
              Most people are using about 10% of what HighLevel can actually do.
            </p>

            <p>
              Not because they&apos;re lazy. Not because they&apos;re not smart enough.
            </p>

            <p>
              But because nobody&apos;s shown them what&apos;s actually possible.
            </p>

            <p>
              We&apos;ve built systems that other HighLevel &quot;experts&quot; said were impossible.
              We&apos;ve automated workflows that people thought required 3 different platforms.
              We&apos;ve created client experiences so seamless that people assume our clients
              have massive tech teams.
            </p>

            <p>And we&apos;ve done it all inside HighLevel.</p>

            <p>
              This Build Blueprint Generator will show you exactly what we could build for
              YOUR specific business&mdash;whether you&apos;re:
            </p>

            <ul className="space-y-3 pl-1" role="list">
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 rounded-full bg-[#4ECDC4] mt-2.5 flex-shrink-0" aria-hidden="true" />
                <span>A coach/course creator who wants everything automated</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 rounded-full bg-[#4ECDC4] mt-2.5 flex-shrink-0" aria-hidden="true" />
                <span>An agency that needs white-label backend support for clients</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 rounded-full bg-[#4ECDC4] mt-2.5 flex-shrink-0" aria-hidden="true" />
                <span>A service business drowning in manual processes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 rounded-full bg-[#4ECDC4] mt-2.5 flex-shrink-0" aria-hidden="true" />
                <span>Someone who wants to SELL custom HighLevel systems</span>
              </li>
            </ul>

            <p>
              Answer 8 questions. We&apos;ll show you 3 custom systems we&apos;d build for
              you, what they&apos;d replace, and how much time they&apos;d save you.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile Photo — shown below body copy on smaller screens */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-10 lg:hidden">
        <div className="max-w-sm mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-xl shadow-[#4ECDC4]/10 border border-slate-100">
            <Image
              src="/sami-kylee.jpg"
              alt="Sami and Kylee, the HighLevel build experts behind The Funnel Flippers"
              width={600}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          <div className="text-center mt-4">
            <p className="text-sm font-semibold text-slate-800">Kylee + Sami</p>
            <p className="text-xs text-[#4ECDC4] font-medium">HighLevel Build Experts</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24" aria-labelledby="cta-heading">
        <div className="max-w-3xl">
          <h2 id="cta-heading" className="sr-only">Start your blueprint</h2>
          <button
            onClick={onStartQuiz}
            className="hidden sm:inline-flex items-center gap-3 px-10 py-4 rounded-xl text-lg font-semibold bg-[#4ECDC4] text-white hover:bg-[#3DBDB5] transition-all duration-200 shadow-lg shadow-[#4ECDC4]/25 hover:shadow-xl hover:shadow-[#4ECDC4]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4ECDC4] focus-visible:ring-offset-2"
            aria-label="Start your build blueprint"
          >
            Start Your Blueprint
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
          {/* Mobile: full-width sticky CTA at bottom */}
          <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-slate-100 z-40">
            <button
              onClick={onStartQuiz}
              className="w-full py-4 px-8 rounded-xl text-lg font-semibold bg-[#4ECDC4] text-white hover:bg-[#3DBDB5] transition-all duration-200 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4ECDC4] focus-visible:ring-offset-2"
              aria-label="Start your build blueprint"
            >
              Start Your Blueprint
            </button>
          </div>
        </div>
      </section>

      {/* Subtle credibility strip */}
      <section className="border-t border-slate-100 bg-slate-50" aria-labelledby="credibility-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <h2 id="credibility-heading" className="sr-only">Our track record</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-slate-800">Hundreds</p>
              <p className="text-sm text-slate-500 mt-1">of HighLevel builds delivered</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-slate-800">10&ndash;20 hrs</p>
              <p className="text-sm text-slate-500 mt-1">saved per week on average</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-slate-800">2 min</p>
              <p className="text-sm text-slate-500 mt-1">to get your custom blueprint</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} The Funnel Flippers. Kylee + Sami | HighLevel Build Experts.
          </p>
        </div>
      </footer>

      {/* Bottom padding on mobile for sticky CTA */}
      <div className="h-20 sm:hidden" aria-hidden="true" />
    </div>
  );
}
