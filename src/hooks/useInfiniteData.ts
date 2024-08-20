import { useInfiniteQuery } from "@tanstack/react-query";
import { OrderType, Product, Review } from "../../types/common";
import { getInfiniteOrders } from "@/services/order/order.service";
import { getInfiniteReviews } from "@/services/review/review.service";
import { getInfiniteProducts } from "@/services/products/products.service";

export const useLoadOrders = (userId: string) => {
  return useInfiniteQuery<OrderType[], Error>({
    queryKey: ["orders", userId],
    queryFn: ({ pageParam }) => getInfiniteOrders(userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 9) return undefined;
      return allPages.length * 9;
    }
  });
};

export const useLoadReviews = (userId: string) => {
  return useInfiniteQuery<Review[], Error>({
    queryKey: ["reviews", userId],
    queryFn: ({ pageParam }) => getInfiniteReviews(userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 9) return undefined;
      return allPages.length * 9;
    }
  });
};

export const useLoadProducts = (userId: string) => {
  return useInfiniteQuery<{ products: Product[]; nextCursor?: number }, Error>({
    queryKey: ["reviews", userId],
    queryFn: ({ pageParam }) => getInfiniteProducts(userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor
  });
};
