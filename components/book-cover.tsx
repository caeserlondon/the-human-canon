"use client";

import { useState } from "react";

interface BookCoverProps {
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function BookCover({ src, alt, width = 200, height = 300, className = "" }: BookCoverProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={`flex items-center justify-center bg-panel2 text-muted2 ${className}`}
      >
        <span className="text-xs">No cover</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
    />
  );
}
