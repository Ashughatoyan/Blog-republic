import React,{ useState } from 'react';
import { Box } from "@mui/system";
import { TextField, Button } from "@mui/material";
import { styleSign_InUp } from '../../styles';
import { checkBeforeRequest } from '../../functions';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

export default function SignIn(){
    
    const dispatch = useDispatch();
    
    const state = useSelector(state => state);

    const [ signInState, setSignInState ] = useState({
        email:'',
        password:'',
        emailErr:false,
        passwordErr:false,
        alert:''
    })
    
    let navigate = useNavigate();
    
    return(
        <>
            <TextField
                error={ signInState.emailErr }
                sx={ styleSign_InUp.TextField }
                style={ styleSign_InUp.TextFieldStyle }
                inputProps={ { style: styleSign_InUp.TextFieldInputProps } }
                InputLabelProps={ { style: styleSign_InUp.TextFieldInputProps } }
                id="signInEmail"
                label="Email"
                type="text"
                variant="standard"
                value={ signInState.email }
                autoFocus={true}
                onChange={ (event) => { setSignInState( (prevState) => ({
                    ...prevState,
                    email:event.target.value,
                    emailErr:false
                }) ) } }
            />

            <TextField
                error={ signInState.passwordErr }
                sx={ styleSign_InUp.TextField }
                style={ styleSign_InUp.TextFieldStyle }
                inputProps={ { style: styleSign_InUp.TextFieldInputProps } }
                InputLabelProps={ { style: styleSign_InUp.TextFieldInputProps } }
                id="signInPassword"
                label="Password"
                type="password"
                variant="standard"
                value={ signInState.password }
                onChange={ (event) => { setSignInState( (prevState) => ({
                    ...prevState,password:event.target.value,
                    passwordErr:false
                }) ) } }
            />

            {signInState.alert}

            <Box sx={ styleSign_InUp.BoxButton } >
                
                <Button 
                    variant="contained"
                    sx={ styleSign_InUp.Button }
                    onClick={() => { checkBeforeRequest( 
                        setSignInState,
                        signInState.email,
                        signInState.password,
                        navigate,
                        dispatch,
                        null,
                        null
                    ) } }
                >
                    Login
                </Button>

            </Box>
        </>
    )
}