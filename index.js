const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const Task = require('./models/tasks');



app.use(express.static('./assets'));

//use express router

app.use('/', require('./routes'));


//set up view engine

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded());

//created route to add task button

app.post('/create-task', function(req,res){
    
    Task.create({
        description: req.body.description,
        date: req.body.date,
        category: req.body.category
    }, function(err, newTask){
        if(err){console.log('error in creating a contact');
        return;}

        console.log('******', newTask);
        return res.redirect('back');
    });
});

// create route for delete tasks button

app.post('/delete-todo', function(req, res) {
    let ids = req.body.task;
    // if single task is to be deleted
    if (typeof(ids) == "string") {
        Task.findByIdAndDelete(ids, function(err) {
            if (err) { 
                console.log("error in deleting"); 
                return; 
            }
        });
    } else {    // if multiple task is to be deleted
        for (let i = 0; i < ids.length; i++) {
            Task.findByIdAndDelete(ids[i], function (err) {
                if (err) { 
                    console.log("error in deleting");
                    return; 
                }
            });
        }
    }
    return res.redirect('back');
});

//create route for category-wise button

// app.get('retrieve-category',function(req,res){

// })

// Setup our server

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});