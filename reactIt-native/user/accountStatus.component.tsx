import React from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser } from '../store/actions';
import { Button, View } from 'react-native';
import { User } from './user';

interface statusProp {
    user: User;
}
function AccountStatusComponent(prop: statusProp) {
    const userSelector = (state: UserState) => state.user;
    const currUser = useSelector(userSelector);

    console.log('Current User: ', currUser);
    console.log('User Prop: ', prop.user);

    const dispatch = useDispatch();

    function update() {
        userService.updateUser(prop.user).then(() => {});
        if (currUser.username === prop.user.username) {
            dispatch(changeUser(prop.user));
        }
    }

    function deactivateAccount() {
        prop.user.accountstatus = 'deactivated';
        update();
    }

    function activateAccount() {
        prop.user.accountstatus = 'activated';
        update();
    }

    function moderatorDeactivated() {
        prop.user.accountstatus = 'moderator-deactivated';
        update();
    }

    function moderatorActivated() {
        prop.user.accountstatus = 'moderator-activated';
    }

    function deleteAccount(){
        console.log('Deleted');
    }

    return (
        <View>
            {currUser.username === prop.user.username &&
                prop.user.accountstatus === 'activated' && (
                    <Button
                        onPress={deactivateAccount}
                        title='Deactivate'
                        color='#880022'
                    />
                )}
            {currUser.username === prop.user.username &&
                prop.user.accountstatus === 'deactivated' && (
                    <Button
                        onPress={activateAccount}
                        title='Activate'
                        color='#880022'
                    />
                )}
            <br></br>
            {currUser.role === 'Site Moderator' &&
                prop.user.accountstatus === 'activated' &&
                currUser.username !== prop.user.username && (
                    <View>
                        <Button
                            onPress={moderatorDeactivated}
                            title='Deactivate as Moderator'
                            color='#880022'
                        />
                        <br></br>
                        <Button
                            onPress={deleteAccount}
                            title='Delete Account'
                            color='#880022'
                        />
                    </View>
                )}
            {currUser.role === 'Site Moderator' &&
                prop.user.accountstatus === 'moderator-deactivated' &&
                currUser.username !== prop.user.username && (
                    <View>
                        <Button
                            onPress={moderatorActivated}
                            title='Activate as Moderator'
                            color='#880022'
                        />
                        <br></br>
                        <Button
                            onPress={deleteAccount}
                            title='Delete Account'
                            color='#880022'
                        />
                    </View>
                )}
        </View>
    );
}

export default AccountStatusComponent;
