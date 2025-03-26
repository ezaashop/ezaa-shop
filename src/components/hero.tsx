import Image from "next/image";
import HeroImg from "../../public/images/hero-img.png";
import Container from "./container";
import { H1, Paragraph, Small } from "@/components/typography";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="bg-radial from-blue-400 from-40% to-blue-700 text-white flex items-center h-96">
      <Container className="flex flex-col md:flex-row items-center justify-between w-full gap-10">
        {/* Left Content */}
        <div className="text-center md:text-left">
          <Small className="text-signature font-semibold tracking-wide">
            HOT PRODUCTS
          </Small>

          <H1 className="mt-2 text-white">
            Get Your Gadget <br /> On This Store
          </H1>

          <Paragraph className="mt-4 text-muted-foreground">Start from</Paragraph>
          <H1 className="text-signature text-2xl mt-1">$28.00</H1>

          <Button
            variant={"signature"}
            className="mt-6 text-white font-semibold"
          >
            LEARN MORE
          </Button>
        </div>

        <Image src={"/images/hero-img.png"} width={400} height={400} alt="Hero" className="hidden md:block object-contain" />
      </Container>
    </div>
  );
};

export default Hero;
