import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Img1 from "../../public/images/img-1.jpg";
import Img2 from "../../public/images/img-2.jpg";
import Img3 from "../../public/images/img-3.jpg";
import { H1, H2, Paragraph, Small } from "./typography";
import { Button } from "./ui/button";

const Hero = () => {
  // const images = [Img1, Img2, Img3];
  const images = [Img1];
  return (
    <div className="relative w-full">
      {/* Uncomment if needed */}
      {/* <div className="absolute z-10 text-center md:text-left">
      <Small className="text-signature font-semibold tracking-wide">
        HOT PRODUCTS
      </Small>
      <H2 className="mt-2 text-white">
        Get Your Gadget <br /> On This Store
      </H2>
      <Paragraph className="mt-4 text-muted-foreground">Start from</Paragraph>
      <H2 className="text-signature text-2xl mt-1">200 PKR</H2>
    </div> */}

      <Carousel autoplay={true} delay={5000}>
        <CarouselContent>
          {images.map((image, idx) => (
            <CarouselItem key={idx} className="w-full">
              <div className="w-full h-40 md:h-80 relative overflow-hidden">
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
