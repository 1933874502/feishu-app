import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuid } from "uuid"
export interface User {
  userId: string
  userName: string
  avatar: string
}

const initialState: User = {
  userId: uuid(),
  userName: Math.random() > 0.5 ? "unic" : "lee",
  avatar: "",
}

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    login: () => {},
    logout: () => {},
  },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
