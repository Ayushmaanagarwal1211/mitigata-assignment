import { configureStore} from "@reduxjs/toolkit";
import TableSlice from "./TableSlice";
import { thunk } from "redux-thunk";
export const store = configureStore({
    reducer : {
        table : TableSlice    
    }
})