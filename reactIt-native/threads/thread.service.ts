import axios from 'axios';
import { useSelector } from 'react-redux';
import { ThreadState } from '../store/store';
import { Thread } from './thread';
class ThreadService {
    private URI: string;

    constructor() {
        this.URI = 'https://hn2j9rkruh.execute-api.us-west-2.amazonaws.com/salmanFirst';
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
}

export default new ThreadService();