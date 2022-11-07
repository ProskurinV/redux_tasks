// import { Button } from 'components/Button/Button';
import { StatusFilter } from 'components/StatusFilter/StatusFilter';
import { TaskCounter } from 'components/TaskCounter/TaskCounter';
// import { useRef } from 'react';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setAllCompleted } from 'redux/actions';
import css from './AppBar.module.css';

export const AppBar = () => {
  // const dispatch = useDispatch();

  // const [isOn, setIsOn] = useState(false);

  // const isMounted = useRef(false);

  // const toggleIsOn = () => setIsOn(prevState => !prevState);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     dispatch(setAllCompleted(isOn));
  //     return;
  //   }
  //   isMounted.current = true;
  // }, [dispatch, isOn]);

  return (
    <header className={css.wrapper}>
      <section className={css.section}>
        <h2 className={css.title}>Tasks</h2>
        <TaskCounter />
      </section>
      {/* <section className={css.section}>
        <h2 className={css.title}>Actions</h2>
        <Button onClick={toggleIsOn}>
          All completed On/Off {isOn ? 'OFF' : 'ON'}
        </Button>
      </section> */}
      <section className={css.section}>
        <h2 className={css.title}>Filter by status</h2>
        <StatusFilter />
      </section>
    </header>
  );
};
