import Link from "next/link";
import MyImage from "./my-image";

const Brand = () => {
  return (
    <Link href="/">
      <MyImage src="/images/logo.png" alt="Ezaa Shop" width={80} height={80} />
    </Link>
  );
};

export default Brand;
