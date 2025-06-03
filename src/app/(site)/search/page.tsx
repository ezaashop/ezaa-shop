import Container from "@/components/container";
import PopularProducts from "@/components/popular-products";

const SearchPage = () => {
  return (
    <Container title="Search Products">
      <PopularProducts search title={false} />
    </Container>
  );
};

export default SearchPage;
