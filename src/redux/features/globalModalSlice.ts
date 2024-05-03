import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ModalDataState } from "../../types";

const initialState: ModalDataState = {
    title: "Title",
    content: "Content",
    showCancelButton: true,
};

export const globalModalSlice = createSlice({
    name: "globalModal",
    initialState,
    reducers: {
        setModalState: (state, action: PayloadAction<ModalDataState>) => {
            state.title = action.payload.title;
            state.content = action.payload.content;

            state.img = action.payload.img;
            state.confirmButton = action.payload.confirmButton;
            state.onConfirmNavigate = action.payload.onConfirmNavigate;

            state.showCancelButton = action.payload.showCancelButton;
        },
        resetModalState: (state) => {
            state.title = "Title";
            state.content = "Content";
            state.showCancelButton = true;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setModalState, resetModalState } = globalModalSlice.actions;

export default globalModalSlice.reducer;
