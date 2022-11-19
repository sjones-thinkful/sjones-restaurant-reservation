import React from "react";
import { useHistory } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

function ChangeDashDate({ currentDate }) {
  const history = useHistory()

  const resetHandler = (event) => {
    event.preventDefault()
    history.push(`/dashboard?date=${today()}`)
  }

  const backHandler = (event) => {
    event.preventDefault();
    history.push(`/dashboard?date=${previous(currentDate)}`)
  }

  const forwardHandler = (event) => {
    event.preventDefault();
    history.push(`/dashboard?date=${next(currentDate)}`)
  }


  return (
    <>
        <div>
            <button onClick={backHandler}>Previous</button>
            <button onClick={resetHandler}>Today</button>
            <button onClick={forwardHandler}>Next</button>
        </div>
    </>
  )
}

export default ChangeDashDate