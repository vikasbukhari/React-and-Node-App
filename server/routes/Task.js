var express = require('express');
var router = express.Router();
var fs = require("fs");

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/AddTask', (req, res) => {
    let task = req.body.task;
    let date = req.body.date;
    let description = req.body.description;
    let username = req.body.username;
    let FormNumber = GenerateFormNumber();

    console.log('Form Number: ' + FormNumber);
    // Check if date is in future
    let x = new Date(date);
    let today = new Date();
    if(x < today){
        res.send({
            success: false,
            message: 'Date must be in the future'
        });
        return;
    }

    // Try Adding Data

    try{
        storeTask(username,task, date, description, FormNumber);
        // Send Success
        res.send({
            success: true,
            message: 'Task Added Successfully'
        });

    }
    catch(error){
        // Send Failure
        res.send({
            success: false,
            message: 'Error Adding Task'
        });

    }
  
});



async function storeTask(username,task, date, description, FormNumber) {

    let taskData = {
        username: username,
        task: task,
        date: date,
        description: description,
        FormNumber: FormNumber
    }

    if(fs.existsSync('data/Tasks.json')){
        let data = fs.readFileSync('data/Tasks.json', 'utf8');
        let tasks = JSON.parse(data);
        tasks.push(taskData);
        fs.writeFileSync('data/Tasks.json', JSON.stringify(tasks));
    
    }else{
        fs.writeFileSync('data/Tasks.json', JSON.stringify([taskData]));

    }
}

function GenerateFormNumber() {

     // Current Date
     let today = new Date();
     let dd = today.getDate().toString();
     let mm = (today.getMonth()+1).toString();
     let yy = today.getFullYear().toString().substring(2,4);
     // year two digits
     // Get the total tasks added
     let totalTasks = 0;
     let data = fs.readFileSync('data/Tasks.json', 'utf8');
     let tasks = JSON.parse(data);
 
     for(let i = 0; i < tasks.length; i++){
         totalTasks++;
     }
 
     let FormNumber = `${dd}${mm}${yy}_${totalTasks+1}`;
     

    return FormNumber;

}

// Get All Tasks of a User
router.get('/GetTasks/', (req, res) => {
    let username = req.query.username;
    let data = fs.readFileSync('data/Tasks.json', 'utf8');
    let tasks = JSON.parse(data);
    let userTasks = [];
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].username === username){
            userTasks.push(tasks[i]);
        }
    }
    res.send(userTasks);

}
);

// Edit Task of a Form Number
router.put('/EditTask', (req, res) => {
    let FormNumber = req.body.FormNumber;
    let task = req.body.task;
    let date = req.body.date;
    let description = req.body.description;
    let username = req.body.username;
    
   
    let data = fs.readFileSync('data/Tasks.json', 'utf8');
    let tasks = JSON.parse(data);
    let taskIndex = -1;
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].FormNumber === FormNumber){
            taskIndex = i;
            break;
        }
    }
    if(taskIndex === -1){
        res.send({
            success: false,
            message: 'Task Not Found'
        });
        return;
    }
    tasks[taskIndex].task = task;
    tasks[taskIndex].date = date;
    tasks[taskIndex].description = description;
    fs.writeFileSync('data/Tasks.json', JSON.stringify(tasks));
    res.send({
        success: true,
        message: 'Task Edited Successfully'
    });
});


module.exports = router;
