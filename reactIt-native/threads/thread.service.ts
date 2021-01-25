import axios from 'axios';
import { Thread } from './thread';

class ThreadService {
    private URI: string;

    constructor() {
        this.URI = 'http://34.219.142.203:3000/threads';
    }
    
    

}

export default new ThreadService();