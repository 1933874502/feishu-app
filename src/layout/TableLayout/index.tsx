import { AppShell, Box } from "@mantine/core"
import Navbar from "./components/Navbar"
import Header from "./components/Header"
import { PropsWithChildren, useEffect } from "react"
import { useTranslation } from "react-i18next"
import useSocket from "../../socket/hooks/useSocket"
import useSheets from "../../hooks/useSheets"
import { useDispatch } from "react-redux"
import { initRoom, resetRoom } from "../../store/slicers/workInProgressRoomInfo"
import useUserInfo from "../../hooks/useUserInfo"
import LeaveRoomMessageEmmiter from "../../socket/messageEmmiter/LeaveRoomMessageEmmiter"
export default function TableLayout(props: PropsWithChildren) {
  const {
    sheetUrlParams: { roomId },
  } = useSheets()
  const { user } = useUserInfo()
  const dispatch = useDispatch()
  const { i18n } = useTranslation()

  useSocket(true)
  useEffect(() => {
    const localLang = localStorage.getItem("lang")
    if (!localLang) return
    i18n.changeLanguage(JSON.parse(localLang))
  }, [i18n])

  useEffect(() => {
    dispatch(initRoom(roomId))

    return () => {
      dispatch(resetRoom())
      LeaveRoomMessageEmmiter(user.userId, roomId)
    }
  }, [])

  return (
    <AppShell
      header={<Header />}
      navbar={<Navbar />}
      styles={{ main: { backgroundColor: "#F5F6F7" } }}
    >
      <Box> {props.children}</Box>
    </AppShell>
  )
}
