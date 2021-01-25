import { pool, client, quit } from '../pgConn/pgConn';

class ThreadService {


  static insert_thread(category: string, title: string, description: string, username: string) {
    pool.connect();
    pool.query('call insert_thread($1::text,$2::text,$3::text,$4::text)', [category, title, description, username], () => {
      quit();
    });
  }

  static async getThreads() {
    pool.connect()
    await pool.query('select * from threads').then((data) => {
      return data.rows;
      quit();
    });
  }
}

export default ThreadService;