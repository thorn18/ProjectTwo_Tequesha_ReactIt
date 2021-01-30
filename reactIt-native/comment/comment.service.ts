import axios from 'axios';
import { Comment } from './comment';

class CommentService {
    private URI: string;

    constructor(){
        this.URI = 'https://hn2j9rkruh.execute-api.us-west-2.amazonaws.com/secondStage/replies'
    }

    insertReply(comment: Comment){
        axios.post(this.URI, comment);
    }
}

export default new CommentService();