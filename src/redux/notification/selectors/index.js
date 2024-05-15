import { createSelector } from "reselect";

export const reducer = (state) => state?.notification;

export const listNotificationRedux = createSelector(
  reducer,
  (data) => data?.notification
);

export const loadingNotificationRedux = createSelector(reducer, (data) => data?.loading);

export const failNotificationRedux = createSelector(reducer, (data) => data?.fail);

export const successNotificationRedux = createSelector(reducer, (data) => data?.success);