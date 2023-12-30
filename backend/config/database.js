import mysql from 'mysql2'

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'attendance_management_system_db'
})

export default db