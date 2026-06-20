"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SlicingPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // --- DESKTOP ANIMATIONS (Width >= 1024px) ---
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power1.inOut" }
        });

        // Camera Dolly-In (0s to 10s)
        tl.to(".camera-container", {
          z: 1000,
          y: 50,
          duration: 6,
          ease: "power2.inOut"
        }, 0);

        // Frame Left Entry (0.25s to 1s)
        tl.fromTo(".frame-left", 
          { opacity: 0, x: -300 },
          { opacity: 1, x: 0, duration: 0.75, ease: "power2.out" },
          0.25
        );
        // Frame Left Exit (7s to 9s)
        tl.to(".frame-left", 
          { opacity: 0, duration: 2, ease: "power2.inOut" },
          7
        );

        // Frame Right Entry (1s to 1.75s)
        tl.fromTo(".frame-right",
          { opacity: 0, x: 300 },
          { opacity: 1, x: 0, duration: 0.75, ease: "power2.out" },
          1
        );
        // Frame Right Exit (7s to 9s)
        tl.to(".frame-right",
          { opacity: 0, duration: 2, ease: "power2.inOut" },
          7
        );

        // Doors Rotation Open (2.5s to 10s)
        tl.fromTo(".door-left-desktop",
          { rotationY: 0 },
          { rotationY: 45, duration: 2.5, ease: "power2.inOut" },
          2.5
        );
        tl.fromTo(".door-right-desktop",
          { rotationY: 0 },
          { rotationY: -45, duration: 2.5, ease: "power2.inOut" },
          2.5
        );
      });

      // --- MOBILE ANIMATIONS (Width < 1024px) ---
      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power1.inOut" }
        });

        // Camera Dolly-In (0s to 13s)
        tl.to(".camera-container", {
          z: 1100,
          y: 25,
          duration: 13,
          ease: "power2.inOut"
        }, 0);

        // Camera Horizontal Pans to center Left and Right frames sequentially
        tl.to(".camera-container", {
          x: 80,
          duration: 1.0,
          ease: "power2.out"
        }, 0.25);

        tl.to(".camera-container", {
          x: -80,
          duration: 1.0,
          ease: "power2.inOut"
        }, 2.1);

        tl.to(".camera-container", {
          x: 0,
          duration: 1.0,
          ease: "power2.inOut"
        }, 5);

        // Blur background gate container when frames are active
        tl.fromTo(".center-gate",
          { filter: "blur(0px)" },
          { filter: "blur(6px)", duration: 1.0, ease: "power2.out" },
          0.25
        );
        tl.to(".center-gate",
          { filter: "blur(0px)", duration: 1.0, ease: "power2.inOut" },
          5.2
        );

        // Frame Left Sequence
        tl.fromTo(".frame-left",
          { opacity: 0, x: -300 },
          { opacity: 1, x: 0, duration: 1.0, ease: "power2.out" },
          0.25
        );
        tl.to(".frame-left",
          { opacity: 0, x: -300, duration: 1.0, ease: "power2.in" },
          2
        );

        // Frame Right Sequence
        tl.fromTo(".frame-right",
          { opacity: 0, x: 300, z: -400 },
          { opacity: 1, x: 0, z: -400, duration: 1.0, ease: "power2.out" },
          2.5
        );
        tl.to(".frame-right",
          { opacity: 0, x: 300, z: -400, duration: 1.0, ease: "power2.in" },
          5
        );

        // Doors Rotation Open (8.25s to 13s)
        tl.fromTo(".door-left-mobile",
          { rotationY: 0 },
          { rotationY: 55, duration: 2.5, ease: "power2.inOut" },
          7
        );
        tl.fromTo(".door-right-mobile",
          { rotationY: 0 },
          { rotationY: -55, duration: 2.5, ease: "power2.inOut" },
          7
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden select-none bg-black"
      style={{ perspective: '1000px' }}
    >
      {/* ── Fixed Background & Clouds ── */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url("/Background.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}
      >
        <img src="/Group-3.svg" className="absolute object-contain" style={{ width: '15%', maxWidth: '220px', left: '0%', top: '0%' }} alt="Awan Kiri Atas" />
        <img src="/Group.svg" className="absolute object-contain" style={{ width: '12%', maxWidth: '180px', left: '10%', top: '15%' }} alt="Awan Kiri Tengah" />
        <img src="/Group-1.svg" className="absolute object-contain" style={{ width: '15%', maxWidth: '220px', right: '5%', top: '2%' }} alt="Awan Kanan Atas" />
        <img src="/Group-2.svg" className="absolute object-contain" style={{ width: '12%', maxWidth: '180px', right: '0%', top: '18%' }} alt="Awan Kanan Tengah" />
      </div>

      <div 
        className="camera-container absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          zIndex: 10
        }}
      >
        {/* ── Main Container ── */}
        <div className="absolute inset-0 flex items-end justify-center pb-0 transform-style-3d">
          
          {/* ── Frame Kiri (Masuk dan Hilang) ── */}
          <div 
            className="frame-left absolute z-40 bottom-[12%] md:bottom-[10%] left-[2%] md:left-[8%]" 
            style={{ opacity: 0 }}
          >
            <div className="relative drop-shadow-2xl flex justify-center items-center">
              <img src="/Frame1.svg" className="w-[240px] min-[400px]:w-[280px] md:w-[200px] lg:w-[320px] h-auto object-contain relative z-10" alt="Frame Kiri" />
            </div>
          </div>

          {/* ── Frame Kanan (Masuk dan Hilang) ── */}
          <div 
            className="frame-right absolute z-40 bottom-[12%] md:bottom-[10%] right-[2%] md:right-[8%]" 
            style={{ opacity: 0 }}
          >
            <div className="relative drop-shadow-2xl flex justify-center items-center">
              <img src="/Frame2.svg" className="w-[240px] min-[400px]:w-[280px] md:w-[200px] lg:w-[320px] h-auto object-contain relative z-10" alt="Frame Kanan" />
            </div>
          </div>

          {/* ── Center: Pintu_Karpet with Animated Overlays ── */}
          <div 
            className="center-gate relative flex justify-center items-end" 
            style={{ zIndex: 30, width: '100%', height: '100vh', transformStyle: 'preserve-3d' }}
          >
            {/* Strict Aspect Ratio Container to perfectly map to Pintu_karpet.svg (820x958) on any device */}
            <div 
              className="relative w-[100vw] h-[100vh] lg:w-[min(100vw,100vh*(820/958))] lg:h-[min(100vw*(958/820),100vh)]" 
              style={{ 
                transformStyle: 'preserve-3d' 
              }}
            >
              
              {/* Base Image: Intact Pintu_karpet with wings and painted closed doors */}
              <img src="/Pintu_karpet.svg?v=latest" className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 30, objectFit: 'fill' }} alt="Pintu Karpet" />
              <img src="/Pintu_karpet(mobile).svg" className="block lg:hidden absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 30, objectFit: 'fill' }} alt="Pintu Karpet Mobile" />

              {/* Animated Doors Overlay */}
              {/* These sit exactly on top of the inner room, hiding it until they rotate open */}
              
              {/* Desktop Doors */}
              <div
                className="door-left-desktop hidden lg:block"
                style={{
                  position: 'absolute',
                  left: '36.4%', top: '27%',
                  width: '15%', height: '39%',
                  transformOrigin: 'left center',
                  zIndex: 1,
                }}
              >
                <img src="/Pintu(Kiri).svg" style={{ width: '90%', height: '80%', objectFit: 'fill' }} alt="Pintu Kiri" />
              </div>

              <div
                className="door-right-desktop hidden lg:block"
                style={{
                  position: 'absolute',
                  right: '35.1%', top: '27%',
                  width: '15%', height: '39%',
                  transformOrigin: 'right center',
                  zIndex: 1,
                }}
              >
                <img src="/Pintu(Kanan).svg" style={{ width: '90%', height: '80%', objectFit: 'fill' }} alt="Pintu Kanan" />
              </div>

              {/* Mobile Doors */}
              <div
                className="door-left-mobile block lg:hidden"
                style={{
                  position: 'absolute',
                  left: '39.89%', top: '40.7%',
                  width: '14.1%', height: '18.1%',
                  transformOrigin: 'left center',
                  zIndex: 1,
                }}
              >
                <img src="/Pintu(Kiri).svg" style={{ width: '90%', height: '80%', objectFit: 'fill' }} alt="Pintu Kiri Mobile" />
              </div>

              <div
                className="door-right-mobile block lg:hidden"
                style={{
                  position: 'absolute',
                  right: '38.37%', top: '40.7%',
                  width: '14.1%', height: '18.1%',
                  transformOrigin: 'right center',
                  zIndex: 1,
                }}
              >
                <img src="/Pintu(Kanan).svg" style={{ width: '90%', height: '80%', objectFit: 'fill' }} alt="Pintu Kanan Mobile" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
