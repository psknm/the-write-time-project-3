import { useState, useRef } from 'react'

const Timer = () => {

    const [time, setTime] = useState({
        minutes: 0,
        seconds: 0
    });
    const [timer, setTimer] = useState(null);

    return (
        <>
        <div></div>
        <h2>00:00</h2>
        {/* This should change when the input for Set Time is done */}
        <label htmlFor="timer">Set Time: </label>
        {/* add an onChange here */}
        <button>Play</button>
        {/* add an onClick here */}
        <button>Pause</button>
        {/* add an onClick here */}
        <button>Reset</button><br /><br />
        {/* add an onClick here */}
        </>
    )

}

export default Timer;