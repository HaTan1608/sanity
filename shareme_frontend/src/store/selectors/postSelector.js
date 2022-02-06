import { createSelector } from "reselect";

export const rootCompare = (state) => state.posts;

export const postSearchSelectors = createSelector(
  (state) => state.posts,
  (data) => {
    if (data) {
      return data;
    }
    return [];
  }
);
