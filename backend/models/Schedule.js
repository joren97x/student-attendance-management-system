import db from '../config/database.js'

export const storeSchedule = (data, res) => {
    db.query("INSERT INTO schedules SET ?", [data], (err, result) => {
        if(err) {
            res(err, null)
        }
        else {
            res(err, result)
        }
    })
}

export const getScheduleToday = (res) => {
    const today = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
    db.query("SELECT * FROM schedules WHERE date = ?", [today], (err, result) => {
        if (err) {
            res(err, null)
        } else {
            res(err, result)
        }
    })
};