const Task = require('../models/tasks');

// created controller for home

module.exports.home = function(req,res){
    Task.find({}, function(err, tasks){
        if(err){console.log('error in fetching tasks from db');
        return;}
    return res.render('home',{
        title: "To-Do list",
        task_list : tasks
    });
});
}