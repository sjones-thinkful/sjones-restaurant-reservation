import React from "react"

import { Redirect, Route, Switch } from "react-router-dom"
import Dashboard from "../dashboard/Dashboard"
import NotFound from "./NotFound"
import { today } from "../utils/date-time"
import useQuery from "../utils/useQuery"
import NewReservation from "../reservations/NewReservation"
import EditReservation from "../reservations/EditReservation"
import SeatReservation from "../reservations/SeatReservation"
import NewTable from "../tables/NewTable"
import Search from "../reservations/Search"

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery()
  const dateInput = query.get("date") || today()

  return (
    <Switch>
      
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      
      <Route path="/dashboard">
        <Dashboard date={dateInput} />
      </Route>
      
      <Route path="/search">
        <Search />
      </Route>

      <Route path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      
      <Route path="/reservations/new">
        <NewReservation />
      </Route>
      
      <Route path="/reservations/:reservation_id/seat">
        <SeatReservation />
      </Route>
      
      <Route path="/tables/new">
        <NewTable />
      </Route>
      
      <Route>
        <NotFound />
      </Route>
    
    </Switch>
  )
}

export default Routes
