import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { Sheet } from "../types"
import { sheetTemplateCreator } from "../utils"
import OperationMessageEmmiter from "../../socket/messageEmmiter/OperationMessageEmmiter"
import { AddSheetOperationPayload } from "../../socket/types"
import { pushRetentionOperations } from "../../socket/socketQueue"

//const defaultSheet = sheetTemplateCreator("未命名子表")

let initialSheets: {
  [sheetId: string]: Sheet
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
    createSheet: (
      state,
      action: PayloadAction<{ name: string; roomId: string;roomVersion:number }>
    ) => {
      const sheetCount = Object.values(state).length
      const sheet = sheetTemplateCreator(
        action.payload.name || `数据表 ${sheetCount + 1}`
      )
      state[sheet.id] = sheet
      const views = sheet.views
      const viewId = Object.keys(views)[0]
      const columns = sheet.columns
      const columnId = Object.keys(columns)[0]
      pushRetentionOperations({
        roomVersion:action.payload.roomVersion + 1,
        executor:()=>OperationMessageEmmiter<AddSheetOperationPayload>(
          ["sheet", sheet.id],
          sheet.id,
          null,
          "AddSheet",
          {
            viewId: viewId,
            columnId: columnId,
            roomId: action.payload.roomId,
            roomVersion:action.payload.roomVersion + 1,
            sheetName: sheet.name,
          }
        )
      })
    },
    applyCreateSheet: (state, action: PayloadAction<Sheet>) => {
      state[action.payload.id] = action.payload
    },
    deleteSheet: () => {},
    renameSheet: () => {},
  },
})

export const { createSheet, deleteSheet, renameSheet, applyCreateSheet } =
  sheetSlice.actions
export default sheetSlice.reducer
