import { FaPhoneAlt } from "react-icons/fa";
import { FaCaretDown, FaEnvelope, FaVanShuttle } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import Container from "./container";

const TopNav = () => {
  return (
    <div className="hidden md:flex items-center bg-signature h-12 text-white text-sm font-medium">
      <Container className="w-full flex justify-between items-center">
        {/* Left Side: Contact Info */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaPhoneAlt size={14} />
            <span>+92 312 123 4567</span>
          </div>
          <div className="flex items-center gap-2">   
            <FaEnvelope size={14} />
            <span>support@ezaa.com</span>
          </div>
        </div>

        {/* Right Side: Links + Dropdowns */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <MdLocationOn size={14} />
            <span>Store Locations</span>
          </div>
          <div className="flex items-center gap-2">
            <FaVanShuttle size={14} />
            <span>Track Your Order</span>
          </div>

          {/* Vertical Divider */}
          <div className="h-4 w-px bg-white/50" />

          {/* Currency */}
          <div className="flex items-center gap-1 cursor-pointer">
            <span>$ Dollar</span>
            <FaCaretDown size={14} />
          </div>

          {/* Language */}
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="font-semibold">EN</span>
            <FaCaretDown size={14} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TopNav;
