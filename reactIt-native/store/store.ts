import { applyMiddleware, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { User } from "../user/user";
import { AppAction, ThreadActions } from "./actions";
import reducer from "./reducer";

// Define the items that are in our state

export interface UserState {
    user: User;
    loginUser: User;
    registerUser: User;
    locale?: string;
}
export interface ThreadState {
    //TEMP NEEDS CHANGING
    threads: string;
}

export interface ForumState extends UserState,ThreadState{ }
// <> is generics: Generic arguments allow us to define the type of a thing at runtime instead of when we write it,
// creating a reusable object.
const store: Store<ForumState, AppAction> = createStore(reducer, applyMiddleware(thunk));

export default store;