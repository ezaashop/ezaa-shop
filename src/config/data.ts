import { FooterContent } from "@/types";
import { FaApple, FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";

export const footerContent: FooterContent = {
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
  socialLinks: [
    { name: "Facebook", href: "#", icon: FaFacebookSquare },
    { name: "Twitter", href: "#", icon: FaTwitterSquare },
    { name: "Instagram", href: "#", icon: FaInstagramSquare },
  ],
  sections: [
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Products", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
      ],
    },
    {
      title: "Information",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Payment Methods", href: "#" },
        { name: "Return & Refund", href: "#" },
        { name: "Privacy Policy", href: "#" },
      ],
    },
  ],
  contact: {
    phone: "+62 83175 02",
    email: "support@golelectric.com",
  },
  appLinks: [
    { name: "App Store", href: "#", icon: FaApple },
    { name: "Google Play", href: "#", icon: IoLogoGooglePlaystore },
  ],
  copyright: "Copyright © 2025 Ezaa Shop. All rights reserved.",
  policies: "Terms of Use | Privacy Policy",
};
