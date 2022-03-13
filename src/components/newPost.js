import React,{ useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, TextField, Alert, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styleSign_InUp, newPost } from '../styles';
import { createPost } from '../functions';

function checkBeforePublish( title, content, IMG, author, uid, setState, navigate ){
    let sendToFirebase = true;
    if( title.split(' ').length < 5 ){
        setState( (prevState) => ({ 
            ...prevState,
            titleErr:true,
            alert:<Alert severity="error" >Title must be at least 5 words</Alert> }) )
        sendToFirebase = false;
    };
    if( content.split(' ').length < 20 ){
        setState( (prevState) => ({ 
            ...prevState,
            contentErr:true,
            alert:<Alert severity="error" >Content must be at least 20 words</Alert> }) )
        sendToFirebase = false;
    };
    if( sendToFirebase ){
        createPost( title, content, IMG, author, uid );
        setState({
            title:'',
            content:'',
            titleErr:false,
            contentErr:false,
            publlishButton:true,
            alert:<Alert severity="success" color="info">The post was published<LinearProgress/></Alert> })
            setTimeout( () => {navigate("../post", { replace: true }) }, 1500);
    }
}

export default function NewPostBlock(){
    
    let navigate = useNavigate();

    const [ newPostBlockState, setNewPostBlockState ] = useState({
        title:'',
        content:'',
        titleErr:false,
        contentErr:false,
        alert:null,
        publlishButton:false
    })
    
    const state = useSelector(state => state);

    return(
        <>
            <Box sx={{width:'500px'}}>
                <TextField
                error={ newPostBlockState.titleErr }
                sx={ styleSign_InUp.TextField }
                style={ {...styleSign_InUp.TextFieldStyle, margin:'0px'} }
                inputProps={ { style: { ...styleSign_InUp.TextFieldInputProps, fontFamily:'monospace' } } }
                InputLabelProps={ { style: styleSign_InUp.TextFieldInputProps } }
                id="title"
                label="Title"
                type="text"
                variant="standard"
                value={ newPostBlockState.title }
                autoFocus={true}
                onChange={ (event) => { setNewPostBlockState( (prevState) => ({ ...prevState,title:event.target.value, titleErr:false }) ) } }
                />
                <TextField
                error={ newPostBlockState.contentErr }
                sx={ styleSign_InUp.TextField }
                style={ styleSign_InUp.TextFieldStyle }
                inputProps={ { style: { ...styleSign_InUp.TextFieldInputProps, fontFamily:'monospace' } } }
                InputLabelProps={ { style: styleSign_InUp.TextFieldInputProps } }
                id="content"
                label="Content"
                type="text"
                variant="standard"
                multiline={ true }
                value={ newPostBlockState.content }
                onChange={ (event) => { setNewPostBlockState( (prevState) => ({ ...prevState,content:event.target.value, contentErr:false }) ) } }
                />

                <Box sx={ newPost.Box } >
                        
                    <Button 
                        variant="contained"
                        disabled={ newPostBlockState.publlishButton }
                        sx={ { ...styleSign_InUp.Button, width:'unset', height:'36.5px' } }
                        onClick={ () => { if(state.user){
                            checkBeforePublish(
                                newPostBlockState.title,
                                newPostBlockState.content, 
                                state.user.photoURL,
                                state.user.displayName,
                                state.user.uid,
                                setNewPostBlockState,
                                navigate
                            ) }
                            else{
                                if( window.confirm('Please sign in to like posts') ) navigate("/", { replace: true })
                            }
                        } }
                    >
                        Publish
                    </Button>

                    { newPostBlockState.alert }

                </Box>
            </Box>
        </>
    )
}
