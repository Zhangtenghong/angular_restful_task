var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('express-flash');

app.use(flash());
app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/public' ));
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

mongoose.connect('mongodb://localhost/tasks');
var TaskSchema = new mongoose.Schema({
  title:  { type: String, required: true},
  description: { type: String, default: ''},
  completed: { type: Boolean, default:false},
}, {timestamps:true});
mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task') 

app.get('/tasks', function(req, res) {
  Task.find({}, function(err, tasks){
    if(err){
      console.log("Returned error", err);
      return res.json({message:"Error", error:err})
    } else {
      return res.json(tasks)
    }
  })
})

app.get('/tasks/:id', function(req, res) {
  Task.findOne({_id:req.params.id}, function(err, task){
    if(err){
      console.log("Returned error", err);
      return res.json({message:"Error", error:err})
    } else {
      return res.json(task)
    }
  })
})

app.post('/tasks', function(req, res) {
  console.log("POST DATA", req.body);
  var task = new Task({title: req.body.title, description: req.body.description, completed: req.body.completed});
  task.save(function(err) {
    if(err) {
      console.log("Returned error", err);
      return res.json({message:"Error", error:err})
    } else { 
      return res.json({message:"Success"})
    }
  })
})

app.put('/tasks/:id', function(req, res){
  console.log("POST DATA", req.body);
  Task.update({_id:req.params.id}, {title: req.body.title, description: req.body.description, completed: req.body.completed}, function(err){
    if(err){
      console.log("Returned error", err);
      return res.json({message:"Error", error:err})
    } else {
      return res.json({message:"Success"})
    }
  })
})

app.delete('/tasks/:id', function(req, res){
  console.log("POST DATA", req.body);
  Task.remove({_id:req.params.id}, function(err){
    if(err){
      console.log("Returned error", err);
      return res.json({message:"Error", error:err})
    } else {
      return res.json({message:"Success"})
    }
  })
})

app.listen(8000, function() {
    console.log("listening on port 8000");
})