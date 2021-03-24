const express = require('express')
const fs = require('fs')
const app = express();
const ejsMate = require('ejs-mate')//ejs template tool
let studentData = JSON.parse(fs.readFileSync('./students.json'))
const path = require('path')

/********************************************
 * use middleware
 * set view engine ,engine
********************************************/
//app.engine('ejs',ejsMate)
//app.set('view engine','ejs')
//app.set('views',path.join(__dirname,'views'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(`${__dirname}/views`))



app.put('/students/new',(req,res)=>{
    const {id,name} = req.body;
    console.log(`${id} ${name}`)
    studentData[id] = name;
    let writeData = JSON.stringify(studentData)
    fs.writeFileSync('./students.json',writeData)
    res.send("success")
})
app.get('/students/:id',(req,res)=>{
    const {id} = req.params;
    let name;
    for (stu in studentData){
        if(id===stu){

            name = `Hello,${studentData[id]}`;
        }
    }
    if(name===undefined){
        name="sorry,not found"
    }
    res.send(name);
    console.log("catch")
})
app.delete('/students/:id',(req,res)=>{
    studentData = JSON.parse(fs.readFileSync('./students.json'))
    const{id} = req.params;
    delete studentData[id];
    let writeData = JSON.stringify(studentData)
    fs.writeFileSync('./students.json',writeData)
    res.send("delete success")

})

app.get('/students',(req,res)=>{
    studentData = JSON.parse(fs.readFileSync('./students.json'))
    console.log(studentData)
    res.send(studentData)
})//list all student
app.get('/',(req,res)=>{
    res.send('ok gocha')
})
app.listen(3000,()=>{
    console.log('listening')
})