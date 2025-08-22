import Container from "@/components/container";

const TermsConditionsPage = () => {
  return (
    <Container title="Terms & Conditions">
      <div className="space-y-4 text-base leading-relaxed">
        <p>
          In some cases, using the Ezaashop website and services may require you
          to provide personal details for identification, such as a valid email
          and demographic information (like ZIP code, age, sex, industry, job
          title, and income) for registration.
        </p>
        <h2 className="text-lg font-semibold">
          Billing and Credit Card Information
        </h2>
        <p>
          Our services may involve product purchases or subscriptions. To enable
          payments, we collect and securely store necessary billing data
          including your name, address, phone number, email, and credit card
          information.
        </p>
        <p>
          This data is only shared with trusted third parties involved in order
          fulfillment and payment processing. We do not share or disclose your
          billing information unless legally required or if needed to resolve a
          transaction dispute.
        </p>
        <p>
          For example, if you report unauthorized use of your payment info,
          transaction details may be shared with relevant authorities to
          investigate and resolve the issue.
        </p>
      </div>
    </Container>
  );
};

export default TermsConditionsPage;
