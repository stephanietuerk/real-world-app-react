import { useState } from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  round?: boolean;
  filter?: string;
  imgClass?: string;
}

export default function Avatar({
  src,
  alt,
  size = 32,
  round = true,
  filter = 'none',
  imgClass,
}: AvatarProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const fallback = '/images/fallback-avatar.svg';

  return (
    <img
      className={imgClass}
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
