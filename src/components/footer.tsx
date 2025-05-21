import { footerContent } from "@/config/data";
import Link from "next/link";
import Brand from "./brand";
import Container from "./container";
import { Small } from "./typography";

const Footer = () => {
  return (
    <>
      <div className="bg-black text-white pb-10 pt-20">
        <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand & Social */}
          <div className="flex flex-col gap-4">
            <Brand />
            <Small className="text-xs text-justify">
              {footerContent.description}
            </Small>
            <div className="flex items-center gap-3">
              {footerContent.socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="p-2 bg-signature rounded-md"
                  target="_blank"
                >
                  <social.icon className="text-xl" />
                </Link>
              ))}
            </div>
          </div>

          {/* Dynamic Footer Sections */}
          {footerContent.sections.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-semibold mb-3">{section.title}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <p className="text-sm">{footerContent.contact.phone}</p>
            <p className="text-sm mb-4">{footerContent.contact.email}</p>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <div className="flex gap-2 mt-4 w-full">
                {footerContent.appLinks.map((app, i) => (
                  <Link
                    key={i}
                    href={app.href}
                    className="bg-signature text-white w-full p-2 rounded text-xs flex items-center justify-center gap-2"
                    target="_blank"
                  >
                    <app.icon className="text-lg" />
                    {app.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom bar */}
      <div className="w-full py-2 bg-signature text-white">
        <Container>
          <div className="flex items-center justify-between text-xs flex-wrap gap-2">
            <p>{footerContent.copyright}</p>
            <p>{footerContent.policies}</p>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;
