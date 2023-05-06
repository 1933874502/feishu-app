import { Avatar, Box, Text } from "@mantine/core"
import React from "react"
import UserCenterSelectItem from "./components/UserCenterSelectItem"
import useLanguageResolver from "./hooks/useLanguageWorker"
import { ValidLang } from "../../../../../../i18n/types"
import useThemeWorker from "./hooks/useThemeWorker"
export default function UserCenterDropdown() {
  const { languageSelectData, presentLanguage, mutatePrensentLanguage } =
    useLanguageResolver()
  const { themeSelectData, presentTheme, mutatePrensentTheme } =
    useThemeWorker()
  return (
    <Box>
      <Box className="p-4 flex items-center gap-2 w-72  border-b border-#646A73/10 border-solid">
        <Avatar
          color="#3370FF"
          className="rounded-full w-12 h-12 bg-#3370FF cursor-pointer"
        >
          宇豪
        </Avatar>
        <Box className="flex flex-col">
          <Text className="text-#1F2329">宇豪</Text>
          <Text className="text-sm text-#646A73">飞书个人用户</Text>
        </Box>
      </Box>
      <UserCenterSelectItem<ValidLang>
        label="lang"
        selectData={languageSelectData}
        onSelectChange={mutatePrensentLanguage}
        defaultSelect={presentLanguage}
      />
      <UserCenterSelectItem
        label="theme"
        selectData={themeSelectData}
        defaultSelect={presentTheme}
        onSelectChange={mutatePrensentTheme}
      />
    </Box>
  )
}
