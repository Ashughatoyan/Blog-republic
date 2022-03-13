import React,{ useState, useEffect } from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from "@mui/system";
import SignIn from '../sign/signIn';
import SignUp from '../sign/signUp';
import { styleSign_InUp } from '../../styles.js';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../functions';
import { onAuthStateChanged } from "firebase/auth";

export default function Sign(){

    let navigate = useNavigate();

    const [ signToggle, setSignToggle ] = useState( { toggle: 'signIn' } )
  
    const dispatch = useDispatch();

    useEffect( () => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            //const uid = user.uid;
            // ...
            dispatch({type:'sign in', user:user})
            navigate("./post", { replace: true })
        } else {
            // User is signed out
            // ...
            console.log('not login');
        }})
    },[])

    return(
      <Box sx={ styleSign_InUp.Box } >
  
        <h1 style={ styleSign_InUp.h1 }>Sign In</h1>
  
        <RadioGroup
          row
          sx={ styleSign_InUp.radioGroup }
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={ ( event ) => { setSignToggle( { toggle: event.target.value } ) } }
          value={ signToggle.toggle }
        >
            <FormControlLabel sx={ { marginRight:'4vw' } } value="signIn" control={<Radio />} label="Sign in" />
            <FormControlLabel value="signUp" control={<Radio />} label="Sign up" />
        </RadioGroup>

        { signToggle.toggle==='signIn'?<SignIn/>:<SignUp/> }

      </Box>
    )
  }