import { useState } from 'react';

export default function Avatar({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);
  const fallback = '/images/fallback-avatar.svg';

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (imgSrc !== fallback) {
          setImgSrc(fallback);
        }
      }}
      width={32}
      height={32}
    />
  );
}
