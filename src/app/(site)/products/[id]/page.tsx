import ProductDetails from "@/components/product-details";

const ProductPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = (await params) || {};
  return <ProductDetails id={id} />;
};
export default ProductPage;
