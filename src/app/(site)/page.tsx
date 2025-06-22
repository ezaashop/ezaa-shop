import Categories from "@/components/categories";
import Container from "@/components/container";
import Hero from "@/components/hero";
import PopularProducts from "@/components/popular-products";
import Products from "@/components/products";
import Subcategories from "@/components/subcategories";
import SocialText from "@/components/social-text";

const HomePage = () => {
  return (
    <Container>
      <Hero />
      <Categories />
      <SocialText />
      <Subcategories />
      <Products />
      <PopularProducts />
      {/* <SocialFloat /> */}
    </Container>
  );
};

export default HomePage;
