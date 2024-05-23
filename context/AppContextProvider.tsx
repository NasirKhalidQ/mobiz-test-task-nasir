"use client";
import React, { useEffect, useReducer } from "react";
import { AppContext } from "./AppContext";
import { getCookie } from "cookies-next";
import { initialReducerValues, reducer } from "./reducer";
import { IProps, REDUCER_ACTION_TYPE } from "@/types";

export const AppContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducer, initialReducerValues);

  useEffect(() => {
    const name = decodeURIComponent(getCookie("name")?.toString() || "");
    const image = decodeURIComponent(getCookie("image")?.toString() || "");
    if (name) {
      dispatch({
        type: REDUCER_ACTION_TYPE.SET_USER,
        payload: { name, image },
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
