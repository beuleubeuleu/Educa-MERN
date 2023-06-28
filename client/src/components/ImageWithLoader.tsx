import { useState } from 'react';
import { Loader }          from "./Loader/Loader.tsx";

type ImageProps = {
  imagePath: string;
  imageAlt: string;
  width: string;
  height: string;
}

export const ImageWithLoader = ({ imagePath, imageAlt, width, height }: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    // Handle error if necessary
    setIsLoading(false);
  };

  return (
      <>
        {isLoading && <Loader />}
        <img
            src={imagePath}
            alt={imageAlt}
            width={width}
            height={height}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
        />
      </>
  );
}