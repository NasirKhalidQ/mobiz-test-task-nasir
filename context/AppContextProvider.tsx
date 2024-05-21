"use client";
import React, { useEffect, useReducer } from "react";
import { AppContext } from "./AppContext";
import { getCookie } from "cookies-next";
import { parseJwt } from "@/utils";
import { initialReducerValues, reducer } from "./reducer";
import { IProps, REDUCER_ACTION_TYPE } from "@/types";

export const AppContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducer, initialReducerValues);

  useEffect(() => {
    const auth = getCookie("auth");
    const name = decodeURIComponent(getCookie("name")?.toString() || "");
    if (auth && name) {
      dispatch({
        type: REDUCER_ACTION_TYPE.SET_JWT,
        payload: { ...parseJwt(auth as string), name },
      });
    }
  }, []);
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
