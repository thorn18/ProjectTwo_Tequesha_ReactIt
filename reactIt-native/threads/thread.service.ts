import axios from 'axios';
import { Thread } from './thread';

class ThreadService {
    private URI: string;

    constructor() {
        this.URI = 'http://34.219.142.203:3000/threads';
    }

    getThreads(): Promise<Thread []> {
        return axios.get(this.URI).then(result => result.data).catch((err) => {console.log(err)});
    }

    
    getThreadById(id:string): Promise<Thread> {
        return axios.get(this.URI+"/"+id).then(result => result.data).catch((err) => {console.log(err)});
    }

    

}

export default new ThreadService();