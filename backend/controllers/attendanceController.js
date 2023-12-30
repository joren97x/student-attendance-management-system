import { getAllAttendanceById, getAllAttendance, deleteAttendanceById, storeAttendance, getAttendanceToday, time_in, time_out } from "../models/Attendance.js"
import { getStudentById } from "../models/Student.js"

export const showAllAttendace = (req, res) => {
    getAllAttendance((err, result) => {
        if(err) {
            res.send(err)
        }
        else {

            const studentPromises = []

            result.forEach((el, index) => {
                const studentPromise = new Promise((resolve, reject) => {
                    getStudentById(el.student_id, (err, studentResult) => {
                        if(err) {
                            reject(err)
                        } 
                        else {
                            result[index].student = studentResult
                            resolve()
                        }
                    })
                })
                studentPromises.push(studentPromise)
            })

            Promise.all(studentPromises).then(() => {
                res.json(result)
            })
            .catch((err) => {
                res.send(err)
            })

            console.log(result)
            console.log(result.length)
            // res.json(result)
        }
    })
}

export const deleteAttendance = (req, res) => {
    deleteAttendanceById(req.params.id, (err, result) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(result)
        }
    })
}

export const showAttendanceById = (req, res) => {
    getAllAttendanceById(req.params.id, (err, result) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(result)
        }
    })
}

export const insertAttendance = (req, res) => {
    storeAttendance(req.body, (err, result) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(result)
        }
    })
}

export const showAttendanceToday = (req, res) => {
    getAttendanceToday(req.params.id, (err, result) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(result)
        }
    })
}

export const timeIn = (req, res) => {
    time_in(req.body, (err, result) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(result)
        }
    })
}

export const timeOut = (req, res) => {
    time_out(req.body, req.params.id, (err, result) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(result)
        }
    })
}