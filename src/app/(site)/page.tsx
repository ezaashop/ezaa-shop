import Categories from "@/components/categories";
import Container from "@/components/container";
import Hero from "@/components/hero";
import Products from "@/components/products";
import Subcategories from "@/components/subcategories";

const HomePage = () => {
  return (
    <Container>
      <Hero />
      <Categories />
      <Subcategories />
      <Products />
    </Container>
  );
};

export default HomePage;
