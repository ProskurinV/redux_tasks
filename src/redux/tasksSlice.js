import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchTasks, addTask, deleteTask, toggleCompleted } from './operations';

const extraActions = [fetchTasks, addTask, deleteTask, toggleCompleted];

const getActionsWithType = type =>
  extraActions.map(extraAction => extraAction[type]);
// ...extraActions.map(extraAction => extraAction.pending)

const handleFetchTasksReducer = (state, action) => {
  state.items = action.payload;
};
const handleAddTaskReducer = (state, action) => {
  state.items.push(action.payload);
};
const handleDeleteTaskReducer = (state, action) => {
  const index = state.items.findIndex(task => task.id === action.payload.id);
  state.items.splice(index, 1);
};
const handleToggleTaskReducer = (state, action) => {
  const index = state.items.findIndex(task => task.id === action.payload.id);
  state.items.splice(index, 1, action.payload);
};

const anyFulfielledReducer = state => {
  state.isLoading = false;
  state.error = null;
};
const anyPendingReducer = state => {
  state.isLoading = true;
};
const anyRejectedReducer = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder =>
    builder
      .addCase(fetchTasks.fulfilled, handleFetchTasksReducer)
      .addCase(addTask.fulfilled, handleAddTaskReducer)
      .addCase(deleteTask.fulfilled, handleDeleteTaskReducer)
      .addCase(toggleCompleted.fulfilled, handleToggleTaskReducer)
      .addMatcher(
        isAnyOf(...getActionsWithType('fulfilled')),
        anyFulfielledReducer
      )
      .addMatcher(isAnyOf(...getActionsWithType('pending')), anyPendingReducer)
      .addMatcher(
        isAnyOf(...getActionsWithType('rejected')),
        anyRejectedReducer
      ),
});

export const tasksReducer = tasksSlice.reducer;

// const tasksSlice = createSlice({
//   name: 'tasks',
//   initialState: {
//     items: [],
//     isLoading: false,
//     error: null,
//   },
//   reducers: {
//     fetchingInProgress(state) {
//       state.isLoading = true;
//     },
//     fetchingSuccess(state, action) {
//       state.isLoading = false;
//       state.error = null;
//       state.items = action.payload;
//     },
//     fetchingError(state, action) {
//       state.isLoading = false;
//       state.error = action.payload;
//     },
// addTask: {
//   reducer(state, action) {
//     state.push(action.payload);
//   },
//   prepare(text) {
//     return {
//       payload: {
//         text,
//         id: nanoid(),
//         completed: false,
//       },
//     };
//   },
// },
// deleteTask(state, action) {
//   const index = state.findIndex(task => task.id === action.payload);
//   state.splice(index, 1);
// },
// toggleCompleted(state, action) {
//   for (const task of state) {
//     if (task.id === action.payload) {
//       task.completed = !task.completed;
//       break;
//     }
//   }
// },
// setAllCompleted(state, action) {
//   return state.map(task => {
//     if (action.payload) {
//       return task.completed ? task : { ...task, completed: true };
//     }
//     return !task.completed ? task : { ...task, completed: false };
//   });
// },
//   },
// });
// export const { fetchingInProgress, fetchingSuccess, fetchingError } =
//   tasksSlice.actions;

// export const { addTask, deleteTask, toggleCompleted } = tasksSlice.actions;
// export const tasksReducer = tasksSlice.reducer;
