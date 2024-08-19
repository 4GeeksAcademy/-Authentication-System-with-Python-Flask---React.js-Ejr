import React, { useRef, useState } from "react";
import "../../styles/spotlightBorder.css";

export const ImageSpotlightBorder = ({ src, alt }) => {
  const imgRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!imgRef.current || isFocused) return;

    const img = imgRef.current;
    const rect = img.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div className="image-wrapper relative">
      <img
        src={src}
        alt={alt}
        ref={imgRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="base-image rounded-lg aspect-[3/2] "
      />
      <div
        style={{
          border: "2px solid rgb(16, 185, 129)",
          opacity,
          WebkitMaskImage: `radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent)`,
        }}
        aria-hidden="true"
        className="overlay-image absolute inset-0 pointer-events-none rounded-lg"
      />
    </div>
  );
};
