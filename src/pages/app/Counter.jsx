// Counter.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../../redux/counterSlice'; 

const Counter = () => {
    const count = useSelector((state) => state.counter.value); // ✅ read from store
    const dispatch = useDispatch();                            // ✅ send actions
  
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>Redux Counter</h2>
        <h1>{count}</h1>
        <div>
          <button onClick={() => dispatch(increment())}>Increment</button>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
          <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
      </div>
    );
  };


export default Counter;
