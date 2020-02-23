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


app.post('/create-task', function(req,res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // contactList.push(req.body);
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


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});