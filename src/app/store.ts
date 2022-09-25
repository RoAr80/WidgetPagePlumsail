import { configureStore } from "@reduxjs/toolkit";
import dietReducer from "../features/dietSlice";
import appReducer from "../features/appSlice";

export const store = configureStore({
    reducer:{
        app: appReducer,
        diet: dietReducer,
        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch