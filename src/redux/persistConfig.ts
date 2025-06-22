import { PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { SupportState } from "./slices/supportSlice"; // adjust path if needed

export const fieldsPersistConfig: PersistConfig<SupportState> = {
  key: "fields",
  storage,
  whitelist: ["userData"],
};
