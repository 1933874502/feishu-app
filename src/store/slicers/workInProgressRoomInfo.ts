import { PayloadAction, createSlice } from "@reduxjs/toolkit"
export interface workInProgressRoomInfo {
  onlineUsers: string[]
  roomId: string
  roomVersion:number
}

const initialState: workInProgressRoomInfo = {
  onlineUsers: [],
  roomId: "",
  roomVersion:0
}

const workInProgressRoomInfoSlice = createSlice({
  initialState,
  name: "workInProgressRoomInfo",
  reducers: {
    initRoom: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload
    },
    resetRoom: (state) => {
      state.roomId = ""
      state.onlineUsers = []
    },
    updateRoomVersion:(state,action:PayloadAction<number>)=>{
      state.roomVersion = action.payload
    },
    userJoinRoom: (state, action: PayloadAction<string>) => {
      state.onlineUsers = [...state.onlineUsers, action.payload]
    },
    userLeaveRoom: () => {},
  },
})

export const { initRoom, userJoinRoom, userLeaveRoom, resetRoom,updateRoomVersion } =
  workInProgressRoomInfoSlice.actions
export default workInProgressRoomInfoSlice.reducer
