import React, { useEffect, useState } from 'react'
import { Text, Button, FlatList, ImageBackground, TouchableOpacity, Image, View } from 'react-native';
import styles from './thread_table_style';
import style from '../comment/thread_comment_style';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackParams } from '../router/router.component';
import threadService from './thread.service';
import { UserState, CommentState, ThreadState } from '../store/store';
import { Comment } from '../comment/comment';
import { getComments, GetReaction, tempReply } from '../store/actions';
import CommentTableComponent from '../comment/commenttable.component';
import commentService from '../comment/comment.service';
import image from '../router/alien.jpg';
import happyemoji from '../happyemoji.jpg';
import happyemojiselected from '../happyemojiselected.jpg';
import sademoji from '../sademoji.png';
import sademojiselected from '../sademojiselected.jpg';
import { Reaction } from './reaction';

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
    let react = useSelector((state: ThreadState) => state.reaction);
    let temp = useSelector((state: ThreadState) => state.temp);

    let [us, ussetter] = useState(0);

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
        gettingReactions();
    }, [temp]);

    function checkUserSelection(thread: Reaction) {
        let uS:any = ["", 0];
        console.log(thread.reactions[0]);
        thread.reactions.forEach((value: any) => {
            if (value[0] == user.username) {
                uS = value;
            }
        })
        if(uS[0] == "") {
            ussetter(0);
        } else {
            react.userSelection =  uS;
            dispatch(GetReaction(react));
            ussetter(uS[1]);
        }
        
    }

    function gettingReactions() {
        threadService.getReactions(thr.thread_id).then((result: any) => {
            if (result) {
                let temp: Reaction = result.data;
                console.log(temp);
                react = temp;
                checkUserSelection(react);
                dispatch(GetReaction(react));
            }

        });
    }

    function gettingReplies() {
        let co: any;
        commentService.getReplies(thr.thread_id).then((result) => {
            console.log(result);
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
        gettingReactions();
        
    }

    function handleclickhappy() {
        console.log("happy")
        if (react.reactions.length == 0) {
            react.threadid = thr.thread_id;
            react.reactions.push([user.username, 1]);
            threadService.addReactions(react);
            setTimeout(() => {
                temp +=1;
                dispatch(tempReply(temp));
                dispatch(GetReaction(react));
            }, 500);
        } else {
            let val = [user.username, react.userSelection[1]];
            console.log(react.userSelection);
            let index = -1;
            react.reactions.forEach((element: any) => {
                if (element[0] == val[0] && element[1] == val[1]) {
                    index = react.reactions.indexOf(element);
                }
            });
            console.log(index);
            (react.reactions[index])[1] = 1;
            threadService.addReactions(react);
            setTimeout(() => {
                temp +=1;
                dispatch(tempReply(temp));
                dispatch(GetReaction(react));
            }, 500);
        }
    }

    function handleclicksad() {
        console.log("sad")
        if (react.reactions.length == 0) {
            react.threadid = thr.thread_id;
            react.reactions.push([user.username, -1]);
            threadService.addReactions(react);
            setTimeout(() => {
                temp +=1;
                dispatch(tempReply(temp));
                dispatch(GetReaction(react));
            }, 500);
        } else {
            let val = [user.username, react.userSelection[1]];
            console.log(react.userSelection);
            let index = -1;
            react.reactions.forEach((element: any) => {
                if (element[0] == val[0] && element[1] == val[1]) {
                    index = react.reactions.indexOf(element);
                }
            });
            console.log(index);
            (react.reactions[index])[1] = -1;
            threadService.addReactions(react);
            setTimeout(() => {
                temp +=1;
                dispatch(tempReply(temp));
                dispatch(GetReaction(react));
            }, 500);
        }
    }

    return (
        <ImageBackground source={image} style={[style.container]}>
            <Button onPress={() => {
                console.log(react);
            }}></Button>
            <Text style={style.title}>{thr.threadname}</Text>
            <br></br>
            <Text style={style.text}>Author: {thr.username.toUpperCase()}</Text>
            <br></br>
            <Text style={style.text}>Category: {thr.threadcategory}</Text>
            <br></br>
            <Text style={style.body}>{thr.threaddescription}</Text>
            <Button onPress = {() => {alert(us)}}></Button>
            {(us == 1) && (
                <View>
                    <TouchableOpacity style={style.emojihappy} activeOpacity={0.5} disabled={true} onPress={handleclickhappy}>
                        <Image
                            source={happyemojiselected}
                            style={style.emojih}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.emojisad} activeOpacity={0.5} onPress={handleclicksad}>
                        <Image
                            source={sademoji}
                            style={style.emoji}
                        />
                    </TouchableOpacity>
                </View>
            )}
            {(us == -1) && (
                <View>
                    <TouchableOpacity style={style.emojihappy} activeOpacity={0.5} onPress={handleclickhappy}>
                        <Image
                            source={happyemoji}
                            style={style.emojih}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.emojisad} activeOpacity={0.5} disabled={true} onPress={handleclicksad}>
                        <Image
                            source={sademojiselected}
                            style={style.emoji}
                        />
                    </TouchableOpacity>
                </View>
            )}
            {us == 0 && (
                <View>
                    <TouchableOpacity style={style.emojihappy} activeOpacity={0.5} onPress={handleclickhappy}>
                        <Image
                            source={happyemoji}
                            style={style.emojih}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.emojisad} activeOpacity={0.5} onPress={handleclicksad}>
                        <Image
                            source={sademoji}
                            style={style.emoji}
                        />
                    </TouchableOpacity>
                </View>
            )}
            <br></br>
            {(!thr.repliesdisabled) && (
                <Button title='Add a reply' onPress={insertReply} color="green" />
            )}
            <Text style={style.replies}>Replies: </Text>
            <br></br>
            <FlatList
                data={com}
                renderItem={({ item }) => (<CommentTableComponent data={item}  ></CommentTableComponent>)}
                keyExtractor={(item) => item.thread_reply_id}
            />
            <Button title='Refresh replies' onPress={refresh} color="green" />
            <br></br>

            {(user.role === 'Site Moderator' || user.username === thr.username) && (
                <Button title='Delete Thread' onPress={deleteThread} color="green" />
            )}
        </ImageBackground>
    );
}