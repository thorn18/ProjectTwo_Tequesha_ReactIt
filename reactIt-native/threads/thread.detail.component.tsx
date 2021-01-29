import React from 'react'
import { View, Text, Button } from 'react-native';
import styles from '../global-styles';
import style from './thread_table_style';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackParams } from '../router/router.component';
import threadService from './thread.service';
import { ThreadState } from '../store/store';
import { getThreads } from '../store/actions';

interface DetailProps {
    route: RouteProp<StackParams, 'ThreadDetail'>;
}

export default function ThreadDetailComponent(props: DetailProps) {
    const nav = useNavigation();
    const dispatch = useDispatch();

    const thr = props.route.params;
    const threads = useSelector((state: ThreadState) => state.threads);

    function deleteThread(){
        threadService.deleteThread(thr.thread_id);
        console.log('successfully deleted');
        nav.navigate('Home');
    }

    return (
        <View>
            <Text style={style.title}>{thr.threadname}</Text>
            <br></br>
            <Text>Author: {thr.username}</Text>
            <br></br>
            <Text>Category: {thr.threadcategory}</Text>
            <br></br>
            <Text>{thr.threaddescription}</Text>
            <br></br>

            <Button title='Delete Thread' onPress={deleteThread}/>
        </View>
    );
}