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

// Cashback Hooks
import {
  useCashbackInfo,
  useRequestInfo,
  useTotalCommission,
  useTransactionPool,
  useWalletTotal,
} from "@/hooks/useCashback";
import {
  setCashbackInfo,
  setCashbackRequestInfo,
  setCashbackTransactions,
  setTotalCommission,
  setWalletTotal,
} from "@/lib/store/slices/cashbackSlice";

const FetchWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { token, userId } = useAppSelector((store) => store.auth);

  // Fetching product-related data
  const { data: categories, isPending } = useCategories();
  const selectedCategoryId = useAppSelector(
    (store) => store.product.selectedCategoryId
  );
  const { data: subCategories } = useSubCategories(selectedCategoryId || 0);
  const selectedSubCategoryId =
    useAppSelector((store) => store.product.selectedSubCategoryId) || 0;
  const { data: products } = useProduct(selectedSubCategoryId, userId || 0);

  // Cashback-related hooks
  const { data: cashbackTransactions } = useTransactionPool(userId || 0);
  const { data: cashbackInfo } = useCashbackInfo(userId || 0);
  const { data: walletTotal } = useWalletTotal(userId || 0);
  const { data: cashbackRequestInfo } = useRequestInfo(userId || 0);
  const { data: totalCommission } = useTotalCommission(userId || 0);

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

  useEffect(() => {
    if (cashbackTransactions) {
      dispatch(
        setCashbackTransactions(cashbackTransactions?.data)
      );
    }
  }, [cashbackTransactions, dispatch]);

  useEffect(() => {
    if (cashbackInfo) {
      dispatch(setCashbackInfo(cashbackInfo?.data));
    }
  }, [cashbackInfo, dispatch]);

  useEffect(() => {
    if (walletTotal) {
      dispatch(setWalletTotal(walletTotal?.data));
    }
  }, [walletTotal, dispatch]);

  useEffect(() => {
    if (cashbackRequestInfo) {
      dispatch(
        setCashbackRequestInfo(cashbackRequestInfo?.data)
      );
    }
  }, [cashbackRequestInfo, dispatch]);

  useEffect(() => {
    if (totalCommission) {
      dispatch(setTotalCommission(totalCommission?.data));
    }
  }, [totalCommission, dispatch]);

  // Fetching popular product data
  const {
    data: popularProducts,
    isLoading: popularProductsLoading,
    isError,
    error,
  } = usePopularProducts(userId || 0);

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
