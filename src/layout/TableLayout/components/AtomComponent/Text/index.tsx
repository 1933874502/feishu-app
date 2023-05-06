import { Input } from "@mantine/core"
interface TextAtomComponentProps {
  defaultValue?: string
  width?: number
  destoryAtomComponent: VoidFunction
}
export default function TextAutoComponent({
  width = 200,
  defaultValue = "",
  destoryAtomComponent,
}: TextAtomComponentProps) {
  return (
    <Input
      onBlur={destoryAtomComponent}
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
