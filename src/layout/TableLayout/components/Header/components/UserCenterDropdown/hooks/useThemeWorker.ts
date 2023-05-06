import { useLocalStorage } from "@mantine/hooks"
import { ValidTheme } from "../../../../../../../theme/types"
import { useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { ColorScheme } from "@mantine/core"

export default function useThemeWorker() {
  const [presentTheme, setPrensentTheme] = useLocalStorage<ValidTheme>({
    key: "local-theme",
    defaultValue: "system",
  })
  const { t } = useTranslation()

  const themeSelectData = useMemo(() => {
    return [
      {
        label: t("light"),
        value: "light",
      },
      {
        label: t("dark"),
        value: "dark",
      },
      {
        label: t("system"),
        value: "system",
      },
    ]
  }, [t])
  const realTimeTheme = useMemo<ColorScheme>(() => {
    if (presentTheme === "system") {
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)")
      if (darkThemeMq.matches) {
        return "dark"
      } else {
        return "light"
      }
    }
    return presentTheme
  }, [presentTheme])
  const mutatePrensentTheme = useCallback(
    (newTheme: ValidTheme) => {
      setPrensentTheme(newTheme)
    },
    [setPrensentTheme]
  )
  return { presentTheme, mutatePrensentTheme, themeSelectData, realTimeTheme }
}
