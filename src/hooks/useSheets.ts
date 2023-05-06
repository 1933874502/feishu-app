import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { Key, useCallback, useMemo } from "react"
import { get } from "lodash"
import { Sheet } from "../store/types"
import { createSheet } from "../store/slicers/sheets"
import { useNavigate, useParams } from "react-router-dom"

export default function useSheets() {
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const sheets = useSelector((state: RootState) => state.sheets)
  const sheetsArray = useMemo<Array<Sheet>>(
    () => Object.values(sheets),
    [sheets]
  )
  const getSheet = useCallback((sheetId: Key) => sheets[sheetId], [sheets])
  const getView = useCallback(
    (sheetId: Key, viewId: Key) => get(sheets, [sheetId, viewId]),
    [sheets]
  )
  const getTargetSheetViewsArr = useCallback(
    (sheetId: Key) => {
      return Object.values(sheets[sheetId].views)
    },
    [sheets]
  )
  const getTargetSheetViewColumn = useCallback(
    (sheetId: Key, viewId: Key) => {
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
    (sheetId: Key, viewId: Key) => {
      const targetSheet = get(sheets, [sheetId])
      return {
        rows: targetSheet.rows,
        rowsArr: Object.values(targetSheet.rows),
      }
    },
    [sheets]
  )
  const sheetUrlParams = useMemo(() => {
    return {
      sheetId: params.sheetId,
      viewId: params.viewId,
    }
  }, [params.sheetId, params.viewId])
  const createSheetDispatch = useCallback(
    (sheetName: string) => {
      dispatch(createSheet({ name: sheetName }))
    },
    [dispatch]
  )
  const navigateTotargetView = useCallback(
    (sheetId: Key, viewId?: Key) => {
      if (!viewId) {
        const firstView = getTargetSheetViewsArr(sheetId)[0]
        viewId = firstView.id
      }
      navigate(`/sheet/${sheetId}/${viewId}`)
    },
    [getTargetSheetViewsArr, navigate]
  )
  const setCellValue = useCallback(
    (sheetId: Key, viewId: Key, rowId: Key, colId?: Key) => {},
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
