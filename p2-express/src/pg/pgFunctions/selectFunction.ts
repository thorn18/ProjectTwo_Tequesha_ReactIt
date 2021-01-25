import {pool,client, quit} from '../pgConn/pgConn';

export async function insert_thread(category:string, title:string, description:string, username:string){
  pool.connect();
  pool.query('call insert_thread($1::text,$2::text,$3::text,$4::text)', [category, title,description,username], () => {
    quit(); 
  });
  }

 export async function getThreads(){
    pool.connect()
    await pool.query('select * from threads').then((data) => {
          console.log(data.rows[0]);
      quit(); 
    });
    }
  