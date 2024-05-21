"use client";
import { createContext, useContext } from "react";
import { IContext } from "@/types";

export const AppContext = createContext<IContext>({});

export const useAppContext = () => useContext(AppContext);
