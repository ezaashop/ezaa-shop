"use client";

import {
  useCategories,
  usePopularProducts,
  useProduct,
  useSubCategories,
} from "@/hooks/useProducts";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import {
  setCategories,
  setPopularProducts,
  setPopularProductsError,
  setPopularProductsLoading,
  setProducts,
  setSelectedCategoryId,
  setSelectedSubCategoryId,
  setSubCategories,
} from "@/lib/store/slices/productSlice";
import { useEffect } from "react";

const FetchWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { token, userId } = useAppSelector((store) => store.auth);

  const { data: categories, isPending } = useCategories();
  const selectedCategoryId = useAppSelector(
    (store) => store.product.selectedCategoryId
  );
  const { data: subCategories } = useSubCategories(selectedCategoryId || "");

  const selectedSubCategoryId = useAppSelector(
    (store) => store.product.selectedSubCategoryId
  );
  const { data: products } = useProduct(
    selectedSubCategoryId || "",
    userId || ""
  );

  useEffect(() => {
    if (categories) {
      dispatch(setCategories(categories?.data?.categories));

      if (categories?.data?.categories?.length > 0) {
        dispatch(setSelectedCategoryId(categories?.data?.categories[0].id));
      }
    }
  }, [categories, dispatch]);

  useEffect(() => {
    if (
      subCategories?.data?.subCategories &&
      subCategories.data.subCategories.length > 0
    ) {
      dispatch(setSubCategories(subCategories.data.subCategories));
      dispatch(
        setSelectedSubCategoryId(subCategories.data.subCategories[0].id)
      );
    }
  }, [subCategories, dispatch]);

  useEffect(() => {
    if (products) {
      dispatch(setProducts(products?.data?.products));
    }
  }, [products, dispatch]);

  const {
    data: popularProducts,
    isLoading: popularProductsLoading,
    isError,
    error,
  } = usePopularProducts(userId || "");

  useEffect(() => {
    if (popularProducts) {
      dispatch(setPopularProducts(popularProducts?.data?.products));
    }
  }, [popularProducts, dispatch]);

  useEffect(() => {
    dispatch(setPopularProductsLoading(popularProductsLoading));
  }, [popularProductsLoading, dispatch]);

  useEffect(() => {
    if (isError && error) {
      dispatch(setPopularProductsError(error.message));
    }
  }, [isError, error, dispatch]);

  return <>{children}</>;
};

export default FetchWrapper;
