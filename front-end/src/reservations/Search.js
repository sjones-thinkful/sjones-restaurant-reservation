import React, { useState } from "react"
import ErrorAlert from "../layout/ErrorAlert"
import ReservationList from "../reservations/ReservationList"
import { listReservations } from "../utils/api"

function Search(){
    const [error, setError] = useState(null)
    const [search, setSearch] = useState({})
    const [reservations, setReservations] = useState([])
  
  
    const changeHandler = (event) => {
      const { target } = event
      const value = target.value
      setSearch({ ...search, [target.name]: value })
    }
  
    const searchHandler = (event) => {
      event.preventDefault()
      const abortController = new AbortController()
      listReservations( search, abortController.signal )
        .then((response)=>setReservations(response))
        .catch((error)=>console.log(error))
      return () => abortController.abort()
    }


    return(
        <>
            <ErrorAlert error={error} setError={setError}/>
            <h2>Search Reservations by Phone</h2>
            <div>
                <input
                    name = "mobile_number"
                    type = "string"
                    onChange = {changeHandler}
                    required
                />
                <button onClick={searchHandler}>Search</button>
            </div>
            <div>
                {reservations.length !== 0 ? <ReservationList reservations={reservations}/> : `No reservations found with this phone number`}
            </div>

        </>
    )
}

export default Search 