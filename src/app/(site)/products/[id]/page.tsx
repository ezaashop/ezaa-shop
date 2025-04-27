import ProductDetails from "@/components/product-details";

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = (await params) || {};
  return <ProductDetails id={id} />;
};
export default ProductPage;
