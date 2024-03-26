import { configureStore } from "@reduxjs/toolkit";
import { cocServerApi } from "./services/coc_server";

export const store = configureStore({
  reducer: {
    [cocServerApi.reducerPath]: cocServerApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cocServerApi.middleware),
});