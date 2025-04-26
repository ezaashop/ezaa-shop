// hooks/useFavorites.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
  FavoriteProductData,
} from "@/services/favoriteService";

export const useAddFavorite = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FavoriteProductData) => addFavorite(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites", userId],
      });
    },
  });
};

export const useRemoveFavorite = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FavoriteProductData) => removeFavorite(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites", userId],
      });
    },
  });
};

export const useGetFavorites = (userId: string) =>
  useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => getFavorites(userId),
    enabled: !!userId,
  });
