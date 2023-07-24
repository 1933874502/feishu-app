import { socket } from "../hooks/socketInitor"
import { ValidOperationType, validMessageTypes } from "../types"

export default function OperationMessageEmmiter<PayloadType = any>(
  path: string[],
  oi: string | number | null,
  od: string | number | null,
  operation: ValidOperationType,
  payload?: PayloadType
) {
  socket.emit("message", {
    type: validMessageTypes.Operation,
    message: {
      oi,
      od,
      path,
      operation,
      payload,
    },
  })
}
