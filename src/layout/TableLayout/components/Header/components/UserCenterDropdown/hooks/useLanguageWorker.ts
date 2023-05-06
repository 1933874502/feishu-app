import { SelectItem } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import { useCallback } from "react"
import { ValidLang } from "../../../../../../../i18n/types"
import { useTranslation } from "react-i18next"

const languageSelectData: SelectItem[] = [
  {
    label: "简体中文",
    value: "zh",
  },
  {
    label: "English",
    value: "en",
  },
]

export default function useLanguageResolver() {
  const [presentLanguage, setPrensentLanguage] = useLocalStorage<ValidLang>({
    key: "lang",
    defaultValue: "en",
  })
  const { i18n } = useTranslation()
  //设置当前语言
  const mutatePrensentLanguage = useCallback(
    (newLang: ValidLang) => {
      setPrensentLanguage(newLang)
      i18n.changeLanguage(newLang)
    },
    [setPrensentLanguage, i18n]
  )
  return { languageSelectData, mutatePrensentLanguage, presentLanguage }
}
