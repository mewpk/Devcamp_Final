const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require("body-Parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


app.get("/api/user", async (req, res) => {
try {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root', // <== ระบุให้ถูกต้อง
        password: '1234', // <== ระบุให้ถูกต้อง
        database: 'exam', // <== ระบุ database ให้ถูกต้อง
        port: 3306, // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)

    })

    const join = await connection.execute(
        `SELECT employee.id,employee.firstname, employee.lastname, job.job_name FROM employee INNER JOIN job ON employee.job_id = job.id;`
    )
    await connection.end();

    res.json({
        data : join[0]
    })

} catch (error) {
    
}


})

app.get("/api/notuser", async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root', // <== ระบุให้ถูกต้อง
            password: '1234', // <== ระบุให้ถูกต้อง
            database: 'exam', // <== ระบุ database ให้ถูกต้อง
            port: 3306, // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)
    
        })
    
        const join = await connection.execute(
            `SELECT job.id,job.job_name FROM job LEFT JOIN employee ON job.id = employee.job_id WHERE employee.job_id IS NULL;`
        )
        await connection.end();
    
        res.json({
            data : join[0]
        })
    
    } catch (error) {
        
    }
    
    
    })
    

app.listen(3000, () => {
    console.log("SERVER START PORT =====> 3000");
})