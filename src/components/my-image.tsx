import { baseUrl } from "@/config/constants";
import { cn } from "@/lib/utils";
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
  const imgSrc = hasBaseUrl ? baseUrl + "/" + src : src;
  return (
    <Image src={imgSrc} alt={alt} className={cn("", className)} {...rest} />
  );
};

export default MyImage;
