import Categories from "@/components/categories";
import Container from "@/components/container";
import Hero from "@/components/hero";
import PopularProducts from "@/components/popular-products";
import Products from "@/components/products";
import Subcategories from "@/components/subcategories";
import SocialFloat from "@/components/social-float";

const HomePage = () => {
  return (
    <Container>
      <Hero />
      <Categories />
      <Subcategories />
      <Products />
      <PopularProducts />
      <SocialFloat />
    </Container>
  );
};

export default HomePage;
