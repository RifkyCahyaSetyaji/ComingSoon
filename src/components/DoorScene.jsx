"use client";

import { motion } from 'framer-motion';

export default function DoorScene({ isOpen }) {
  return (
    <div className="relative flex justify-center items-center preserve-3d">
      
      {/* Bingkai Pintu Utama */}
      <div className="relative w-[800px] h-[1080px] shadow-[0_0_100px_rgba(212,175,55,0.2)]" style={{ transformStyle: 'preserve-3d' }}>
        {/* Ornamen Sayap Kiri */}
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

        {/* Ornamen Sayap Kanan */}
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

        {/* Frame / Luaran Pintu */}
        <img 
          src="/Luaran_Pintu.svg" 
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-30" 
          alt="Bingkai Pintu" 
        />
        
        {/* Container Pintu (Di belakang Frame / Luaran Pintu agar terlihat pas di dalam bingkai) */}
        <div className="absolute inset-0 preserve-3d z-20" style={{ width: '100%', height: '100%' }}>
          {/* Pintu Kiri */}
          <motion.div 
            className="absolute origin-left"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isOpen ? 110 : 0 }}
            transition={{ duration: 2.5, ease: [0.645, 0.045, 0.355, 1] }}
            style={{ 
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
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isOpen ? -110 : 0 }}
            transition={{ duration: 2.5, ease: [0.645, 0.045, 0.355, 1] }}
            style={{ 
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
  );
}
