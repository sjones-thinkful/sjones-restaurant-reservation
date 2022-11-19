import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import ErrorAlert from "../layout/ErrorAlert"
import SeatForm from "./SeatForm"
import { listTables, updateTable, readReservation } from "../utils/api"


function SeatReservation(){
    const res = useParams()
    const [error, setError] = useState(null)
    const [tables, setTables] = useState([])
    const [reservation, setReservation] = useState([])
    const [currentTable, setCurrentTable] = useState({ reservation_id: res.reservation_id})
    const history = useHistory()

    const changeHandler = (event) => {
        setCurrentTable({ ...currentTable, [event.target.name]: event.target.value })
    }

    const submitHandler = (event) => {
        event.preventDefault()
        const abortController = new AbortController()
        updateTable(res.reservation_id, currentTable.table_id, currentTable)
            .then(() => {
                history.push("/dashboard")
            })
            .catch(setError)
        return ( () => abortController.abort() )
    }
    
    useEffect(() => {
        async function loadTables() {
            const resp = await listTables()
            setTables(resp)
        }
        loadTables()
      }, [])

    useEffect(() => {
    async function loadReservation() {
            const resp = await readReservation(res.reservation_id)
            setReservation(resp)
        }
        loadReservation()
    }, [res.reservation_id])

    return(
        <>
            <ErrorAlert error={error} setError={setError}/>
            <h2>Seat Table</h2>
            <SeatForm 
                tables={tables}
                reservation={res}
                changeHandler={changeHandler}
                submitHandler={submitHandler}
            />
        </>
    )
}


export default SeatReservation