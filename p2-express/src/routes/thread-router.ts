import express from 'express'
import userservice from '../dbfiles/services/user.service'
import ThreadService from '../pg/pgFunctions/selectFunction';
import * as user from '../user/user';

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
   return ThreadService.getThreads();
});

export default router;