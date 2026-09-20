import React, { useState, useEffect, useRef } from 'react';
import { useTypewriter } from './hooks/useTypewriter';
import { BenefitsSection } from './components/BenefitsSection';

export default function App() {

  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  // State
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [pillsVisible, setPillsVisible] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Typewriter hook
  const { displayed, done } = useTypewriter(
    'Glad you stopped in. Good taste tends to find us. Now, what are we building?',
    38,
    600
  );

  // Trigger pill animation 400ms after page load
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPillsVisible(true);
    }, 400);
    return () => window.clearTimeout(timer);
  }, []);

  // Video scrubbing & mouse tracking: the robot smoothly follows cursor without wiggling
  useEffect(() => {
    const seekToTarget = () => {
      const video = videoRef.current;
      if (!video || !video.duration || Number.isNaN(video.duration)) return;
      if (isSeekingRef.current) return;

      const diff = Math.abs(video.currentTime - targetTimeRef.current);
      // Minimum threshold equal to ~2 video frames (24fps -> ~0.08s) prevents micro-jitter
      if (diff >= 0.08) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const updateTargetFromMouse = (clientX: number) => {
      const video = videoRef.current;
      if (!video || !video.duration || Number.isNaN(video.duration)) return;

      // Filter sub-pixel micro-jitter
      if (prevXRef.current !== null && Math.abs(clientX - prevXRef.current) < 2) {
        return;
      }
      prevXRef.current = clientX;

      const normX = Math.max(0, Math.min(1, clientX / window.innerWidth));
      const effectiveDuration = Math.min(video.duration, 7.5);

      // Left mouse (normX = 0) -> robot looks left (t ~ 7.2s)
      // Right mouse (normX = 1) -> robot looks right (t = 0.05s)
      targetTimeRef.current = Math.max(0.05, Math.min(effectiveDuration, (1 - normX) * effectiveDuration));

      seekToTarget();
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateTargetFromMouse(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      updateTargetFromMouse(e.touches[0].clientX);
    };

    const handleInitialPosition = () => {
      const video = videoRef.current;
      if (video && video.duration && !Number.isNaN(video.duration)) {
        const initialTime = Math.min(video.duration, 7.5) * 0.5;
        targetTimeRef.current = initialTime;
        video.currentTime = initialTime;
      }
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('loadedmetadata', handleInitialPosition);
      if (videoElement.readyState >= 1) {
        handleInitialPosition();
      }
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (videoElement) {
        videoElement.removeEventListener('loadedmetadata', handleInitialPosition);
      }
    };
  }, []);

  const handleSeeked = () => {
    isSeekingRef.current = false;
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) {
      return;
    }

    // Queue next seek only if targetTime has moved significantly
    const diff = Math.abs(video.currentTime - targetTimeRef.current);
    if (diff >= 0.08) {
      isSeekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@mainframe.co');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  const navLinks = [
    { label: 'Labs', href: '#labs' },
    { label: 'Studio', href: '#studio' },
    { label: 'Openings', href: '#openings' },
    { label: 'Shop', href: '#shop' },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden select-none bg-black">
      {/* Background Video (Fixed and stable, zero wiggle, robot on right side) */}
      <video
        ref={videoRef}
        onSeeked={handleSeeked}
        src="https://res.cloudinary.com/hjftuhnr/video/upload/v1789833042/Robot_turning_head_left_20260919235028.mp4"
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 z-0 w-full h-full object-cover [object-position:75%_center] md:[object-position:80%_center] lg:[object-position:85%_center] pointer-events-none"
      />

      {/* Subtle readability gradient overlays */}
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-r from-black/50 via-black/15 to-transparent w-full md:w-2/3"
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-t from-black/70 via-black/20 to-transparent md:hidden"
        aria-hidden="true"
      />

      {/* Navbar (Fixed, z-index: 20) in Glassy Card */}
      <header
        id="navbar"
        className="fixed top-3 sm:top-5 left-0 right-0 z-20 px-4 sm:px-8 flex justify-center pointer-events-none"
      >
        <div
          id="navbar-glass-card"
          className="w-full max-w-[1400px] pointer-events-auto rounded-2xl sm:rounded-full bg-neutral-950/65 backdrop-blur-xl border border-white/[0.12] shadow-[0_12px_36px_rgba(0,0,0,0.55)] px-5 sm:px-8 py-3 sm:py-3.5 flex flex-row justify-between items-center transition-all"
        >
          {/* Logo (left) */}
          <div id="brand-logo" className="flex flex-row items-center gap-2.5 sm:gap-3">
            <span
              className="text-[18px] sm:text-[22px] tracking-tight text-white select-none font-medium leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              Mainframe&reg;
            </span>
            <span
              className="text-[20px] sm:text-[24px] text-white select-none tracking-[-0.02em] leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
              aria-hidden="true"
            >
              ✳︎
            </span>
          </div>

          {/* Desktop Nav Links (center, hidden below md) */}
          <nav
            id="desktop-nav-links"
            className="hidden md:flex flex-row items-center text-[17px] lg:text-[19px] text-white/90 font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            {navLinks.map((item, index) => (
              <React.Fragment key={item.label}>
                <a
                  href={item.href}
                  className="hover:text-white hover:opacity-75 transition-all"
                >
                  {item.label}
                </a>
                {index < navLinks.length - 1 && <span className="mr-1.5 text-white/50">, </span>}
              </React.Fragment>
            ))}
          </nav>

          {/* Desktop CTA (right, hidden below md) */}
          <a
            id="desktop-cta-link"
            href="#contact"
            className="hidden md:inline-block text-[17px] lg:text-[19px] text-white underline underline-offset-2 hover:text-white/80 transition-all drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            Get in touch
          </a>

          {/* Mobile Hamburger (visible below md) */}
          <button
            id="mobile-menu-button"
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 focus:outline-none cursor-pointer"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
          >
            <span
              className={`w-5 h-[2px] bg-white transition-all duration-300 origin-center ${
                isMenuOpen ? 'rotate-45 translate-y-[7px]' : 'rotate-0 translate-y-0'
              }`}
            />
            <span
              className={`w-5 h-[2px] bg-white transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-5 h-[2px] bg-white transition-all duration-300 origin-center ${
                isMenuOpen ? '-rotate-45 -translate-y-[7px]' : 'rotate-0 translate-y-0'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Overlay (z-index: 9) */}
      <div
        id="mobile-nav-overlay"
        className={`fixed inset-0 z-[9] bg-zinc-950/95 backdrop-blur-md flex flex-col justify-center items-start px-8 gap-8 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setIsMenuOpen(false)}
            className="text-[32px] font-medium text-white hover:text-white/70 transition-colors"
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setIsMenuOpen(false)}
          className="text-[32px] font-medium text-white underline underline-offset-2 hover:text-white/70 transition-colors"
        >
          Get in touch
        </a>
      </div>

      {/* Hero Section (z-index: 1) */}
      <main
        id="hero-section"
        className="relative z-[1] min-h-screen h-screen flex flex-col justify-end md:justify-center items-start pb-8 sm:pb-12 md:pb-0 px-4 sm:px-10 md:px-14 lg:px-20 overflow-hidden"
      >
        {/* Content Container in Compact Glassy Card (Matches Reference & leaves robot unblocked) */}
        <div
          id="hero-glass-card"
          className="w-full max-w-[530px] relative z-10 rounded-[24px] sm:rounded-[28px] bg-neutral-950/70 backdrop-blur-xl border border-white/[0.12] shadow-[0_16px_40px_rgba(0,0,0,0.65)] p-5 sm:p-7 md:p-8"
        >
          {/* 1. Blurred Intro Label */}
          <div
            id="hero-blurred-intro"
            className="pointer-events-none select-none mb-4 sm:mb-5 text-zinc-300 font-normal tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            style={{
              fontSize: 'clamp(16px, 3.2vw, 20px)',
              lineHeight: 1.35,
              filter: 'blur(0.4px)',
            }}
          >
            Hey there, meet A.R.I.A,
            <br />
            Mainframe's Adaptive Response Interface Agent
          </div>

          {/* 2. Typewriter Text */}
          <p
            id="hero-typewriter-text"
            className="text-white mb-5 sm:mb-6 font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
            style={{
              fontSize: 'clamp(17px, 3.5vw, 22px)',
              lineHeight: 1.35,
              minHeight: '52px',
            }}
          >
            {displayed}
            {!done && (
              <span
                aria-hidden="true"
                className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink"
              />
            )}
          </p>

          {/* 3. Action Pill Buttons */}
          <div
            id="hero-action-pills"
            className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-2.5"
            style={{
              opacity: pillsVisible ? 1 : 0,
              transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            <button
              id="pill-pitch"
              type="button"
              className="inline-flex items-center justify-center bg-white text-black font-normal border border-black/10 rounded-full text-[13px] sm:text-[14px] px-4 py-2 sm:py-1.5 whitespace-nowrap cursor-pointer hover:bg-zinc-200 transition-colors duration-200 shadow-sm"
            >
              Pitch us an idea
            </button>
            <button
              id="pill-work"
              type="button"
              className="inline-flex items-center justify-center bg-white text-black font-normal border border-black/10 rounded-full text-[13px] sm:text-[14px] px-4 py-2 sm:py-1.5 whitespace-nowrap cursor-pointer hover:bg-zinc-200 transition-colors duration-200 shadow-sm"
            >
              Come work here
            </button>
            <button
              id="pill-hello"
              type="button"
              className="inline-flex items-center justify-center bg-white text-black font-normal border border-black/10 rounded-full text-[13px] sm:text-[14px] px-4 py-2 sm:py-1.5 whitespace-nowrap cursor-pointer hover:bg-zinc-200 transition-colors duration-200 shadow-sm"
            >
              Send a brief hello
            </button>
            <button
              id="pill-operate"
              type="button"
              className="inline-flex items-center justify-center bg-white text-black font-normal border border-black/10 rounded-full text-[13px] sm:text-[14px] px-4 py-2 sm:py-1.5 whitespace-nowrap cursor-pointer hover:bg-zinc-200 transition-colors duration-200 shadow-sm"
            >
              See how we operate
            </button>

            {/* Contact pill button */}
            <button
              id="pill-contact"
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center bg-white text-black font-normal border border-black/10 rounded-full text-[13px] sm:text-[14px] px-4 py-2 sm:py-1.5 whitespace-nowrap gap-2 cursor-pointer hover:bg-zinc-200 transition-colors duration-200 shadow-sm"
              title="Click to copy email address"
            >
              <span>
                Reach us:{' '}
                <span className="underline underline-offset-1">
                  hello@mainframe.co
                </span>
              </span>
              {copied ? (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block flex-shrink-0"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 6.5L4.5 8.5L9.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block flex-shrink-0"
                  aria-hidden="true"
                >
                  <rect
                    x="3.5"
                    y="1"
                    width="7"
                    height="8"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <path
                    d="M2 3.5H1.5C1.22 3.5 1 4V10.5C1 10.78 1.22 11 1.5 11H7.5C7.78 11 8 10.78 8 10.5V10"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Section 2: Key Benefits Section */}
      <BenefitsSection />
    </div>
  );
}
