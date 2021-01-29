import axios from 'axios';
import { useSelector } from 'react-redux';
import { ThreadState } from '../store/store';
import { Thread } from './thread';

class ThreadService {
    private URI: string;
    private URI2: string;


    constructor() {
        this.URI = 'https://hn2j9rkruh.execute-api.us-west-2.amazonaws.com/salmanFirst';
        this.URI2 = 'http://localhost:3000/tags';

    }

    async getAllThreads() {
        let ret;
        await axios.get(this.URI).then(result => {
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

    async insertTags(thread: Thread) {
        let ret;
        await axios.post(this.URI2, thread).then(result => {
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

    insertThread(thread: Thread) {
        console.log('attempt to insert');
        axios.post(this.URI+'/thread', thread);
    }
}

export default new ThreadService();