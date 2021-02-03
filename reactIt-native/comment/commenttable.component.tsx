import React from 'react';
import { Comment } from '../comment/comment';
import style from './thread_comment_style'
import {
    Button,
    Text,
    View,
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { UserState } from '../store/store';
import { useSelector } from 'react-redux';
import commentService from './comment.service';
import { useNavigation } from '@react-navigation/native';

interface CommentProps {
    data: Comment;
}

export default function CommentTableComponent({ data }: CommentProps) {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const nav = useNavigation();
    console.log(data); 
    
    async function deleteRep() {
        try {
            await commentService.deleteReply(data.thread_reply_id);
            console.log('Successfully deleted reply');
            nav.navigate("Home");
        } catch {
            console.log('delete failed');
        }
    }

    function replyToReply(){
        nav.navigate('ReplyToReply', data);
    }
    
    return (
        <View style={[style.h2]}>
            {(user.role === 'Site Moderator' || user.username === data.username) && (
                <TouchableHighlight style={[style.highlight]}>
                    <Text style={[style.h2]} onPress={deleteRep}>X</Text>
                </TouchableHighlight>
            )}
            <Text style={[style.card]}>Author: {data.username + ' \n' + data.thread_reply_description}</Text>

            <Button title='Reply to this reply' onPress={replyToReply} />

        </View>
    )
}