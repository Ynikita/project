const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 80
dotenv.config();

let initialPath = path.join(__dirname, 'pablik')
let app = express();

app.use(express.static(initialPath));
app.use(express.json());

app.get('/',(req,res)  => {
    res.sendFile(path.join(initialPath, 'index.html'));
})

app.listen(PORT, ()=>{
    console.log("i'm ready to kill @_#");
})

app.post("/mail", (req, res)=>{
    const {
        firstname, lastname, email, msg
    } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'mail.ru',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }) 

    const mailOptions = {
        from: 'yakunovoo@mail.ru',
        to: 'yakunovoo@mail.ru',
        subject: 'ВАМ ПОВЕСТКА',
        text: `First name: ${firstname}, \nLast name: ${lastname}, \nEmail: ${email}, \nMessage: ${msg}`
        }


    transporter.sendMail(mailOptions,(err,result)=>{
        if(err){
            console.log(err);
            res.json("ОШИБКА СТОП 00000000000000000000!")
        }
        else{
            req.json("ВСЁ ОТЛИЩЩЩНА!")
        }
    })
})