import { createSlice } from "@reduxjs/toolkit";

export const toDoSlice = createSlice({
  name: "ToDo",
  initialState: {
    isSaving: false,
    messageSaved: "",
    ToDos: [],
    active: null,
  },
  reducers: {
    savingNewToDo: (state) => {
      state.isSaving = true;
    },
    addNewEmptyToDo: (state, action) => {
      state.ToDos.unshift(action.payload);
      state.isSaving = false;
    },
    setActiveToDo: (state, action) => {
      state.active = action.payload;
      state.messageSaved = "";
    },
    setClearToDo: (state, action) => {
      state.active = action.payload;
    },
    setToDos: (state, action) => {
      state.ToDos = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    updateToDo: (state, action) => {
      // payload: note
      state.isSaving = false;
      state.ToDos = state.ToDos.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }

        return note;
      });

      state.messageSaved = `${action.payload.body}, successfully added`;
    },

    clearToDoLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = "";
      state.ToDos = [];
      state.active = null;
    },

    deleteToDoById: (state, action) => {
      state.active = null;
      state.ToDos = state.ToDos.filter((note) => note.id !== action.payload);
    },
    deleteTodoCompleted: (state, action) => {
      state.active = null;
      state.ToDos = state.ToDos.filter(
        (note) => note.complete === action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyToDo,
  clearToDoLogout,
  deleteToDoById,
  savingNewToDo,
  setActiveToDo,
  setToDos,
  setSaving,
  updateToDo,
  deleteTodoCompleted,
  setClearToDo,
} = toDoSlice.actions;
