import { useRef } from 'react';

export default function InteractiveGrid() {
  const floorRef = useRef(null);
  const glowRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!glowRef.current) return;
    
    // Direct DOM manipulation prevents continuous React re-renders which cause performance glitches / lagging
    const maskStr = `radial-gradient(circle 400px at ${e.nativeEvent.offsetX}px ${e.nativeEvent.offsetY}px, black 0%, transparent 100%)`;
    glowRef.current.style.WebkitMaskImage = maskStr;
    glowRef.current.style.maskImage = maskStr;
  };

  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden bg-black pointer-events-auto"
      style={{ perspective: '800px' }}
    >
      {/* Background ambient glow at the horizon */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(47,215,191,0.15),transparent_60%)] pointer-events-none"></div>

      {/* 3D Floor Container */}
      <div 
        ref={floorRef}
        onMouseMove={handlePointerMove}
        className="absolute left-1/2 top-[35%] w-[300vw] h-[150vh] origin-top cursor-crosshair"
        style={{
          transform: 'translateX(-50%) rotateX(75deg) translateZ(0)',
          // Removed preserve-3d to stop extreme geometric/Z-fighting GPU glitches across devices
        }}
      >
        {/* Base Grid - Prominent turquoise lines and forward movement */}
        <div 
          className="absolute inset-0 pointer-events-none grid-forward-animation"
          style={{
            backgroundImage: `
              linear-gradient(rgba(47, 215, 191, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(47, 215, 191, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            backgroundPosition: '0 0',
            filter: 'drop-shadow(0 0 2px rgba(47,215,191,0.3))'
          }}
        ></div>
        
        {/* Glowing Dots at line intersections */}
        <div 
          className="absolute inset-0 pointer-events-none grid-dots-animation mix-blend-screen opacity-50"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(47, 215, 191, 1) 2px, transparent 3px)`,
            backgroundSize: '100px 100px',
            backgroundPosition: '0 0',
          }}
        ></div>
        
        {/* Interactive Glowing Grid - Revealed by Mouse Mask */}
        <div 
          ref={glowRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 grid-forward-animation"
          style={{
            backgroundImage: `
              linear-gradient(rgba(47, 215, 191, 1) 2px, transparent 2px),
              linear-gradient(90deg, rgba(47, 215, 191, 1) 2px, transparent 2px)
            `,
            backgroundSize: '100px 100px',
            backgroundPosition: '0 0',
            // Pre-position mask away
            WebkitMaskImage: `radial-gradient(circle 400px at -1000px -1000px, black 0%, transparent 100%)`,
            maskImage: `radial-gradient(circle 400px at -1000px -1000px, black 0%, transparent 100%)`,
            filter: 'drop-shadow(0 0 16px rgba(47, 215, 191, 1))'
          }}
        ></div>

        {/* Floating dust particles / light specs */}
        <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
             style={{
               backgroundImage: `radial-gradient(circle, rgba(47,215,191,0.8) 1.5px, transparent 2px)`,
               backgroundSize: '250px 250px',
               animation: 'dust 15s linear infinite'
             }}
        ></div>
        
        {/* Scanline Effect sweeping across the grid */}
        <div className="absolute inset-0 h-[200%] w-full pointer-events-none moving-scanline mix-blend-screen"
             style={{
               background: 'linear-gradient(to bottom, transparent 0%, rgba(47,215,191,0.15) 50%, transparent 100%)',
               backgroundSize: '100% 20%',
               animation: 'scanline 8s linear infinite'
             }}
        ></div>
      </div>
      
      {/* Vignette - Fades grid out at the edges and horizon */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none opacity-80"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000000_100%)] pointer-events-none opacity-90"></div>
      
      {/* Global CSS for the custom grid animations */}
      <style>{`
        .grid-forward-animation {
          animation: gridForward 4s linear infinite;
        }
        .grid-dots-animation {
          animation: gridForward 4s linear infinite;
        }
        @keyframes gridForward {
          0% { background-position: 0px 0px; }
          100% { background-position: 0px 100px; }
        }
        @keyframes dust {
          0% { background-position: 0px 0px; }
          100% { background-position: 250px 250px; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(50%); }
        }
      `}</style>
    </div>
  );
}
