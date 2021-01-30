import React from 'react'
import { View, Text, Button, FlatList } from 'react-native';
import styles from '../global-styles';
import style from './thread_table_style';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackParams } from '../router/router.component';
import threadService from './thread.service';
import { UserState, CommentState } from '../store/store';
import { Comment } from '../comment/comment';
import CommentTableComponent from '../comment/commenttable.component';

interface DetailProps {
    route: RouteProp<StackParams, 'ThreadDetail'>;
}

interface CommentProp {
    data: Comment
}

export default function ThreadDetailComponent(props: DetailProps) {
    const nav = useNavigation();
    const dispatch = useDispatch();

    const thr = props.route.params;
    const user = useSelector((state: UserState) => state.user);
    const com = useSelector((state: CommentState) => state.comments);
    console.log(user);

    function deleteThread() {
        threadService.deleteThread(thr.thread_id);
        console.log('successfully deleted');
        nav.navigate('Home');
    }

    function insertReply() {
        
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

            <Button title='Add a reply' onPress={insertReply}/>
            <FlatList
                data={com}
                renderItem={({ item }) => (<CommentTableComponent data={item}></CommentTableComponent>)}
                keyExtractor={(item) => item.thread_reply_id}
            />

            {(user.role === 'Site Moderator' || user.username === thr.username) && (
                <Button title='Delete Thread' onPress={deleteThread} />
            )}
        </View>
    );
}