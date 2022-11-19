import React, { useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { readReservation } from "../utils/api"
import ReservationForm from "./ReservationForm"

function EditReservation(){
    const [reservation, setReservation] = useState("")
    const [error, setError] = useState(null)
    const history = useHistory()
    const res_id = useParams().reservation_id

    const changeHandler = (event) => {
        setReservation({ ...reservation, [event.target.name]: event.target.value })
    }

    const submitHandler = (event) => {
        event.preventDefault()
        const abortController = new AbortController()
        createReservation(reservation)
            .then(() => {
                history.push(`/dashboard?date=${reservation_date}`)
            })
            .catch(setError)
        return ( () => abortController.abort() )
    }

    useEffect(() => {
        async function loadReservation(){
            const res = await readReservation(res_id)
            setReservation(res)
        }
        loadReservation()
    }, [res_id])

    return(
        <>
            <ErrorAlert error={error} setError={setError}/>
            <h2>Edit Reservation</h2>
            <ReservationForm 
                reservation={reservation}
                changeHandler={changeHandler}
                submitHandler={submitHandler}
            />
        </>
    )
}

export default EditReservation