"use client";
import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function SlicingPage() {
  const time = useMotionValue(0);

  useEffect(() => {
    // 15-second continuous animation timeline for a slower, grander pacing
    const controls = animate(time, 15, {
      duration: 15,
      ease: "easeInOut",
    });
    return () => controls.stop();
  }, [time]);

  // --- CAMERA (Dolly-In) ---
  // 0 - 7s: Slow initial drift while frames appear
  // 7 - 10s: Walk closer to the door, stopping when it's fully in view (not too zoomed)
  // 10 - 15s: Hold position while doors open and remain open
  const cameraZ = useTransform(time, [0, 7, 10, 15], [0, 100, 400, 400]);
  const cameraY = useTransform(time, [0, 7, 10, 15], [0, 20, 80, 80]); 

  // --- RIGHT FRAME REVEAL ---
  // Appears later and slower (2 to 5 seconds)
  const frameRightOpacity = useTransform(time, [2, 5], [0, 1]);
  const frameRightX = useTransform(time, [2, 5], [150, 0]);

  // --- DOOR OPEN ---
  // 10 - 14s: Doors swing open slowly and smoothly
  const doorRotateLeft = useTransform(time, [10, 11, 12, 13, 14], [0, 15, 60, 95, 110]);
  const doorRotateRight = useTransform(time, [10, 11, 12, 13, 14], [0, -15, -60, -95, -110]);
  
  // 14 - 14.5s: Doors fade out completely once open
  const doorOpacity = useTransform(time, [14, 14.5], [1, 0]);

  return (
    <main
      className="relative w-screen h-screen overflow-hidden select-none bg-black"
      style={{ perspective: '1000px' }}
    >
      <motion.div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/Background.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          z: cameraZ,
          y: cameraY,
          transformStyle: "preserve-3d"
        }}
      >
        {/* ── Clouds (Background) ── */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <img src="/Group-3.svg" className="absolute object-contain" style={{ width: '15%', maxWidth: '220px', left: '0%', top: '0%' }} alt="Awan Kiri Atas" />
          <img src="/Group.svg" className="absolute object-contain" style={{ width: '12%', maxWidth: '180px', left: '10%', top: '15%' }} alt="Awan Kiri Tengah" />
          <img src="/Group-1.svg" className="absolute object-contain" style={{ width: '15%', maxWidth: '220px', right: '5%', top: '2%' }} alt="Awan Kanan Atas" />
          <img src="/Group-2.svg" className="absolute object-contain" style={{ width: '12%', maxWidth: '180px', right: '0%', top: '18%' }} alt="Awan Kanan Tengah" />
        </div>

        {/* ── Main Container ── */}
        <div className="absolute inset-0 flex items-end justify-center pb-0 transform-style-3d">
          
          {/* ── Frame Kiri ── */}
          <div className="absolute" style={{ left: '8%', bottom: '10%', zIndex: 40 }}>
            <div className="relative drop-shadow-2xl flex justify-center items-center">
              <img src="/stage_scene.png" className="absolute object-cover" style={{ width: '78%', height: '75%', top: '12%', borderRadius: '10px', filter: 'grayscale(100%) brightness(0.8)' }} alt="Photo 1" />
              <img src="/Frame1.svg" style={{ width: '320px', height: 'auto', objectFit: 'contain', zIndex: 2, position: 'relative' }} alt="Frame Kiri" />
            </div>
          </div>

          {/* ── Frame Kanan (Muncul dengan Animasi lebih lambat) ── */}
          <motion.div className="absolute" style={{ right: '8%', bottom: '10%', zIndex: 40, opacity: frameRightOpacity, x: frameRightX }}>
            <div className="relative drop-shadow-2xl flex justify-center items-center">
              <img src="/stage_scene.png" className="absolute object-cover" style={{ width: '78%', height: '75%', top: '12%', borderRadius: '10px', filter: 'grayscale(100%) brightness(0.8)' }} alt="Photo 2" />
              <img src="/Frame2.svg" style={{ width: '320px', height: 'auto', objectFit: 'contain', zIndex: 2, position: 'relative' }} alt="Frame Kanan" />
            </div>
          </motion.div>

          {/* ── Center: Pintu_Karpet with Animated Overlays ── */}
          <div 
            className="relative flex justify-center" 
            style={{ zIndex: 30, width: '100%', height: '100vh', maxWidth: '1300px', transformStyle: 'preserve-3d' }}
          >
            {/* Aspect Ratio Container matched to Pintu_karpet.svg (820x958) */}
            <div className="relative w-full h-full max-w-full" style={{ aspectRatio: '820 / 958', margin: '0 auto', transformStyle: 'preserve-3d' }}>
              
              {/* Base Image: Intact Pintu_karpet with wings and painted closed doors */}
              <img src="/Pintu_karpet.svg?v=latest" className="absolute inset-0 w-full h-full pointer-events-none object-contain object-bottom" style={{ zIndex: 30 }} alt="Pintu Karpet" />

              {/* The Room Inside: Stage scene shown when doors open. 
                  Also completely covers the painted doors on Pintu_karpet. */}
              {/* <div 
                className="absolute shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] overflow-hidden"
                style={{
                  left: '32.317%', width: '35.366%', top: '35%', height: '39%',
                  zIndex: 10,
                  backgroundColor: 'black'
                }}
              >
                <img src="/stage_scene.png" className="w-full h-full object-cover opacity-80" alt="Stage Scene inside" />
                <div className="absolute inset-0 bg-yellow-500/10 mix-blend-screen"></div>
              </div> */}
              {/* Animated Doors Overlay */}
              {/* These sit exactly on top of the inner room, hiding it until they rotate open */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: '40.15%', top: '27%',
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
                  right: '37.64%', top: '27%',
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
