import React from "react"
import Table from "./Table"


function TableList({ tables, setTablesError, loadDashboard }){
    return(
        <div>
            {tables.map((tab) =>(
                <div>
                    <Table
                        table_id={tab.table_id}
                        table_name={tab.table_name}
                        capacity={tab.capacity}
                        reservation_id={tab.reservation_id}
                        setTablesError={setTablesError}
                        loadDashboard={loadDashboard}
                    />
                </div>
            ))}
        </div>
    )
}

export default TableList