import { socket } from "../hooks/socketInitor"
import { validMessageTypes } from "../types"

export default function LeaveRoomMessageEmmiter(
  userId: string,
  roomId: string
) {
  socket.emit("message", {
    type: validMessageTypes.LeaveRoom,
    message: {
      userId,
      roomId,
    },
  })
}
