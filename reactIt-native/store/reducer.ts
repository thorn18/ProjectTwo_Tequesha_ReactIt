import * as Actions from './actions';
import { User } from './../user/user';
import { ForumState } from './store';

// We need to define the initial state of the application and that
// state should include everything that the application might keep track of.

export const initialState: ForumState = {
    user: new User(),
    loginUser: new User(),
    registerUser: new User(),
    threads: "",
}

// Make sure that the reducer has a default argument of the inital state or it will not work.
const reducer = (state: ForumState = initialState, action: Actions.AppAction): ForumState => {
    //console.log(action);
    // We want to call setState. (redux will do that when we return a new state object from the reducer)
    const newState = {...state}; // If we return this, it will re render the application. (call setState)

    switch (action.type) {    
        case Actions.ThreadActions.GetThreads:
            //Threads [] will need updating here.
            newState.threads = action.payload as string;
            return newState;
        case Actions.UserActions.GetUser:
            newState.user = action.payload as User;
            newState.loginUser = new User();
            return newState;
        case Actions.UserActions.LoginChange:
            newState.loginUser = action.payload as User;
            return newState;
        case Actions.UserActions.RegisterChange:
            newState.registerUser = action.payload as User;
            return newState;
        case Actions.UserActions.ChangeLocale:
            newState.locale = action.payload as string;
            return newState;
        default: 
            return state;
    }
}

export default reducer;