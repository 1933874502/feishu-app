import { Input } from "@mantine/core"
import { useCallback } from "react"
interface TextAtomComponentProps {
  defaultValue?: string
  width?: number
  destoryAtomComponent: VoidFunction
  // sheetId: string
  // viewId: string
  // colId: string
  // rowId: string
}
export default function TextAutoComponent({
  width = 200,
  defaultValue = "",
  destoryAtomComponent,
}: TextAtomComponentProps) {
  const mutateTextColumn = useCallback(() => {
    destoryAtomComponent()
  }, [])
  return (
    <Input
      onBlur={mutateTextColumn}
      className="rounded-none"
      styles={{
        input: {
          width: width + "px",
        },
      }}
      defaultValue={defaultValue}
    />
  )
}
