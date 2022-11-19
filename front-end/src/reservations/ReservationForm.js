import React from 'react' 
import { useHistory } from 'react-router'

function ReservationForm({ reservation, changeHandler, submitHandler }){
    const history = useHistory()
    return(
        <form onsubmit={submitHandler}>
            <div>
                <input
                    name = "first_name"
                    type = "string"
                    onChange = {changeHandler}
                    value = {reservation.first_name}
                    required
                />
            </div>
            <div>
                <input
                    name = "last_name"
                    type = "string"
                    onChange = {changeHandler}
                    value = {reservation.last_name}
                    required
                />
            </div>
            <div>
                <input
                    name = "mobile_number"
                    type = "string"
                    onChange = {changeHandler}
                    value = {reservation.mobile_number}
                    required
                />
            </div>
            <div>
                <input
                    name = "reservation_date"
                    type = "date"
                    onChange = {changeHandler}
                    value = {reservation.reservation_date}
                    required
                />
            </div>
            <div>
                <input
                    name = "reservation_time"
                    type = "time"
                    onChange = {changeHandler}
                    value = {reservation.reservation_time}
                    required
                />
            </div>
            <div>
                <input
                    name = "people"
                    type = "number"
                    onChange = {changeHandler}
                    value = {reservation.people}
                    required
                />
            </div>
            <button type="submit">Submit</button>
            <button onClick={() => history.push("/")}>Cancel</button>
        </form>
    )
}


export default ReservationForm