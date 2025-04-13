// store/product-store.ts
import { create } from "zustand";

type Category = {
  id: string;
  name: string;
  image: string;
};

type Subcategory = {
  id: string;
  categoryId: string;
  name: string;
};

type Product = {
  id: string;
  subcategoryId: string;
  name: string;
  price: number;
  image: string;
};

type ProductStore = {
  categories: Category[];
  subcategories: Subcategory[];
  products: Product[];
  selectedCategoryId: string;
  selectedSubcategoryId: string;
  selectedProductId: string;

  // Actions
  setSelectedCategory: (id: string) => void;
  setSelectedSubcategory: (id: string) => void;
  setSelectedProduct: (id: string) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  categories: [
    { id: "1", name: "Electronics", image: "/images/category.png" },
    { id: "2", name: "Mobiles", image: "/images/category.png" },
    { id: "3", name: "Gaming", image: "/images/category.png" },
    { id: "4", name: "Home Appliances", image: "/images/category.png" },
    { id: "5", name: "Fashion", image: "/images/category.png" },
    { id: "6", name: "Books", image: "/images/category.png" },
  ],

  subcategories: [
    { id: "1", categoryId: "1", name: "Laptops" },
    { id: "2", categoryId: "1", name: "Tablets" },
    { id: "3", categoryId: "1", name: "Cameras" },
    { id: "4", categoryId: "1", name: "Monitors" },
    { id: "5", categoryId: "2", name: "Smartphones" },
    { id: "6", categoryId: "2", name: "Feature Phones" },
    { id: "7", categoryId: "2", name: "Phone Accessories" },
    { id: "8", categoryId: "2", name: "Power Banks" },
    { id: "9", categoryId: "3", name: "Consoles" },
    { id: "10", categoryId: "3", name: "Controllers" },
    { id: "11", categoryId: "3", name: "Games" },
    { id: "12", categoryId: "3", name: "VR Headsets" },
    { id: "13", categoryId: "4", name: "Refrigerators" },
    { id: "14", categoryId: "4", name: "Washing Machines" },
    { id: "15", categoryId: "4", name: "Microwaves" },
    { id: "16", categoryId: "4", name: "Air Conditioners" },
    { id: "17", categoryId: "5", name: "Men's Clothing" },
    { id: "18", categoryId: "5", name: "Women's Clothing" },
    { id: "19", categoryId: "5", name: "Footwear" },
    { id: "20", categoryId: "5", name: "Accessories" },
  ],

  products: [
    {
      id: "p1",
      subcategoryId: "1",
      name: 'MacBook Pro 14"',
      price: 1999,
      image: "/images/product.png",
    },
    {
      id: "p2",
      subcategoryId: "1",
      name: "Dell XPS 13",
      price: 1499,
      image: "/images/product.png",
    },
    {
      id: "p3",
      subcategoryId: "1",
      name: "Lenovo ThinkPad X1",
      price: 1299,
      image: "/images/product.png",
    },
    {
      id: "p4",
      subcategoryId: "5",
      name: "iPhone 15 Pro",
      price: 1099,
      image: "/images/product.png",
    },
    {
      id: "p5",
      subcategoryId: "5",
      name: "Samsung Galaxy S23",
      price: 999,
      image: "/images/product.png",
    },
    {
      id: "p6",
      subcategoryId: "5",
      name: "Google Pixel 8",
      price: 899,
      image: "/images/product.png",
    },
    {
      id: "p7",
      subcategoryId: "9",
      name: "PlayStation 5",
      price: 499,
      image: "/images/product.png",
    },
    {
      id: "p8",
      subcategoryId: "9",
      name: "Xbox Series X",
      price: 499,
      image: "/images/product.png",
    },
    {
      id: "p9",
      subcategoryId: "9",
      name: "Nintendo Switch OLED",
      price: 349,
      image: "/images/product.png",
    },
    {
      id: "p10",
      subcategoryId: "17",
      name: "Casual Shirt",
      price: 25,
      image: "/images/product.png",
    },
    {
      id: "p11",
      subcategoryId: "17",
      name: "Denim Jeans",
      price: 45,
      image: "/images/product.png",
    },
    {
      id: "p12",
      subcategoryId: "17",
      name: "Winter Jacket",
      price: 89,
      image: "/images/product.png",
    },
  ],

  selectedCategoryId: "1", // Default category is Electronics
  selectedSubcategoryId: "1", // Default subcategory is Laptops
  selectedProductId: "p1", // Default product for the selected subcategory

  setSelectedCategory: (id) => set({ selectedCategoryId: id }),
  setSelectedSubcategory: (id) => set({ selectedSubcategoryId: id }),
  setSelectedProduct: (id) => set({ selectedProductId: id }),
}));
