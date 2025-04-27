"use client";

import Link from "next/link";
import { BsHeartFill } from "react-icons/bs";
const Favorites = () => {
  return (
    <Link href="/favorites">
      <BsHeartFill className="tex cursor-pointer size-6" />
    </Link>
  );
};

export default Favorites;
