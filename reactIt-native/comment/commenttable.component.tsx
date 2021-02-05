import React, { useEffect, useState } from 'react';
import { Comment } from '../comment/comment';
import style from './thread_comment_style'
import {
    Button,
    Text,
    View,
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { CommentState, UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import commentService from './comment.service';
import ThreadDetailComponent from '../threads/thread.detail.component'
import { getComments } from '../store/actions';
import { useNavigation } from '@react-navigation/native';

interface CommentProps {
    data: Comment;
}

export default function CommentTableComponent({ data }: CommentProps) {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const nav = useNavigation();

    async function deleteRep() {
        try {
            await commentService.deleteReply(data.thread_reply_id);
            console.log('Successfully deleted reply');
            nav.navigate("Home");
        } catch {
            console.log('delete failed');
        }
    }

    return (
        <View style={[style.h2]}>
            {(user.role === 'Site Moderator' || user.username === data.username) && (
                <TouchableHighlight style={[style.highlight]}>
                    <Text style={[style.h2]} onPress={deleteRep}>X</Text>
                </TouchableHighlight>
            )}
            <Text style={[style.card]}>Author: {data.username + ' \n' + data.thread_reply_description}</Text>

        </View>
    )
}