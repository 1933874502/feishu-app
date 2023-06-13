import { Input } from "@mantine/core"
import { Key, useCallback } from "react"
interface TextAtomComponentProps {
  defaultValue?: string
  width?: number
  destoryAtomComponent: VoidFunction
  sheetId:Key
  viewId:Key
  colId:Key
  rowId:Key
}
export default function TextAutoComponent({
  width = 200,
  defaultValue = "",
  destoryAtomComponent,
  sheetId,
  viewId,
  rowId,
  colId
}: TextAtomComponentProps) {
  const mutateTextColumn = useCallback(()=>{

    destoryAtomComponent()
  },[])
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
