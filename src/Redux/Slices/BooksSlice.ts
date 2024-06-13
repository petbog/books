import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BooksItemType,  CategoriesEnum,  Status,SortEnum } from "./BooksSliceType";
import { RootState } from "..";

//не стал помещать в .env т.к не знаю как загрузить на vercel
// const api_key = `AIzaSyA2dq09iFT8XpPnisbhnRnz-YpS8yz_3UQ`
const api_key = `AIzaSyDU2Ho6TuQls3_FCcHNjQJXmjmLApuUjRU`

export type searchBooksParams = {
    value: string;
    sort: string,
    categories?: string,
}


//получение данных
export const featchBooks = createAsyncThunk(
    'books/featchBooks',
    async function (params: searchBooksParams) {
        const { value, sort, categories } = params
        let url = `https://www.googleapis.com/books/v1/volumes?key=${api_key}&maxResults=30&orderBy=${sort}`
        if (value) {
            url = `https://www.googleapis.com/books/v1/volumes?key=${api_key}&q=${value}&maxResults=30&orderBy=${sort}`
        } else if (categories === CategoriesEnum.ALL) {
            url = `https://www.googleapis.com/books/v1/volumes?key=${api_key}&q=subject:art%20biography%20computers%20history%20medical%20poetry&maxResults=30&orderBy=${sort}`
        } else if (categories) {
            url = `https://www.googleapis.com/books/v1/volumes?key=${api_key}&q=subject:${categories}&maxResults=30&orderBy=${sort}`
        }

        try {
            const { data } = await axios.get<BooksItemType>(url)
            return data as BooksItemType
        } catch (error) {
            console.warn(error)
        }
    }
)

//пагинация
export const loadMoreBooks = createAsyncThunk(
    'books/loadMoreBooks',
    async function (params: searchBooksParams, { getState }) {
        const { value, sort, categories } = params
        const currentPage = (getState() as RootState).books.currentPage;
        let url = `https://www.googleapis.com/books/v1/volumes?key=${api_key}&maxResults=30&orderBy=${sort}&startIndex=${(currentPage + 1) * 30}`
        if (value) {
            url = `https://www.googleapis.com/books/v1/volumes?key=${api_key}&q=${value}&maxResults=30&orderBy=${sort}&startIndex=${(currentPage + 1) * 30}`
        } else if (categories === CategoriesEnum.ALL) {
            url = `https://www.googleapis.com/books/v1/volumes?key=${api_key}&q=subject:art%20biography%20computers%20history%20medical%20poetry&maxResults=30&orderBy=${sort}&startIndex=${(currentPage + 1) * 30}`
        } else if (categories) {
            url = `https://www.googleapis.com/books/v1/volumes?key=${api_key}&q=subject:${categories}&maxResults=30&orderBy=${sort}&startIndex=${(currentPage + 1) * 30}`
        }
        try {
            const { data } = await axios.get<BooksItemType>(url)
            return data as BooksItemType
        } catch (error) {
            console.warn(error)
        }
    }
);

export interface BooksState {
    item: BooksItemType;
    status: Status;
    categories: CategoriesEnum,
    sort: SortEnum,
    currentPage: number
}

const initialState: BooksState = {
    item: {
        kind: "",
        totalItems: 0,
        items: []
    } as BooksItemType,
    status: Status.LOADING,
    categories: CategoriesEnum.ALL,
    sort: SortEnum.NEWEST,
    currentPage: 0
}

const BooksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setParams(state, action: PayloadAction<CategoriesEnum | SortEnum>) {
            if (action.payload === SortEnum.NEWEST || action.payload === SortEnum.RELEVANCE) {
                state.sort = action.payload as SortEnum;
            } else if (action.payload === CategoriesEnum.ALL || action.payload === CategoriesEnum.ART || action.payload === CategoriesEnum.COMPUTERS || action.payload === CategoriesEnum.HISTORY || action.payload === CategoriesEnum.MEDICAL || action.payload === CategoriesEnum.POETRY || action.payload === CategoriesEnum.bIOGRAPHY) {
                state.categories = action.payload as CategoriesEnum;
            }
        },
        addMoreBooks(state, action: PayloadAction<BooksItemType>) {
            state.item.items = [...state.item.items, ...action.payload.items];

        }
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
        builder.addCase(loadMoreBooks.fulfilled, (state, action: PayloadAction<BooksItemType | undefined>) => {
            state.status = Status.SUCCESS;
            if (action.payload) {
                state.item.items = [...state.item.items, ...action.payload.items];
                state.currentPage++
            }
        });
    }
})


export const { setParams, addMoreBooks } = BooksSlice.actions
export default BooksSlice.reducer
