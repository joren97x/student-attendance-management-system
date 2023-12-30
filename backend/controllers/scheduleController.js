import { storeSchedule, getScheduleToday } from "../models/Schedule.js"

export const createSchedule = (req, res) => {
    console.log(req.body)
    storeSchedule(req.body, (err, result) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(result)
        }
    })
}

export const getSchedule = (req, res) => {
    getScheduleToday((err, result) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(result)
        }
    })
}
