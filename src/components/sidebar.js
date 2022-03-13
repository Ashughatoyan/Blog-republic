import React,{ useState, useEffect } from 'react';
import { Box, Button, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sidebar } from '../styles';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from "firebase/auth";
import { auth } from '../functions';

export default function Sidebar(props){
    
    let dispatch = useDispatch();

    let navigate = useNavigate();

    const state = useSelector(state => state);

    console.log('state >>> ', state)

    const [ sidebarState, setSidebarState ] = useState({
        logout:
        (<Button 
            variant="text"
            sx={ { ...sidebar.Button, fontWeight:'100' } }
            onClick={(event)=>{ 
                navigate("/", { replace: true }) 
            }}
            >
            Sign In
        </Button>)
    })

    useEffect( () => {
        if( state.user ){
            setSidebarState( prevState => ({
                ...prevState,
                logout:(<Button 
                    variant="text"
                    sx={ { ...sidebar.Button, fontWeight:'100' } }
                    onClick={(event)=>{ 
        
                        //navigate("../newpost", { replace: true }) 
                        
                        signOut(auth).then(() => {
                            console.log('you logged out')
                        }).catch((error) => {
                            console.log('during log aut accure an error')
                        });
                        
                        dispatch({ type:'sign out' });
        
                        setSidebarState({ logout:(<Button 
                            variant="text"
                            sx={ { ...sidebar.Button, fontWeight:'100' } }
                            onClick={(event)=>{ 
                                navigate("/", { replace: true }) 
                            }}
                            >
                            Sign In
                        </Button>) })
        
                        }
                    }
                >
                    Log out
                </Button>)
            }) )
        }
    },[state.user])

    return(
        <>
            <div style={ sidebar.div }>
                <Box sx={ sidebar.Box }  >
                    <h2 style={ sidebar.h2 }>{props.toggle}</h2>
                    { state.user!=null?
                    (<>
                        <Box sx={{ display:'flex',alignItems:'center',justifyContent:'space-around' }}>
                            <img src={state.user.photoURL} style={{width:'40px',borderRadius:'50%'}} />
                            <Typography>{state.user.displayName}</Typography>
                        </Box>
                        <Divider orientation="horizontal" variant="middle" flexItem sx={{margin:'10px 0'}} />
                    </>):
                    null}
                    <Button 
                        variant="text" 
                        sx={ { ...sidebar.Button, fontWeight: props.toggle==='Posts'?'500':'100' } } 
                        onClick={(event)=>{ navigate("../post", { replace: true }) }}
                    >
                        Posts
                    </Button>
                    <Button 
                        variant="text"
                        sx={ { ...sidebar.Button, fontWeight: props.toggle==='Settings'?'500':'100' } }
                        onClick={(event)=>{ navigate("../settings", { replace: true }) }}
                    >
                        Setting
                    </Button>
                    <Button 
                        variant="text"
                        sx={ { ...sidebar.Button, fontWeight: props.toggle==='New post'?'500':'100' } }
                        onClick={(event)=>{ navigate("../newpost", { replace: true }) }}
                    >
                        New post
                    </Button>
                    {sidebarState.logout}
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
            </div>
        </>
    )
}