import { configureStore } from "@reduxjs/toolkit"
import sheetSlice from "./slicers/sheets"
import userSlice from "./slicers/user"
import workInProgressRoomInfoSlice from "./slicers/workInProgressRoomInfo"

const store = configureStore({
  reducer: {
    sheets: sheetSlice,
    users: userSlice,
    workInProgressRoomInfo: workInProgressRoomInfoSlice,
  },
})
export type RootState = ReturnType<typeof store.getState>
export default store
