"use client";

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import DoorScene from '@/components/DoorScene';

export default function Home() {
  const [phase, setPhase] = useState('start');
  const worldControls = useAnimation();
  const [isDoorOpen, setIsDoorOpen] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      // 1. Diam sebentar di awal lorong
      await new Promise(r => setTimeout(r, 500));
      
      // 2. Berjalan menyusuri lorong (melewati pigura)
      // Pintu ada di z = -3000. Kita maju ke z = 2200 (jadi dunia mundur 2200)
      // Sehingga kita berada di z = -800 relatif terhadap pintu (pas di depan pintu).
      setPhase('walking');
      await worldControls.start({ 
        z: 2200, 
        transition: { duration: 4, ease: "easeInOut" } 
      });
      
      // 3. Berhenti di depan pintu, lalu buka pintu
      setPhase('at-door');
      setIsDoorOpen(true);
      await new Promise(r => setTimeout(r, 2500)); // Tunggu animasi pintu terbuka
      
      // 4. Maju menembus pintu menuju teks "COMING SOON"
      // Teks ada di z = -1000 relatif terhadap pintu (berarti z = -4000 absolut)
      // Kita memajukan dunia ke z = 3800 agar teks membesar tepat di depan kamera
      setPhase('zooming');
      await worldControls.start({ 
        z: 3800, 
        transition: { duration: 3, ease: "easeInOut" } 
      });
    };

    sequence();
  }, [worldControls]);

  return (
    <main className="relative w-screen h-screen bg-[#050505] overflow-hidden" style={{ perspective: '800px' }}>
      
      {/* Wrapper Dunia 3D */}
      <motion.div 
        animate={worldControls}
        initial={{ z: 0 }}
        className="absolute inset-0 flex items-center justify-center origin-center preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* Karpet Merah */}
        <div 
          className="absolute w-[600px] h-[5000px] bg-[#8b0000] shadow-[0_0_50px_rgba(139,0,0,0.5)] border-x-4 border-[#d4af37]"
          style={{ 
            transform: 'translateY(400px) translateZ(-2000px) rotateX(90deg)',
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 100px, rgba(0,0,0,0.2) 100px, rgba(0,0,0,0.2) 102px)'
          }}
        ></div>

        {/* Lampu / Cahaya Lorong (opsional) */}
        <div className="absolute w-[200px] h-[5000px] bg-gradient-to-t from-transparent via-[#d4af37] to-transparent opacity-10" style={{ transform: 'translateY(390px) translateZ(-2000px) rotateX(90deg)', filter: 'blur(50px)' }}></div>

        {/* Pigura Kiri (Foto 1) */}
        <div 
          className="absolute w-[300px] h-[400px] md:w-[400px] md:h-[500px] border-[20px] border-[#d4af37] bg-[#1a1a1a] flex items-center justify-center shadow-[20px_20px_50px_rgba(0,0,0,0.9)]"
          style={{ transform: 'translateX(-500px) translateY(-50px) translateZ(-800px) rotateY(15deg)' }}
        >
           <div className="text-white text-center p-4">
             <span className="text-6xl block mb-4">📸</span>
             <p className="text-[#d4af37] font-serif text-xl">Proker Pertama</p>
           </div>
        </div>

        {/* Pigura Kanan (Foto 2) */}
        <div 
          className="absolute w-[300px] h-[400px] md:w-[400px] md:h-[500px] border-[20px] border-[#d4af37] bg-[#1a1a1a] flex items-center justify-center shadow-[-20px_20px_50px_rgba(0,0,0,0.9)]"
          style={{ transform: 'translateX(500px) translateY(-50px) translateZ(-1600px) rotateY(-15deg)' }}
        >
           <div className="text-white text-center p-4">
             <span className="text-6xl block mb-4">📸</span>
             <p className="text-[#d4af37] font-serif text-xl">Proker Kedua</p>
           </div>
        </div>

        {/* Pintu Utama di Ujung Lorong */}
        <div className="absolute" style={{ transform: 'translateZ(-3000px)', transformStyle: 'preserve-3d' }}>
           <DoorScene isOpen={isDoorOpen} />
        </div>

      </motion.div>

    </main>
  );
}
