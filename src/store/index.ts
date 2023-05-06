import { configureStore } from "@reduxjs/toolkit"
import sheetSlice from "./slicers/sheets"

const store = configureStore({
  reducer: {
    sheets: sheetSlice,
  },
})
export type RootState = ReturnType<typeof store.getState>
export default store
