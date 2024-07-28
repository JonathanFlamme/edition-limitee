import Image from 'next/image';

import {
  Carousel,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  SliderMainItem,
  CarouselThumbsContainer,
  SliderThumbItem,
} from '@/src/components/ui/extension/carousel';
import { jost } from '@/src/utils/font';
import { GalerieType } from '@/@type/type';

async function fetchGalerieData() {
  const baseUrl = process.env.BASE_URL || `https://${process.env.VERCEL_URL}`;

  const res = await fetch(`${baseUrl}/api/home/galerie`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Galerie() {
  const images: GalerieType[] = await fetchGalerieData();

  return (
    <div id="galerie" className="bg-black bg-opacity-50 py-16">
      <h1 className={`${jost.className} text-7xl text-center text-white font-bold pb-16`}>
        Galerie
      </h1>
      <Carousel>
        <CarouselNext className="hidden md:block right-4 top-1/3 transform -translate-y-1/2" />
        <CarouselPrevious className="hidden md:block left-4 top-1/3 transform -translate-y-1/2" />
        <CarouselMainContainer>
          {images?.map((image, index) => (
            <SliderMainItem key={index} className="bg-transparent">
              <div className="flex items-center justify-center rounded-xl">
                <div className="md:h-[35rem]">
                  <Image
                    src={image.url}
                    alt={`Slide ${index + 1}`}
                    width={400}
                    height={400}
                    className="rounded-xl w-full h-full object-cover"
                    priority
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
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  width={800}
                  height={400}
                  className="rounded-xl w-full h-full object-cover"
                  priority
                />
              </div>
            </SliderThumbItem>
          ))}
        </CarouselThumbsContainer>
      </Carousel>
    </div>
  );
}
