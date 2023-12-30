import express from 'express'
import { showStudents, showStudentById, updateStudent, deleteStudent, createStudent } from '../controllers/studentController.js'
import { authenticate } from '../controllers/loginController.js'
import { createSchedule, getSchedule } from '../controllers/scheduleController.js'
import { insertAttendance, showAllAttendace, showAttendanceToday, showAttendanceById, deleteAttendance, timeIn, timeOut } from '../controllers/attendanceController.js'

const router = express.Router()

router.get('/students', showStudents)
router.get('/student/:id', showStudentById)
router.put('/student/:id', updateStudent)
router.post('/student', createStudent)
router.post('/login', authenticate)
router.delete('/student/:id', deleteStudent)
router.post('/schedule', createSchedule)
router.get('/schedule', getSchedule)
router.post('/attendance', insertAttendance)
router.post('/attendance/time-in', timeIn)
router.put('/attendance/time-out/:id', timeOut)
router.get('/attendance/:id', showAttendanceById)
router.delete('/attendance/:id', deleteAttendance)
router.get('/attendance', showAllAttendace)
router.get('/attendance/today/:id', showAttendanceToday)

export default router