import { asyncHandler } from "@/lib/asyncHandler";
import { api } from "@/lib/axios";

export type CartItem = {
  product_id: string;
  quantity: number;
  color?: string;
  size?: string;
};

export type ReviewData = {
  product_id: string;
  rating: number;
  comment: string;
};

export type ProductFilterParams = {
  price_range?: [number, number];
  rating?: number;
  color?: string;
  size?: string;
  sort_by?: "price_low_to_high" | "price_high_to_low" | "newest" | "rating";
};

// Get all categories
export const getCategories = () =>
  asyncHandler(() => api.get("/getCategory").then((res) => res.data));

// Get subcategories for a category
export const getSubCategories = (categoryId: string) =>
  asyncHandler(() =>
    api.get(`/getSubCategory/${categoryId}`).then((res) => res.data)
  );

// Get product details by product detail ID
export const getProductDetailById = (productDetailId: string, userId: string) =>
  asyncHandler(() =>
    api.get(`/productDetail/${productDetailId}/${userId}`).then((res) => res.data)
  );

// Get product details by product ID and user ID
export const getProductDetailByIdAndUser = (
  productId: string,
  userId: string
) =>
  asyncHandler(() =>
    api.get(`/productDetail/${productId}/${userId}`).then((res) => res.data)
  );

// Add item(s) to cart
export const addToCart = (userId: string, items: CartItem | CartItem[]) => {
  const cartItems = Array.isArray(items) ? items : [items];
  return asyncHandler(() =>
    api.post(`/addCart/${userId}`, { items: cartItems }).then((res) => res.data)
  );
};

// Get user's cart information
export const getUserCartInfo = (userId: string) =>
  asyncHandler(() =>
    api.get(`/userCartInfo/${userId}`).then((res) => res.data)
  );

// Add a product review
export const addReview = (userId: string, reviewData: ReviewData) =>
  asyncHandler(() =>
    api.post(`/review/${userId}`, reviewData).then((res) => res.data)
  );

// Get product with user context
export const getProduct = (productId: string, userId: string) =>
  asyncHandler(() =>
    api.get(`/product/${productId}/${userId}`).then((res) => res.data)
  );

// Get popular products for user
export const getPopularProducts = (userId: string) =>
  asyncHandler(() =>
    api.get(`/popularProduct/${userId}`).then((res) => res.data)
  );

// Filter products by category, subcategory and user
export const filterProducts = (
  categoryId: string,
  subCategoryId: string,
  userId: string,
  filterParams: ProductFilterParams = {}
) =>
  asyncHandler(() =>
    api
      .post(
        `/productFilter/${categoryId}/${subCategoryId}/${userId}`,
        filterParams
      )
      .then((res) => res.data)
  );
