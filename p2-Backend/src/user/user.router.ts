import express from 'express';
import * as user from './user';
import logger from '../log';

const router = express.Router();


router.get('/', (req: any, res, next) => {
  let u = {...req.session.user};
  logger.debug(u);
  //delete u.password;
  if(u.name) {
    res.send(JSON.stringify(u));
  } else {
    res.sendStatus(401); // unauthorized
  }
});

// Legacy route, do not use.
router.get('/logout', (req, res, next) => {
  req.session.destroy((err)=> logger.error(err));
  res.redirect('/');
});

// Much more restful
router.delete('/', (req, res, next) => {
  req.session.destroy((err) => logger.error(err));
  res.sendStatus(204);
})

router.post('/', function(req: any, res, next) {
  logger.debug(req.body);
  user.login(req.body.name, req.body.password).then((user) => {
    if(user === null) {
      res.sendStatus(401);
    }
    req.session.user = user;
    res.send(JSON.stringify(user))
  });
});

export default router;
