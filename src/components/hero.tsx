import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Banner from "../../public/images/banner.png";

const Hero = () => {
  const images = [Banner];
  if (!images || images.length === 0) return;
  return (
    <div className="relative w-full">
      <Carousel autoplay={true} delay={5000}>
        <CarouselContent>
          {images.map((image, idx) => (
            <CarouselItem key={idx} className="w-full">
              <div className="w-full h-36 md:h-[20rem] relative overflow-hidden">
                <Image
                  src={image}
                  alt={`Banner ${idx + 1}`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 100vw"
                  priority
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Hero;
