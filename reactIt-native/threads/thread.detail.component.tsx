import React from 'react'
import { View, Text, Button } from 'react-native';
import styles from '../global-styles';
import style from './thread_table_style';
import { Thread } from './thread';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackParams } from '../router/router.component';

interface DetailProps {
    route: RouteProp<StackParams, 'ThreadDetail'>;
}

export default function ThreadDetailComponent(props: DetailProps) {
    const nav = useNavigation();

    const thr = props.route.params;

    function deleteThread(){
        
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