import React from 'react' 
import { useHistory } from 'react-router'

function TableForm({ table, changeHandler, submitHandler }){
    const history = useHistory()
    return(
        <form onsubmit={submitHandler}>
            <div>
                <input
                    name = "table_name"
                    type = "string"
                    onChange = {changeHandler}
                    value = {table.table_name}
                    required
                />
            </div>
            <div>
                <input
                    name = "capacity"
                    type = "number"
                    onChange = {changeHandler}
                    value = {table.capacity}
                    required
                />
            </div>
            <button type="submit">Submit</button>
            <button onClick={() => history.push("/")}>Cancel</button>
        </form>
    )
}


export default TableForm