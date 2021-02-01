import React from 'react';
import { Comment } from '../comment/comment';
import {
    Button,
    Text,
    View,
} from 'react-native';
import commentService from './comment.service';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { UserState } from '../store/store';

interface CommentProps{
    data: Comment;
}

export default function CommentTableComponent({data}: CommentProps) {
    const nav = useNavigation();
    const user = useSelector((state: UserState) => state.user);
    function deleteRep(){
        try{
            commentService.deleteReply(data.thread_reply_id);
            console.log('successfully deleted reply');
            nav.navigate('ThreadDetail')
        } catch {
            console.log('delete failed');
        }
        
    }

    return (
        <View>
            <Text>{data.username + ': ' + data.thread_reply_description}</Text>
            {user.username === data.username && (
                <Button title='Delete reply' onPress={deleteRep} />
            )}
        </View>
    )
}