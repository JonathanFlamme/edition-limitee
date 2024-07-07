import React from 'react';
import Image from 'next/image';
import image1 from '@/public/galerie/image1.jpg';
import image2 from '@/public/galerie/image2.png';
import image3 from '@/public/galerie/image3.png';
import image4 from '@/public/galerie/image4.jpg';

import {
  Carousel,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  SliderMainItem,
  CarouselThumbsContainer,
  SliderThumbItem,
} from '@/components/ui/extension/carousel';
import { jost } from '@/utils/font';

const Galerie = () => {
  const images = [image1, image2, image3, image4];

  return (
    <div id="galerie" className="bg-black bg-opacity-50 py-16">
      <h1 className={`${jost.className} text-7xl text-center text-white font-bold pb-16`}>
        Galerie
      </h1>
      <Carousel>
        <CarouselNext className="hidden md:block right-4 top-1/3 transform -translate-y-1/2" />
        <CarouselPrevious className="hidden md:block left-4 top-1/3 transform -translate-y-1/2" />
        <CarouselMainContainer>
          {images.map((image, index) => (
            <SliderMainItem key={index} className="bg-transparent">
              <div className="flex items-center justify-center rounded-xl">
                <div className="md:h-[35rem]">
                  <Image
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="rounded-xl w-full h-full object-cover"
                  />
                </div>
              </div>
            </SliderMainItem>
          ))}
        </CarouselMainContainer>
        <CarouselThumbsContainer className="flex space-x-2">
          {images.map((image, index) => (
            <SliderThumbItem key={index} index={index} className="bg-transparent">
              <div className="outline outline-1 outline-border size-full flex items-center justify-center rounded-xl bg-background overflow-hidden">
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="rounded-xl w-full h-full object-cover"
                />
              </div>
            </SliderThumbItem>
          ))}
        </CarouselThumbsContainer>
      </Carousel>
    </div>
  );
};

export default Galerie;
