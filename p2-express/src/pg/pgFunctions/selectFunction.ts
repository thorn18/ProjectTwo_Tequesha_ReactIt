import {pool,client, quit} from '../pgConn/pgConn';

export function insert_thread(category:string, title:string, description:string, username:string){
  pool.connect()
  pool.query('call insert_thread($1::text,$2::text,$3::text,$4::text)', [category, title,description,username], (data) => {

    quit(); 
  });
  }

 export function getThreads(){
    pool.connect()
    pool.query('select * from threads)', (data) => {
          console.log(data);
      quit(); 
    });
    }
  