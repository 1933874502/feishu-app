import { useEffect, useCallback } from "react"
import { socket } from "./socketInitor"
export default function useSocket() {
  const socketConnected = useCallback(() => {
    console.log("socket连接成功")
  }, [])
  const socketDisconnect = useCallback(() => {
    console.log("socket断开连接")
  }, [])
  const onMessageComming = useCallback((event: any) => {
    console.log("有新版本过来了", event)
  }, [])
  const submitNewVersion = useCallback(() => {
    socket.emit("message", JSON.stringify({ verison: 2, delete: "hello" }))
  }, [])
  useEffect(() => {
    socket.on("connect", socketConnected)
    socket.on("disconnect", socketDisconnect)
    socket.on("message", onMessageComming)

    return () => {
      socket.off("connect", socketConnected)
      socket.off("disconnect", socketDisconnect)
      socket.off("message", onMessageComming)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return { submitNewVersion }
}
