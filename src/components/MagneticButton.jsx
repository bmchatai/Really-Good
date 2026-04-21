import { useRef, useCallback } from 'react';
import gsap from 'gsap';

/**
 * Wraps any CTA in a magnetic container that drifts toward the cursor.
 * strength: fraction of cursor-offset to apply (0.32 = 32% pull)
 */
export default function MagneticButton({ children, strength = 0.32, className = '', style }) {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - left - width  / 2) * strength,
      y: (e.clientY - top  - height / 2) * strength,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto',
    });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}
