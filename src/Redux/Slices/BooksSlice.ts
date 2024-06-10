import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BooksItemType, Status } from "./BooksSliceType";

const api_key = `AIzaSyA2dq09iFT8XpPnisbhnRnz-YpS8yz_3UQ`

export type searchBooksParams = {
    value:string
}
export const featchBooks = createAsyncThunk(
    'books/featchBooks',
    async function ( params:searchBooksParams ) {
        const { value } = params
        try {
            const { data } = await axios.get<BooksItemType>(`https://www.googleapis.com/books/v1/volumes?key=${api_key}&q=${value}?maxResults='5'`)
            return data as BooksItemType
        } catch (error) {
            console.warn(error)
        }
    }
)
// subject это категория &orderBy=newest

export interface BooksState {
    item: BooksItemType;
    status: Status
}

const initialState: BooksState = {
    item: {
        kind: "",
        totalItems: 0,
        items: []
    } as BooksItemType,
    status: Status.LOADING
}

const BooksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(featchBooks.pending, (state, action) => {
            state.status = Status.LOADING
        })
        builder.addCase(featchBooks.fulfilled, (state, action: PayloadAction<BooksItemType | undefined>) => {
            state.status = Status.SUCCESS
            if (action.payload) {
                state.item = action.payload
            }
        })
        builder.addCase(featchBooks.rejected, (state, action) => {
            state.status = Status.ERROR
        })
    }
})


export const { } = BooksSlice.actions
export default BooksSlice.reducer
