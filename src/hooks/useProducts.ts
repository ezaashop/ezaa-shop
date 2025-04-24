import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

// Add to cart and revalidate user's cart info
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, items }: { userId: string; items: any }) =>
      addToCart(userId, items),
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: ["userCart", userId],
      });
    },
  });
};

// Get user cart info
export const useUserCartInfo = (userId: string) =>
  useQuery({
    queryKey: ["userCart", userId],
    queryFn: () => getUserCartInfo(userId),
    enabled: !!userId,
  });

// Add review and revalidate product detail
export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, reviewData }: any) => addReview(userId, reviewData),
    onSuccess: (_data, { userId, reviewData }) => {
      queryClient.invalidateQueries({
        queryKey: ["productDetailWithUser", reviewData.productId, userId],
      });
    },
  });
};

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

// Filter products and optionally revalidate product listings
export const useFilterProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
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
    onSuccess: (_data, { categoryId, subCategoryId, userId }) => {
      // If you have a key to cache filtered products, you can invalidate here too
      queryClient.invalidateQueries({
        queryKey: ["filteredProducts", categoryId, subCategoryId, userId],
      });
    },
  });
};
