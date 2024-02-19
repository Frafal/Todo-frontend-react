import { useState } from 'react';
import CounterButton from './CounterButton.jsx';
import './Counter.css';


export default function Counter() {
    //[0, f]
    const [count, setCount] = useState(0);

    function incrementCounterParentFunction(by) {
        setCount(count + by);
    }

    function decrementCounterParentFunction(by) {
        setCount(count - by);
    }

    function ResetCounterFunction() {
        setCount(0);
    }

    return (
        <>
            <div>
                <CounterButton by={1}
                    increaseBy={incrementCounterParentFunction}
                    decreaseBy={decrementCounterParentFunction} />
                <CounterButton by={2}
                    increaseBy={incrementCounterParentFunction}
                    decreaseBy={decrementCounterParentFunction} />
                <CounterButton by={3}
                    increaseBy={incrementCounterParentFunction}
                    decreaseBy={decrementCounterParentFunction} />
                <CounterButton by={5}
                    increaseBy={incrementCounterParentFunction}
                    decreaseBy={decrementCounterParentFunction} />
                <span className="totalCount">{count}</span>
            </div>
            <button className="ResetButton" onClick={ResetCounterFunction}>Reset</button>
        </>
    )
}



