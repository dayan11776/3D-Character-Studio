import React from 'react';

export function BenefitsSection() {
  return (
    <section
      id="benefits-section"
      className="relative w-full bg-transparent px-4 sm:px-6 md:px-10 py-12 sm:py-20 flex justify-center"
    >
      {/* Wrapper max-w-[1400px] */}
      <div className="w-full max-w-[1400px]">
        {/* Section Heading */}
        <h2
          id="benefits-heading"
          className="text-white text-3xl sm:text-4xl md:text-5xl font-light text-center mb-12 sm:mb-24"
          style={{ letterSpacing: '-0.04em' }}
        >
          Key Benefits
        </h2>

        {/* Three-Column Card Grid */}
        <div
          id="benefits-card-grid"
          className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4"
        >
          {/* Card 1: Text Card (Left) */}
          <div
            id="benefits-card-1"
            className="relative h-[380px] sm:h-[460px] rounded-2xl bg-neutral-950/50 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] overflow-hidden p-6 sm:p-8"
          >
            {/* Blue Blob */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -left-[420px] h-[460px] w-[460px] rounded-full bg-[#1e3a8a] blur-3xl opacity-40 pointer-events-none"
              aria-hidden="true"
            />

            {/* Content wrapper */}
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-white text-xl sm:text-2xl font-light leading-tight">
                Preemptive Risks
                <br />
                Scouting and Reactions
              </h3>

              <p className="mt-12 sm:mt-20 text-[13px] sm:text-[14px] leading-relaxed text-white/70 font-light max-w-[280px]">
                Defense platforms constantly observe bandwidth streams, record files, and
                machine behaviors to uncover unusual patterns or outliers that could signal a
                defensive failure.
              </p>
            </div>
          </div>

          {/* Card 2: Video Card (Center) */}
          <div
            id="benefits-card-2"
            className="relative h-[380px] sm:h-[460px] rounded-2xl bg-neutral-950/50 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] overflow-hidden flex flex-col"
          >
            {/* Top video region */}
            <div
              className="relative w-full overflow-hidden"
              style={{ height: '75%' }}
            >
              <video
                id="benefits-card-2-video"
                autoPlay
                loop
                muted
                playsInline
                src="https://res.cloudinary.com/hjftuhnr/video/upload/v1789872390/Futuristic_digital_globe_rotating_20260920104525.mp4"
                className="w-full h-full object-cover block"
              />

              {/* Bottom fade overlay inside video wrapper */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-neutral-950/90"
                aria-hidden="true"
              />
            </div>

            {/* Bottom text region */}
            <div className="flex-1 flex items-center justify-start p-6 sm:p-8">
              <h3 className="text-white text-xl sm:text-2xl font-light leading-tight text-left">
                Know-how and Sectoral
                <br />
                Awareness
              </h3>
            </div>
          </div>

          {/* Card 3: Text Card (Right) */}
          <div
            id="benefits-card-3"
            className="relative h-[380px] sm:h-[460px] rounded-2xl bg-neutral-950/50 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] overflow-hidden p-6 sm:p-8"
          >
            {/* Blue Blob */}
            <div
              className="absolute -top-28 -right-28 h-56 w-56 rounded-full bg-[#1e3a8a] blur-3xl opacity-40 pointer-events-none"
              aria-hidden="true"
            />

            {/* Content wrapper */}
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-white text-xl sm:text-2xl font-light leading-tight">
                Preemptive Risks
                <br />
                Scouting and Reactions
              </h3>

              <p className="mt-auto text-[13px] sm:text-[14px] leading-relaxed text-white/70 font-light max-w-[320px]">
                Defense platforms constantly observe bandwidth streams, record files, and
                machine behaviors to uncover unusual patterns or outliers that could signal a
                defensive failure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
