import React from 'react';
import { ReplyToReply } from '../comment/comment';
import {
    Text,
    View,
    TouchableHighlight,
} from 'react-native';
import { UserState } from '../store/store';
import { useSelector } from 'react-redux';
import style from './thread_comment_style';
import commentService from './comment.service';
import { useNavigation } from '@react-navigation/native';

interface ReplyProps {
    data: ReplyToReply
}

export default function RTRTableComponent ({data}: ReplyProps){
    console.log(data);

    const user = useSelector((state: UserState) => state.user);
    const nav = useNavigation();

    function deletertr(){
        try {
            await commentService.deleteReplyToReply(data.thread_reply_to_reply_id);
            console.log('Successfully delete reply to reply');
            nav.navigate('Home');
        } catch {
            console.log('deleting reply to reply failed');
        }
    }
        
    return (
        <View>
            {(user.role === 'Site Moderator' || user.username === data.username) && (
                <TouchableHighlight style={[style.highlight]}>
                    <Text style={[style.h2]} onPress={deletertr}>X</Text>
                </TouchableHighlight>
            )}
            <Text>Author: {data.username + ' \n' + data.thread_reply_to_reply_description}</Text>
        </View>
    )
}