import db from '../config/database.js'

export const storeAttendance = (data, res) => {
    db.query("INSERT INTO attendance SET ?", [data], (err, result) => {
        if (err) {
            res(err, null)
        } else {
            res(err, result)
        }
    })
}

export const getAttendanceToday = (id, res) => {
    const today = new Date().toISOString().split('T')[0]
    db.query("SELECT * FROM attendance WHERE date = ? AND student_id = ?", [today, id], (err, result) => {
        if (err) {
            res(err, null)
        } else {
            res(err, result)
        }
    })
}

export const getAllAttendance = (res) => {
    db.query("SELECT * FROM attendance", (err, result) => {
        if (err) {
            res(err, null)
        } else {
            res(err, result)
        }
    })
}

export const deleteAttendanceById = (id, res) => {
    db.query("DELETE FROM attendance WHERE id = ?", [id], (err, result) => {
        if(err) {
            res(err, null)
        }
        else {
            res(err, result)
        }
    })
}

export const getAllAttendanceById = (id, res) => {
    db.query("SELECT * FROM attendance WHERE student_id = ?", [id], (err, result) => {
        if (err) {
            res(err, null)
        } else {
            res(err, result)
        }
    })
}

export const time_in = (data, res) => {
    console.log(data)
    db.query("INSERT INTO attendance SET ? ", [data], (err, result) => {
        if(err) {
            res(err, null)
        }
        else {
            res(err, result)
        }
    })
}

export const time_out = (data, id, res) => {
    db.query("UPDATE attendance SET time_out = ? WHERE id = ?", [data.time_out, id], (err, result) => {
        if(err) {
            res(err, null)
        }
        else {
            res(err, result)
        }
    })
}