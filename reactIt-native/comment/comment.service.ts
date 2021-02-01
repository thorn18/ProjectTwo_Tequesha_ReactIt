import axios from 'axios';
import { Comment } from './comment';

class CommentService {
    private URI: string;

    constructor(){
        this.URI = 'https://hn2j9rkruh.execute-api.us-west-2.amazonaws.com/secondStage/replies'
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
}

export default new CommentService();