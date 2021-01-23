import express from 'express'
import userservice from '../dbfiles/services/user.service'

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('express is working');
});


/* GET users listing. */
router.post('/register', function(req, res, next) {
  userservice.getUserByName(req.body).then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  })
  res.send('User Registration');
});


/* GET users listing. */
router.get('/login', function(req, res, next) {
  userservice.getUserByName("salman").then((returnedUser)=>{

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
   res.send(err); 
 });
 res.send("Bad Request");  
});

export default router;