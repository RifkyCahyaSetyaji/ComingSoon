"use client";

import { motion } from 'framer-motion';

export default function DoorScene({ isOpen }) {
  return (
    <div className="relative flex justify-center items-center preserve-3d">
      
      {/* Bingkai Pintu Utama */}
      <div className="absolute w-[600px] h-[800px] border-[20px] border-[#2a1a10] shadow-[0_0_100px_rgba(212,175,55,0.2)] bg-black" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* Pintu Kiri */}
        <motion.div 
          className="absolute left-0 top-0 w-1/2 h-full bg-[#4a3525] border-r-2 border-[#2a1a10] origin-left shadow-[inset_-10px_0_50px_rgba(0,0,0,0.8)] z-20 flex items-center justify-end overflow-hidden"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isOpen ? -100 : 0 }}
          transition={{ duration: 2.5, ease: [0.645, 0.045, 0.355, 1] }}
          style={{ 
            transformStyle: 'preserve-3d',
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.2) 40px, rgba(0,0,0,0.2) 42px)'
          }}
        >
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-[20px] h-[100px] bg-gradient-to-b from-[#f9d976] via-[#d4af37] to-[#aa801d] rounded-sm shadow-md"></div>
        </motion.div>

        {/* Pintu Kanan */}
        <motion.div 
          className="absolute right-0 top-0 w-1/2 h-full bg-[#4a3525] border-l-2 border-[#2a1a10] origin-right shadow-[inset_10px_0_50px_rgba(0,0,0,0.8)] z-20 flex items-center justify-start overflow-hidden"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isOpen ? 100 : 0 }}
          transition={{ duration: 2.5, ease: [0.645, 0.045, 0.355, 1] }}
          style={{ 
            transformStyle: 'preserve-3d',
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.2) 40px, rgba(0,0,0,0.2) 42px)'
          }}
        >
           <div className="absolute left-4 top-1/2 -translate-y-1/2 w-[20px] h-[100px] bg-gradient-to-b from-[#f9d976] via-[#d4af37] to-[#aa801d] rounded-sm shadow-md"></div>
        </motion.div>

      </div>

      {/* Teks di Balik Pintu (Ditempatkan jauh di belakang sumbu Z) */}
      <div className="absolute z-10 flex flex-col items-center text-center" style={{ transform: 'translateZ(-1000px)' }}>
        <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-[15px] mb-5 bg-gradient-to-r from-white via-[#d4af37] to-white bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(212,175,55,0.5)] uppercase">
          Coming Soon
        </h1>
        <p className="text-xl md:text-2xl font-light text-gray-300 tracking-widest">
          We are crafting something extraordinary.
        </p>
        
        {/* Efek Cahaya (Orb) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)] -z-10 pointer-events-none"></div>
      </div>

    </div>
  );
}
