"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const statItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const carRef = useRef<HTMLDivElement>(null);

  const headlineText = ["W E L C O M E", "I T Z", "F I Z Z"];

  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    // 1. Initial Load Animation - Reveal Words
    tl.fromTo(
      headlineWordsRef.current,
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.2, ease: "power4.out", delay: 0.2 }
    );

    // 2. Initial Load Animation - Stats Appear
    tl.fromTo(
      statItemsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.6"
    );

    // 3. Initial Load Animation - Car slides up
    tl.fromTo(
      carRef.current,
      { opacity: 0, y: 150, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" },
      "-=0.8"
    );

    // 4. Scroll-based Animation setup
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Scroll duration proportional to viewport height
          scrub: 1.5,    // Smooth scrubbing effect
          pin: true,     // Pin the hero section during the scroll
        },
      });

      // Animate the text disappearing while scrolling
      scrollTl.to(headlineWordsRef.current, {
        y: -150,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
      }, 0);

      // Animate the stats fading out
      scrollTl.to(statsRef.current, {
        opacity: 0,
        y: -100,
        scale: 0.9,
        duration: 0.8,
      }, 0);

      // Complex transform for the main visual element based on scroll pos
      scrollTl.to(carRef.current, {
        scale: 1.8,             // Zoom in significantly
        x: "-15vw",             // Move horizontally
        y: "5vh",               // Move vertically
        rotation: -4,           // Slight tilt for dynamic feel
        duration: 3,            // Length relative to scroll scrub
        ease: "power1.inOut",   // Smooth interpolation
      }, 0);

    }, containerRef); // Scope context to container

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main className="relative bg-[#050505] text-white min-h-[300vh] overflow-hidden selection:bg-white/20 font-sans">
      {/* ScrollTrigger Pinned Area */}
      <div
        ref={containerRef}
        className="relative h-screen w-full flex flex-col items-center justify-center pt-8 px-4"
      >
        {/* Glow Effects */}
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

        <div className="z-10 text-center flex flex-col items-center justify-center">
          {/* Animated Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[0.5em] md:tracking-[0.8em] mb-12 uppercase flex flex-col md:flex-row gap-4 md:gap-8 ml-[0.5em] md:ml-[0.8em] text-white/95 drop-shadow-xl">
            {headlineText.map((word, index) => (
              <span
                key={index}
                ref={(el) => { headlineWordsRef.current[index] = el; }}
                className="inline-block opacity-0 will-change-transform"
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Animated Stats */}
          <div ref={statsRef} className="flex gap-16 md:gap-32 mt-4 z-20">
            {[
              { value: "95%", label: "Efficiency", color: "text-blue-400" },
              { value: "0.2s", label: "Response", color: "text-purple-400" },
              { value: "120+", label: "Features", color: "text-teal-400" }
            ].map((stat, i) => (
              <div
                key={stat.label}
                ref={(el) => { statItemsRef.current[i] = el; }}
                className="flex flex-col items-center opacity-0 will-change-transform"
              >
                <span className={`text-5xl md:text-6xl font-light ${stat.color} drop-shadow-md`}>
                  {stat.value}
                </span>
                <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mt-4 text-zinc-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Car Image */}
        <div
          ref={carRef}
          className="absolute bottom-[-5%] md:bottom-[-10%] w-[90%] md:w-[70%] max-w-6xl z-30 opacity-0 will-change-transform drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <Image
            src="/Scroll_Animation/car.jpg"
            alt="Premium Sports Car"
            width={1600}
            height={1000}
            priority
            className="w-full h-auto object-contain pointer-events-none rounded-sm"
            style={{
              maskImage: "linear-gradient(to top, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage: "linear-gradient(to top, transparent, black 10%, black 90%, transparent)"
            }}
          />
        </div>
      </div>

      {/* Subsequent Scrollable Content Layer */}
      <div className="h-screen w-full flex items-center justify-center bg-[#0a0a0a] border-t border-zinc-900 z-40 relative px-6 shadow-[0_-20px_60px_rgba(0,0,0,0.9)]">
        <div className="max-w-4xl text-center">
          <h2 className="text-4xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-8 tracking-wider">
            Precision In Motion
          </h2>
          <p className="text-zinc-400 leading-relaxed text-lg md:text-2xl font-light max-w-3xl mx-auto">
            By tying transformations directly to scroll progress rather than time,
            we create interactions that feel completely natural. The motion conforms exactly to the user's velocity.
          </p>
        </div>
      </div>

      <div className="h-[50vh] w-full bg-[#050505] flex items-center justify-center">
        <p className="text-zinc-600 text-sm tracking-widest uppercase font-semibold">End of scroll demonstration</p>
      </div>
    </main>
  );
}
