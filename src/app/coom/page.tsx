"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CoomPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      // Clouds start scaled up and pinned to their outer edges,
      // so they reach the center without their straight edges becoming visible (terpotong).
      tl.fromTo(".cloud-lt", 
          { scale: 2.5, transformOrigin: "left top" },
          { scale: 1, duration: 2.5 }, 
          0.5
        )
        .fromTo(".cloud-lb", 
          { scale: 2.5, transformOrigin: "left center" },
          { scale: 1, duration: 2.5 }, 
          0.5
        )
        .fromTo(".cloud-rt", 
          { scale: 2.5, transformOrigin: "right top" },
          { scale: 1, duration: 2.5 }, 
          0.5
        )
        .fromTo(".cloud-rb", 
          { scale: 2.5, transformOrigin: "right center" },
          { scale: 1, duration: 2.5 }, 
          0.5
        )
        
        // Reveal main content underneath
        .fromTo(".main-content", 
          { scale: 0.8, opacity: 0 }, 
          { scale: 1, opacity: 1, duration: 2 }, 
          1.5
        );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden select-none bg-black flex items-center justify-center"
    >
      {/* ── Fixed Background ── */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url("/Background.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}
      />

      {/* ── Content Revealed ── */}
      <div className="main-content relative z-10 text-center flex flex-col items-center justify-center">
        {/* Kampung Budaya Title */}
        <div className="w-[280px] md:w-[400px] lg:w-[500px] mb-8 drop-shadow-2xl">
          <img src="/Kampung_Budaya.svg" className="w-full h-auto object-contain" alt="Kampung Budaya" />
        </div>
      </div>

      {/* ── Clouds (Resting at top left & right) ── */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <img 
          src="/Group-3.svg" 
          className="cloud-lt absolute object-contain" 
          style={{ width: '25%', minWidth: '150px', left: '-5%', top: '-5%' }} 
          alt="Awan Kiri Atas" 
        />
        <img 
          src="/Group.svg" 
          className="cloud-lb absolute object-contain" 
          style={{ width: '20%', minWidth: '120px', left: '10%', top: '15%' }} 
          alt="Awan Kiri Tengah" 
        />
        
        <img 
          src="/Group-1.svg" 
          className="cloud-rt absolute object-contain" 
          style={{ width: '25%', minWidth: '150px', right: '0%', top: '2%' }} 
          alt="Awan Kanan Atas" 
        />
        <img 
          src="/Group-2.svg" 
          className="cloud-rb absolute object-contain" 
          style={{ width: '20%', minWidth: '120px', right: '-2%', top: '18%' }} 
          alt="Awan Kanan Tengah" 
        />
      </div>
    </main>
  );
}
