import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { get } from "lodash"
import { Sheet } from "../store/types"
import { createSheet } from "../store/slicers/sheets"
import { useNavigate, useParams } from "react-router-dom"
import { useCallback, useMemo } from "react"
import { updateRoomVersion } from "../store/slicers/workInProgressRoomInfo"

export default function useSheets() {
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const sheets = useSelector((state: RootState) => state.sheets)
  const roomInfo = useSelector((state:RootState)=>state.workInProgressRoomInfo)
  const sheetsArray = useMemo<Array<Sheet>>(
    () => Object.values(sheets),
    [sheets]
  )
  const getSheet = useCallback((sheetId: string) => sheets[sheetId], [sheets])
  const getView = useCallback(
    (sheetId: string, viewId: string) => get(sheets, [sheetId, viewId]),
    [sheets]
  )
  const getTargetSheetViewsArr = useCallback(
    (sheetId: string) => {
      return Object.values(sheets[sheetId].views)
    },
    [sheets]
  )
  const getTargetSheetViewColumn = useCallback(
    (sheetId: string, viewId: string) => {
      const targetSheet = get(sheets, [sheetId])
      const targetView = get(targetSheet, ["views", viewId])
      return {
        columns: targetSheet.columns,
        columnsConfig: targetView.columnsConfig,
        columnsArr: Object.values(targetSheet.columns),
        columnsConfigArr: Object.values(targetView.columnsConfig),
        sheetId,
        viewId,
      }
    },
    [sheets]
  )
  const getTargetViewRows = useCallback(
    (sheetId: string, viewId: string) => {
      const targetSheet = get(sheets, [sheetId])
      return {
        rows: targetSheet.rows,
        rowsArr: Object.values(targetSheet.rows),
      }
    },
    [sheets]
  )
  const sheetUrlParams = useMemo<{
    roomId: string
    sheetId: string
    viewId: string
  }>(() => {
    return {
      roomId: params.roomId as string,
      sheetId: params.sheetId as string,
      viewId: params.viewId as string,
    }
  }, [params.sheetId, params.viewId, params.roomId])
  const createSheetDispatch = useCallback(
    (sheetName: string) => {
      
      dispatch(createSheet({ name: sheetName, roomId: sheetUrlParams.roomId,roomVersion:roomInfo.roomVersion }))
      dispatch(updateRoomVersion(roomInfo.roomVersion + 1))
    },
    [dispatch, roomInfo.roomVersion, sheetUrlParams.roomId]
  )
  const navigateTotargetView = useCallback(
    (sheetId: string, viewId?: string) => {
      if (!viewId) {
        const firstView = getTargetSheetViewsArr(sheetId)[0]
        viewId = firstView.id
      }
      navigate(`/sheet/${sheetId}/${viewId}`)
    },
    [getTargetSheetViewsArr, navigate]
  )
  const setCellValue = useCallback(
    (sheetId: string, viewId: string, rowId: string, colId: string) => {
      //dispatch()
    },
    []
  )
  return {
    sheets,
    getSheet,
    getView,
    sheetsArray,
    createSheetDispatch,
    navigateTotargetView,
    sheetUrlParams,
    getTargetSheetViewsArr,
    getTargetSheetViewColumn,
    getTargetViewRows,
  }
}
