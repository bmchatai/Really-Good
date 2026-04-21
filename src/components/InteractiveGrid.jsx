import { useRef } from 'react';

export default function InteractiveGrid() {
  const floorRef = useRef(null);
  const glowRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!glowRef.current) return;
    // +100 compensates for the inner div's top: -100px offset
    const maskStr = `radial-gradient(circle 400px at ${e.nativeEvent.offsetX}px ${e.nativeEvent.offsetY + 100}px, black 0%, transparent 100%)`;
    glowRef.current.style.WebkitMaskImage = maskStr;
    glowRef.current.style.maskImage = maskStr;
  };

  const handlePointerLeave = () => {
    if (!glowRef.current) return;
    const maskStr = `radial-gradient(circle 400px at -1000px -1000px, black 0%, transparent 100%)`;
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
        onMouseLeave={handlePointerLeave}
        className="absolute left-1/2 top-[35%] w-[300vw] h-[150vh] origin-top cursor-crosshair"
        style={{
          transform: 'translateX(-50%) rotateX(75deg) translateZ(0)',
          // Removed preserve-3d to stop extreme geometric/Z-fighting GPU glitches across devices
        }}
      >
        {/* Base Grid - uses transform-based animation (GPU-composited, no repaint) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-full grid-forward-animation"
            style={{
              top: '-100px',
              height: 'calc(100% + 100px)',
              backgroundImage: `
                linear-gradient(rgba(47, 215, 191, 0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(47, 215, 191, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
              willChange: 'transform',
            }}
          ></div>
        </div>

        {/* Glowing Dots at line intersections */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
          <div
            className="absolute w-full grid-dots-animation"
            style={{
              top: '-100px',
              height: 'calc(100% + 100px)',
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(47, 215, 191, 1) 2px, transparent 3px)`,
              backgroundSize: '100px 100px',
              willChange: 'transform',
            }}
          ></div>
        </div>

        {/* Interactive Glowing Grid - Revealed by Mouse Mask */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            ref={glowRef}
            className="absolute w-full grid-forward-animation"
            style={{
              top: '-100px',
              height: 'calc(100% + 100px)',
              backgroundImage: `
                linear-gradient(rgba(47, 215, 191, 1) 2px, transparent 2px),
                linear-gradient(90deg, rgba(47, 215, 191, 1) 2px, transparent 2px)
              `,
              backgroundSize: '100px 100px',
              WebkitMaskImage: `radial-gradient(circle 400px at -1000px -1000px, black 0%, transparent 100%)`,
              maskImage: `radial-gradient(circle 400px at -1000px -1000px, black 0%, transparent 100%)`,
              willChange: 'transform',
            }}
          ></div>
        </div>

        {/* Scanline Effect - transform-based (GPU-composited) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-full h-[200%] moving-scanline"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(47,215,191,0.12) 50%, transparent 100%)',
              willChange: 'transform',
            }}
          ></div>
        </div>
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
          0%   { transform: translateY(0px); }
          100% { transform: translateY(100px); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-50%); }
          100% { transform: translateY(0%); }
        }
        .moving-scanline {
          animation: scanline 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
