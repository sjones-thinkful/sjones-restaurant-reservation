const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const service = require("./reservations.service")

// Middleware
function bodyDataExists(req, res, next) {
  if (req.body.data) {
    return next()
  }
  next({ status: 400, message: "Body must have data property"})
}

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body
    if (data[propertyName] && data[propertyName] !== "") {
      return next()
    }
    next({
        status: 400,
        message: `Must include a ${propertyName}`
    })
  }
}

async function resExists(req, res, next){
  const { reservation_id } = req.params
  const foundRes = await service.read(reservation_id)
  if (foundRes) {
    res.locals.reservation = foundRes
    return next()
  }
  next({
    status: 404,
    message: `Reservation id does not exist: ${reservation_id}`,
  })
}

function validDateTime(req, res, next){
  const dateInput = req.body.data.reservation_date
  const timeInput = req.body.data.reservation_time
  const requestDateTime = new Date(`${dateInput} ${timeInput}`)
  const currentDateTime = new Date()
  const dayInput = new Date(dateInput).getDay()
  if (typeof (Date.parse(dateInput)) !== "number"){
    next({ status: 400, message: "Reservation date must be a date format"})
  } else if (Number.isNaN(Date.parse(timeInput))){
    next({ status: 400, message: "Reservation time must be a time format"})
  } else if (requestDateTime < currentDateTime) {
    next({ status: 400, message: "Requested reservation must be in the future" })
  } else if (timeInput < "10:30" || timeInput > "20:30" || dayInput == 1){
    next({ status: 400,  message: "Requested reservation must be within business hours"})
  }
  else {
    next()
  }
}

function validPeopleBooked(req, res, next){
  const peopleInput = req.body.data.people
  const statusInput = req.body.data.status
  if (typeof peopleInput !== "number" || peopleInput < 1){
    next({ status: 400, message: "People must be a number 1 or greater"})
  } else if (statusInput && statusInput !== "booked"){
    next({ status: 400, message: "Reservations in a status other than booked cannot be created" })
  } else {
    next()
  }
}

function validStatus(req, res, next){
  const statusInput = req.body.data.status
  const statusOptions = ["booked", "seated", "cancelled", "finished"]
  if (statusInput && !statusOptions.includes(statusInput)){
    next({ status: 400, message: "Status options are booked, seated, cancelled, finished" })
  } else if (statusInput == "finished"){
    next({ status: 400, message: "Reservations that are finished cannot be edited" })
  } else{
    next()
  }
}

// Handlers

async function list(req, res, next){
  const date = req.query.date
  const mobile = req.query.mobile_number
  if (date) {
    const data = await service.list(date)
    res.json({ data })
  } else if (mobile) {
    const data = await service.search(mobile)
    res.json({ data })
  } else {
    let currentDate = new Date().toJSON().slice(0, 10)
    const data = await service.list(currentDate)
    res.json({ data })
  }
}

async function create(req, res, next){
  const newRes = req.body.data
  const data = await service.create(newRes)
  res.status(201).json({ data: data })
}

async function read(req, res, next){
  const data = res.locals.reservation
  res.json({ data })
}

async function update(req, res, next){
  const resId = res.locals.reservation.reservation_id
  const updatedRes = { ...req.body.data, reservation_id: resId}
  const data = await service.update(updatedRes)
  res.json({ data })
}

async function updateStatus(req, res, next){

}


module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    bodyDataExists,
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    validDateTime,
    validPeopleBooked,
    create,
  ],
  read: [
    asyncErrorBoundary(resExists),
    read,
  ],
  updateRes: [
    asyncErrorBoundary(resExists),
    bodyDataExists,
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    validDateTime,
    validPeopleBooked,
    asyncErrorBoundary(update),
  ],
  updateStatus: [
    bodyDataExists,
    asyncErrorBoundary(resExists),
    validStatus,
    asyncErrorBoundary(update),
  ],
}
