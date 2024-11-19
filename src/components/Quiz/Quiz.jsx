import React, { useRef, useState } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let op1 = useRef(null);
  let op2 = useRef(null);
  let op3 = useRef(null);
  let op4 = useRef(null);

  let op_array = [op1, op2, op3, op4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (data[index].ans === ans) {
        e.target.classList.add('correct');
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add('incorrect');
        setLock(true);
        op_array[data[index].ans - 1].current.classList.add('correct');
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      setIndex(index + 1);
      setLock(false);
      op_array.forEach((op) => {
        op.current.classList.remove('correct');
        op.current.classList.remove('incorrect');
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="container">
      <h1>Quizzler</h1>
      <hr />
      {result ? (
        <>
          <h2>You scored {score} out of {data.length}</h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <>
          <h2>{index + 1}. {data[index].question}</h2>
          <ul>
            <li ref={op1} onClick={(e) => checkAns(e, 1)}>{data[index].op1}</li>
            <li ref={op2} onClick={(e) => checkAns(e, 2)}>{data[index].op2}</li>
            <li ref={op3} onClick={(e) => checkAns(e, 3)}>{data[index].op3}</li>
            <li ref={op4} onClick={(e) => checkAns(e, 4)}>{data[index].op4}</li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">{index + 1} of {data.length} questions</div>
        </>
      )}
    </div>
  );
};

export default Quiz;
