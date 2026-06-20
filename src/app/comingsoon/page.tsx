"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ComingSoonPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // The initial "Coom" timeline that slides up
      const addCoomTimeline = (tl: gsap.core.Timeline) => {
        // Clouds open (0 to 2.5s)
        tl.fromTo(".cloud-lt", 
            { scale: 2.5, transformOrigin: "left top" },
            { scale: 1, duration: 2.5 }, 
            0
          )
          .fromTo(".cloud-lb", 
            { scale: 2.5, transformOrigin: "left center" },
            { scale: 1, duration: 2.5 }, 
            0
          )
          .fromTo(".cloud-rt", 
            { scale: 2.5, transformOrigin: "right top" },
            { scale: 1, duration: 2.5 }, 
            0
          )
          .fromTo(".cloud-rb", 
            { scale: 2.5, transformOrigin: "right center" },
            { scale: 1, duration: 2.5 }, 
            0
          )
          // Title reveals slightly after clouds start moving (1s to 3s)
          .fromTo(".title-content", 
            { scale: 0.8, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 2 }, 
            1
          )
          // Entire Coom section slides up to reveal Slicing underneath (3s to 4.5s)
          .to(".coom-section", 
            { y: "-100vh", duration: 1.5, ease: "power2.inOut" },
            3
          );
      };

      // --- DESKTOP ANIMATIONS (Width >= 1024px) ---
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" }
        });

        addCoomTimeline(tl);

        // --- Slicing Timeline ---
        const startOffset = 4.5; // Start slicing animation exactly after the slide finishes

        // Camera Dolly-In
        tl.to(".camera-container", {
          z: 1000,
          y: 50,
          duration: 6,
          ease: "power2.inOut"
        }, startOffset);

        // Frame Left Sequence
        tl.fromTo(".frame-left", 
          { opacity: 0, x: -300 },
          { opacity: 1, x: 0, duration: 0.75, ease: "power2.out" },
          startOffset + 0.25
        );
        tl.to(".frame-left", 
          { opacity: 0, duration: 2, ease: "power2.inOut" },
          startOffset + 7
        );

        // Frame Right Sequence
        tl.fromTo(".frame-right",
          { opacity: 0, x: 300 },
          { opacity: 1, x: 0, duration: 0.75, ease: "power2.out" },
          startOffset + 1
        );
        tl.to(".frame-right",
          { opacity: 0, duration: 2, ease: "power2.inOut" },
          startOffset + 7
        );

        // Doors Rotation Open
        tl.fromTo(".door-left-desktop",
          { rotationY: 0 },
          { rotationY: 45, duration: 2.5, ease: "power2.inOut" },
          startOffset + 2.5
        );
        tl.fromTo(".door-right-desktop",
          { rotationY: 0 },
          { rotationY: -45, duration: 2.5, ease: "power2.inOut" },
          startOffset + 2.5
        );
      });

      // --- TABLET ANIMATIONS (768px <= Width < 1024px) ---
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" }
        });

        addCoomTimeline(tl);

        const startOffset = 4.5;

        // Camera Dolly-In
        tl.to(".camera-container", {
          z: 1100,
          y: 25,
          duration: 13,
          ease: "power2.inOut"
        }, startOffset);

        // Camera Horizontal Pans
        tl.to(".camera-container", {
          x: 190,
          duration: 1.0,
          ease: "power2.out"
        }, startOffset + 0.25);
        tl.to(".camera-container", {
          x: -190,
          duration: 1.0,
          ease: "power2.inOut"
        }, startOffset + 2.1);
        tl.to(".camera-container", {
          x: 0,
          duration: 1.0,
          ease: "power2.inOut"
        }, startOffset + 5);

        // Blur background gate container when frames are active
        tl.fromTo(".center-gate",
          { filter: "blur(0px)" },
          { filter: "blur(6px)", duration: 1.0, ease: "power2.out" },
          startOffset + 0.25
        );
        tl.to(".center-gate",
          { filter: "blur(0px)", duration: 1.0, ease: "power2.inOut" },
          startOffset + 5
        );

        // Frame Sequences
        tl.fromTo(".frame-left",
          { opacity: 0, x: -300 },
          { opacity: 1, x: 0, duration: 1.0, ease: "power2.out" },
          startOffset + 0.25
        );
        tl.to(".frame-left",
          { opacity: 0, x: -300, duration: 1.0, ease: "power2.in" },
          startOffset + 2
        );

        tl.fromTo(".frame-right",
          { opacity: 0, x: 300, z: -400 },
          { opacity: 1, x: 0, z: -400, duration: 1.0, ease: "power2.out" },
          startOffset + 2.5
        );
        tl.to(".frame-right",
          { opacity: 0, x: 300, z: -400, duration: 1.0, ease: "power2.in" },
          startOffset + 5
        );

        // Doors Rotation Open
        tl.fromTo(".door-left-tab",
          { rotationY: 0 },
          { rotationY: 55, duration: 2.5, ease: "power2.inOut" },
          startOffset + 7
        );
        tl.fromTo(".door-right-tab",
          { rotationY: 0 },
          { rotationY: -55, duration: 2.5, ease: "power2.inOut" },
          startOffset + 7
        );
      });

      // --- MOBILE ANIMATIONS (Width < 768px) ---
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" }
        });

        addCoomTimeline(tl);

        const startOffset = 4.5;

        // Camera Dolly-In
        tl.to(".camera-container", {
          z: 1100,
          y: 25,
          duration: 13,
          ease: "power2.inOut"
        }, startOffset);

        // Camera Horizontal Pans
        tl.to(".camera-container", {
          x: 65,
          duration: 1.0,
          ease: "power2.out"
        }, startOffset + 0.25);
        tl.to(".camera-container", {
          x: -65,
          duration: 1.0,
          ease: "power2.inOut"
        }, startOffset + 2.1);
        tl.to(".camera-container", {
          x: 0,
          duration: 1.0,
          ease: "power2.inOut"
        }, startOffset + 5);

        // Blur background gate container when frames are active
        tl.fromTo(".center-gate",
          { filter: "blur(0px)" },
          { filter: "blur(6px)", duration: 1.0, ease: "power2.out" },
          startOffset + 0.25
        );
        tl.to(".center-gate",
          { filter: "blur(0px)", duration: 1.0, ease: "power2.inOut" },
          startOffset + 5
        );

        // Frame Sequences
        tl.fromTo(".frame-left",
          { opacity: 0, x: -300 },
          { opacity: 1, x: 0, duration: 1.0, ease: "power2.out" },
          startOffset + 0.25
        );
        tl.to(".frame-left",
          { opacity: 0, x: -300, duration: 1.0, ease: "power2.in" },
          startOffset + 2
        );

        tl.fromTo(".frame-right",
          { opacity: 0, x: 300, z: -400 },
          { opacity: 1, x: 0, z: -400, duration: 1.0, ease: "power2.out" },
          startOffset + 2.5
        );
        tl.to(".frame-right",
          { opacity: 0, x: 300, z: -400, duration: 1.0, ease: "power2.in" },
          startOffset + 5
        );

        // Doors Rotation Open
        tl.fromTo(".door-left-mobile",
          { rotationY: 0 },
          { rotationY: 55, duration: 2.5, ease: "power2.inOut" },
          startOffset + 7
        );
        tl.fromTo(".door-right-mobile",
          { rotationY: 0 },
          { rotationY: -55, duration: 2.5, ease: "power2.inOut" },
          startOffset + 7
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden select-none bg-black"
    >
      {/* ========================================================= */}
      {/* ── 1. SLICING SECTION (BOTTOM LAYER, z-10) ── */}
      {/* ========================================================= */}
      <div className="slicing-section absolute inset-0 z-10" style={{ perspective: '1000px' }}>
        
        {/* Fixed Background for Slicing */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url("/Background.svg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Slicing Camera Container */}
        <div 
          className="camera-container absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            zIndex: 10
          }}
        >
          <div className="absolute inset-0 flex items-end justify-center pb-0 transform-style-3d">
            
            {/* Frame Kiri */}
            <div className="frame-left absolute z-40 bottom-[12%] lg:bottom-[10%] left-[2%] md:left-[8%]" style={{ opacity: 0 }}>
              <div className="relative drop-shadow-2xl flex justify-center items-center">
                <img src="/Frame1.svg" className="w-[240px] min-[400px]:w-[280px] md:w-[260px] lg:w-[320px] h-auto object-contain relative z-10" alt="Frame Kiri" />
              </div>
            </div>

            {/* Frame Kanan */}
            <div className="frame-right absolute z-40 bottom-[12%] lg:bottom-[10%] right-[2%] md:right-[8%]" style={{ opacity: 0 }}>
              <div className="relative drop-shadow-2xl flex justify-center items-center">
                <img src="/Frame2.svg" className="w-[240px] min-[400px]:w-[280px] md:w-[260px] lg:w-[320px] h-auto object-contain relative z-10" alt="Frame Kanan" />
              </div>
            </div>

            {/* Center: Pintu_Karpet with Animated Overlays */}
            <div className="center-gate relative flex justify-center items-end" style={{ zIndex: 30, width: '100%', height: '100vh', transformStyle: 'preserve-3d' }}>
              <div className="relative w-[100vw] h-[100vh] lg:w-[min(100vw,100vh*(820/958))] lg:h-[min(100vw*(958/820),100vh)]" style={{ transformStyle: 'preserve-3d' }}>
                
                <img src="/Pintu_karpet.svg?v=latest" className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 30, objectFit: 'fill' }} alt="Pintu Karpet" />
                <img src="/Pintu_karpet(mobile).svg" className="block lg:hidden absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 30, objectFit: 'fill' }} alt="Pintu Karpet Mobile" />

                {/* Desktop Doors */}
                <div className="door-left-desktop hidden lg:block" style={{ position: 'absolute', left: '36.4%', top: '27%', width: '15%', height: '39%', transformOrigin: 'left center', zIndex: 1 }}>
                  <img src="/Pintu(Kiri).svg" style={{ width: '90%', height: '80%', objectFit: 'fill' }} alt="Pintu Kiri" />
                </div>
                <div className="door-right-desktop hidden lg:block" style={{ position: 'absolute', right: '35.1%', top: '27%', width: '15%', height: '39%', transformOrigin: 'right center', zIndex: 1 }}>
                  <img src="/Pintu(Kanan).svg" style={{ width: '90%', height: '80%', objectFit: 'fill' }} alt="Pintu Kanan" />
                </div>

                {/* Tab Doors */}
                <div className="door-left-tab hidden md:block lg:hidden" style={{ position: 'absolute', left: '39.4%', top: '27%', width: '15%', height: '39%', transformOrigin: 'left center', zIndex: 1 }}>
                  <img src="/Pintu(Kiri).svg" style={{ width: '90%', height: '80%', objectFit: 'fill' }} alt="Pintu Kiri" />
                </div>
                <div className="door-right-tab hidden md:block lg:hidden" style={{ position: 'absolute', right: '36.1%', top: '27%', width: '15%', height: '39%', transformOrigin: 'right center', zIndex: 1 }}>
                  <img src="/Pintu(Kanan).svg" style={{ width: '90%', height: '80%', objectFit: 'fill' }} alt="Pintu Kanan" />
                </div>

                {/* Mobile Doors */}
                <div className="door-left-mobile block md:hidden" style={{ position: 'absolute', left: '37.5%', top: '40.7%', width: '14.1%', height: '18.1%', transformOrigin: 'left center', zIndex: 1 }}>
                  <img src="/Pintu(Kiri).svg" style={{ width: '90%', height: '80%', objectFit: 'fill' }} alt="Pintu Kiri Mobile" />
                </div>
                <div className="door-right-mobile block md:hidden" style={{ position: 'absolute', right: '36%', top: '40.7%', width: '14.1%', height: '18.1%', transformOrigin: 'right center', zIndex: 1 }}>
                  <img src="/Pintu(Kanan).svg" style={{ width: '90%', height: '80%', objectFit: 'fill' }} alt="Pintu Kanan Mobile" />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ========================================================= */}
      {/* ── 2. COOM SECTION (TOP LAYER, z-50) ── */}
      {/* ========================================================= */}
      <div className="coom-section absolute inset-0 z-50 flex items-center justify-center bg-black">
        
        {/* Fixed Background for Coom */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url("/Background.svg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Title Revealed (Kampung Budaya) */}
        <div className="title-content absolute inset-0 pointer-events-none z-40 flex items-center justify-center" style={{ opacity: 0 }}>
          <div className="w-[280px] md:w-[400px] lg:w-[500px] mb-8 drop-shadow-2xl">
            <img src="/Kampung_Budaya.svg" className="w-full h-auto object-contain" alt="Kampung Budaya" />
          </div>
        </div>

        {/* Clouds (Resting at top left & right) */}
        <div className="absolute inset-0 pointer-events-none z-50">
          <img src="/Group-3.svg" className="cloud-lt absolute object-contain" style={{ width: '25%', minWidth: '150px', left: '-5%', top: '-5%' }} alt="Awan Kiri Atas" />
          <img src="/Group.svg" className="cloud-lb absolute object-contain" style={{ width: '20%', minWidth: '120px', left: '10%', top: '15%' }} alt="Awan Kiri Tengah" />
          <img src="/Group-1.svg" className="cloud-rt absolute object-contain" style={{ width: '25%', minWidth: '150px', right: '0%', top: '2%' }} alt="Awan Kanan Atas" />
          <img src="/Group-2.svg" className="cloud-rb absolute object-contain" style={{ width: '20%', minWidth: '120px', right: '-2%', top: '18%' }} alt="Awan Kanan Tengah" />
        </div>

      </div>

    </main>
  );
}
