import { useEffect } from "react"
import { socket } from "./socketInitor"
import {
  AddSheetOperationPayload,
  OriginOperationParams,
  OriginRoomParams,
  ValidMessage,
  validMessageTypes,
} from "../types"
import JoinRoomMessageEmmiter from "../messageEmmiter/JoinRoomMessageEmmiter"
import useUserInfo from "../../hooks/useUserInfo"
import useSheets from "../../hooks/useSheets"
import { useDispatch } from "react-redux"
import { userJoinRoom } from "../../store/slicers/workInProgressRoomInfo"
import { applyCreateSheet } from "../../store/slicers/sheets"
import { sheetTemplateCreator } from "../../store/utils"
import { checkRoomVersion, enableSocketQueue } from "../socketQueue"

export default function useSocket(shouldInit: boolean = false) {
  const dispatch = useDispatch()
  const { user } = useUserInfo()
  const {
    sheetUrlParams: { roomId },
  } = useSheets()

  //处理joinroom事件
  const JoinRoomMessageResolver = (message: OriginRoomParams) => {
    dispatch(userJoinRoom(message.userId))
  }

  //处理addsheet事件
  const AddSheetOperationMessageResolver = (
    message: OriginOperationParams<AddSheetOperationPayload>
  ) => {
    const sheet = sheetTemplateCreator(message.payload!.sheetName, message)
    dispatch(applyCreateSheet(sheet))
  }

  const versionConfirmResolver = (message:{roomVersion:number})=>{
    checkRoomVersion(message.roomVersion)
  }
  const watchSocketEvents = () => {
    socket.on("message", (incommingMessage: ValidMessage) => {
      if (incommingMessage.type === validMessageTypes.VersionConfirm){

      }
      if (incommingMessage.type === validMessageTypes.JoinRoom) {
        JoinRoomMessageResolver(incommingMessage.message)
      }
      if (incommingMessage.type === validMessageTypes.Operation) {
        if (incommingMessage.message.operation === "AddSheet") {
          AddSheetOperationMessageResolver(incommingMessage.message)
        }
      }
    })
  }
  const startConnect = () => {
    try {
      socket.connect()
      console.log("socket connect success")
      //1.触发joinroom事件
      //2.开始监听服务端推送
      //3.开始监听队列
      JoinRoomMessageEmmiter(user.userId, roomId)
      watchSocketEvents()
      enableSocketQueue()
    } catch (error) {
      console.log("socket connect error")
    }
  }
  const messageResolver = (messgae: ValidMessage) => {}

  useEffect(() => {
    if (!shouldInit) return
    startConnect()
  }, [shouldInit])
}
