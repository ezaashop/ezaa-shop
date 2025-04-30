"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { PhotoProvider, PhotoView } from "react-photo-view";
import MyImage from "./my-image";
import getImageUrl from "@/utils/getImageUrl";

interface Image {
  id?: number;
  image: string;
}

interface ImageCarouselProps {
  images: Image[];
  altText?: string;
  size?: number;
  layout?: "single" | "grid";
  className?: string;
  imageClasses?: string;
}

const ImageCarousel = ({
  images,
  altText = "Product image",
  size = 100,
  layout = "single",
  className,
  imageClasses,
}: ImageCarouselProps) => {
  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-36 text-sm text-muted-foreground">
        No image
      </div>
    );
  }

  return (
    <PhotoProvider>
      <Carousel
        opts={{
          loop: true,
          align: layout === "grid" ? "start" : "center",
        }}
        autoplay
        delay={3000}
        className={cn("w-full", className)}
      >
        <CarouselContent>
          {images.map((image, idx) => (
            <CarouselItem
              key={image.id || idx}
              className={layout === "grid" ? "basis-auto" : ""}
            >
              <PhotoView src={getImageUrl(image.image)}>
                <MyImage
                  src={image.image}
                  alt={altText}
                  width={size}
                  height={size}
                  className={cn(`rounded-xl object-cover object-center ${
                    layout === "grid"
                      ? "aspect-square w-20 h-20 border p-1 cursor-pointer"
                      : "h-48 md:h-full aspect-square"
                  }`, imageClasses)}
                />
              </PhotoView>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </PhotoProvider>
  );
};

export default ImageCarousel;
