//1.Operation //接受的用户message类型
//2.Focus 接受的用户聚焦的message类型
//3.JoinRoom
//4.leaveRoom
export enum validMessageTypes {
  JoinRoom = "JoinRoom",
  Operation = "Operation",
  LeaveRoom = "leaveRoom",
  Focus = "Focus",
}

export interface JoinRoomMessage {
  type: validMessageTypes.JoinRoom
  message: {
    userId: string
    roomId: string
  }
}

export interface OperationMessage<PayloadType = any> {
  type: validMessageTypes.Operation
  message: {
    oi: string | number | null
    od: string | number | null
    path: string[]
    payload?: PayloadType
  }
}

export interface LeaveRoomMessage {
  type: validMessageTypes.LeaveRoom
  message: {
    userId: string
    roomId: string
  }
}

export interface FocusMessage {
  type: validMessageTypes.Focus
  message: {
    userId: string
    path: string[]
  }
}

export type ValidMessage =
  | JoinRoomMessage
  | LeaveRoomMessage
  | OperationMessage
  | FocusMessage
