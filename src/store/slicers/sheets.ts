import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Key } from "react"
import { Sheet } from "../types"
import { sheetTemplateCreator } from "../utils"

//const defaultSheet = sheetTemplateCreator("未命名子表")

let initialSheets: {
  [sheetId: Key]: Sheet
} = {
  "17d55230-2d43-4519-84ca-461895e84d05": {
    id: "17d55230-2d43-4519-84ca-461895e84d05",
    name: "未命名子表",
    columns: {
      "970d468f-6482-4bc0-a5ab-4b6f50e96fcb": {
        id: "970d468f-6482-4bc0-a5ab-4b6f50e96fcb",
        columnType: "TEXT",
        columnProps: {},
        name: "多行文本",
      },
    },
    views: {
      "c7dba85d-e9e4-4d3c-a44b-e0d6d2eba00f": {
        id: "c7dba85d-e9e4-4d3c-a44b-e0d6d2eba00f",
        name: "表格视图",
        columnsConfig: {
          "970d468f-6482-4bc0-a5ab-4b6f50e96fcb": {
            width: 200,
            sort: 0,
          },
        },
      },
    },
    rows: {
      "c7dba85d-e9e4-4d3c-a44b-e0d2eb0f": {
        id: "c7dba85d-e9e4-4d3c-a44b-e0d2eb0f",
        "970d468f-6482-4bc0-a5ab-4b6f50e96fcb": "hello",
      },
    },
  },
}
const sheetSlice = createSlice({
  name: "sheets",
  initialState: initialSheets,
  reducers: {
    createSheet: (state, action: PayloadAction<{ name: string }>) => {
      const sheetCount = Object.values(state).length
      const sheet = sheetTemplateCreator(
        action.payload.name || `数据表 ${sheetCount + 1}`
      )
      state[sheet.id] = sheet
    },
    deleteSheet: () => {},
    renameSheet: () => {},
  },
})

export const { createSheet, deleteSheet, renameSheet } = sheetSlice.actions
export default sheetSlice.reducer
