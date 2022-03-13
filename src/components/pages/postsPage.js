import React,{ useState, useEffect } from 'react';
import Sidebar from '../sidebar';
import PostCard from '../post';
import { Box, LinearProgress, Typography } from "@mui/material";
import { postsPage } from '../../styles';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { auth, getHistory } from '../../functions';
import { onAuthStateChanged } from "firebase/auth";

export default function PostsPage() {
    
    const dispatch = useDispatch();

    const state = useSelector(state => state);
    
    const [ postPageState, setPostPageState ] = useState({});
    
    let navigate = useNavigate();

    useEffect( () => {
        
        getHistory( setPostPageState )

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
        <Box sx={ postsPage.Box }>
            <Sidebar toggle="Posts"/>
            <Box>
                {postPageState.posts?postPageState.posts.reverse().map( (item,index) => 
                    <PostCard
                    title={item[1].title}
                    content={item[1].content}
                    likes={ item[1].likes }
                    wasLiked={ item[1].likes.includes( state.user?.uid ) }
                    authorName={item[1].authorName}
                    imgUrl={item[1].imageURL}
                    date={ new Date(item[1].date).toLocaleDateString('en-GB') }
                    authorUid={ item[1].authorUid }
                    uidFromState={ state.user?.uid }
                    postId={ item[0] }
                    navigate={ navigate }
                    key={index}
                    />):
                    <Box sx={{width:'500px',margin:'30px 0 0 250px'}}>
                        <Typography>
                            Loading...
                        </Typography>
                        <LinearProgress/>
                    </Box>
                    }
            </Box>
        </Box>
    )
}