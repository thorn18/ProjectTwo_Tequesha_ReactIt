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
    //const th = useSelector((state: ThreadState) => state.threads);
    const nav = useNavigation();
    //console.log(th);

    function goToDetailComponent() {
        //dispatch(getThreads(th));
        console.log('button is pressed');
        nav.navigate('ThreadDetail', data);
    }

    function seeComment() {

    }

    return (
        <View style = {[style.threadCardContainer]}>
            <Text style = {[style.title]}>{data.threadname}</Text>
            <Text>Author : {data.username}</Text>
            <Text>Category: {data.threadcategory}</Text>
            
            <Button onPress = {goToDetailComponent} title = "Go To Thread"/>
        </View>
    )
}