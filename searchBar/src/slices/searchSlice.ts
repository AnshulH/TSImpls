import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchTerm: "",
    resultList: [],
    status: "succeeded"
}

export const query = createAsyncThunk(
    'search/query',
    async (queryVal: {searchTerm: String}, _thunkApi) => {
        if (queryVal.searchTerm === "")
            return
        let url = `https://www.googleapis.com/books/v1/volumes?q=${queryVal.searchTerm}&startIndex=0&maxResults=20`;
        const res = await fetch(url);
        return res.json()
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchWord: (state, action: PayloadAction<{ term: string }> ) => {
            state.searchTerm = action.payload.term;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(query.pending, (state) => {
            state.status = "loading";
        })
        .addCase(query.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.resultList = action.payload?.items?.map((item: any) => {
                return {
                    value: item.id,
                    label: item.volumeInfo.title,
                    key: item.id
                };
            });
        })
        .addCase(query.rejected, (state, _action) => {
            state.status = "failed";
            state.resultList = [];
        });
    }
})

export const { searchWord } = searchSlice.actions
export default searchSlice.reducer;