import axios from 'axios';
import { Comment, ReplyToReply } from './comment';

class CommentService {
    private URI: string;
    private URI2: string;

    constructor(){
        this.URI = 'https://hn2j9rkruh.execute-api.us-west-2.amazonaws.com/secondStage/replies';
        this.URI2 = 'https://hn2j9rkruh.execute-api.us-west-2.amazonaws.com/rtr/repliestoreplies'
    }

    async getReplies(id: string){
        let rep;
        await axios.get(this.URI+'/'+id).then(result => {
            if(result) {
                rep = result.data;
            } else {
                console.log('Result set is empty.')
            }
        }).catch((err) => {
            console.log(err);
        })
        console.log(rep);
        return rep;
    }

    insertReply(comment: Comment){
        axios.post(this.URI, comment);
    }

    deleteReply(id: string){
        console.log(id);
        axios.get(this.URI + '/replied?replied=' + id);
    }

    insertReplyToReply(reply: ReplyToReply){
        axios.post(this.URI2, reply);
    }
}

export default new CommentService();