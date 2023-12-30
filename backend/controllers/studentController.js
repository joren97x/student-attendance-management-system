import { getStudents, getStudentById, updateStudentById, deleteStudentById, storeStudent } from '../models/Student.js'

export const showStudents = (req, res) => {
    getStudents((err, result) => {
        if(err) {
            res.send(err)
        } 
        else {
            res.json(result)
        }
    })
}

export const createStudent = (req, res) => {
    storeStudent(req.body, (err, result) => {
        if(err) {
            res.send(err)
        } 
        else {
            res.json(result)
        }
    })
}

export const showStudentById = (req, res) => {
    getStudentById(req.params.id, (err, result) => {
        if(err) {
            res.send(err)
        } 
        else {
            res.json(result)
        }
    })
}

export const updateStudent = (req, res) => {
    updateStudentById(req.body, req.params.id, (err, result) => {
        if(err) {
            res.send(err)
        } 
        else {
            res.json(result)
        }
    })
}

export const deleteStudent = (req, res) => {
    deleteStudentById(req.params.id, (err, result) => {
        if(err) {
            res.send(err)
        } 
        else {
            res.json(result)
        }
    })
}