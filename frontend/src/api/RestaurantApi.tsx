import type { SearchState } from "@/pages/SearchPage";
import type { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);

    const response = await fetch(
      `http://localhost:5000/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };
  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    createSearchRequest,
    { enabled: !!city }
  );
  return {
    results,
    isLoading,
  };
};
