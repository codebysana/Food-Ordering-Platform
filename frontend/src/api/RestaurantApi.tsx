import { useQuery } from "react-query";

export const useSearchRestaurants = (city?: string) => {
  const createSearchRequest = async () => {
    const response = await fetch(
      `http://localhost:5000/api/restaurant/search/${city}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };
  const { data: results, isLoading } = useQuery(
    ["searchRestaurants"],
    createSearchRequest,
    { enabled: !!city }
  );
  return {
    results,
    isLoading,
  };
};
