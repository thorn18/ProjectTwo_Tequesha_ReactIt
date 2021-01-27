import axios from 'axios';
import { useSelector } from 'react-redux';
import { ThreadState } from '../store/store';
import { Thread } from './thread';

class ThreadService {
    private URI: string;

    constructor() {
        this.URI = 'http://localhost:3000/threads';
    }

    async getAllThreads() {
        let ret;
        await axios.get(this.URI, { withCredentials: true }).then(result => {
            if (result) {
                ret =  result.data   
            } else {
                console.log("RESULT IS EMPTY");
            }
        }).catch((err) => {
            console.log("Promise Error");
            console.log(err);
        });
        console.log(ret);
        return ret;
    }

    insertThread() {
        console.log('attempt to insert');
        return axios.post(this.URI+'/newThread');
    }
}

export default new ThreadService();