import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';
import styles from './Avatar.module.scss';

interface AvatarProps {
  src: string | null | undefined;
  alt?: string;
  size?: number;
  className?: string;
}

const GRADIENTS = [
  'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)', // Orange/Red
  'linear-gradient(135deg, #4E54C8 0%, #8F94FB 100%)', // Blue/Purple
  'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', // Green
  'linear-gradient(135deg, #FC466B 0%, #3F5EFB 100%)', // Pink/Blue
  'linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)', // Purple/Pink
  'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)', // Blue
  'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)', // Pink/Orange
];

function getGradientForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % GRADIENTS.length;
  return GRADIENTS[index];
}

function getInitials(name: string): string {
  if (!name || name.trim() === '' || name.toLowerCase() === 'avatar') return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({ src, alt = 'Avatar', size, className = '' }: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [src]);

  const initials = getInitials(alt);
  const showInitials = !src || imgError;

  return (
    <div 
      className={`${styles.avatarContainer} ${className}`}
      style={size ? { width: size, height: size, minWidth: size, minHeight: size } : undefined}
    >
      {showInitials ? (
        <div 
          className={styles.initialsContainer}
          style={{ background: getGradientForName(alt) }}
        >
          {initials || <User size="50%" />}
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className={styles.avatarImage}
          sizes={size ? `${size}px` : "100%"}
          onError={() => setImgError(true)}
        />
      )}
    </div>
  );
}

