"use client";

import { useState } from "react";

interface AuthorImageProps {
  src?: string;
  alt: string;
  name: string;
  width?: number;
  height?: number;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AuthorImage({
  src,
  alt,
  name,
  width = 120,
  height = 120,
  className = "",
}: AuthorImageProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={`flex items-center justify-center bg-panel2 text-gold font-bold text-2xl ${className}`}
        style={{ width, height }}
      >
        {getInitials(name)}
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
