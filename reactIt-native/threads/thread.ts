import { Comment } from "../comment/comment";

export class Thread {
    title: string = '';
    author: string = '';
    body: string = '';
    category: string = '';
    comments: Comment[] = [];
}