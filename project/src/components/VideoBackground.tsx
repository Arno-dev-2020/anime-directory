import React, { useEffect, useState } from 'react';

interface VideoBackgroundProps {
  trailerId: string;
  site: string;
  fallbackImage: string;
  isVisible: boolean;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  trailerId,
  site,
  fallbackImage,
  isVisible
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  }, []);

  if (site !== 'youtube' || !isVisible) {
    return (
      <img
        src={fallbackImage}
        alt="Background"
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <img
        src={fallbackImage}
        alt="Background"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 w-full h-full">
          <iframe
            className="absolute top-1/2 left-1/2 w-[130%] h-[130%] -translate-x-1/2 -translate-y-1/2"
            style={{ pointerEvents: 'none' }}
            src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${trailerId}&playsinline=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoBackground; 