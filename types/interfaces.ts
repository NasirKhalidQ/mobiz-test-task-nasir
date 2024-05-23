import { ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

export enum REDUCER_ACTION_TYPE {
  SET_USER = "SET_USER",
  SET_JWT = "SET_JWT",
}

export type SetUser = {
  type: REDUCER_ACTION_TYPE.SET_USER;
  payload: Partial<User>;
};

export type ReducerState = {
  user?: Partial<User>;
};

export type ReducerAction = SetUser;

export interface IContext {
  state?: ReducerState;
  dispatch?: React.Dispatch<ReducerAction>;
}

export interface IProps {
  children: ReactNode;
}
