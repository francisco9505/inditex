import {useEffect} from "react";
import {isAfter, subDays} from "date-fns";

export function useFetchCache(setStateFnc, fetchFnc, cacheId, setIsLoading) {
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const state = await fetchFnc();
      setStateFnc(state);
      localStorage.setItem(cacheId, JSON.stringify(state));
      localStorage.setItem(`${cacheId}:time`, `${new Date().getTime()}`);
      setIsLoading(false);
    }
    if (localStorage.getItem(`${cacheId}:time`)
      && localStorage.getItem(cacheId)
      && isAfter(new Date(+localStorage.getItem(`${cacheId}:time`)), subDays(new Date(), 1))) {
      setStateFnc(JSON.parse(localStorage.getItem(cacheId)));
      setIsLoading(false);
      return;
    }
    fetchData().then();
  }, []);
}