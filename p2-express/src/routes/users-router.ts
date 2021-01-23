import express from 'express'
import userservice from '../dbfiles/services/user.service'

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('express is working');
});


/* GET users listing. */
router.post('/register', function(req, res, next) {
  userservice.addUser(req.body).then((result) => {
    console.log(result);
    console.log("Registered!");
  }).catch((err) => {
    console.log(err);
    console.log("NotRegistered!");
  })
});

router.get('/login/:username', function(req, res, next) {
  userservice.getUserByName(req.params.username).then((returnedUser)=>{

    if(res && returnedUser) {
      res.send("this is our record" + returnedUser.email);
    }
  
  if(returnedUser && req.body) {
    if(returnedUser.username == req.body.username && returnedUser.password == req.body.password){
      res.send("200"); 
    }
    else{
      res.send("400"); 
    }
  }
   
 }).catch((err)=>{
   console.log("404");
   res.send(err); 
 });
});

/* GET users listing. */
router.get('/login', function(req, res, next) {
  userservice.getUserByName("salman").then((returnedUser)=>{

    if(returnedUser) {
      res.send("this is our record" + returnedUser.email);
    }
  
  if(returnedUser && req.body) {
    if(returnedUser.username == req.body.username && returnedUser.password == req.body.password){
      res.send("200"); 
    }
    else{
      res.send("400"); 
    }
  }
   
 }).catch((err)=>{
   console.log("404");
   res.send(err); 
 });
<<<<<<< HEAD

=======
>>>>>>> 5fa2f5b966f3fc5d5d23dd7be5325a2a78453345
});

export default router;