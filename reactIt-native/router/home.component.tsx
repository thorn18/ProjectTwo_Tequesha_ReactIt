import React, { createRef, useEffect, useRef, useState } from 'react';
import { ForumState, ThreadState, UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Picker,
    View,
} from 'react-native';
import style from './homestyle';
import { Icon, SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native';
import { getQuery, getThreads, ThreadAction } from '../store/actions';
import ThreadTableComponent from '../threads/threadtable.component';
import threadService from '../threads/thread.service';
import { Thread } from '../threads/thread';
import DropDownPicker from 'react-native-dropdown-picker';


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
            <DropDownPicker
                items={[
                    { label: 'Thread Title', value: 'usa', icon: () => <Icon name="flag" size={18} color="#900" />},
                    { label: 'Author', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" /> },
                    { label: 'Category', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" /> },
                ]}
                defaultValue=""
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: '#fafafa' }}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={()=>""}
            />
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
