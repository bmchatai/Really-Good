import { useId } from "react";

/**
 * Backlight component creates a glowing aura effect around its children
 * especially effective for videos, images, and SVGs.
 */
export function Backlight({ blur = 50, children, className }) {
  const id = useId();

  return (
    <div className={className}>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id={id} y="-50%" x="-50%" width="200%" height="200%">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={blur}
            result="blurred"
          />
          <feColorMatrix
            type="saturate"
            in="blurred"
            values="4"
          />
          <feComposite in="SourceGraphic" operator="over" />
        </filter>
      </svg>

      <div style={{ filter: `url(#${id})` }}>{children}</div>
    </div>
  );
}
