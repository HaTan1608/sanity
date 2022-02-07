import { createSelector } from "reselect";

export const rootCompare = (state) => state.user;

export const userSelectors = createSelector(
  (state) => state.user,
  (data) => {
    if (data) {
      console.log(data)
      return data;
    }
    return null;
  }
);
