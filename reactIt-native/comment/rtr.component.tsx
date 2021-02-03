import React from 'react';
import { ReplyToReply } from '../comment/comment';
import {
    Button,
    Text,
    View,
} from 'react-native';

interface ReplyProps {
    data: ReplyToReply
}

export default function RTRTableComponent ({data}: ReplyProps){

    return (
        <View>
            <Text>Author: {data.username + ' \n' + data.thread_reply_to_reply_description}</Text>
        </View>
    )
}