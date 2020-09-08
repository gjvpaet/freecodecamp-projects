import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import projectUrls from "constants/projectUrls";

interface AddExerciseProps {
  userId: string;
  duration: number;
  description: string;
  date?: string;
}

export const loadUser = createAsyncThunk(
  "exercise/loadUser",
  async (_, thunkAPI) => {
    try {
      const url = projectUrls.EXERCISE_TRACKER.examples[0].url;
      const response = await fetch(url);

      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// export const load = createAsyncThunk(
//   "exercise/load",
//   async ({ from, to, limit, userId }, thunkAPI) => {
//     try {
//       const response = await fetch("/api/exercises/logs");

//       return response.json();
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error: error.message });
//     }
//   }
// );

export const addUser = createAsyncThunk(
  "exercise/addUser",
  async (newUser: { username: string }, thunkAPI) => {
    try {
      const response = await fetch("/api/exercise/new-user", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue({ error: error.error });
      }

      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const addExercise = createAsyncThunk(
  "exercise/add",
  async (newExercise: AddExerciseProps, thunkAPI) => {
    try {
      const response = await fetch("/api/exercise/add", {
        method: "POST",
        body: JSON.stringify(newExercise),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue({ error: error.error });
      }

      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const exerciseSlice = createSlice({
  name: "exercise",
  initialState: {
    users: [],
    loading: true,
    exercises: [],
    exerciseLoading: false,
  },
  reducers: {},
  extraReducers: {
    [addUser.pending as any]: (state) => {
      state.loading = true;
    },
    [addUser.fulfilled as any]: (state: any, action) => {
      state.users.push(action.payload);
      state.loading = false;
    },
    [addUser.rejected as any]: (state: any, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    [addExercise.pending as any]: (state) => {
      state.exerciseLoading = true;
    },
    [addExercise.fulfilled as any]: (state: any, action) => {
      state.exerciseLoading = false;
    },
    [addExercise.rejected as any]: (state: any, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    [loadUser.fulfilled as any]: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    [loadUser.pending as any]: (state) => {
      state.loading = true;
    },
    [loadUser.rejected as any]: (state) => {
      state.loading = false;
      state.users = [];
    },
  },
});

export const selectUsers = createSelector(
  (state: any) => ({
    users: state.exercise.users,
    loading: state.exercise.loading,
    error: state.exercise.error,
  }),
  (state) => state
);

export const selectExercises = createSelector(
  (state: any) => ({
    data: state.exercise.exercises,
    loading: state.exercise.exerciseLoading,
    error: state.exercise.error,
  }),
  (state) => state
);

export default exerciseSlice.reducer;
