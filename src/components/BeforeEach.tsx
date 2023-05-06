import { MantineProvider } from "@mantine/core"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import useThemeWorker from "../layout/TableLayout/components/Header/components/UserCenterDropdown/hooks/useThemeWorker"

export default function BeforeEach() {
  const { realTimeTheme } = useThemeWorker()

  return (
    <div>
      <Suspense>
        <MantineProvider
          theme={{
            colors: { transparent: ["transparent"] },
            colorScheme: realTimeTheme,
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Outlet />
        </MantineProvider>
      </Suspense>
    </div>
  )
}
