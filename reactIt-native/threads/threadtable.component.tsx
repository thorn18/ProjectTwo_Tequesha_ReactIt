import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThreadState } from '../store/store';
import {
    Button,
    Text,
    View,
} from 'react-native';
import style from './thread_table_style';
import { Thread } from './thread';

interface ThreadProps{
    data:Thread
    
}

export default function ThreadDetailComponent({data}: ThreadProps) {
    const dispatch = useDispatch();
    const th = useSelector((state: ThreadState) => state.thread);

    function GoToDetailComponent() {

    }

    function seeComment() {

    }

    return (
        <View style = {[style.threadCardContainer]}>
            <Text style = {[style.title]}>{data.threadname}</Text>
            <Text>Author : {data.username}</Text>
            <Text>Category: {data.threadcategory}</Text>
            {/* <Text>{data.threaddescription}</Text> */}
            {/* {th.comments.forEach((row) => {
                <Text>row</Text>
            })} */}
            <Button onPress = {GoToDetailComponent} title = "Go To Thread"/>
        </View>
    )
}