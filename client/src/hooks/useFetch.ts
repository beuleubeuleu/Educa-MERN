import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface UseFetchResponse<T> {
  data: T | null;
  error: Error | null;
  isFetching: boolean;
}

function useFetch<T = unknown>(
    url: string,
): UseFetchResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsFetching(true);

      try {
        const response: AxiosResponse<T> = await axios.get(url);
        if (isMounted) {
          setData(response.data);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setIsFetching(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, error, isFetching };
}

export default useFetch;