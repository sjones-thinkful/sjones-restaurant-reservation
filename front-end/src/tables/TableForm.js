import React from 'react' 
import { useHistory } from 'react-router'

function TableForm({ table, changeHandler, submitHandler }){
    const history = useHistory()
    return(
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor = "table_name">Table Name</label> <br />
                <input
                    name = "table_name"
                    type = "string"
                    onChange = {changeHandler}
                    value = {table.table_name}
                    required
                />
            </div>
            <div>
                <label htmlFor = "capacity">Capacity</label> <br />
                <input
                    name = "capacity"
                    type = "number"
                    onChange = {changeHandler}
                    value = {table.capacity}
                    required
                />
            </div>
            <button type="submit">Submit</button>
            <button onClick={() => history.go(-1)}>Cancel</button>
        </form>
    )
}


export default TableForm