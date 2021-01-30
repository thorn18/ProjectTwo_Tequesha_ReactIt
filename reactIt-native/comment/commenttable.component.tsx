import React from 'react';
import { Comment } from '../comment/comment';
import {
    Button,
    Text,
    View,
} from 'react-native';

interface CommentProps{
    data: Comment;
}

export default function CommentTableComponent({data}: CommentProps) {

    return (
        <View>
            <Text>{data.thread_reply_description}</Text>
        </View>
    )
}