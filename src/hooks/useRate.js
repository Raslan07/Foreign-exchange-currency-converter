import { useEffect, useState } from "react";
import { getRate } from "../feature/exchange/components/services/apiCurrency";

export function useRate(base, quote) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!base || !quote) return;

    async function fetchRate() {
      try {
        setIsLoading(true);
        setError(null);

        const result = await getRate(base, quote);

        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRate();
  }, [base, quote]);

  return {
    data,
    isLoading,
    error,
  };
}