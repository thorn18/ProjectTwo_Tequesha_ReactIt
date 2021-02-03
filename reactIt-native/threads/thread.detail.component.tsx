import React, { useEffect } from 'react'
import { Text, Button, FlatList, ImageBackground } from 'react-native';
import styles from './thread_table_style';
import style from '../comment/thread_comment_style';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackParams } from '../router/router.component';
import threadService from './thread.service';
import { UserState, CommentState } from '../store/store';
import { Comment } from '../comment/comment';
import { getComments } from '../store/actions';
import CommentTableComponent from '../comment/commenttable.component';
import commentService from '../comment/comment.service';
import image from '../router/alien.jpg'

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
    let com = useSelector((state: CommentState) => state.comments);
    console.log(user);

    function deleteThread() {
        threadService.deleteThread(thr.thread_id);
        console.log('successfully deleted');
        nav.navigate('Home');
    }

    function insertReply() {
        nav.navigate('Reply', thr);
    }
    
    useEffect(() => {
        gettingReplies();
    },[]);

    function gettingReplies(){
        let co: any;
        commentService.getReplies(thr.thread_id).then((result) => {
            co = result;
            populateReplies(co);
        });
    }

    function populateReplies(reply: any) {
        console.log('populating replies');
        let rep: Comment[] = [];
        reply.forEach((row: Comment) => {
            rep.push(row);
        })
        com = rep;
        dispatch(getComments(com));
    }

    function refresh() {
        gettingReplies();
    }

    return (
        <ImageBackground source= {image} style = {[style.container]}>
            <Text style={style.title}>{thr.threadname}</Text>
            <br></br>
            <Text style={style.text}>Author: {thr.username.toUpperCase()}</Text>
            <br></br>
            <Text  style={style.text}>Category: {thr.threadcategory}</Text>
            <br></br>
            <Text style={style.body}>{thr.threaddescription}</Text>
            <br></br>
            {(!thr.repliesdisabled) && (
                <Button title='Add a reply' onPress={insertReply} color = "green"/>
            )}
            <Text style={style.replies}>Replies: </Text>
            <br></br>
            <FlatList
                data={com}
                renderItem={({ item }) => (<CommentTableComponent data={item}  ></CommentTableComponent>)}
                keyExtractor={(item) => item.thread_reply_id}
            />
            <Button title='Refresh replies' onPress={refresh} color = "green" />
            <br></br>

            {(user.role === 'Site Moderator' || user.username === thr.username) && (
                <Button title='Delete Thread' onPress={deleteThread} color = "green"/>
            )}
        </ImageBackground>
    );
}