"use client";
import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function Coming2Cinematic() {
  // Timeline in seconds: 0 to 12
  const time = useMotionValue(0);

  useEffect(() => {
    // Start the 12-second animation immediately on mount
    const controls = animate(time, 12, {
      duration: 12,
      ease: "linear",
    });
    return () => controls.stop();
  }, [time]);

  // --- CAMERA (Dolly-In) ---
  // Camera moves forward slowly for 12 seconds
  const cameraZ = useTransform(time, [0, 12], [0, 700]);
  
  // --- CLOUDS & PARALLAX ---
  // Clouds float slowly to add depth
  const cloudY = useTransform(time, [0, 12], [0, -30]);
  const cloudOpacity = useTransform(time, [0, 8, 12], [1, 0.8, 0.2]);

  // --- FRAMES (Slide in at 2-5s) ---
  // Left frame slides in from -1200 to -530
  const frameLeftX = useTransform(time, [0, 2, 5], [-1200, -1200, -530]);
  // Right frame slides in from 1200 to 530
  const frameRightX = useTransform(time, [0, 2, 5], [1200, 1200, 530]);
  
  // Floating motion for frames (subtle up and down)
  const floatingY = Math.sin(time.get() * Math.PI) * 10; // Continuous subtle float 
  const floatingTransform = useTransform(time, (t) => Math.sin(t * 1.5) * 15);

  // --- LIGHTING & GLOW (5-8s) ---
  // Gold shimmer on ornaments and door frame
  const shimmerOpacity = useTransform(time, [0, 4, 6, 8], [0, 0, 0.6, 1]);
  // Light from crack behind doors
  const crackGlowOpacity = useTransform(time, [0, 5, 8], [0, 0, 1]);

  // --- DOOR OPEN (8-12s) ---
  const doorRotateLeft = useTransform(time, [0, 8, 11], [0, 0, 105]);
  const doorRotateRight = useTransform(time, [0, 8, 11], [0, 0, -105]);
  
  // --- FINAL TRANSITION (10-12s) ---
  // Screen fades to white as camera enters
  const screenFadeToWhite = useTransform(time, [10.5, 12], [0, 1]);
  const innerLightScale = useTransform(time, [8, 12], [0.5, 3]);

  return (
    <main
      className="relative w-screen h-screen overflow-hidden bg-black select-none"
      style={{
        perspective: '1000px',
      }}
    >
      {/* ── Background Wall ── */}
      <motion.div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/Background.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          z: cameraZ,
          transformStyle: "preserve-3d"
        }}
      >
        {/* ── Static Clouds with subtle Parallax ── */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, y: cloudY, opacity: cloudOpacity }}>
          <img src="/Group-3.svg" className="absolute object-contain w-[14%] max-w-[180px] left-[1%] top-[1%]" alt="Cloud" />
          <img src="/Group.svg" className="absolute object-contain w-[11%] max-w-[130px] left-[8%] top-[8%]" alt="Cloud" />
          <img src="/Group-1.svg" className="absolute object-contain w-[14%] max-w-[180px] right-[1%] top-[1%]" alt="Cloud" />
          <img src="/Group-2.svg" className="absolute object-contain w-[11%] max-w-[130px] right-[6%] top-[8%]" alt="Cloud" />
        </motion.div>

        {/* ── Main 3D Container ── */}
        <div className="absolute inset-0 flex items-center justify-center transform-style-3d">
          
          {/* Volumetric Light Rays (Base) */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 via-transparent to-transparent mix-blend-screen pointer-events-none"
            style={{ opacity: shimmerOpacity, zIndex: 1 }}
          />

          {/* ── Frames ── */}
          <motion.div
            className="absolute"
            style={{ x: frameLeftX, y: floatingTransform, zIndex: 40 }}
          >
            <div className="relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg">
              <img src="/Frame1.svg" style={{ width: '280px', height: '450px', objectFit: 'contain' }} alt="Frame Kiri" />
              <motion.div className="absolute inset-0 bg-yellow-400/10 mix-blend-overlay" style={{ opacity: shimmerOpacity }} />
            </div>
          </motion.div>

          <motion.div
            className="absolute"
            style={{ x: frameRightX, y: floatingTransform, zIndex: 40 }}
          >
            <div className="relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg">
              <img src="/Frame2.svg" style={{ width: '280px', height: '450px', objectFit: 'contain' }} alt="Frame Kanan" />
              <motion.div className="absolute inset-0 bg-yellow-400/10 mix-blend-overlay" style={{ opacity: shimmerOpacity }} />
            </div>
          </motion.div>

          {/* ── Side Ornaments (Wings) ── */}
          <motion.div
            className="absolute pointer-events-none"
            style={{ x: -310, y: 185, zIndex: 20, width: '310px', height: '380px' }}
          >
            <img src="/Group 633125.svg" className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" alt="Wing Kiri" />
            <motion.div className="absolute inset-0 mix-blend-screen bg-yellow-300/20" style={{ opacity: shimmerOpacity }} />
          </motion.div>

          <motion.div
            className="absolute pointer-events-none"
            style={{ x: 310, y: 185, zIndex: 20, width: '310px', height: '380px' }}
          >
            <img src="/Group 633128.svg" className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" alt="Wing Kanan" />
            <motion.div className="absolute inset-0 mix-blend-screen bg-yellow-300/20" style={{ opacity: shimmerOpacity }} />
          </motion.div>

          {/* ── Door Assembly (Fully modular from pieces) ── */}
          <div className="absolute" style={{ zIndex: 30, width: '460px', height: '650px', perspective: '800px', transformStyle: 'preserve-3d' }}>
            
            {/* Carpet Floor */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
              style={{
                width: '65%', height: '45%',
                backgroundImage: 'url("/Karpet.svg")',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom center',
                zIndex: 10,
              }}
            />

            {/* Glowing light behind the door (visible when open) */}
            <motion.div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-100 blur-[80px]"
              style={{ width: '80%', height: '80%', opacity: crackGlowOpacity, scale: innerLightScale, zIndex: 15 }}
            />

            {/* Door Panels (Animated) */}
            <motion.div
              style={{
                position: 'absolute',
                left: '23.333%', top: '49.657%',
                width: '26.852%', height: '50.343%',
                transformOrigin: 'left center',
                rotateY: doorRotateLeft,
                zIndex: 20,
              }}
            >
              <img src="/Pintu(Kiri).svg" style={{ width: '100%', height: '100%', objectFit: 'fill' }} alt="Pintu Kiri" />
            </motion.div>

            <motion.div
              style={{
                position: 'absolute',
                right: '23.333%', top: '49.657%',
                width: '26.852%', height: '50.343%',
                transformOrigin: 'right center',
                rotateY: doorRotateRight,
                zIndex: 20,
              }}
            >
              <img src="/Pintu(Kanan).svg" style={{ width: '100%', height: '100%', objectFit: 'fill' }} alt="Pintu Kanan" />
            </motion.div>

            {/* Frame Overlay (Luaran Pintu) */}
            <img
              src="/Luaran_Pintu.svg"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl"
              style={{ zIndex: 30 }}
              alt="Frame Pintu"
            />
            
            {/* Gold Shimmer on Door Frame */}
            <motion.div 
              className="absolute inset-0 bg-yellow-500/10 mix-blend-color-dodge pointer-events-none"
              style={{ opacity: shimmerOpacity, zIndex: 35 }}
            />
          </div>
        </div>
      </motion.div>

      {/* ── Fade to White Transition (10-12s) ── */}
      <motion.div 
        className="absolute inset-0 bg-white pointer-events-none"
        style={{ opacity: screenFadeToWhite, zIndex: 100 }}
      />
    </main>
  );
}
