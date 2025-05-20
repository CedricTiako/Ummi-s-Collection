import React from 'react';
import { useMediaQuery } from 'react-responsive';

interface CarouselProps {
  images: string[];
  interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ images, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, images.length]);

  return (
    <div className=" w-full h-full hero-carousel">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute carousel-image ${
            index === currentIndex ? 'fade-in' : 'fade-out'
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
            ...(isMobile ? {
              width: '100%',
              left: 0
            } : isTablet ? {
              width: '50%',
              left: index % 2 === 0 ? '0' : '50%'
            } : {
              width: '33.33%',
              left: `${(index * 33.33)}%`
            })
          }}
        />
      ))}
    </div>
  );
};

export default Carousel;
