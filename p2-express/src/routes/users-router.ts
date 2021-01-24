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

router.post('/login/:username', function(req, res, next) {
  console.log("Getting user on login!");
  userservice.getUserByName(req.params.username).then((returnedUser)=>{
    if(res && returnedUser) {
      res.send(JSON.stringify(returnedUser));
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

export default router;