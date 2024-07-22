import { useEffect, useState } from "react";
// import useStore from "./useStore";
// import { API_DATA } from "../constants/state";

export const useApi = (route, stop) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [callAPI, setCallAPI] = useState(!stop);
  const refetch = () => {
    setCallAPI(true);
  };
  // const { getStore, getStoreItem } = useStore();
  // const store = getStore();

  useEffect(() => {
    const fetchData = async (route) => {
      // const apiData = getStoreItem(API_DATA)
      // const apiSaved = apiData.find(data=> data.route==route);
      // if(apiSaved && apiSaved.data)

      try {
        setIsLoading(true);
        const response = await fetch(route);
        if (!response.ok) throw new Error("Error while calling api");

        const d = await response.json();
        setData(d);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (route && callAPI) fetchData(route);
  }, [callAPI, route, stop]);

  return { isLoading, error, data, refetch };
};
