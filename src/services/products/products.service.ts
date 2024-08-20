import { createClient } from "../../../supabase/client";
import { Product } from "../../../types/common";

export const getInfiniteProducts = async (
  userId: string,
  pageParam: unknown
): Promise<{ products: Product[]; nextCursor?: number }> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("userId", userId)
    .range(pageParam as number, (pageParam as number) + 15);
  if (error) {
    console.error("Error fetching review list in service.ts:", error);
    return { products: [], nextCursor: undefined };
  }
  if (!data || data.length === 0) {
    console.log("fetching error");
    return { products: [], nextCursor: undefined };
  }

  const nextCursor = data.length === 9 ? (pageParam as number) + 9 : undefined;

  return {
    products: data,
    nextCursor
  };
};
