"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function DoorOpenOnlyPlayground() {
  const progress = useMotionValue(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [isCinematic, setIsCinematic] = useState(false);
  const animationRef = useRef(null);

  // Sync motion value with React state for the UI slider
  useEffect(() => {
    const unsubscribe = progress.on("change", (latest) => {
      setCurrentProgress(latest);
    });
    return () => unsubscribe();
  }, [progress]);

  // Framer Motion transforms mapped to progress (0 to 100)
  // Animation ends exactly when the door is fully opened (Z: 1100, rotateY: 110)
  const worldZ = useTransform(progress, [0, 75, 100], [0, 1100, 1100]);
  const leftDoorRotateY = useTransform(progress, [0, 75, 100], [0, 0, 110]);
  const rightDoorRotateY = useTransform(progress, [0, 75, 100], [0, 0, -110]);
  const ornamentsOpacity = useTransform(progress, [0, 50, 70, 100], [1, 1, 0, 0]);
  const stageOpacity = useTransform(progress, [0, 75, 100], [0, 0, 1]);

  // Carpet, door frame, and wings remain fully visible (opacity 1) because the camera does not pass through the door
  const carpetOpacity = 1;
  const doorFrameOpacity = 1;

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, []);

  const playAnimation = (startFrom = progress.get()) => {
    if (animationRef.current) {
      animationRef.current.stop();
    }

    setIsPlaying(true);
    const fromVal = startFrom >= 100 ? 0 : startFrom;
    progress.set(fromVal);

    const remaining = 100 - fromVal;
    // Total duration is 6 seconds at 1x speed
    const duration = (6 * (remaining / 100)) / speed;

    animationRef.current = animate(progress, 100, {
      duration: duration,
      ease: "linear",
      onComplete: () => {
        setIsPlaying(false);
      }
    });
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (animationRef.current) {
        animationRef.current.stop();
      }
      setIsPlaying(false);
    } else {
      playAnimation();
    }
  };

  const handleReplay = () => {
    playAnimation(0);
  };

  const handleSliderChange = (e) => {
    const val = parseFloat(e.target.value);
    if (animationRef.current) {
      animationRef.current.stop();
      setIsPlaying(false);
    }
    progress.set(val);
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    if (isPlaying) {
      playAnimation(progress.get());
    }
  };

  const jumpToStep = (targetVal) => {
    if (animationRef.current) {
      animationRef.current.stop();
      setIsPlaying(false);
    }
    animate(progress, targetVal, { duration: 0.8, ease: "easeInOut" });
  };

  // Get dynamic step labels
  const getStepLabel = (p) => {
    if (p < 5) return "Gerbang Utama";
    if (p < 70) return "Menuju Pintu Utama";
    if (p < 76) return "Tiba di Depan Pintu";
    return "Membuka Pintu Utama";
  };

  return (
    <main 
      className="relative w-screen h-screen overflow-hidden select-none bg-[#050505]" 
      style={{ 
        perspective: '800px', 
        backgroundImage: 'url("/Background.svg")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      {/* Ornamen Bali Gates, Wayang & Clouds (Fixed background, does not zoom) */}
      <motion.div
        style={{ opacity: ornamentsOpacity, transformStyle: 'preserve-3d' }}
        className="absolute inset-0 flex items-center justify-center preserve-3d pointer-events-none"
      >
        {/* Awan Kiri Atas */}
        <div 
          className="absolute w-[30%] max-w-[375px] aspect-[375/180]"
          style={{ 
            left: '2%', 
            top: '2%', 
            transformOrigin: 'left top',
            transform: 'translateZ(-200px)' 
          }}
        >
          <img src="/Group-3.svg" className="w-full h-full object-contain" alt="Awan Kiri Atas" />
        </div>

        {/* Awan Kiri Tengah */}
        <div 
          className="absolute w-[28%] max-w-[341px] aspect-[341/177]"
          style={{ 
            left: '12%', 
            top: '12%', 
            transformOrigin: 'left top',
            transform: 'translateZ(-400px)' 
          }}
        >
          <img src="/Group.svg" className="w-full h-full object-contain" alt="Awan Kiri Tengah" />
        </div>

        {/* Awan Kanan Atas */}
        <div 
          className="absolute w-[30%] max-w-[369px] aspect-[369/197]"
          style={{ 
            right: '2%', 
            top: '2%', 
            transformOrigin: 'right top',
            transform: 'translateZ(-300px)' 
          }}
        >
          <img src="/Group-1.svg" className="w-full h-full object-contain" alt="Awan Kanan Atas" />
        </div>

        {/* Awan Kanan Tengah */}
        <div 
          className="absolute w-[28%] max-w-[364px] aspect-[364/397]"
          style={{ 
            right: '10%', 
            top: '12%', 
            transformOrigin: 'right top',
            transform: 'translateZ(-500px)' 
          }}
        >
          <img src="/Group-2.svg" className="w-full h-full object-contain" alt="Awan Kanan Tengah" />
        </div>

        {/* Gapura Bali Kiri */}
        <div 
          className="absolute w-[25%] max-w-[287px] aspect-[287/441]"
          style={{ 
            left: 0, 
            bottom: 0, 
            transformOrigin: 'left bottom',
            transform: 'translateZ(-100px)' 
          }}
        >
          <img src="/Group 633124.svg" className="w-full h-full object-contain object-left-bottom" alt="Gapura Kiri" />
        </div>

        {/* Gapura Bali Kanan */}
        <div 
          className="absolute w-[25%] max-w-[284px] aspect-[284/434]"
          style={{ 
            right: 0, 
            bottom: 0, 
            transformOrigin: 'right bottom',
            transform: 'translateZ(-100px)' 
          }}
        >
          <img src="/Group 633124-1.svg" className="w-full h-full object-contain object-right-bottom" alt="Gapura Kanan" />
        </div>

        {/* Wayang Gunungan Kiri */}
        <div 
          className="absolute w-[18%] max-w-[189px] aspect-[189/384]"
          style={{ 
            left: '14%', 
            bottom: 0, 
            transformOrigin: 'left bottom',
            transform: 'translateZ(-150px)' 
          }}
        >
          <img src="/Group 38063.svg" className="w-full h-full object-contain object-left-bottom" alt="Wayang Kiri" />
        </div>

        {/* Wayang Gunungan Kanan */}
        <div 
          className="absolute w-[18%] max-w-[189px] aspect-[189/384]"
          style={{ 
            right: '14%', 
            bottom: 0, 
            transformOrigin: 'right bottom',
            transform: 'translateZ(-150px)' 
          }}
        >
          <img src="/Group 633123.svg" className="w-full h-full object-contain object-right-bottom" alt="Wayang Kanan" />
        </div>
      </motion.div>

      {/* 3D World Canvas (Z-Zoomed) */}
      <motion.div 
        style={{ 
          z: worldZ,
          transformStyle: 'preserve-3d' 
        }}
        className="absolute inset-0 flex items-center justify-center origin-center preserve-3d"
      >
        {/* Red Carpet */}

        {/* Temple Door Scene */}
        <motion.div 
          style={{ 
            opacity: doorFrameOpacity,
            transform: 'translateZ(-1500px)', 
            transformStyle: 'preserve-3d' 
          }}
          className="absolute"
        >
          <div className="relative flex justify-center items-center preserve-3d">
            <div className="relative w-[800px] h-[1080px] shadow-[0_0_100px_rgba(212,175,55,0.2)]" style={{ transformStyle: 'preserve-3d' }}>
              {/* Sayap Ornamen Kiri */}
              <img 
                src="/Group 633125.svg" 
                className="absolute pointer-events-none z-10" 
                style={{ 
                  left: '-280px', 
                  top: '280px', 
                  width: '468px', 
                  height: '571px',
                  transform: 'translateZ(-10px)' 
                }}
                alt="Ornamen Kiri" 
              />

              {/* Sayap Ornamen Kanan */}
              <img 
                src="/Group 633128.svg" 
                className="absolute pointer-events-none z-10" 
                style={{ 
                  right: '-280px', 
                  top: '280px', 
                  width: '468px', 
                  height: '554px',
                  transform: 'translateZ(-10px)' 
                }}
                alt="Ornamen Kanan" 
              />

              {/* Luaran Pintu */}
              <img 
                src="/Luaran_Pintu.svg" 
                className="absolute inset-0 w-full h-full object-contain pointer-events-none z-30" 
                alt="Bingkai Pintu" 
              />
              
              {/* Doors Container */}
              <div className="absolute inset-0 preserve-3d z-20" style={{ width: '100%', height: '100%' }}>
                {/* Pintu Kiri */}
                <motion.div 
                  className="absolute origin-left"
                  style={{ 
                    rotateY: leftDoorRotateY,
                    transformStyle: 'preserve-3d',
                    left: '23.333%',
                    top: '49.657%',
                    width: '26.852%',
                    height: '50.343%',
                  }}
                >
                  <img src="/Pintu(Kiri).svg" className="w-full h-full object-fill" alt="Pintu Kiri" />
                </motion.div>

                {/* Pintu Kanan */}
                <motion.div 
                  className="absolute origin-right"
                  style={{ 
                    rotateY: rightDoorRotateY,
                    transformStyle: 'preserve-3d',
                    right: '23.333%',
                    top: '49.657%',
                    width: '26.852%',
                    height: '50.343%',
                  }}
                >
                  <img src="/Pintu(Kanan).svg" className="w-full h-full object-fill" alt="Pintu Kanan" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stage Scene Behind Door */}
        <motion.div 
          className="absolute w-[1920px] h-[1080px] flex items-center justify-center pointer-events-none"
          style={{ 
            opacity: stageOpacity,
            transform: 'translateZ(-1700px)', 
            transformStyle: 'preserve-3d'
          }}
        >
          <img 
            src="/stage_scene.png" 
            className="w-full h-full object-cover" 
            alt="Stage Scene" 
          />
        </motion.div>
      </motion.div>

      {/* Control Panel (Fades out when in cinematic mode unless hovered) */}
      <div 
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl transition-all duration-500 ${
          isCinematic ? 'opacity-0 hover:opacity-100 translate-y-4 hover:translate-y-0' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col gap-4 bg-black/75 border border-[#d4af37]/40 rounded-2xl p-5 md:p-6 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col">
              <h1 className="text-[#d4af37] font-serif text-lg tracking-[2px] font-bold uppercase">
                Pengendali Animasi (Hanya Pintu Buka)
              </h1>
              <p className="text-white/50 text-xs tracking-wider uppercase font-medium">
                Status: <span className="text-[#d4af37]">{getStepLabel(currentProgress)}</span>
              </p>
            </div>

            {/* Top Toolbar Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCinematic(!isCinematic)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-all duration-300 ${
                  isCinematic 
                    ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.4)]' 
                    : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:bg-white/10'
                }`}
                title="Sembunyikan panel kontrol (bisa ditampilkan kembali jika hover ke bawah layar)"
              >
                {isCinematic ? "Mode Biasa" : "Mode Sinematik"}
              </button>

              <button
                onClick={() => jumpToStep(0)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border bg-red-950/20 text-red-400 border-red-500/30 hover:bg-red-900/30 transition-all duration-300"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Interactive Timeline Scrubber */}
          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between text-xs text-white/40 font-mono">
              <span>0% (Gerbang)</span>
              <span>75% (Tiba di Pintu)</span>
              <span>100% (Pintu Terbuka)</span>
            </div>
            <div className="relative group w-full flex items-center h-6">
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={currentProgress}
                onChange={handleSliderChange}
                className="w-full accent-[#d4af37] h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#d4af37]/50"
              />
              <div className="absolute inset-x-0 h-1.5 bg-transparent pointer-events-none flex justify-between px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/40 ml-[75%]" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
              </div>
            </div>
          </div>

          {/* Playback Controls & Speed Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4">
            
            {/* Main Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 active:scale-95 ${
                  isPlaying 
                    ? 'bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                    : 'bg-[#d4af37] text-black hover:bg-[#d4af37]/90 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                }`}
              >
                {isPlaying ? (
                  <>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                    Pause
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    Mainkan
                  </>
                )}
              </button>

              <button
                onClick={handleReplay}
                className="flex items-center justify-center gap-2 p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all duration-300"
                title="Mulai Ulang Animasi dari 0%"
              >
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3"/>
                </svg>
              </button>
            </div>

            {/* Quick Step Bookmarks */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] text-white/40 uppercase tracking-widest mr-1">Lompat ke:</span>
              <button 
                onClick={() => jumpToStep(0)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
                  currentProgress < 5 
                    ? 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40' 
                    : 'bg-white/5 text-white/60 hover:text-white border border-transparent'
                }`}
              >
                Awal
              </button>
              <button 
                onClick={() => jumpToStep(75)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
                  currentProgress >= 70 && currentProgress < 80 
                    ? 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40' 
                    : 'bg-white/5 text-white/60 hover:text-white border border-transparent'
                }`}
              >
                Depan Pintu
              </button>
              <button 
                onClick={() => jumpToStep(100)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
                  currentProgress >= 95 
                    ? 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40' 
                    : 'bg-white/5 text-white/60 hover:text-white border border-transparent'
                }`}
              >
                Pintu Terbuka
              </button>
            </div>

            {/* Speed Control Button Group */}
            <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-lg border border-white/5">
              {[0.5, 1, 1.5, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => handleSpeedChange(s)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                    speed === s 
                      ? 'bg-[#d4af37] text-black shadow-md' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
