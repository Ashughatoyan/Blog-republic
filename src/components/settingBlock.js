import React,{ useState } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Box, Button, TextField, Alert } from "@mui/material";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { block } from '../styles';
import { changeUserInfo } from '../functions';

export default function Block(){
    
    let navigate = useNavigate();

    const [ blockState, setBlockState ] = useState({ 
        password:'',
        email:'',
        name:'',
        picture:'',
        alert:null,
        passwordInput:false,
        emailInput:false,
        nameInput:false,
        pictureInput:false,
        passwordErr:false,
        emailErr:false,
        nameErr:false,
        pictureErr:false
    });

    const state = useSelector(state => state);

    return(
        <Box sx={ block.Box }>
            <Box sx={ blockState.passwordInput? { ...block.Box1, width:'400px' } : block.Box1 }>
                {blockState.passwordInput && state.user?
                    <TextField
                        error={ blockState.passwordErr }
                        id="password"
                        label="Password"
                        type="text"
                        variant="standard"
                        value={ blockState.password }
                        autoFocus={true}
                        onChange={ (event) => { setBlockState( prevState => ({ ...prevState, password:event.target.value, passwordErr:false })) } }
                    />:
                    <Typography sx={ block.Typography }>Password</Typography>
                }
                <Button 
                    sx={ block.Button }
                    variant="contained"
                    onClick={ () => { 
                        if( state.user ){
                            setBlockState( prevState => ({ 
                                ...prevState, 
                                passwordInput:!prevState.passwordInput ,
                                emailInput:false,
                                nameInput:false,
                                pictureInput:false
                            }))
                        }
                        else{ if( window.confirm('Please sign in') ) navigate("/", { replace: true }) }
                        }
                    }
                >
                    {blockState.passwordInput? 'Cancel' : 'Change'}
                </Button>
                {blockState.passwordInput? 
                    <Button 
                        sx={{ ...block.Button, backgroundColor:'#2ecc71',"&:hover":{ backgroundColor:"#27ae60" } }}
                        onClick={ () => { changeUserInfo( state.user.uid, blockState.password, 'password', setBlockState, navigate ) } }
                    >
                        Save
                    </Button>:
                    null
                }
            </Box>
            <Divider flexItem sx={{margin:'25px 0'}} />
            <Box sx={ blockState.emailInput? { ...block.Box1, width:'400px' } : block.Box1 }>
                {blockState.emailInput && state.user?
                    <TextField
                        error={ blockState.emailErr }
                        id="email"
                        label="Email"
                        type="text"
                        variant="standard"
                        value={ blockState.email }
                        autoFocus={true}
                        onChange={ (event) => { setBlockState( prevState => ({ ...prevState, email:event.target.value, emailErr:false })) } }
                    />:
                    <Typography sx={ block.Typography }>Email</Typography>
                }
                <Button 
                    sx={ block.Button }
                    variant="contained"
                    onClick={ () => { if(state.user){
                            setBlockState( prevState => ({ 
                                ...prevState, 
                                passwordInput:false,
                                emailInput:!prevState.emailInput,
                                nameInput:false,
                                pictureInput:false
                            })) }
                            else{ if( window.confirm('Please sign in') )  navigate("/", { replace: true }) }
                        }
                    }
                >
                    {blockState.emailInput? 'Cancel' : 'Change'}
                </Button>
                {blockState.emailInput? 
                    <Button 
                        sx={{ ...block.Button, backgroundColor:'#2ecc71',"&:hover":{ backgroundColor:"#27ae60" } }}
                        onClick={ () => { changeUserInfo( state.user.uid, blockState.email, 'email', setBlockState, navigate ) } }
                    >
                        Save
                    </Button>:
                    null
                }
            </Box>
            <Divider flexItem sx={{margin:'25px 0'}} />
            <Box sx={ blockState.nameInput? { ...block.Box1, width:'400px' } : block.Box1 }>
                {blockState.nameInput && state.user?
                    <TextField
                        error={ blockState.nameErr }
                        id="name"
                        label="Name"
                        type="text"
                        variant="standard"
                        value={ blockState.name }
                        autoFocus={true}
                        onChange={ (event) => { setBlockState( prevState => ({ ...prevState, name:event.target.value , nameErr:false})) } }
                    />:
                    <Typography sx={ block.Typography }>Name</Typography>
                }
                <Button 
                    sx={ block.Button }
                    variant="contained"
                    onClick={ () => { 
                        if( state.user ){
                            setBlockState( prevState => ({ 
                            ...prevState, 
                            passwordInput:false,
                            emailInput:false,
                            nameInput:!prevState.nameInput,
                            pictureInput:false
                        })) }
                        else{ if( window.confirm('Please sign in') ) navigate("/", { replace: true }) }
                    }
                }
                >
                    {blockState.nameInput? 'Cancel' : 'Change'}
                </Button>
                {blockState.nameInput? 
                    <Button 
                        sx={{ ...block.Button, backgroundColor:'#2ecc71',"&:hover":{ backgroundColor:"#27ae60" } }}
                        onClick={ () => { changeUserInfo( state.user.uid, blockState.name, 'name', setBlockState, navigate ) } }
                    >
                        Save
                    </Button>:
                    null
                }
            </Box>
            <Divider flexItem sx={{margin:'25px 0'}} />
            <Box sx={ blockState.pictureInput? { ...block.Box1, width:'400px' } : block.Box1 }>
                {blockState.pictureInput && state.user?
                    <TextField
                        error={ blockState.pictureErr }
                        id="picture"
                        label="Picture"
                        type="text"
                        variant="standard"
                        value={ blockState.picture }
                        autoFocus={true}
                        onChange={ (event) => { setBlockState( prevState => ({ ...prevState, picture:event.target.value, pictureErr:false })) } }
                    />:
                    <Typography sx={ block.Typography }>Profile picture</Typography>
                }
                <Button 
                    sx={ block.Button }
                    variant="contained"
                    onClick={ () => { 
                        if( state.user ){
                            setBlockState( prevState => ({ 
                            ...prevState, 
                            passwordInput:false,
                            emailInput:false,
                            nameInput:false,
                            pictureInput:!prevState.pictureInput
                            })) }
                            else{ if( window.confirm('Please sign in') ) navigate("/", { replace: true }) }
                    }
                }
                >
                    {blockState.pictureInput? 'Cancel' : 'Change'}
                </Button>
                {blockState.pictureInput? 
                    <Button 
                        sx={{ ...block.Button, backgroundColor:'#2ecc71',"&:hover":{ backgroundColor:"#27ae60" } }}
                        onClick={ () => { changeUserInfo( state.user.uid, blockState.picture, 'picture', setBlockState, navigate ) } }
                    >
                        Save
                    </Button>:
                    null
                }
            </Box>
            <Divider flexItem sx={{margin:'25px 0'}} />
            {blockState.alert}
        </Box>
    )
}