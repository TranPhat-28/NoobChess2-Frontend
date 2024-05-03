import { configureStore } from "@reduxjs/toolkit";
import globalModalReducer from "../redux/features/globalModalSlice";
import quickplayReducer from "../redux/features/quickplaySlice";

export const store = configureStore({
    reducer: {
        globalModal: globalModalReducer,
        quickplay: quickplayReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
