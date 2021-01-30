import React from 'react';
import { CommentState } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    TextInput,
    Text,
    View,

} from 'react-native';
import { addReply } from '../store/actions';

interface ReplyProp {
    navigation: any
}

export function AddReplyComponent({navigation}: ReplyProp) {
    const comment = useSelector((state: CommentState) => state.comment);
    const dispatch = useDispatch();

    return (
        <View>
            <Text>Reply: </Text>
            <TextInput multiline numberOfLines={4} 
                onChangeText={(value) => 
                    dispatch(addReply({...comment, thread_reply_description: value))
                }
                value={comment.thread_reply_description}>
            </TextInput>
        </View>
    )
}