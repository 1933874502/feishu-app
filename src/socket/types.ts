//1.Operation //接受的用户message类型
//2.Focus 接受的用户聚焦的message类型
//3.JoinRoom
//4.leaveRoom
export enum validMessageTypes {
  JoinRoom = "JoinRoom",
  Operation = "Operation",
  LeaveRoom = "leaveRoom",
  Focus = "Focus",
  VersionConfirm = 'VersionConfirm'
}
export type ValidOperationType = "AddSheet"

export interface OriginRoomParams {
  userId: string
  roomId: string
}

export interface VersionConfirmMessage {
  type:validMessageTypes.VersionConfirm
  message:{
    roomVersion:number
  }
}

export interface OriginOperationParams<PayloadType = any> {
  oi: string | number | null
  od: string | number | null
  path: string[]
  operation: ValidOperationType
  payload?: PayloadType
}

export interface OriginOperationPayload {
  roomId:string
  roomVersion:number
}
export interface AddSheetOperationPayload extends OriginOperationPayload{
  viewId: string
  columnId: string
  sheetName: string
}
export interface AddSheetOperationParams
  extends OriginOperationParams<AddSheetOperationPayload> {
  operation: "AddSheet"
}
export interface JoinRoomMessage {
  type: validMessageTypes.JoinRoom
  message: OriginRoomParams
}

export interface OperationMessage<PayloadType = any> {
  type: validMessageTypes.Operation
  message: OriginOperationParams<PayloadType>
}

export interface LeaveRoomMessage {
  type: validMessageTypes.LeaveRoom
  message: OriginRoomParams
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
  | VersionConfirmMessage
