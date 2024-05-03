import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Move } from "../../types";

interface QuickplayDataState {
    history: Move[];
    winner: "black" | "white" | null;
}

const initialState: QuickplayDataState = {
    history: [],
    winner: null,
};

export const quickplaySlice = createSlice({
    name: "quickplay",
    initialState,
    reducers: {
        setEndgameResult: (state, action: PayloadAction<"black" | "white">) => {
            state.winner = action.payload;
        },
        setHistory: (state, action: PayloadAction<Move>) => {
            state.history = [...state.history, action.payload];
        },
        resetQuickplayData: (state) => {
            state.history = [];
            state.winner = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setEndgameResult, setHistory, resetQuickplayData } =
    quickplaySlice.actions;

export default quickplaySlice.reducer;
