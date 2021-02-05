import axios from 'axios';
import { useSelector } from 'react-redux';
import { ThreadState } from '../store/store';
import { Reaction } from './reaction';
import { Thread } from './thread';

class ThreadService {
    private URI: string;
    private URI2: string;
    private URIGetReaction: string;



    constructor() {
        this.URI = 'https://hn2j9rkruh.execute-api.us-west-2.amazonaws.com/salmanFirst';
        this.URI2 = 'http://localhost:3000/tags';
        this.URIGetReaction = ' https://kpbwe720za.execute-api.us-west-2.amazonaws.com/default/reactions';

    }

    async addReactions(reaction: Reaction) {
        reaction.threadid = reaction.threadid.toString();
        console.log(reaction);
        let ret;     
        await axios.post(this.URIGetReaction, reaction).then(result => {
            if (result) {
                ret = result;
                console.log(result);
            } else {
                console.log("RESULT IS EMPTY");
            }
        }).catch((err) => {
            console.log("Promise Error");
            console.log(err);
        });
        return ret;
    }

    async getReactions(threadid: string) {
        let ret;
        await axios.get(this.URIGetReaction + '?threadid=' + threadid).then(result => {
            if (result) {
                ret = result;
            } else {
                console.log("RESULT IS EMPTY");
            }
        }).catch((err) => {
            console.log("Promise Error");
            console.log(err);
        });
        return ret;
    }

    async getAllThreads() {
        let ret;
        await axios.get(this.URI).then(result => {
            if (result) {
                ret = result.data
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
                ret = result.data
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
        axios.post(this.URI + '/thread', thread);
    }

    deleteThread(thread_id: string) {
        axios.get(this.URI + '/threaded?threaded=' + thread_id);
    }
}

export default new ThreadService();