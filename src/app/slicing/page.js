"use client";
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function SlicingPage() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const time = useMotionValue(0);

  useEffect(() => {
    // 15-second continuous animation timeline for a slower, grander pacing
    const controls = animate(time, 15, {
      duration: 15,
      ease: [0.705, 0, 0.384, 1], // Custom easy ease as requested
    });
    return () => controls.stop();
  }, [time]);

  // --- CAMERA (Dolly-In) ---
  const cameraZDesktop = useTransform(time, [0, 10, 15], [0, 850, 850]);
  const cameraZMobile = useTransform(time, [0, 13, 15], [0, 850, 850]);
  
  const cameraYDesktop = useTransform(time, [0, 10, 15], [0, 50, 50]); 
  const cameraYMobile = useTransform(time, [0, 13, 15], [0, 50, 50]); 

  // --- FRAMES REVEAL & HIDE ---
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  // DESKTOP TRANSFORMS
  const frameLeftOpacityDesktop = useTransform(time, [0, 0.24, 0.25, 7, 9, 15], [0, 0, 1, 1, 0, 0]);
  const frameLeftXDesktop = useTransform(time, [0.25, 1], [-300, 0], { ease: easeOutCubic });
  const frameRightOpacityDesktop = useTransform(time, [0, 0.99, 1, 7, 9, 15], [0, 0, 1, 1, 0, 0]);
  const frameRightXDesktop = useTransform(time, [1, 1.75], [300, 0], { ease: easeOutCubic });
  const doorRotateLeftDesktop = useTransform(time, [0, 2.5, 10], [0, 0, 45]);
  const doorRotateRightDesktop = useTransform(time, [0, 2.5, 10], [0, 0, -45]);

  // MOBILE TRANSFORMS (Sequential Entry, No Exit)
  // Frame 1 enters and stays
  const frameLeftOpacityMobile = useTransform(time, [0, 0.24, 0.25, 15], [0, 0, 1, 1]);
  const frameLeftXMobile = useTransform(time, [0.25, 1.25], [-300, 0], { ease: easeOutCubic });
  
  // Frame 2 enters and stays
  const frameRightOpacityMobile = useTransform(time, [0, 0.24, 0.25, 15], [0, 0, 1, 1]);
  const frameRightXMobile = useTransform(time, [0.25, 1.25], [300, 0], { ease: easeOutCubic });
  
  // Frame 2 holds fully visible for 2.25 seconds
  // const frameRightOpacityMobile = useTransform(time, [0, 4.24, 4.25, 7.5, 8.25, 15], [0, 0, 1, 1, 0, 0]);
  // const frameRightXMobile = useTransform(time, [4.25, 5.25, 7.5, 8.25], [300, 0, 0, 300], { ease: easeOutCubic });
  
  const doorRotateLeftMobile = useTransform(time, [0, 8.25, 13], [0, 0, 45]);
  const doorRotateRightMobile = useTransform(time, [0, 8.25, 13], [0, 0, -45]);

  // ACTIVE TRANSFORMS
  const cameraZ = isMobile ? cameraZMobile : cameraZDesktop;
  const cameraY = isMobile ? cameraYMobile : cameraYDesktop;
  const frameLeftOpacity = isMobile ? frameLeftOpacityMobile : frameLeftOpacityDesktop;
  const frameLeftX = isMobile ? frameLeftXMobile : frameLeftXDesktop;
  const frameRightOpacity = isMobile ? frameRightOpacityMobile : frameRightOpacityDesktop;
  const frameRightX = isMobile ? frameRightXMobile : frameRightXDesktop;
  const doorRotateLeft = isMobile ? doorRotateLeftMobile : doorRotateLeftDesktop;
  const doorRotateRight = isMobile ? doorRotateRightMobile : doorRotateRightDesktop;
  
  // Doors stay visible since they are only half open
  const doorOpacity = useTransform(time, [0, 15], [1, 1]);

  return (
    <main
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

      <motion.div 
        className="absolute inset-0"
        style={{
          z: cameraZ,
          y: cameraY,
          transformStyle: "preserve-3d",
          zIndex: 10
        }}
      >
        {/* ── Main Container ── */}
        <div className="absolute inset-0 flex items-end justify-center pb-0 transform-style-3d">
          
          {/* ── Frame Kiri (Masuk dan Hilang) ── */}
          <motion.div 
            className="absolute z-40 bottom-[20%] md:bottom-[10%] left-[5%] md:left-[8%]" 
            style={{ opacity: frameLeftOpacity, x: frameLeftX }}
          >
            <div className="relative drop-shadow-2xl flex justify-center items-center">
              <img src="/stage_scene.png" className="absolute object-cover w-[78%] h-[75%] top-[12%] rounded-[10px] filter grayscale brightness-80" alt="Photo 1" />
              <img src="/Frame1.svg" className="w-[160px] sm:w-[200px] lg:w-[320px] h-auto object-contain relative z-10" alt="Frame Kiri" />
            </div>
          </motion.div>

          {/* ── Frame Kanan (Masuk dan Hilang) ── */}
          <motion.div 
            className="absolute z-40 bottom-[20%] md:bottom-[10%] right-[5%] md:right-[8%]" 
            style={{ opacity: frameRightOpacity, x: frameRightX }}
          >
            <div className="relative drop-shadow-2xl flex justify-center items-center">
              <img src="/stage_scene.png" className="absolute object-cover w-[78%] h-[75%] top-[12%] rounded-[10px] filter grayscale brightness-80" alt="Photo 2" />
              <img src="/Frame2.svg" className="w-[160px] sm:w-[200px] lg:w-[320px] h-auto object-contain relative z-10" alt="Frame Kanan" />
            </div>
          </motion.div>

          {/* ── Center: Pintu_Karpet with Animated Overlays ── */}
          <div 
            className="relative flex justify-center items-end" 
            style={{ zIndex: 30, width: '100%', height: '100vh', transformStyle: 'preserve-3d' }}
          >
            {/* Strict Aspect Ratio Container to perfectly map to Pintu_karpet.svg (820x958) on any device */}
            <div 
              className="relative" 
              style={{ 
                width: 'min(100vw, 100vh * (820 / 958))',
                height: 'min(100vw * (958 / 820), 100vh)',
                transformStyle: 'preserve-3d' 
              }}
            >
              
              {/* Base Image: Intact Pintu_karpet with wings and painted closed doors */}
              <img src="/Pintu_karpet.svg?v=latest" className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 30, objectFit: 'fill' }} alt="Pintu Karpet" />

              {/* Animated Doors Overlay */}
              {/* These sit exactly on top of the inner room, hiding it until they rotate open */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: '36.4%', top: '27%',
                  width: '15%', height: '39%',
                  transformOrigin: 'left center',
                  rotateY: doorRotateLeft,
                  opacity: doorOpacity,
                  zIndex: 1,
                }}
              >
                <img src="/Pintu(Kiri).svg" style={{ width: '90%', height: '80%', objectFit: 'fill' }} alt="Pintu Kiri" />
              </motion.div>

              <motion.div
                style={{
                  position: 'absolute',
                  right: '35.1%', top: '27%',
                  width: '15%', height: '39%',
                  transformOrigin: 'right center',
                  rotateY: doorRotateRight,
                  opacity: doorOpacity,
                  zIndex: 1,
                }}
              >
                <img src="/Pintu(Kanan).svg" style={{ width: '90%', height: '80%', objectFit: 'fill' }} alt="Pintu Kanan" />
              </motion.div>

            </div>
          </div>

        </div>
      </motion.div>
    </main>
  );
}
