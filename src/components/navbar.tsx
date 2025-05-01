"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Brand from "./brand";
import CartButton from "./cart-btn";
import Container from "./container";
import Favorites from "./favorites";
import SearchProducts from "./search";
import { H3 } from "./typography";
import UserBtn from "./user-btn";

const Navbar = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const login = pathname.includes("/login");
  const signup = pathname.includes("/signup");
  const auth = login || signup;
  return (
    <motion.header
      className={cn(
        "sticky top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b"
      )}
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ duration: 0.3 }}
    >
      <Container className="w-full flex items-center">
        <div className="flex-1 flex justify-start items-center">
          <Brand />
          {auth && (
            <H3 className="text-signature ml-4">
              {login ? "Login" : "Sign Up"}
            </H3>
          )}
        </div>
        {auth ? (
          <>
            <Link href="#" className="text-signature">
              Need help?
            </Link>
          </>
        ) : (
          <>
            {/* <div className="flex-1 flex justify-center">
              <SearchProducts />
              </div> */}
            <div className="flex-1 flex justify-end">
              <ActionButtons />
            </div>
          </>
        )}
      </Container>
    </motion.header>
  );
};

export default Navbar;

const ActionButtons = () => {
  return (
    <div className="flex items-center gap-4">
      <SearchProducts />
      <Favorites />
      <CartButton />
      <UserBtn />
    </div>
  );
};
