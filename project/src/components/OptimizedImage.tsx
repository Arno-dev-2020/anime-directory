import React, { useState } from 'react';
import { LoadingSkeleton } from './LoadingSkeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  sizes = '100vw'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <LoadingSkeleton className="absolute inset-0" />
      )}
      {!error ? (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-opacity duration-300 
            ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setError(true);
            setIsLoading(false);
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage; 