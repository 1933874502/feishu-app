import {
  AddSheetOperationPayload,
  OriginOperationParams,
} from "../socket/types"
import { Column, ColumnConfig, Sheet, View } from "./types"
import { v4 as uuid } from "uuid"

export const viewTemplateCreator: (
  name: string,
  columnsIdArr: string[],
  viewId?: string
) => View = (name, columnsIdArr = [], viewId) => {
  const columnsConfig: {
    [columnId: string]: ColumnConfig
  } = {}
  columnsIdArr.forEach((columnId) => {
    columnsConfig[columnId] = {
      width: 200,
      sort: 0,
    }
  })
  return {
    id: viewId || uuid(),
    name,
    columnsConfig,
  }
}
export const columnInitTemplateCreator: (
  name: string,
  columnId?: string
) => Column<"TEXT"> = (name, columnId) => {
  return {
    id: columnId || uuid(),
    columnType: "TEXT",
    columnProps: {},
    name,
  }
}
export const sheetTemplateCreator: (
  name: string,
  message?: OriginOperationParams<AddSheetOperationPayload>
) => Sheet = (name, message) => {
  const sheetId = message?.path[1] || uuid()
  const defaultColumn = columnInitTemplateCreator(
    "多行文本",
    message?.payload?.columnId
  )
  const defaultView = viewTemplateCreator(
    "表格视图",
    [defaultColumn.id],
    message?.payload?.viewId
  )
  return {
    id: sheetId,
    name,
    columns: {
      [defaultColumn.id]: defaultColumn,
    },
    views: {
      [defaultView.id]: defaultView,
    },
    rows: {},
  }
}
