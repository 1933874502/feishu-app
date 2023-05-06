import { AppShell, Box } from "@mantine/core"
import Navbar from "./components/Navbar"
import Header from "./components/Header"
import { PropsWithChildren, useEffect } from "react"
import { useTranslation } from "react-i18next"
import useSocket from "../../socket/hooks/useSocket"
export default function TableLayout(props: PropsWithChildren) {
  const { i18n } = useTranslation()

  const { submitNewVersion } = useSocket()
  useEffect(() => {
    const localLang = localStorage.getItem("lang")
    if (!localLang) return
    i18n.changeLanguage(JSON.parse(localLang))
  }, [i18n])

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
