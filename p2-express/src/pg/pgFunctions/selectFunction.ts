import {pool,client, quit} from '../pgConn/pgConn';

 
client.connect()
client.query('SELECT * from threads', (err:any, res:any) => {
  console.log(res.rows[0])
  client.end()
})


pool.connect()
pool.query('call insert_thread($1::text,$2::text,$3::integer)', ['reactit group','node js in the meeting',5555], (data) => {
 console.log(data);
  quit(); 
});