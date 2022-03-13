import React,{ useEffect } from 'react';
import Block from '../settingBlock';
import Sidebar from '../sidebar';
import { Box } from "@mui/system";
import { stockPage } from '../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../functions';
import { onAuthStateChanged } from "firebase/auth";

export default function SettingsPage() {

    const dispatch = useDispatch();

    const state = useSelector(state => state);

    useEffect( () => {
        if( !state.user ){
            onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                //const uid = user.uid;
                // ...
                dispatch({type:'sign in', user:user})
            } else {
                // User is signed out
                // ...
                console.log('not login');
            }
        })}
    },[])

    return(
        <Box sx={ stockPage.Box }>
            <Sidebar toggle="Settings"/>
            <Box sx={ stockPage.Box1 }>
                <Block/>
            </Box>
        </Box>
    )
}
