var express = require('express');
var user = require('../dbfiles/services/userLogin')
var addEntity = require('../dbfiles/services/addEntity')
var router = express.Router();

let TableName = 'Users';

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('express is working');
});


/* GET users listing. */
router.post('/register', function(req, res, next) {
  addEntity.addAnEntity(TableName,req.body);
  res.send('User Registration');
});





/* GET users listing. */
router.get('/login', function(req, res, next) {
 user.searchSingleUser(req.body).then((returnedUser)=>{

  res.send("this is our record" + returnedUser.email);
  
   if(returnedUser.username == req.body.username && returnedUser.password == req.body.password){
     res.send("200"); 
   }
   else{
     res.send("400"); 
   }
   
 }).catch((err)=>{
   res.send(err); 
 });
 //res.send("Bad Request");  
});





module.exports = router;
