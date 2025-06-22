import Categories from "@/components/categories";
import Container from "@/components/container";
import Hero from "@/components/hero";
import PopularProducts from "@/components/popular-products";
import Products from "@/components/products";
import Subcategories from "@/components/subcategories";
<<<<<<< Updated upstream
import Whatsapp from "@/components/whatsapp";
=======
import SocialFloat from "@/components/social-float";
import SocialText from "@/components/social-text";
>>>>>>> Stashed changes

const HomePage = () => {
  return (
    <Container>
      <Hero />
      <Categories />
      <SocialText />
      <Subcategories />
      <Products />
      <PopularProducts />
<<<<<<< Updated upstream
      <Whatsapp/>
=======
      {/* <SocialFloat /> */}
>>>>>>> Stashed changes
    </Container>
  );
};

export default HomePage;
