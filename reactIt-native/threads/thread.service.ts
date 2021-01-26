import axios from 'axios';
import { useSelector } from 'react-redux';
import { ThreadState } from '../store/store';

class ThreadService {
    private URI: string;

    constructor() {
        this.URI = 'http://localhost:3000/threads';
    }

    getAllThreads() {
        console.log("hello");
        return axios.get(this.URI, {withCredentials: true}).then(result=>{
            console.log("Promise Fulfilled");
            console.log(result);
            return result.data
        }).catch((err) => {
            console.log("Promise Fulfilled");
            console.log(err);
        });
    }
}

export default new ThreadService();