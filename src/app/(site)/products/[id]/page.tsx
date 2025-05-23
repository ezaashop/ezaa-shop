import Container from "@/components/container";
import PopularProducts from "@/components/popular-products";
import ProductDetails from "@/components/product-details";

const ProductPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = (await params) || {};
  return (
    <>
      <ProductDetails id={id} />
      <Container><PopularProducts total={6} /></Container>
    </>
  );
};
export default ProductPage;
