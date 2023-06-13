import { socket } from "../hooks/socketInitor"
import { validMessageTypes } from "../types"

export default function JoinRoomMessageEmmiter(userId: string, roomId: string) {
  socket.emit("message", {
    type: validMessageTypes.JoinRoom,
    message: {
      userId,
      roomId,
    },
  })
}
