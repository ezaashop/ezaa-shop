import { FooterContent } from "@/types";
import { FaApple, FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";

export const footerContent: FooterContent = {
  description: "Ezaa Shop is an online store that sells various products.",
  socialLinks: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/1LaJBtgRRq/",
      icon: FaFacebookSquare,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/ezaashopofficial?igsh=bnY0YmQ3MmtpMjA0",
      icon: FaInstagramSquare,
    },
  ],
  sections: [
    {
      title: "Information",
      links: [
        { name: "About", href: "/about" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms & Conditions", href: "/terms-conditions" },
      ],
    },
  ],
  contact: {
    phone: "+923189974106",
    email: "ezaashop1@gmail.com",
  },
  appLinks: [
    // { name: "App Store", href: "#", icon: FaApple },
    { name: "Google Play", href: "#", icon: IoLogoGooglePlaystore },
  ],
  copyright: "Copyright © 2025 Ezaa Shop. All rights reserved.",
  policies: "Terms of Use | Privacy Policy",
};
