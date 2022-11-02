import { statusFilters } from './constants';
import { combineReducers } from 'redux';

// Код редюсеров tasksReducer и filtersReducer

// export const rootReducer = (state = {}, action) => {
//   // Возвращаем объект состояния
//   return {
//     // Обоим редюсерам передаем только часть состояния за которую они отвечают
//     tasks: tasksReducer(state.tasks, action),
//     filters: filtersReducer(state.filters, action),
//   };
// };

const tasksInitialState = [
  { id: 0, text: 'Learn HTML and CSS', completed: true },
  { id: 1, text: 'Get good at JavaScript', completed: true },
  { id: 2, text: 'Master React', completed: false },
  { id: 3, text: 'Discover Redux', completed: false },
  { id: 4, text: 'Build amazing apps', completed: false },
];

// Отвечает только за обновление свойства tasks
// Теперь значением параметра state будет массив задач
const tasksReducer = (state = tasksInitialState, { type, payload }) => {
  switch (type) {
    case 'tasks/addTask':
      return [...state, payload];
    case 'tasks/deleteTask':
      return state.filter(task => task.id !== payload);
    case 'tasks/toggleCompleted':
      return state.map(task => {
        if (task.id !== payload) {
          return task;
        }
        return { ...task, completed: !task.completed };
      });
    case 'tasks/setAllCompleted':
      return state.map(task => {
        if (payload) {
          return task.completed ? task : { ...task, completed: true };
        }

        return !task.completed ? task : { ...task, completed: false };
      });

    default:
      return state;
  }
};

const filtersInitialState = {
  status: statusFilters.all,
};

// Отвечает только за обновление свойства filters
// Теперь значением параметра state будет объект фильтров
const filtersReducer = (state = filtersInitialState, action) => {
  switch (action.type) {
    case 'filters/setStatusFilter':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  filters: filtersReducer,
});

// ///////////////////////////////
// const initialState = {
//   tasks: [
//     { id: 0, text: 'Learn HTML and CSS', completed: true },
//     { id: 1, text: 'Get good at JavaScript', completed: true },
//     { id: 2, text: 'Master React', completed: false },
//     { id: 3, text: 'Discover Redux', completed: false },
//     { id: 4, text: 'Build amazing apps', completed: false },
//   ],
//   filters: {
//     status: statusFilters.all,
//   },
// };

// Используем initialState как значение состояния по умолчанию
// export const rootReducer = (state = initialState, action) => {
//   // Редюсер различает экшены по значению свойства type
//   switch (action.type) {
//     // В зависимости от типа экшена будет выполняться разная логика
//     case 'tasks/addTask': {
//       // Нужно вернуть новый объект состояния
//       return {
//         // в котором есть все данные существующего состояния
//         ...state,
//         // и новый массив задач
//         tasks: [
//           // в котором есть все существующие задачи
//           ...state.tasks,
//           // и объект новой задачи
//           action.payload,
//         ],
//       };
//     }
//     case 'tasks/deleteTask':
//       return {
//         ...state,
//         tasks: state.tasks.filter(task => task.id !== action.payload),
//       };
//     case 'tasks/toggleCompleted':
//       return {
//         ...state,
//         tasks: state.tasks.map(task => {
//           if (task.id !== action.payload) {
//             return task;
//           }
//           return {
//             ...task,
//             completed: !task.completed,
//           };
//         }),
//       };
//     case 'filters/setStatusFilter':
//       return {
//         ...state,
//         filters: {
//           ...state.filters,
//           status: action.payload,
//         },
//       };

//     default:
//       // Каждый редюсер получает все экшены отправленные в стор.
//       // Если редюсер не должен обрабатывать какой-то тип экшена,
//       // необходимо вернуть существующее состояние без изменений.
//       return state;
//   }
// };
