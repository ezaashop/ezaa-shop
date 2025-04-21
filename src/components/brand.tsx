import Link from "next/link";
import MyImage from "./my-image";

const Brand = () => {
  return (
    <Link href="/">
      <MyImage
        className="md:hidden"
        src="/images/logo.png"
        alt="Ezaa Shop"
        width={60}
        height={60}
        hasBaseUrl={false}
      />
      <MyImage
        className="hidden md:block"
        src="/images/logo.png"
        alt="Ezaa Shop"
        width={80}
        height={80}
        hasBaseUrl={false}
      />
    </Link>
  );
};

export default Brand;
