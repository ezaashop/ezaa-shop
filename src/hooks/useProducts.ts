import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getSubCategories,
  getProductDetailById,
  getProductDetailByIdAndUser,
  addToCart,
  getUserCartInfo,
  addReview,
  getProduct,
  getPopularProducts,
  filterProducts,
} from "@/services/productService";

// Get all categories
export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

// Get subcategories by category ID
export const useSubCategories = (categoryId: string) =>
  useQuery({
    queryKey: ["subcategories", categoryId],
    queryFn: () => getSubCategories(categoryId),
    enabled: !!categoryId,
  });

// Get product detail by detail ID
export const useProductDetailById = (productDetailId: string) =>
  useQuery({
    queryKey: ["productDetail", productDetailId],
    queryFn: () => getProductDetailById(productDetailId),
    enabled: !!productDetailId,
  });

// Get product detail by product and user ID
export const useProductDetailByIdAndUser = (
  productId: string,
  userId: string
) =>
  useQuery({
    queryKey: ["productDetailWithUser", productId, userId],
    queryFn: () => getProductDetailByIdAndUser(productId, userId),
    enabled: !!productId && !!userId,
  });

// Add to cart
export const useAddToCart = () =>
  useMutation({
    mutationFn: ({ userId, items }: { userId: string; items: any }) =>
      addToCart(userId, items),
  });

// Get user cart info
export const useUserCartInfo = (userId: string) =>
  useQuery({
    queryKey: ["userCart", userId],
    queryFn: () => getUserCartInfo(userId),
    enabled: !!userId,
  });

// Add review
export const useAddReview = () =>
  useMutation({
    mutationFn: ({ userId, reviewData }: any) => addReview(userId, reviewData),
  });

// Get product by productId and userId
export const useProduct = (productId: string, userId: string) =>
  useQuery({
    queryKey: ["product", productId, userId],
    queryFn: () => getProduct(productId, userId),
    enabled: !!productId && !!userId,
  });

// Get popular products for user
export const usePopularProducts = (userId: string) =>
  useQuery({
    queryKey: ["popularProducts", userId],
    queryFn: () => getPopularProducts(userId),
    enabled: !!userId,
  });

// Filter products
export const useFilterProducts = () =>
  useMutation({
    mutationFn: ({
      categoryId,
      subCategoryId,
      userId,
      filterParams,
    }: {
      categoryId: string;
      subCategoryId: string;
      userId: string;
      filterParams?: any;
    }) => filterProducts(categoryId, subCategoryId, userId, filterParams),
  });
