import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackParams } from '../router/router.component';
import {
    Button,
    TextInput,
    Text,
    View,
    ImageBackground,

} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CommentState, UserState } from '../store/store';
import { addReplyToReply } from '../store/actions';
import commentService from '../comment/comment.service';

interface ReplyToReplyProp {
    navigation: any,
    route: RouteProp<StackParams, 'ReplyToReply'>;
}

export function AddReplyToReplyComponent(props: ReplyToReplyProp) {
    const userContext = useSelector((state: UserState) => state.user);
    const rtr = useSelector((state: CommentState) => state.reply_to_reply);

    const parentReply = props.route.params;
    const author = rtr.username = userContext.username;
    const id = rtr.threads_reply_id = Number(parentReply?.threads_id);
    console.log(id);
    
    const dispatch = useDispatch();

    function submit(){
        console.log(rtr);
        commentService.insertReplyToReply(rtr);
        props.navigation.navigate('ThreadDetail');
    }

    return (
        <View>
            <Text>Author: {author}</Text>
            <Text>Title: </Text>
            <TextInput onChangeText={(value) =>
                dispatch(addReplyToReply({ ...rtr, thread_reply_to_reply_name: value }))
            }
                value={rtr.thread_reply_to_reply_name}>
            </TextInput>
            <Text>Reply: </Text>
            <TextInput multiline numberOfLines={4}
                onChangeText={(value) =>
                    dispatch(addReplyToReply({ ...rtr, thread_reply_to_reply_description: value }))
                }
                value={rtr.thread_reply_to_reply_description}>
            </TextInput>

            <Button title='Add the reply' onPress={submit} />
        </View>
    )

}