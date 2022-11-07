import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './tasksSlice';
import { filtersReducer } from './filtersSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedTaskReducer = persistReducer(persistConfig, tasksReducer);

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    // persistedTaskReducer
    filters: filtersReducer,
  },
});

// export const persistor = persistStore(store);
