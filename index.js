const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const Task = require('./models/tasks');

// var jsdom = require("node-jsdom");

// const jq = require('jquery');
// require("jsdom").env("", function(err, window) {
//     if (err) {
//         console.error(err);
//         return;
//     }

//     function doSomething(){
//         var deferred = $.Deferred();
//      }
//     var $ = require("jquery")(window);
//     const favorite = require('./assets/js/select');
// });


app.use(express.static('./assets'));
//use express router
app.use('/', require('./routes'));
// const fav = require('./assets/js/select.js');

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

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});