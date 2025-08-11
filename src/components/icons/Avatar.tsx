import { useState } from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  round?: boolean;
  filter?: string;
}

export default function Avatar({
  src,
  alt,
  size = 32,
  round = true,
  filter = 'none',
}: AvatarProps) {
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
      width={size}
      height={size}
      style={{
        borderRadius: round ? size : 0,
        filter: filter,
      }}
    />
  );
}
