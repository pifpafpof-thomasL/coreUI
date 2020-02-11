import React from "react";

import useStore, { createStore} from 'global-hook-store'


const counterStore = createStore(
    {
      count: 0
    },
    {
      increment: ({ count }) => ({ count: count + 1 }),
      decrement: ({ count }) => ({ count: count - 1 })
    }
  );


const Counter = () => {
    const { actions, state } = useStore(counterStore);
   
    return (
      <>
        <h1>Count {state.count}</h1>
        <button onClick={() => actions.decrement()}>-</button>
        <button onClick={() => actions.increment()}>+</button>
      </>
    );
  };

  export default Counter;