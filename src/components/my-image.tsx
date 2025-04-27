import { baseUrl } from "@/config/constants";
import { cn } from "@/lib/utils";
import getImageUrl from "@/utils/getImageUrl";
import Image, { ImageProps } from "next/image";

interface MyImageProps extends Omit<ImageProps, "src"> {
  src: string;
  alt: string;
  className?: string;
  hasBaseUrl?: boolean;
}
const MyImage = ({
  src,
  alt,
  className,
  hasBaseUrl = true,
  ...rest
}: MyImageProps) => {
  const imgSrc = hasBaseUrl ? getImageUrl(src) : src;
  return (
    <Image src={imgSrc} alt={alt} className={cn("object-cover ", className)} {...rest} />
  );
};

export default MyImage;
