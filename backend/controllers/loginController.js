import db from '../config/database.js'

export const authenticate = (req, res) => {
    db.query("SELECT * FROM users WHERE email = ? AND password = ?", [req.body.email, req.body.password], (err, result) => {
        if(err) {
            console.log(err)
            res.send(err)
        } 
        else {
            res.json(result)
        }
    })
}