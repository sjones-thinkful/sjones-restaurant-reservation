import React from "react"
import Reservation from "./Reservation"


function ReservationList({ reservations, setReservationsError, loadDashboard }){
    return(
        <div>
            {reservations.map((res) =>(
                <div>
                    <Reservation 
                        reservation_id={res.reservation_id}
                        first_name={res.first_name}
                        last_name={res.last_name}
                        mobile_number={res.mobile_number}
                        reservation_date={res.reservation_date}
                        reservation_time={res.reservation_time.slice(0, 5)}
                        people={res.people}
                        status={res.status}
                        setReservationsError={setReservationsError}
                        loadDashboard={loadDashboard}
                    />
                </div>
            ))}
        </div>
    )
}


export default ReservationList