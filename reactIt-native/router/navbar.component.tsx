import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ForumState } from '../store/store';
import styles from '../global-styles';
import I18n, { strings } from '../i18n';
import { changeLocale } from '../store/actions';

function NavBarComponent() {
    const nav = useNavigation();
    const user = useSelector((state: ForumState) => state.user);
    //const locale = useSelector((state: GrubState) => state.locale);
    const dispatch = useDispatch();

    // dispatch(changeLocale('en')); // infinite re-render
    return (
        <View style={styles.row}>
            {I18n.locale === 'fr' ? (
                <Button
                    onPress={() => {
                        I18n.locale = 'en';
                        dispatch(changeLocale('en'))
                    }}
                    title='EN'
                />
            ) : (
                <Button
                    onPress={() => {
                        I18n.locale = 'fr';
                        dispatch(changeLocale('fr'))
                    }}
                    title='FR'
                />
            )}
            {user.name ? (
                <Text>{strings('nav.welcome', { name: user.name })}</Text>
            ) : (
                <></>
            )}
        </View>
    );
}

export default NavBarComponent;
