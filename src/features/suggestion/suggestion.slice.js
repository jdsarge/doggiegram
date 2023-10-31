import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Task 15: Complete the createAsyncThunk() function
export const fetchSuggestion = createAsyncThunk(
  'suggestion/fetchSuggestion',
  async () => {
    const response = await fetch('http://localhost:3004/api/suggestion');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data;  // Extract the 'data' field from the response
  }
);

const initialState = {
  suggestion: '',
  loading: false,
  error: true,
};

const options = {
  name: 'suggestion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Task 16: Handle the pending state
      .addCase(fetchSuggestion.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      // Handle the fulfilled state
      .addCase(fetchSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.suggestion = action.payload;
      })
      // Handle the rejected state
      .addCase(fetchSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        console.error(action.error);
      });
  },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

// Task 17: Create a selector for the suggestion state variable
export const selectSuggestion = (state) => state.suggestion.suggestion;

export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
