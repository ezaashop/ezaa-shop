"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import Brand from "./brand";
import CartButton from "./cart";
import Container from "./container";
import { H3 } from "./typography";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Favorites from "./favorites";

const Navbar = () => {
  const pathname = usePathname();
  const login = pathname.includes("/login");
  const signup = pathname.includes("/signup");
  const auth = login || signup;
  return (
    <div className="h-18 flex items-center">
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
            <div className="flex-1 flex justify-center">
              <SearchBar />
            </div>
            <div className="flex-1 flex justify-end">
              <ActionButtons />
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Navbar;

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-sm">
      <Input
        type="text"
        placeholder="Search here..."
        className="pl-4 pr-10 bg-secondary text-signature"
      />
      <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5" />
    </div>
  );
};

const ActionButtons = () => {
  return (
    <div className="flex items-center gap-4">
      <Favorites />
      <CartButton />
      <Button variant="signature" className="text-white">
        <FaUserCircle />
        <span className="hidden sm:inline-block ml-2 uppercase">
          My Account
        </span>
      </Button>
    </div>
  );
};
