import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SplitTextAnimation({ text, className, delay = 0 }) {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.split-char',
        { y: '110%', opacity: 0, rotateX: -90 },
        {
          y: '0%',
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power4.out',
          delay: delay,
        }
      );
    }, container);

    return () => ctx.revert();
  }, [delay]);

  // Split text by lines, words, then characters to maintain layout
  const lines = text.split('\n');

  return (
    <span ref={container} className={className} style={{ display: 'inline-block', perspective: '400px' }}>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} style={{ display: 'block' }}>
          {line.split(' ').map((word, wordIdx) => (
            <span key={wordIdx} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.1em', marginRight: '0.25em' }}>
              {word.split('').map((char, charIdx) => (
                <span
                  key={charIdx}
                  className="split-char"
                  style={{ display: 'inline-block', transformOrigin: 'bottom' }}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
