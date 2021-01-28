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
import { useNavigation } from '@react-navigation/native';

interface ThreadProps{
    data: Thread;
}

export default function ThreadTableComponent({data}: ThreadProps) {
    const dispatch = useDispatch();
    const th = useSelector((state: ThreadState) => state.thread);
    const nav = useNavigation();

    function goToDetailComponent() {
        nav.navigate('ThreadDetails', data);
    }

    function seeComment() {

    }

    return (
        <View style = {[style.threadCardContainer]}>
            <Text style = {[style.title]}>{data.threadname}</Text>
            <Text style = {[style.text]}>Author : {data.username}</Text>
            <Text style = {[style.text]}>Category: {data.threadcategory}</Text>
            {/* <Text>{data.threaddescription}</Text> */}
            {/* {th.comments.forEach((row) => {
                <Text>row</Text>
            })} */}
            <Button onPress = {goToDetailComponent} title = "Go To Thread"/>
        </View>
    )
}