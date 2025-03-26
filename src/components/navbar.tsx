import { Search } from "lucide-react";
import Brand from "./brand";
import CartButton from "./cart";
import Container from "./container";
import MyImage from "./my-image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="h-18 flex items-center">
      <Container className="w-full flex items-center justify-between">
        <Brand />
        <SearchBar />
        <ActionButtons />
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
        className="pl-4 pr-10 bg-secondary text-signature placeholder:text-signature/50"
      />
      <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-signature w-5 h-5" />
    </div>
  );
};

const ActionButtons = () => {
  return (
    <div className="flex items-center gap-4">
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
