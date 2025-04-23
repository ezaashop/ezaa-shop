
import Categories from "@/components/categories";
import CategoryNav from "@/components/category-nav";
import Hero from "@/components/hero";
import Products from "@/components/products";
import Subcategories from "@/components/subcategories";
import Sample from "./sample";
import Container from "@/components/container";

const HomePage = () => {
  return (
    <Container>
      {/* <CategoryNav /> */}
      <Hero />
      <Categories />
      <Subcategories />
      <Products />
      {/* <Sample /> */}
    </Container>
  );
};

export default HomePage;
