import Container from "@/components/container";

const PrivacyPolicyPage = () => {
  return (
    <Container title="Privacy Policy">
      <div className="space-y-4 text-base leading-relaxed">
        <p>
          In some instances, use of the Ezaashop website and services may
          require that you disclose certain personal information for
          identification, including a unique email address and demographic
          information (such as ZIP code, age, sex, job industry, job title, and
          income) to register.
        </p>
        <h2 className="text-lg font-semibold">
          Billing and Credit Card Information
        </h2>
        <p>
          Our services may include transactions for purchasing products and
          services. To enable payment, we collect and store your name, address,
          telephone number, email address, credit card information, and other
          billing data.
        </p>
        <p>
          This information is shared only with third parties who facilitate the
          purchase, such as by fulfilling orders and processing payments. We
          will not disclose your billing and/or credit card information unless
          required by law or court order, or if necessary to address a financial
          transaction issue.
        </p>
        <p>
          For instance, if you claim your billing details were used without
          authorization, we may disclose transaction information to law
          enforcement and other relevant parties.
        </p>
      </div>
    </Container>
  );
};

export default PrivacyPolicyPage;
