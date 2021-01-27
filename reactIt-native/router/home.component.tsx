import React, { createRef, useEffect, useRef, useState } from 'react';
import { ForumState, ThreadState, UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    View,
} from 'react-native';
import style from './homestyle';
import { SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native';
import { getQuery, getThreads, ThreadAction } from '../store/actions';
import ThreadTableComponent from '../threads/threadtable.component';
import threadService from '../threads/thread.service';
import { Thread } from '../threads/thread';


// Function Component
interface LoginProp {
    navigation: any;
}

interface ThreadProp {
    data: "hello";
}

function HomeComponent({ navigation }: LoginProp) {
    const userSelector = (state: UserState) => state.loginUser;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const selectThread = (state: ThreadState) => state.threads;
    let threads = useSelector(selectThread);

    let [q2, q2setter] = useState("");

    useEffect(() => {
        handleStuff()
    }, [q2]);

    function createNewThread() {
        navigation.navigate('NewThread');
    }

    function handleStuff() {
        console.log("hello");
        // settest(1);
        let th: any;
        threadService.getAllThreads().then((result) => {
            th = result;
            populateThreads(th);
        });
    }

    function rerender() {
        console.log("calling rerender");
    }

    function populateThreads(thr: any) {
        console.log("calling populatae thread");
        let temp: Thread[] = [];
        thr.forEach((row: Thread) => {
            temp.push(row);
        })
        threads = temp;
        dispatch(getThreads(threads));
        rerender();
    }

    function checkfilter(thread: Thread) {
        if (threads.includes(thread) && thread.threadname.includes(q2)) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <View style={[style.homeContainer]}>
            <Button onPress={handleStuff} title='Get Threads' color='#880022' />

            <Button onPress={createNewThread} title='Create New Thread' color='#880022' />
            <SearchBar
                style={[style.searchBar]}
                onChangeText={(value) => {
                    q2setter(value);
                    console.log("Query Changed to: " + value);
                    value = q2;
                }
                }
                value={q2}
            />
            <FlatList
                data={threads}
                renderItem={({ item }) => ((checkfilter(item) && <ThreadTableComponent data={item}></ThreadTableComponent>))}
                keyExtractor={(item) => item.thread_id}
            />
        </View>
    );
}

export default HomeComponent;
