"use client";
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import DoorScene from '@/components/DoorScene';

const STEPS = [
  { name: "Gerbang Utama", z: 0, doorOpen: false },
  { name: "Program Kerja 1", z: 400, doorOpen: false },
  { name: "Program Kerja 2", z: 1100, doorOpen: false },
  { name: "Buka Pintu", z: 1100, doorOpen: true },
  { name: "Panggung Utama", z: 1650, doorOpen: true }
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const worldControls = useAnimation();

  // Animasi kamera ketika step berubah
  useEffect(() => {
    worldControls.start({
      z: STEPS[step].z,
      transition: { duration: 2.5, ease: "easeInOut" }
    });
  }, [step, worldControls]);

  // Slideshow otomatis (auto advance)
  useEffect(() => {
    if (isManual) return;
    
    const interval = setInterval(() => {
      setStep((prevStep) => {
        if (prevStep < STEPS.length - 1) {
          return prevStep + 1;
        } else {
          clearInterval(interval);
          return prevStep;
        }
      });
    }, 4500); // Tahan setiap scene selama 4.5 detik agar terlihat sangat jelas

    return () => clearInterval(interval);
  }, [isManual]);

  const handleNext = () => {
    setIsManual(true);
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setIsManual(true);
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleStepClick = (index) => {
    setIsManual(true);
    setStep(index);
  };

  const isDoorOpen = STEPS[step].doorOpen;
  const phase = step === 0 ? 'start' : 'animating';

  return (
    <main className="relative w-screen h-screen overflow-hidden" style={{ perspective: '800px', backgroundImage: 'url("/Background.svg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      
      {/* Wrapper Dunia 3D */}
      <motion.div 
        animate={worldControls}
        initial={{ z: 0 }}
        className="absolute inset-0 flex items-center justify-center origin-center preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* Karpet Merah & Lampu (Fades out when entering stage) */}
        <motion.div
          animate={{ opacity: step <= 3 ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 flex items-center justify-center preserve-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Karpet Merah */}
          <div 
            className="absolute w-[600px] h-[2000px] shadow-[0_0_50px_rgba(139,0,0,0.5)]"
            style={{ 
              transform: 'translateY(540px) translateZ(-800px) rotateX(90deg)',
              backgroundImage: 'url("/Karpet.svg")',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>

          {/* Lampu / Cahaya Lorong */}
          <div className="absolute w-[200px] h-[2000px] bg-gradient-to-t from-transparent via-[#d4af37] to-transparent opacity-10" style={{ transform: 'translateY(530px) translateZ(-800px) rotateX(90deg)', filter: 'blur(50px)' }}></div>
        </motion.div>

        {/* --- ORNAMEN LATAR BALI (Hanya tampil di Step 0) --- */}
        <motion.div
          animate={{ opacity: step === 0 ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 flex items-center justify-center preserve-3d pointer-events-none"
          style={{ transformStyle: 'preserve-3d' }}
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

          {/* Gapura Bali Kiri (Candi Bentar) */}
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

          {/* Gapura Bali Kanan (Candi Bentar) */}
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

        {/* --- AKHIR ORNAMEN LATAR BALI --- */}

        {/* Pigura Kiri (Foto 1) - Tampil hanya di Step 1 */}
        <motion.div 
          className="absolute w-[300px] h-[400px] md:w-[400px] md:h-[500px] flex items-center justify-center shadow-[20px_20px_50px_rgba(0,0,0,0.9)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: step === 1 ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          style={{ transform: 'translateX(-500px) translateY(-50px) translateZ(-800px) rotateY(15deg)' }}
        >
          <img src="/Frame1.svg" className="w-full h-full object-contain" alt="Proker Pertama" />
        </motion.div>

        {/* Pigura Kanan (Foto 2) - Tampil hanya di Step 2 */}
        <motion.div 
          className="absolute w-[300px] h-[400px] md:w-[400px] md:h-[500px] flex items-center justify-center shadow-[-20px_20px_50px_rgba(0,0,0,0.9)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: step === 2 ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          style={{ transform: 'translateX(500px) translateY(-50px) translateZ(-1600px) rotateY(-15deg)' }}
        >
          <img src="/Frame2.svg" className="w-full h-full object-contain" alt="Proker Kedua" />
        </motion.div>

        {/* Pintu Utama di Ujung Lorong (Fades out when entering stage in Step 4) */}
        <motion.div 
          className="absolute" 
          animate={{ opacity: step <= 3 ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          style={{ transform: 'translateZ(-1500px)', transformStyle: 'preserve-3d' }}
        >
           <DoorScene isOpen={isDoorOpen} />
        </motion.div>

        {/* Stage Scene di Balik Pintu (Fades in when door opens in Step 3 & 4) */}
        <motion.div 
          className="absolute w-[1920px] h-[1080px] flex items-center justify-center pointer-events-none"
          animate={{ opacity: step >= 3 ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          style={{ 
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

      {/* --- KONTROL NAVIGASI INTERAKTIF --- */}
      
      {/* Tombol Sebelumnya (Kiri) */}
      {step > 0 && (
        <button 
          onClick={handlePrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full flex items-center justify-center bg-black/40 border border-[#d4af37]/60 text-[#d4af37] hover:bg-[#d4af37]/20 hover:border-[#d4af37] transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:scale-105 active:scale-95"
          aria-label="Sebelumnya"
        >
          <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Tombol Selanjutnya (Kanan) */}
      {step < STEPS.length - 1 && (
        <button 
          onClick={handleNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full flex items-center justify-center bg-black/40 border border-[#d4af37]/60 text-[#d4af37] hover:bg-[#d4af37]/20 hover:border-[#d4af37] transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:scale-105 active:scale-95"
          aria-label="Selanjutnya"
        >
          <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Navigasi Titik & Label (Bawah) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3">
        {/* Nama Scene Aktif */}
        <span className="text-[#d4af37] text-sm uppercase tracking-[4px] font-serif bg-black/50 px-4 py-1.5 rounded-full border border-[#d4af37]/30 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
          {STEPS[step].name}
        </span>
        
        {/* Titik Indikator */}
        <div className="flex items-center gap-3.5 bg-black/40 px-5 py-3 rounded-full border border-white/10 backdrop-blur-md">
          {STEPS.map((s, index) => (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 hover:scale-125 ${
                step === index 
                  ? 'bg-[#d4af37] shadow-[0_0_10px_#d4af37] scale-110' 
                  : 'bg-white/30 hover:bg-white/60'
              }`}
              title={s.name}
            />
          ))}
        </div>
      </div>

    </main>
  );
}

