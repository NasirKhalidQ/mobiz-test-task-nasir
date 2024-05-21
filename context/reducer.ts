import { REDUCER_ACTION_TYPE, ReducerAction, ReducerState } from "@/types";

export const reducer = (
  state: ReducerState,
  action: ReducerAction
): ReducerState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_JWT:
      return { ...state, jwt: action.payload };
    case REDUCER_ACTION_TYPE.SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const initialReducerValues: ReducerState = {
  jwt: { expiry: 0, role: "user", user_id: "", name: "" },
};
