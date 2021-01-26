import express from 'express'
import userservice from '../dbfiles/services/user.service'
import ThreadService from '../pg/pgFunctions/selectFunction';
import * as user from '../user/user';

var router = express.Router();

/* GET threads listing. */
router.get('/', function(req, res, next) {
   console.log("Inside get Thread");
   console.log(req);
   console.log(res);
   return ThreadService.getThreads();
});

export default router;