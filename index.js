const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const ejs = require('ejs');





router.get('/',(req,res) => {
    res.sendFile(__dirname + "/home.html");

});

router.post('/', (req,res) => {

    var nazwa = req.body.nazwa;
    var data = req.body.data;
    var piori = req.body.piorytet;
    var connect = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'todolist'
    });

    


    connect.connect(function(err) {
        if (err) throw err;
        console.log('Połączono')
            //values: [nazwa,data]
    var sql= 'INSERT INTO zadania (task_name, data,done,piority) VALUES (?, ?, ?,?)';
    connect.query(sql,[nazwa,data,'nie',piori,], (err) => {
        
        if(err) throw err;
        console.log('Przesłano dane')
        
    })
    });

    res.sendFile(__dirname + "/home.html");
   
});

router.get('/task', (req,res) => {

    var connect = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'todolist'
    });

    connect.query('SELECT * FROM zadania ',(err,data,fields)=> {
       
       res.render(__dirname + "/task.ejs", {title: 'Lista zadań', action: 'list', task:data});
    });
})

router.get('/task/delete/:id', (req,res)=> {
    var id = req.params.id;

    var connect = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'todolist'
    });

    connect.query(`DELETE FROM zadania WHERE zadania.id ='${id}' ` ,(err,data,fields)=> {
       
       res.redirect('/task')
    });
})

router.get('/task/done/:id', (req,res)=> {
    var id = req.params.id;

    var connect = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'todolist'
    });

    connect.query(`UPDATE zadania SET done = 'tak' WHERE zadania.id ='${id}' ` ,(err,data,fields)=> {
       
       res.redirect('/task')
    });
})


router.post('/task', (req,res)=> {

    var piorytet = req.body.piorit;
    var doned = req.body.dond;

    var connect = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'todolist'
    });

    //`SELECT * FROM zadania WHERE piority LIKE '${piorytet}' `
    if(piorytet != null) {
    connect.query(`SELECT * FROM zadania WHERE piority LIKE '${piorytet}'`,(err,data,fields)=> {
       
       res.render(__dirname + "/task.ejs", {title: 'Lista zadań', action: 'list', task:data});
    });
}

if(doned!=null) {
    connect.query(`SELECT * FROM zadania WHERE done LIKE '${doned}' `,(err,data,fields)=> {
       
      res.render(__dirname + "/task.ejs", {title: 'Lista zadań', action: 'list', task:data});
   });
}
    
})

module.exports = router;