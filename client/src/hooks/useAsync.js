import { useReducer, useEffect, useRef } from "react";
import axios from "axios";
import * as asyncTypes from "../constants/asyncTypes";

const initialState = {
  isLoading: false,
  data: [],
  isError: false,
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT": {
      return {
        ...initialState,
        isLoading: true,
      };
    }
    case "FETCH_FAILURE": {
      return {
        ...initialState,
        isError: true,
      };
    }
    case "FETCH_SUCCESS": {
      return {
        ...initialState,
        data: action.payload,
      };
    }
  }
  return { state };
};

const useAsync = (url) => {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);
  let cache = useRef({});
  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      dispatch({ type: asyncTypes.FETCH_INIT });

      if (cache[url]) {
        dispatch({ type: "FETCH_SUCCESS", payload: cache[url] });
        return;
      }
      try {
        {
          const response = await axios.get(url);
          const data = response.data;
          if (Array.isArray(data)) {
            dispatch({ type: asyncTypes.FETCH_SUCCESS, payload: data });
            cache[url] = data;
          } else {
            throw "wrong url";
          }
        }
      } catch (e) {
        dispatch({ type: asyncTypes.FETCH_FAILURE });
      }
    };
    fetchData();
  }, [url]);

  return state;
};

export default useAsync;

// dispatch -> function
// action -> object with a type property, optional payload
