// hooks/useFavorites.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "@/services/favoriteService";
import { FavoriteProductData } from "@/services/favoriteService";

export const useAddFavorite = (userId: string) =>
  useMutation({
    mutationFn: (data: FavoriteProductData) => addFavorite(userId, data),
  });

export const useRemoveFavorite = (userId: string) =>
  useMutation({
    mutationFn: (data: FavoriteProductData) => removeFavorite(userId, data),
  });

export const useGetFavorites = (userId: string) =>
  useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => getFavorites(userId),
    enabled: !!userId,
  });
