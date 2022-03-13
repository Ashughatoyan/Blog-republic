import React,{ useState } from 'react';
import { Box } from "@mui/system";
import { TextField, Button } from "@mui/material";
import { styleSign_InUp } from '../../styles';
import { checkBeforeRequest } from '../../functions';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

export default function SignUp(){

    const dispatch = useDispatch();
    
    const state = useSelector(state => state);
    
    const [ signUpState, setSignUpState ] = useState({
        userName:'',
        email:'',
        IMG:'',
        password:'',
        userNameErr:false,
        emailErr:false,
        IMGErr:false,
        passwordErr:false,
        alert:''
    })
    
    let navigate = useNavigate();
    
    return(
        <>
            <TextField
                error={ signUpState.userNameErr }
                sx={ styleSign_InUp.TextField }
                style={ styleSign_InUp.TextFieldStyle }
                inputProps={ { style: styleSign_InUp.TextFieldInputProps } }
                InputLabelProps={ { style: styleSign_InUp.TextFieldInputProps } }
                id="signUpName"
                label="Name"
                type="text"
                variant="standard"
                value={ signUpState.userName }
                autoFocus={true}
                onChange={ (event) => { 
                    setSignUpState( (prevState) => ({
                        ...prevState,
                        userName:event.target.value,
                        userNameErr:false
                    }) ) } }
            />

            <TextField
                error={ signUpState.emailErr }
                sx={ styleSign_InUp.TextField }
                style={ styleSign_InUp.TextFieldStyle }
                inputProps={ { style: styleSign_InUp.TextFieldInputProps } }
                InputLabelProps={ { style: styleSign_InUp.TextFieldInputProps } }
                id="signUpEmail"
                label="Email"
                type="text"
                variant="standard"
                value={ signUpState.email }
                onChange={ (event) => { setSignUpState( (prevState) => ({
                    ...prevState,
                    email:event.target.value,
                    emailErr:false
                }) ) } }
            />

            <TextField
                error={ signUpState.IMGErr }
                sx={ styleSign_InUp.TextField }
                style={ styleSign_InUp.TextFieldStyle }
                inputProps={ { style: styleSign_InUp.TextFieldInputProps } }
                InputLabelProps={ { style: styleSign_InUp.TextFieldInputProps } }
                id="signUpIMG"
                label="IMG - URL"
                type="text"
                variant="standard"
                value={ signUpState.IMG }
                onChange={ (event) => { setSignUpState( (prevState) => ({
                    ...prevState,
                    IMG:event.target.value,
                    IMGErr:false
                }) ) } }
            />

            <TextField
                error={ signUpState.passwordErr }
                sx={ styleSign_InUp.TextField }
                style={ styleSign_InUp.TextFieldStyle }
                inputProps={ { style: styleSign_InUp.TextFieldInputProps } }
                InputLabelProps={ { style: styleSign_InUp.TextFieldInputProps } }
                id="signUpPassword"
                label="Password"
                type="password"
                variant="standard"
                value={ signUpState.password }
                onChange={ (event) => { setSignUpState( (prevState) => ({
                    ...prevState,
                    password:event.target.value,
                    passwordErr:false
                }) ) } }
            />

            {signUpState.alert}

            <Box sx={ styleSign_InUp.BoxButton }>
                
                <Button 
                    variant="contained" sx={ styleSign_InUp.Button }
                    onClick={() => { 
                        checkBeforeRequest( 
                            setSignUpState,
                            signUpState.email,
                            signUpState.password,
                            navigate,
                            dispatch,
                            signUpState.userName,
                            signUpState.IMG
                        ) }
                    }
                >
                    Login
                </Button>

            </Box>

        </>
    )
}