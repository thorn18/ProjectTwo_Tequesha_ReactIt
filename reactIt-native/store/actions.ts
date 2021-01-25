import {User} from './../user/user';
import { Thread } from './../threads/thread';

export enum UserActions {
    GetUser = 'GET_USER',
    ChangeUser = 'CHANGE_USER',
    LoginChange = 'CHANGE_LOGIN',
    RegisterChange = 'CHANGE_REGISTER',
    ChangeLocale = 'CHANGE_LOCALE'
}

export enum ThreadActions {
    GetThreads = 'GET_THREADS',
    ChangeThreads = 'CHANGE_THREADS'
}

export interface AppAction {
    type: string;
    payload: any;
}

export interface ThreadAction<P> extends AppAction{
    type:ThreadActions;
    payload:P;
}

export interface UserAction<P> extends AppAction {
    type: UserActions;
    payload: P;
}

//TODO: MODIFY AFTER THREAD OBJECT CREATED.
export function getThreads(threads: any): ThreadAction<Thread> {
    const action: ThreadAction<Thread> = {
        type: ThreadActions.GetThreads,
        payload: threads
    }
    return action;
}

export function addThread(thread: Thread): ThreadAction<Thread> {
    const action: ThreadAction<Thread> = {
        type: ThreadActions.ChangeThreads,
        payload: thread
    }
    return action;
}

export function getUser(user: User): UserAction<User> {
    const action: UserAction<User> = {
        type: UserActions.GetUser,
        payload: user
    }
    return action;
}

export function changeUser(user: User): UserAction<User> {
    const action: UserAction<User> = {
        type: UserActions.ChangeUser,
        payload: user
    }
    return action;
}

export function loginAction(user: User): UserAction<User> {
    const action: UserAction<User> = {
        type: UserActions.LoginChange,
        payload: user
    }
    return action;
}

export function registerAction(user: User): UserAction<User>{
    const action: UserAction<User> = {
        type: UserActions.RegisterChange,
        payload: user
    }
    return action;
}

export function changeLocale(locale: string): UserAction<string> {
    const action: UserAction<string> = {
        type: UserActions.ChangeLocale,
        payload: locale
    }
    return action;
}