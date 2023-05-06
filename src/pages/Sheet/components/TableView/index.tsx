import { Box, Input } from "@mantine/core"
import useSheets from "../../../../hooks/useSheets"
import {
  Key,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { map, omit } from "lodash"
import { IconPlus, IconSettings } from "@tabler/icons-react"
import { Layer, Rect, Stage, Text as CanvasText } from "react-konva"
import { KonvaEventObject } from "konva/lib/Node"
import { ColumnMap } from "../../../../store/types"
import TextAutoComponent from "../../../../layout/TableLayout/components/AtomComponent/Text"
import { Html } from "react-konva-utils"

export default function TableView() {
  const {
    sheetUrlParams: { sheetId, viewId },
    getTargetSheetViewsArr,
    getTargetSheetViewColumn,
    getTargetViewRows,
  } = useSheets()
  const canvasContainer = useRef<HTMLDivElement>(null)
  const fasterOverlayRef = useRef<HTMLDivElement>(null)
  const [canvasSize, setCanvasSize] = useState<{
    width: number
    height: number
  }>({ width: 0, height: 0 })
  const [workInProgressCell, setWorkInProgressCell] = useState<{
    columnType: keyof ColumnMap
    width: number
    value: string
  } | null>(null)
  const handleEditCell = useCallback(
    (
      event: KonvaEventObject<MouseEvent>,
      cellPayload: { columnType: keyof ColumnMap; width: number; value: string }
    ) => {
      const cellX = event.target.attrs.x
      const cellY = event.target.attrs.y

      setWorkInProgressCell(cellPayload)

      fasterOverlayRef.current!.style.left = cellX + "px"
      fasterOverlayRef.current!.style.top = cellY + "px"
    },
    []
  )
  const views = getTargetSheetViewsArr(sheetId as Key)
  const navigationBarConfig = useMemo(() => {
    return [
      [
        {
          id: "1",
          icon: <IconPlus size={14} />,
          label: "添加记录",
          color: "#3370FF",
        },
      ],
      [
        {
          id: "2",
          icon: <IconSettings size={14} />,
          label: "字段配置",
        },
        {
          id: "3",
          icon: <IconSettings size={14} />,
          label: "筛选",
        },
        {
          id: "4",
          icon: <IconSettings size={14} />,
          label: "分组",
        },
        {
          id: "5",
          icon: <IconSettings size={14} />,
          label: "排序",
        },
        {
          id: "6",
          icon: <IconSettings size={14} />,
          label: "行高",
        },
      ],
      [
        {
          id: "7",
          icon: <IconSettings size={14} />,
          label: "提醒",
        },
        {
          id: "3",
          icon: <IconSettings size={14} />,
          label: "生成表单",
        },
      ],
    ]
  }, [])
  const { columnsConfigArr, columnsConfig, columns } = getTargetSheetViewColumn(
    sheetId as Key,
    viewId as Key
  )
  const columnHeaderWidth = useMemo<number>(() => {
    let width = 0
    columnsConfigArr.forEach(({ width: _w }) => {
      width += _w
    })
    return width
  }, [columnsConfigArr])
  const { rowsArr } = getTargetViewRows(sheetId as Key, viewId as Key)
  useLayoutEffect(() => {
    setCanvasSize({
      width: canvasContainer.current!.offsetWidth,
      height: 500,
    })
  }, [])
  return (
    <Box>
      {/* 头部的视图列表 */}
      <Box className="bg-white w-fit p-3">
        {map(views, (view) => {
          return <Box key={view.id}>{view.name}</Box>
        })}
      </Box>
      <Box ref={canvasContainer} className="bg-white  rounded h-80">
        {/* 导航控制面板 */}
        <Box className="h-10">
          {/* 左侧 */}
          <Box className="flex h-full gap-4 px-4">
            {map(navigationBarConfig, (parentArr) => {
              return (
                <Box className="flex items-center gap-4">
                  {map(parentArr, (nav) => {
                    return (
                      <Box className="flex text-sm items-center">
                        {nav.icon}
                        {nav.label}
                      </Box>
                    )
                  })}
                </Box>
              )
            })}
          </Box>
          {/* 右侧 */}
          <Box></Box>
        </Box>
        {/* canvas视图区域 */}
        <Box className="relative">
          <Stage height={canvasSize.height} width={canvasSize.width}>
            <Layer>
              <Html>
                {/* 列头 */}
                <Box
                  style={{ width: columnHeaderWidth, height: 30 }}
                  className=" bg-slate-300 text-white text-sm rounded"
                ></Box>
              </Html>
              {map(rowsArr, (row, rowIndex) => {
                const columnIds = Object.keys(omit(row, "id"))
                return map(columnIds, (colId, colIndex) => {
                  //单元格宽度
                  const matchColWidth = columnsConfig[colId].width
                  const matchColType = columns[colId].columnType
                  //单元格默认值
                  const matchColValue = row[colId]
                  const x = 0
                  const y = 0
                  return (
                    <>
                      <Rect
                        x={x}
                        y={y + 30}
                        width={matchColWidth}
                        height={30}
                        fill="#fff"
                        strokeWidth={1}
                        stroke="#ddd"
                        onDblClick={(event) =>
                          handleEditCell(event, {
                            columnType: matchColType,
                            width: matchColWidth,
                            value: matchColValue as string,
                          })
                        }
                      />
                      <CanvasText
                        fontSize={14}
                        x={10}
                        y={y + 40}
                        text={matchColValue as string}
                      />
                    </>
                  )
                })
              })}
              {/* <Rect
                x={20}
                y={50}
                width={100}
                height={30}
                fill="#fff"
                strokeWidth={1}
                stroke="#ddd"
                onDblClick={(event) => handleEditCell(event, {
                  columnType:"TEXT",
                  width:
                })}
              /> */}
            </Layer>
          </Stage>
          <Box ref={fasterOverlayRef} className="faster-overlay absolute">
            {workInProgressCell && (
              <Box>
                {workInProgressCell.columnType === "TEXT" && (
                  <TextAutoComponent
                    destoryAtomComponent={() => setWorkInProgressCell(null)}
                    width={workInProgressCell.width}
                    defaultValue={workInProgressCell.value}
                  />
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
