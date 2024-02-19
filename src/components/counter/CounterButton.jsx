import { PropTypes } from 'prop-types';

export default function CounterButton({ by, increaseBy, decreaseBy }) {

    return (
        <div className="Counter">
            {/* <span className="count">{count}</span> */}
            
            <div>
                <button className="counterButton" onClick={() => increaseBy(by)}>+{by}</button>
                <button className="counterButton" onClick={() => decreaseBy(by)}>-{by}</button>
            </div>
        </div>
    )

    
    
}

CounterButton.propTypes = {
    by: PropTypes.number,
    increaseBy: PropTypes.func,
    decreaseBy : PropTypes.func
}

CounterButton.defaultProps = {
    by: 1
}