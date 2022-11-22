import React from 'react' 
import { useHistory } from 'react-router'

function ReservationForm({ reservation, changeHandler, submitHandler }){
    const history = useHistory()
    return(
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor = "first_name">First Name</label> <br />
                <input
                    name = "first_name"
                    type = "string"
                    onChange = {changeHandler}
                    value = {reservation.first_name}
                    required
                />
            </div>
            <div>
                <label htmlFor = "last_name">Last Name</label> <br />
                <input
                    name = "last_name"
                    type = "string"
                    onChange = {changeHandler}
                    value = {reservation.last_name}
                    required
                />
            </div>
            <div>
                <label htmlFor = "mobile_name">Phone</label> <br />
                <input
                    name = "mobile_number"
                    type="text"
                    pattern="[1-9]{1}[0-9]{9}"
                    onChange = {changeHandler}
                    value = {reservation.mobile_number}
                    required
                />
            </div>
            <div>
                <label htmlFor = "reservation_date">Date</label> <br />
                <input
                    name = "reservation_date"
                    type = "date"
                    onChange = {changeHandler}
                    value = {reservation.reservation_date}
                    required
                />
            </div>
            <div>
                <label htmlFor = "reservation_time">Time</label> <br />
                <input
                    name = "reservation_time"
                    type = "time"
                    onChange = {changeHandler}
                    value = {reservation.reservation_time}
                    required
                />
            </div>
            <div>
                <label htmlFor = "people">Party Size</label> <br />
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