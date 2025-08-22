"use client";
import Categories from "@/components/categories";
import Container from "@/components/container";
import Hero from "@/components/hero";
import PopularProducts from "@/components/popular-products";
import Products from "@/components/products";
import Subcategories from "@/components/subcategories";
import SocialText from "@/components/social-text";
import SocialFloat from "@/components/social-float";
import { useIsMobile } from "@/hooks/useIsMobile";

const HomePage = () => {
  const isMobile = useIsMobile();
  return (
    <Container>
      <Hero />
      <Categories />
      {!isMobile && <SocialText />}
      <Subcategories />
      <Products />
      <PopularProducts />
      {isMobile && <SocialFloat />}
    </Container>
  );
};

export default HomePage;
