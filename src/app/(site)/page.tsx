import Categories from "@/components/categories";
import CategoryNav from "@/components/category-nav";
import Hero from "@/components/hero";
import Products from "@/components/products";
import Subcategories from "@/components/subcategories";
import Sample from "./sample";

const HomePage = () => {
  return (
    <div>
      <CategoryNav />
      <Hero />
      {/* <Categories />
      <Subcategories />
      <Products /> */}
      <Sample />
    </div>
  );
};

export default HomePage;
