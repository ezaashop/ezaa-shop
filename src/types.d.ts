type FooterLink = {
  name: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

type FooterAppLink = {
  name: string;
  href: string;
  icon: IconType;
};

type FooterSocialLink = {
  name: string;
  href: string;
  icon: IconType;
};

type FooterContent = {
  description: string;
  socialLinks: FooterSocialLink[];
  sections: FooterSection[];
  contact: {
    phone: string;
    email: string;
  };
  appLinks: FooterAppLink[];
  copyright: string;
  policies: string;
};
