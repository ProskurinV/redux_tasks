import { Task } from 'components/Task/Task';
import css from './TaskList.module.css';
import { useSelector } from 'react-redux';
import { selectVisibleTasks } from 'redux/selectors';

export const TaskList = () => {
  // Получаем массив задач из состояния Redux
  const tasks = useSelector(selectVisibleTasks);

  return (
    <ul className={css.list}>
      {tasks.map(task => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
};
