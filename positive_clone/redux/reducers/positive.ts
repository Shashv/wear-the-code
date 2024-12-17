import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchPositive = createAsyncThunk("positive", async () => {
    let data = await fetch("https://jsonplaceholder.typicode.com/todos");
    let positiveData = await data.json();
    return positiveData;
})
const positiveSlice = createSlice({
    name: "positive",
    initialState: {
        isLoading: false,
        data: [],
        error: false
    },
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(fetchPositive.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchPositive.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload
        });
        builder.addCase(fetchPositive.rejected, (state, action) => {
            state.isLoading = false,
                state.error = true
        })
    },
});

export default positiveSlice.reducer;