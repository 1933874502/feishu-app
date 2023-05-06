import {
  ActionIcon,
  Box,
  Divider,
  Input,
  Navbar as NavbarContainer,
  Text,
} from "@mantine/core"
import useSheets from "../../../../hooks/useSheets"
import { map } from "lodash"
import SheetIcon from "../../../../assets/svg/SheetIcon"
import { IconDotsVertical, IconPlus } from "@tabler/icons-react"
import { useCallback, useRef, useState } from "react"

export default function Navbar() {
  const { sheetsArray, createSheetDispatch, navigateTotargetView } = useSheets()
  const [showInput, setShowInput] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleCreateSheet = useCallback(() => {
    setShowInput(true)
    requestIdleCallback(() => {
      inputRef.current?.focus()
    })
  }, [])
  const requestCreateSheet = useCallback(() => {
    const sheetName = inputRef.current?.value
    setShowInput(false)
    createSheetDispatch(sheetName as string)
  }, [createSheetDispatch])
  return (
    <NavbarContainer width={{ base: 280 }}>
      <Box className="w-full h-full relative p-1">
        {/* list模块 */}
        <Box>
          {map(sheetsArray, (sheet) => {
            return (
              <Box
                onClick={() => navigateTotargetView(sheet.id)}
                key={sheet.id}
                className="flex justify-between h-9 hover:bg-slate-200 items-center cursor-pointer rounded p-2"
              >
                <Box className="flex gap-1 items-center">
                  <SheetIcon />
                  <Text className="text-sm">{sheet.name}</Text>
                </Box>
                <ActionIcon>
                  <IconDotsVertical size={14} />
                </ActionIcon>
              </Box>
            )
          })}
          {showInput && (
            <Input
              onBlur={requestCreateSheet}
              defaultValue={`数据表 ${sheetsArray.length + 1}`}
              ref={inputRef}
            />
          )}
        </Box>
        {/* 操作模块 */}
        <Box
          style={{ width: `calc(100% - 16px)` }}
          className="absolute bottom-0 px-3"
        >
          <Divider />
          <Text color="#646A73" className="text-sm h-8 pt-2">
            新建
          </Text>
          <Box
            onClick={handleCreateSheet}
            className="flex justify-between items-center h-9 hover:bg-slate-200 cursor-pointer rounded px-2"
          >
            <Box className="flex items-center gap-1">
              <SheetIcon />
              <Text className="text-sm">新建数据表</Text>
            </Box>
            <IconPlus size={16} />
          </Box>
        </Box>
      </Box>
    </NavbarContainer>
  )
}
