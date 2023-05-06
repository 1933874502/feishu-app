import { Key } from "react"
import { Column, ColumnConfig, Sheet, View } from "./types"
import { v4 as uuid } from "uuid"

export const viewTemplateCreator: (
  name: string,
  columnsIdArr: Key[]
) => View = (name, columnsIdArr = []) => {
  const columnsConfig: {
    [columnId: Key]: ColumnConfig
  } = {}
  columnsIdArr.forEach((columnId) => {
    columnsConfig[columnId] = {
      width: 200,
      sort: 0,
    }
  })
  return {
    id: uuid(),
    name,
    columnsConfig,
  }
}
export const columnInitTemplateCreator: (name: string) => Column<"TEXT"> = (
  name: string
) => {
  return {
    id: uuid(),
    columnType: "TEXT",
    columnProps: {},
    name,
  }
}
export const sheetTemplateCreator: (name: string) => Sheet = (name: string) => {
  const sheetId = uuid()
  const defaultColumn = columnInitTemplateCreator("多行文本")
  const defaultView = viewTemplateCreator("表格视图", [defaultColumn.id])
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
