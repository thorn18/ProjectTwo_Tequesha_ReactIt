import React from 'react';
import { CommentState, UserState } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    TextInput,
    Text,
    View,
    ImageBackground,

} from 'react-native';
import { addReply } from '../store/actions';
import commentService from './comment.service';
import { RouteProp } from '@react-navigation/native';
import { StackParams } from '../router/router.component';
import style from './thread_comment_style';
import image from '../threads/alien.jpg'

interface ReplyProp {
    navigation: any,
    route: RouteProp<StackParams, 'Reply'>;
}

export function AddReplyComponent(props: ReplyProp) {
    const parentThread = props.route.params;
    const userContext = useSelector((state: UserState) => state.user);
    const comment = useSelector((state: CommentState) => state.comment);
    const dispatch = useDispatch();

    const author = comment.username = userContext.username;
    const parentId = comment.threads_id = Number(parentThread?.thread_id);

    function submitReply() {
        console.log(comment);
        try {
            console.log('attempting to insert')
            commentService.insertReply(comment);
        } catch {
            console.log('insert failed');
        }
        props.navigation.navigate('ThreadDetail');
    }

    return (
        <ImageBackground source={image} style={[style.image]}>
            <View style={[style.container]}>
                <Text style={[style.add]}>Author: {author}</Text>
                <Text style={[style.add]}>Reply Title: </Text>
                <TextInput
                    style={[style.add]}
                    onChangeText={(value) =>
                        dispatch(addReply({ ...comment, thread_reply_name: value }))
                    }
                    value={comment.thread_reply_name}>
                </TextInput>
                <Text style={[style.add]}>Reply: </Text>
                <TextInput multiline numberOfLines={4} style={[style.add]}
                    onChangeText={(value) =>
                        dispatch(addReply({ ...comment, thread_reply_description: value }))
                    }
                    value={comment.thread_reply_description}>
                </TextInput>

                <Button title='Add Reply' onPress={submitReply} />
            </View>

        </ImageBackground>
    )
}