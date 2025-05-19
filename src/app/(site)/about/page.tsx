import Container from "@/components/container";

const AboutPage = () => {
  return (
    <Container title="About Us">
      <div className="space-y-4 text-base leading-relaxed">
        <p>
          Welcome to <strong>Ezaashop</strong> – your one-stop destination for smarter online shopping. At Ezaashop, we believe shopping should be rewarding, convenient, and accessible for everyone.
        </p>
        <h2 className="text-lg font-semibold">Who We Are</h2>
        <p>
          Ezaashop is an innovative e-commerce platform designed to bring you a unique shopping experience with unbeatable benefits. We provide a wide range of products with the added advantage of a cashback system that allows you to save more on every purchase. Our cashback has no limits – the more you shop, the more you earn. Plus, we offer a robust referral system, allowing you to earn even more by inviting your friends and family.
        </p>
        <h2 className="text-lg font-semibold">Our Unique Features</h2>
        <ul className="list-disc list-inside">
          <li><strong>Unlimited Cashback:</strong> Earn cashback on every purchase without any limits.</li>
          <li><strong>Referral Rewards:</strong> Invite your friends and earn commission when they shop.</li>
          <li><strong>Cash on Delivery (COD):</strong> Shop with confidence and pay only when your order is delivered.</li>
          <li><strong>Secure Shopping:</strong> Your privacy and data security are our top priorities.</li>
        </ul>
        <h2 className="text-lg font-semibold">Our Vision</h2>
        <p>
          To make online shopping more rewarding, transparent, and accessible for everyone.
        </p>
        <h2 className="text-lg font-semibold">Our Mission</h2>
        <p>
          To empower customers with a platform that not only offers a wide variety of products but also provides a meaningful way to save and earn.
        </p>
        <p>Thank you for choosing Ezaashop – where shopping meets savings.</p>
      </div>
    </Container>
  );
};

export default AboutPage;
