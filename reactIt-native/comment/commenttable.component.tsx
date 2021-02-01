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

interface CommentProps {
    data: Comment;
}

export default function CommentTableComponent({ data }: CommentProps) {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);

    function handleDelete() {
        // commentService.
    }

    return (
        <View style={[style.h2]}>
            {(user.role === 'Site Moderator' || user.username === data.username) && (
                            <TouchableHighlight style={[style.highlight]} onPress={() => {handleDelete}}>
                            <Text style={[style.h2]}>X</Text>
                        </TouchableHighlight>
            )}
            <Text style={[style.card]}>Author: {data.username + ' \n' + data.thread_reply_description}</Text>

        </View>
    )
}