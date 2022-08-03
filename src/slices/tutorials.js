import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TutorialDataService from "../services/tutorial.service";

const initialState = [];

export const createTutorial = createAsyncThunk(
  "tutorials/create",
  async ({ title, description, docNumb, docDate, sentTo, sentFrom, fileLink, seen }) => {
    const res = await TutorialDataService.create({ title, description, docNumb, docDate, sentTo, sentFrom, fileLink, seen });
    return res.data;
  }
);

export const retrieveTutorials = createAsyncThunk(
  "tutorials/retrieve",
  async () => {
    const res = await TutorialDataService.getAll();
    return res.data;
  }
);

export const updateTutorial = createAsyncThunk(
  "tutorials/update",
  async ({ id, data }) => {
    const res = await TutorialDataService.update(id, data);
    return res.data;
  }
);

export const deleteTutorial = createAsyncThunk(
  "tutorials/delete",
  async ({ id }) => {
    await TutorialDataService.delete(id);
    return { id };
  }
);

export const deleteAllTutorials = createAsyncThunk(
  "tutorials/deleteAll",
  async () => {
    const res = await TutorialDataService.deleteAll();
    return res.data;
  }
);

export const findTutorialsByTitle = createAsyncThunk(
  "tutorials/findByTitle",
  async ({ title }) => {
    const res = await TutorialDataService.findByTitle(title);
    return res.data;
  }
);

const tutorialSlice = createSlice({
  name: "tutorial",
  initialState,
  extraReducers: {
    [createTutorial.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveTutorials.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateTutorial.fulfilled]: (state, action) => {
      const index = state.findIndex(tutorial => tutorial.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteTutorial.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllTutorials.fulfilled]: (state, action) => {
      return [];
    },
    [findTutorialsByTitle.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = tutorialSlice;
export default reducer;
