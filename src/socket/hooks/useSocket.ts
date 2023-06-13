import { useEffect } from "react"
import { socket } from "./socketInitor"
import { ValidMessage } from "../types"
import JoinRoomMessageEmmiter from "../messageEmmiter/JoinRoomMessageEmmiter"
import useUserInfo from "../../hooks/useUserInfo"
import useSheets from "../../hooks/useSheets"
export default function useSocket(shouldInit: boolean = false) {
  const { user } = useUserInfo()
  const {
    sheetUrlParams: { roomId },
  } = useSheets()
  const startConnect = async () => {
    try {
      await socket.connect()
      console.log("socket connect success")
      JoinRoomMessageEmmiter(user.userId, roomId)
    } catch (error) {
      console.log("socket connect error")
    }
  }
  const messageResolver = (messgae: ValidMessage) => {}
  const watchSocketEvents = async () => {
    socket.on("message", (message) => {})
  }
  useEffect(() => {
    if (!shouldInit) return
    startConnect()
  }, [shouldInit])
}
