import React, { useEffect, useRef, useState } from "react";

export const Timer = (props) => {
    const [currentNumber, setCurrentNumber] = useState(props.time);
    const [currentName, setCurrentName] = useState(props.autostart ? 'Stop' : 'Start');
    const timerPause = useRef(!props.autostart)
    const zeroTimer = useRef(false)
    const divStyle = useRef({
        width: '100%'
    })

    useEffect(() => {
        const ticker = setInterval(() => {
            if(currentNumber >= 1 && currentNumber < props.time && timerPause.current === false) {
                props.onTick(currentNumber - 1)
                setCurrentNumber(currentNumber - props.step / 1000)
            } else if(currentNumber === props.time && timerPause.current === false) {
                props.onTimeStart(currentNumber)
                props.onTick(currentNumber - 1)
                setCurrentNumber(currentNumber - props.step / 1000)
            } else if(currentNumber === 0 && props.autostart === true) {
                setCurrentNumber(props.time)
            }else {
                setCurrentNumber(currentNumber)
            }
        }, props.step)

        if(currentNumber === 0 && props.autostart === false) {
            zeroTimer.current = true
            props.onTimeEnd()
        } else if(currentNumber === 0 && props.autostart === true) {
            props.onTimeEnd()
        }

        if(timerPause.current === true || zeroTimer.current === true) {
            setCurrentName('Start')
        } else {
            setCurrentName('Stop')
        }

        return() => {
            clearInterval(ticker)
        }
    }, [props, currentNumber])

    
    const pause = () => {
        if(zeroTimer.current === false) {
            timerPause.current = !timerPause.current
        } else {
            setCurrentNumber(props.time)
            divStyle.current = {width: '100%'}
            zeroTimer.current = false
        }
        if(timerPause.current === true) {
            props.onTimePause()
            setCurrentName('Start')
        }
    }


    return (
        <div className='timer-container'>
            <p>{Math.floor(currentNumber/60).toString().padStart(2, '0') + ":" + (currentNumber % 60).toString().padStart(2, '0')}</p>
            <button className="start-stop" onClick={pause}>{currentName}</button>
            <div style={divStyle.current = {width: (currentNumber) * 100 / props.time + '%'}} className="timerDiv"></div>
        </div>
    )
}