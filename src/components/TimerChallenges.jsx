import { useState, useRef } from "react"
import ResultModal from "./ResultModal";

export default function TimerChallenges({title, targetTime}) {
    const timer = useRef();
    const refDialog = useRef();
    
    const [timeRemaining, setTimeRemaining] = useState(targetTime*1000);
    
    const timeIsActive = timeRemaining > 0 && timeRemaining < targetTime*1000;

    if (timeRemaining <= 0 ){
        clearInterval(timer.current);
        refDialog.current.open();
    }

    function handleStart(){
       timer.current = setInterval(() => {
            setTimeRemaining(prevTime => prevTime - 10);
        }, 10);
    }

    function handleStop() {
        refDialog.current.open();
        clearInterval(timer.current);
    }

    function handleReset(){
        setTimeRemaining(targetTime*1000);
    }

    return (
      <>
        <ResultModal
          ref={refDialog}
          targetTime={targetTime}
          remainingTime={timeRemaining}
          onReset={handleReset}
        />
        <section className="challenge">
          <h2>{title}</h2>
          <p className="challenge-time">
            {targetTime} second{targetTime > 1 ? "s" : ""}
          </p>
          <p>
            <button onClick={timeIsActive ? handleStop : handleStart}>
              {timeIsActive ? "Stop" : "Start"} Challenge
            </button>
          </p>
          <p className={timeIsActive ? "active" : undefined}>
            {timeIsActive ? "Time is Running" : "Timer inactive"}
          </p>
        </section>
      </>
    );}