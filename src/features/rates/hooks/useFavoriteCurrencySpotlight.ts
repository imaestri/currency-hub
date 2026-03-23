import { useQuery } from "@tanstack/react-query";
import { getCurrencySnapshot } from "@/features/rates/services/rates-service";

export function useFavoriteCurrencySpotlight(code?: string) {
  return useQuery({
    queryKey: ["favorite-currency-spotlight", code],
    queryFn: () => getCurrencySnapshot(code!),
    enabled: Boolean(code),
  });
}
