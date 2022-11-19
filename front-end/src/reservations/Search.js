import React, { useState } from "react"
import ErrorAlert from "../layout/ErrorAlert"
import ReservationList from "../reservations/ReservationList"
import { listReservations } from "../utils/api"

function Search(){
    const [error, setError] = useState(null)
    const [reservations, setReservations] = useState([])
    const [phone, setPhone] = useState("")
    const [failedSearchResult, setFailedSearchResult] = useState("")

    const changeHandler = (event) => {
        setPhone(event.target.value)
    }

    const searchHandler = (event) => {
        event.preventDefault()
        const abortController = new AbortController()
        listReservations({ phone }, abortController.signal)
            .then((res) => setReservations(res))
            .then(setFailedSearchResult("No reservations found"))
            .catch(setError)
        return ( () => abortController.abort() )
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
                    value = {phone}
                    required
                />
                <button onClick={searchHandler}>Search</button>
            </div>
        </>
    )
}

export default Search 