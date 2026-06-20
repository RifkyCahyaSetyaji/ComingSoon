"use client";
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const STEPS = [
  { name: "Gerbang Utama", z: 0 },
  { name: "Program Kerja 1", z: 400 },
  { name: "Program Kerja 2", z: 1100 },
  { name: "Pintu Utama", z: 1250 }
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const worldControls = useAnimation();

  // Animasi kamera ketika step berubah (hanya zoom)
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
    }, 4500);

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

  return (
    <main 
      className="relative w-screen h-screen overflow-hidden" 
      style={{ 
        perspective: '800px', 
        backgroundImage: 'url("/Background.svg")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      {/* --- CLOUDS DI BACKGROUND TETAP (z-0: di belakang 3D world agar tidak overlap gate/wayang) --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Awan Kiri Atas */}
        <img 
          src="/Group-3.svg" 
          className="absolute object-contain" 
          style={{ width: '14%', maxWidth: '180px', left: '1%', top: '1%' }}
          alt="Awan Kiri Atas" 
        />
        {/* Awan Kiri Tengah */}
        <img 
          src="/Group.svg" 
          className="absolute object-contain" 
          style={{ width: '11%', maxWidth: '130px', left: '8%', top: '8%' }}
          alt="Awan Kiri Tengah" 
        />
        {/* Awan Kanan Atas */}
        <img 
          src="/Group-1.svg" 
          className="absolute object-contain" 
          style={{ width: '14%', maxWidth: '180px', right: '1%', top: '1%' }}
          alt="Awan Kanan Atas" 
        />
        {/* Awan Kanan Tengah */}
        <img 
          src="/Group-2.svg" 
          className="absolute object-contain" 
          style={{ width: '11%', maxWidth: '130px', right: '6%', top: '8%' }}
          alt="Awan Kanan Tengah" 
        />
      </div>
      
      <motion.div 
        animate={worldControls}
        initial={{ z: 0 }}
        className="absolute inset-0 flex items-center justify-center origin-center preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >

        {/* --- ORNAMEN LATAR BALI (Hanya tampil di Step 0: Gate & Wayang) --- */}
        <motion.div
          animate={{ opacity: step === 0 ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 flex items-center justify-center preserve-3d pointer-events-none"
          style={{ transformStyle: 'preserve-3d' }}
        >
         
        </motion.div>

        {/* --- AKHIR ORNAMEN LATAR BALI --- */}

        {/* Pigura Kiri (Foto 1) - Tampil datar tanpa rotasi (flat screen-like) di Step 1 */}
        <motion.div 
          className="absolute w-[260px] h-[360px] md:w-[320px] md:h-[440px] flex items-center justify-center shadow-[15px_15px_35px_rgba(0,0,0,0.8)] rounded-xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: step === 1 ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          style={{ 
            transform: 'translateX(-540px) translateY(80px) translateZ(-1300px)',
            transformStyle: 'preserve-3d'
          }}
        >
          <img src="/Frame1.svg" className="w-full h-full object-contain" alt="Proker Pertama" />
        </motion.div>

        {/* Pigura Kanan (Foto 2) - Tampil datar tanpa rotasi (flat screen-like) di Step 2 */}
        <motion.div 
          className="absolute w-[260px] h-[360px] md:w-[320px] md:h-[440px] flex items-center justify-center shadow-[-15px_15px_35px_rgba(0,0,0,0.8)] rounded-xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: step === 2 ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          style={{ 
            transform: 'translateX(540px) translateY(80px) translateZ(-1300px)',
            transformStyle: 'preserve-3d'
          }}
        >
          <img src="/Frame2.svg" className="w-full h-full object-contain" alt="Proker Kedua" />
        </motion.div>

        {/* Pintu Utama di Ujung Lorong (Menggunakan Pintu_karpet.svg secara statis) */}
        <motion.div 
          className="absolute" 
          style={{ transform: 'translateZ(-1500px)', transformStyle: 'preserve-3d' }}
        >
          <div className="relative flex justify-center items-center preserve-3d">
            <div className="relative w-[800px] h-[1080px] shadow-[0_0_100px_rgba(212,175,55,0.2)]" style={{ transformStyle: 'preserve-3d' }}>
              {/* Pintu Karpet Utama */}
              <img 
                src="/Pintu_karpet.svg" 
                className="absolute inset-0 w-full h-full object-contain pointer-events-none z-30" 
                alt="Pintu Karpet" 
              />
            </div>
          </div>
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
