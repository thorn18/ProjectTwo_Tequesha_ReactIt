import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThreadState } from '../store/store';
import {
    Button,
    TextInput,
    Text,
    View,
} from 'react-native';
import style from '../global-styles';
import { addThread } from '../store/actions';

interface NewThreadProp{
    navigation: any
}

export default function ThreadDetail({ navigation }: NewThreadProp) {
    const dispatch = useDispatch();
    const th = useSelector((state: ThreadState) => state.thread);

    function createNewComment() {

    }

    function seeComment() {

    }

    return (
        <View>
            <Text>{th.title}</Text>
            <Text>{th.author}</Text>
            <Text>{th.category}</Text>
            <Text>{th.body}</Text>
            {th.comments.forEach((row) => {
                <Text>row</Text>
            })}
            <Button onPress = {createNewComment} title = "New Comment"/>
        </View>
    )
}