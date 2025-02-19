import React from "react"
import { cancelReservation } from "../utils/api"

function Reservation({reservation_id, first_name, last_name, mobile_number, reservation_date, reservation_time, people, status, setReservationsError, loadDashboard}){
    function cancelHandler(event,reservation_id){
        event.preventDefault()
        const pop = "Do you want to cancel this reservation?"
        if(window.confirm(pop)){
          cancelReservation(reservation_id, "cancelled")
          .then(()=>loadDashboard())
        }
      }

    return(
        <div className="card mb-3" key={reservation_id}>
            <div className="card-body">
                <p className="card-text">Name: {first_name} {last_name}</p>
                <p className="card-text">Mobile number: {mobile_number}</p>
                <p className="card-text">Date: {reservation_date}</p>
                <p className="card-text">Time: {reservation_time}</p>
                <p className="card-text">Party Size: {people} </p>
                <p className="card-text">Reservation ID: {reservation_id}</p>
                <p className="card-text" data-reservation-id-status={reservation_id}>Reservation Status: {status}</p>
             
                {status!=='seated' ? 
                    <a href={`/reservations/${reservation_id}/seat`}>
                        <button>Seat</button>
                    </a> 
                : null }

                <a href={`/reservations/${reservation_id}/edit`}>
                    <button>Edit</button>
                </a>

                {status !== "cancelled" && 
                    <button data-reservation-id-cancel={reservation_id} onClick={(event)=>cancelHandler(event,reservation_id)}>Cancel</button> 
                }
            </div>
        </div>
    )
}

export default Reservation