export type ColumnMap = {
  TEXT: {}
  SELECT: {
    options: Array<{ label: string; value: string; id: string }>
  }
}
export interface Row {
  id: string
  [columnId: string]: string
}
export interface Column<T extends keyof ColumnMap> {
  id: string
  name: string
  columnType: T
  columnProps: ColumnMap[T]
}
export interface ColumnConfig {
  width: number
  sort: number
}
export interface View {
  id: string
  name: string
  columnsConfig: {
    [columnId: string]: ColumnConfig
  }
}
export interface Sheet {
  id: string
  name: string
  columns: {
    [columnId: string]: Column<any>
  }
  views: {
    [viewId: string]: View
  }
  rows: {
    [rowId: string]: Row
  }
}
