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

interface ThreadProps{
    data:Thread
    
}

export default function ThreadDetailComponent({data}: ThreadProps) {
    const dispatch = useDispatch();
    const th = useSelector((state: ThreadState) => state.thread);

    function createNewComment() {

    }

    function seeComment() {

    }

    return (
        <View>
            <Text>{data.threadname}</Text>
            <Text>{data.username}</Text>
            <Text>{data.threadcategory}</Text>
            <Text>{data.threaddescription}</Text>
            {/* {th.comments.forEach((row) => {
                <Text>row</Text>
            })} */}
            {/* <Button onPress = {createNewComment} title = "New Comment"/> */}
        </View>
    )
}