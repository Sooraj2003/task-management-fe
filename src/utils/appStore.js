import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import tasksSlice from "./tasksSlice"



const appStore = configureStore({
    reducer:{
    user:userSlice,
    tasks:tasksSlice

    }
})

export default appStore;