import db from '../config/database.js'

export const getStudents = (res) => {
    db.query("SELECT * FROM users WHERE role = ?", ['student'], (err, result) => {
        if(err) {
            console.log(err)
            res(err, null)
        } 
        else {
            res(err, result)
        }
    })
}

export const getStudentById = (id, res) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
        if(err) {
            console.log(err)
            res(err, null)
        } 
        else {
            res(err, result)
        }
    })
}

export const updateStudentById = (data, id, res) => {
    db.query("UPDATE users SET firstname = ?, lastname = ?, email = ?, password = ?, role = ? WHERE id = ?", 
    [data.firstname, data.lastname, data.email, data.password, data.role, id], (err, result) => {
            if(err) {
                console.log(err)
                res(err, null)
            } 
            else {
                res(err, result)
            }
    })
}

export const storeStudent = (data, res) => {
    db.query("INSERT INTO users SET ?", [data], (err, result) => {
        if(err) {
            console.log(err)
            res(err, null)
        } 
        else {
            res(err, result)
        }
    })
}

export const deleteStudentById = (id, res) => {
    db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
        if(err) {
            console.log(err)
            res(err, null)
        } 
        else {
            res(err, result)
        }
    })
}