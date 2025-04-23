"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect } from "react";
import {
  setCategories,
  setSubCategories,
  setSelectedCategoryId,
  setSelectedSubCategoryId,
  setProducts,
} from "@/lib/store/slices/productSlice";
import {
  useCategories,
  useSubCategories,
  useProduct,
} from "@/hooks/useProducts";

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

  return <>{children}</>;
};

export default FetchWrapper;
