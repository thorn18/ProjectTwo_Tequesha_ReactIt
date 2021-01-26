import express from 'express'
import userservice from '../dbfiles/services/user.service'
import ThreadService from '../pg/pgFunctions/selectFunction';
import * as user from '../user/user';

var router = express.Router();
var testservice = new ThreadService();

/* GET users listing. */
router.get('/', async function(req, res, next) {
   console.log("Inside get Thread: " + req);
   await testservice.getThreads().then((data) => {
      console.log(data);
      res.send(data);
   });
});

export default router;