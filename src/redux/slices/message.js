import {createSlice} from "@reduxjs/toolkit";
import columnList from '../../pages/columns.json';

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        messageList: [],
        columns: columnList
    },
    reducers: {
        setMessage: (state, action) => {
            if (action.payload && action.payload.length) {
                action.payload.forEach(message => {
                    const index = state.messageList.findIndex(item => item.dataId === message.dataId);
                    if (index >= 0) {
                        state.messageList[index] = message;
                    } else {
                        state.messageList.push(message);
                    }
                })
                if (state.columns.some(column => column.sortable)) {
                    state.columns.filter(column => column.sortable).forEach(column => {
                        state.messageList.sort((a, b) => column.orderType === "asc" ? a[column.field] - b[column.field] : b[column.field] - a[column.field]);
                    })
                }
            }
        },
        shortData: (state, action) => {
            const index = state.columns.findIndex(column => column.field === action.payload.field);
            if (index >= 0) {
                let column = state.columns[index];
                column.orderType = action.payload.orderType;
                state.messageList.sort((a, b) => column.orderType === "asc" ? a[column.field] - b[column.field] : b[column.field] - a[column.field]);

            }
        }
    },
})

export const {
    setMessage,
    shortData,
    filterData,
    applySort
} = messageSlice.actions;

export default messageSlice.reducer;
