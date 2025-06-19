"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Banner from "../../public/images/banner.png";
import Banner2 from "../../public/images/banner2.jpg";
import { useState, useEffect } from "react";

const Hero = () => {
  const images = [Banner, Banner2];
  const [activeIdx, setActiveIdx] = useState(0);
  const [carouselApi, setCarouselApi] = useState<any>(null);

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setActiveIdx(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect);
    onSelect();
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full rounded-2xl shadow-xl overflow-hidden mt-4">
      <Carousel
        autoplay={true}
        delay={3000}
        setApi={setCarouselApi}
        className="rounded-2xl"
      >
        <CarouselContent>
          {images.map((image, idx) => (
            <CarouselItem key={idx} className="w-full transition-all duration-700 ease-in-out">
              <div className="w-full aspect-[1676/447] relative overflow-hidden">
                <Image
                  src={image}
                  alt={`Banner ${idx + 1}`}
                  fill
                  className="object-cover object-center transition-all duration-700 scale-100 group-hover:scale-105"
                  sizes="100vw"
                  priority
                  style={{
                    opacity: activeIdx === idx ? 1 : 0.5,
                    transition: 'opacity 0.7s',
                  }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                {/* Optional: Add text or CTA here */}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* Navigation dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 w-4 rounded-full transition-all duration-300 ${
              activeIdx === idx ? "bg-signature" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
