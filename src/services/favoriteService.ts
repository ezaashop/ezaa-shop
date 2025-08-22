
import { asyncHandler } from "@/lib/asyncHandler";
import { api } from "@/lib/axios";

export type FavoriteProductData = {
  product_id: string;
};

export const addFavorite = (userId: string, data: FavoriteProductData) =>
  asyncHandler(() =>
    api.post(`/userFavouriteProduct/${userId}`, data).then((res) => res.data)
  );

export const getFavorites = (userId: string) =>
  asyncHandler(() =>
    api.get(`/getFavouriteProduct/${userId}`).then((res) => res.data)
  );

export const removeFavorite = (userId: string, data: FavoriteProductData) =>
  asyncHandler(() =>
    api.post(`/cancelFavouriteProduct/${userId}`, data).then((res) => res.data)
  );
