import PopularProducts from "@/components/popular-products";
import ProductDetails from "@/components/product-details";

const ProductPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = (await params) || {};
  return (
    <>
      <ProductDetails id={id} />
      <PopularProducts total={6} />
    </>
  );
};
export default ProductPage;
