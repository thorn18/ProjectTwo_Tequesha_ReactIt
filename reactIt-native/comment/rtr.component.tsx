import React from 'react';
import { ReplyToReply } from '../comment/comment';
import {
    Text,
    View,
    Button,
} from 'react-native';

import { TouchableHighlight } from 'react-native-gesture-handler';
import { UserState } from '../store/store';
import { useSelector } from 'react-redux';
import style from './replytoreply_style';
import commentService from './comment.service';
import { useNavigation } from '@react-navigation/native';

interface ReplyProps {
    data: ReplyToReply
}

export default function RTRTableComponent({ data }: ReplyProps) {
    console.log(data);

    const user = useSelector((state: UserState) => state.user);
    const nav = useNavigation();

    function deletertr() {
        try {
            commentService.deleteReplyToReply(data.thread_reply_to_reply_id);
            console.log('Successfully deleted reply to reply');
            nav.navigate('Home');
        } catch {
            console.log('deleting reply to reply failed');
        }
    }

    return (
        <View style={[style.card]}>
            {(user.role === 'Site Moderator' || user.username === data.username) && (
                <TouchableHighlight style={[style.text]}>
                    <Text style={[style.delete]} onPress={deletertr}>X</Text>
                </TouchableHighlight>
            )}
            <Text style={[style.text]}>Author: {data.username + ' \n' + data.thread_reply_to_reply_description}</Text>
        </View>
    )
}