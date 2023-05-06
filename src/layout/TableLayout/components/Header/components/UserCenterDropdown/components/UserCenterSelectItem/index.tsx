import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, HoverCard, SelectItem, Text } from "@mantine/core"
import { map } from "lodash"
import { useCallback } from "react"
import { useTranslation } from "react-i18next"

interface ItemProps<ValidSelectValue = string> {
  label: string
  defaultSelect: string
  selectData: SelectItem[]
  onSelectChange: (newValue: ValidSelectValue) => void
}
export function LeftSelectPanel<ValidSelectValue = string>({
  selectData,
  defaultSelect,
  onSelectChange,
}: Omit<ItemProps<ValidSelectValue>, "label">) {
  const changeCurrentSelect = useCallback(
    (newSelectedValue: ValidSelectValue) => {
      onSelectChange(newSelectedValue)
    },
    [onSelectChange]
  )
  return (
    <Box>
      {map(selectData, (selectDescriptor) => {
        return (
          <Box
            className="cursor-pointer"
            onClick={() =>
              changeCurrentSelect(selectDescriptor.value as ValidSelectValue)
            }
            key={selectDescriptor.label}
          >
            {selectDescriptor.label}
          </Box>
        )
      })}
    </Box>
  )
}
export default function UserCenterSelectItem<ValidSelectValue = string>({
  label,
  selectData,
  defaultSelect,
  onSelectChange,
}: ItemProps<ValidSelectValue>) {
  const { t } = useTranslation()
  return (
    <HoverCard position="left">
      <HoverCard.Target>
        <Box className="px-3 h-10 flex justify-between items-center text-sm cursor-pointer">
          <Text className="text-#1F2329">{t(label)}</Text>
          <FontAwesomeIcon icon={faChevronRight} />
        </Box>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <LeftSelectPanel<ValidSelectValue>
          onSelectChange={onSelectChange}
          selectData={selectData}
          defaultSelect={defaultSelect}
        />
      </HoverCard.Dropdown>
    </HoverCard>
  )
}
