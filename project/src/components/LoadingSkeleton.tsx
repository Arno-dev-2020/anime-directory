import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-800 rounded ${className}`} />
);

export const AnimeCardSkeleton: React.FC = () => (
  <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
    <LoadingSkeleton className="absolute inset-0" />
    <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80">
      <LoadingSkeleton className="h-4 w-3/4 mb-2" />
      <LoadingSkeleton className="h-3 w-1/4" />
    </div>
  </div>
);

export const GridLoadingSkeleton: React.FC = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {[...Array(10)].map((_, i) => (
      <AnimeCardSkeleton key={i} />
    ))}
  </div>
); 