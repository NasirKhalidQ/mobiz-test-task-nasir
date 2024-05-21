import { ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface JWT {
  expiry: number;
  role: string;
  user_id: string;
  name?: string;
}

export enum REDUCER_ACTION_TYPE {
  SET_USER = "SET_USER",
  SET_JWT = "SET_JWT",
}

export type SetJWTAction = {
  type: REDUCER_ACTION_TYPE.SET_JWT | REDUCER_ACTION_TYPE.SET_USER;
  payload: JWT;
};

export type SetUser = {
  type: REDUCER_ACTION_TYPE.SET_USER;
  payload: Partial<User>;
};

export type ReducerState = {
  user?: Partial<User>;
  jwt: JWT;
};

export type ReducerAction = SetJWTAction | SetUser;

export interface IContext {
  state?: ReducerState;
  dispatch?: React.Dispatch<ReducerAction>;
}

export interface IProps {
  children: ReactNode;
}
