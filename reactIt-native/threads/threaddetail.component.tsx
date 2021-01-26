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
import { Thread } from './thread';

interface NewThreadProp{
    navigation: any
    
}

export default function ThreadDetailComponent({ navigation }: NewThreadProp) {
    const dispatch = useDispatch();
    const th = useSelector((state: ThreadState) => state.thread);

    function createNewComment() {

    }

    function seeComment() {

    }

    return (
        <View>
            <Text>{th.threadname}</Text>
            <Text>{th.username}</Text>
            <Text>{th.threadcategory}</Text>
            <Text>{th.threaddescription}</Text>
            {/* {th.comments.forEach((row) => {
                <Text>row</Text>
            })} */}
            {/* <Button onPress = {createNewComment} title = "New Comment"/> */}
        </View>
    )
}