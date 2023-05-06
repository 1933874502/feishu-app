import { Key } from "react"

export type ColumnMap = {
  TEXT: {}
  SELECT: {
    options: Array<{ label: string; value: string; id: Key }>
  }
}
export interface Row {
  id: Key
  [columnId: Key]: Key
}
export interface Column<T extends keyof ColumnMap> {
  id: Key
  name: string
  columnType: T
  columnProps: ColumnMap[T]
}
export interface ColumnConfig {
  width: number
  sort: number
}
export interface View {
  id: Key
  name: string
  columnsConfig: {
    [columnId: Key]: ColumnConfig
  }
}
export interface Sheet {
  id: Key
  name: string
  columns: {
    [columnId: Key]: Column<any>
  }
  views: {
    [viewId: Key]: View
  }
  rows: {
    [rowId: Key]: Row
  }
}
