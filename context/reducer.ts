import { REDUCER_ACTION_TYPE, ReducerAction, ReducerState } from "@/types";

export const reducer = (
  state: ReducerState,
  action: ReducerAction
): ReducerState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const initialReducerValues: ReducerState = {
  user: { name: "" },
};
