const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require("body-Parser");
const app = express();
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


app.get("/api/user", async (req, res) => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root', // <== ระบุให้ถูกต้อง
        password: '1234', // <== ระบุให้ถูกต้อง
        database: 'final', // <== ระบุ database ให้ถูกต้อง
        port: 3306, // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)

    })
    try {
        const id = await connection.execute(
            `SELECT * FROM user WHERE 1`
        )
        console.log(id[0][0]);
        (id[0][0]) ? console.log("have") : console.log("noting");

        res.json({
            message: id[0],
            status: "OK"
        }).status(200);
        await connection.end()
    } catch (error) {
        res.json({
            message: error,
            status: ";-;"
        }).status(200);
        await connection.end()
    }


})

app.post("/api/user", async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root', // <== ระบุให้ถูกต้อง
            password: '1234', // <== ระบุให้ถูกต้อง
            database: 'final', // <== ระบุ database ให้ถูกต้อง
            port: 3306, // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)

        })
        const { username, password, firstname, lastname, email, mobile_phone } = req.body
        const check = await connection.execute(
            `SELECT * FROM user WHERE username = "${username}"`
        )

        console.log(check[0][0]);
        if (check[0][0]) {
            res.json({
                message: "USERNAME ALREADY",
                status: ";-;"
            });
            res.status(400);
            await connection.end()
        }
        else {
            const saltRounds = 10;
            const myPlaintextPassword = password;
            const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
            await connection.execute(
                `INSERT INTO user (username ,password , firstname, lastname, email, mobile_phone ) VALUE ("${username}","${hash}","${firstname}","${lastname}","${email}","${mobile_phone}")`
            )
            res.json({
                message: "SUCCESS",
                status: "CREATED"
            }).status(201);
            await connection.end()
        }
    } catch (error) {
        res.json({
            message: error,
            status: ";-;"
        }).status(200);
        await connection.end()
    }

})

app.post("/api/login", async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root', // <== ระบุให้ถูกต้อง
            password: '1234', // <== ระบุให้ถูกต้อง
            database: 'final', // <== ระบุ database ให้ถูกต้อง
            port: 3306, // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)

        })
        const { username, password } = req.body
        const check = await connection.execute(
            `SELECT * FROM user WHERE (username = "${username}")`
        )

        console.log(check[0][0]);
        if (check[0][0]) {

            try {
                const saltRounds = 10;
                const myPlaintextPassword = password;
                const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

                const compare = bcrypt.compareSync(myPlaintextPassword, hash);
                console.log(compare);
                if(compare){
                    res.json({
                        message: "LOGIN NOW",
                        status: "GOOD"
                    });
                    res.status(200);
                }
                else{

                    res.json({
                        message: "LOGIN FAIL",
                        status: "NOTGOOD"
                    });
                    res.status(400);
                }
                

            } catch (error) {
                res.json({
                    message: "LOGIN FAIL",
                    status: "NOTGOOD"
                });
                res.status(400);
            }







            await connection.end()
        }
        else {

            res.json({
                message: "USERNAME IS NOT DEFINE PLS REGISTER",
                status: "REJECT"
            }).status(400);

            await connection.end()

        }


    } catch (error) {
        res.json({
            message: error,
            status: ";-;"
        }).status(200);
        await connection.end()
    }

})











app.listen(3000, () => {
    console.log("SERVER START PORT =====> 3000");
})