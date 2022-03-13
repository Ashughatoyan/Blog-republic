import React from 'react';
import { Box, Typography, Button, Divider, TextField } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { postCard, styleSign_InUp } from '../styles';
import { changePost, like } from '../functions';

export default class PostCard extends React.Component{
    constructor(props){
        super(props);
        this.setState = this.setState.bind(this);
        this.state = { 
            showChangeBar:false,
            title:this.props.title,
            content:this.props.content,
            likes:this.props.likes,
            wasLiked:this.props.wasLiked,
            titleErr:false,
            contentErr:false
        };
    }

    render(){
        return(
            <Box sx={ postCard.Box }>
                
                <Typography sx={{fontFamily: "monospace",fontSize:'20px',marginLeft:'25px'}}>
                    {this.state.title}
                </Typography>
                
                <p style={ postCard.p }>
                    {this.state.content}
                </p>
                
                <Divider flexItem />
                
                <Box sx={ postCard.Box1 }>
                    
                    <Box sx={ postCard.Box2 }>
                        {this.state.wasLiked?
                            <FavoriteIcon 
                                sx={{cursor:'pointer'}} 
                                onClick={ () => { 
                                    like( 
                                        this.props.uidFromState,
                                        this.props.postId,
                                        this.state.likes,
                                        this.setState ,
                                        this.props.navigate
                                    );
                                }} 
                            />:
                            <FavoriteBorderIcon 
                                sx={{cursor:'pointer'}}
                                onClick={ () => { 
                                    like( 
                                        this.props.uidFromState,
                                        this.props.postId,
                                        this.state.likes,
                                        this.setState ,
                                        this.props.navigate
                                    );
                                }}
                            />
                        }
                    
                        <Typography sx={ postCard.Typography }>
                            {this.state.likes.length - 1 + ' Likes'}
                        </Typography>
                    
                    </Box>
                    
                    { this.props.authorUid === this.props.uidFromState ? 
                        (<><Button 
                            variant={this.state.showChangeBar?"contained":"outlined"}
                            onClick={ () => { this.setState(prevState => ({ ...prevState, showChangeBar:!prevState.showChangeBar })) } }
                        >
                            {this.state.showChangeBar?'cancel':'Edit'}
                        </Button>
                        {this.state.showChangeBar?
                            <Button 
                                variant="contained"
                                sx={{ backgroundColor:"#2ecc71","&:hover":{ backgroundColor:"#27ae60" } }}
                                onClick={ () => { changePost( this.state.title, this.state.content, this.props.postId, this.setState ) } }
                            >
                                Publish
                            </Button>:null}
                        </>):
                        null
                    }
                    
                    <Box sx={ postCard.Box2 }>
                    
                        <img style={ postCard.img } src={this.props.imgUrl} />
                    
                        <Typography sx={ postCard.Typography1 }>
                            {this.props.authorName}
                            <br/>
                            {this.props.date}
                        </Typography>
                    
                    </Box>

                </Box>

                { this.state.showChangeBar ?
                    (<><Divider flexItem />
                        <Box sx={{ width:'100%',display:'flex',justifyContent:'space-between' }}>
                            <TextField
                                error={ this.state.titleErr }
                                sx={ { ...styleSign_InUp.TextField, width:'48%' }}
                                style={ {...styleSign_InUp.TextFieldStyle, margin:'0px'} }
                                inputProps={ { style: { ...styleSign_InUp.TextFieldInputProps, fontFamily:'monospace' } } }
                                InputLabelProps={ { style: styleSign_InUp.TextFieldInputProps } }
                                id="title"
                                label="Title"
                                type="text"
                                variant="standard"
                                value={ this.state.title }
                                autoFocus={true}
                                multiline={ true }
                                onChange={ (event) => { this.setState( prevState => ({ 
                                    ...prevState,
                                    title:event.target.value,
                                    titleErr:false
                                })) } } 
                            />
                            <TextField
                                error={ this.state.contentErr }
                                sx={ { ...styleSign_InUp.TextField, width:'48%' }}
                                style={ {...styleSign_InUp.TextFieldStyle, margin:'0px'} }
                                inputProps={ { style: { ...styleSign_InUp.TextFieldInputProps, fontFamily:'monospace' } } }
                                InputLabelProps={ { style: styleSign_InUp.TextFieldInputProps } }
                                id="content"
                                label="Content"
                                type="text"
                                variant="standard"
                                value={ this.state.content }
                                multiline={ true }
                                onChange={ (event) => { this.setState( prevState => ({
                                    ...prevState,
                                    content:event.target.value,
                                    contentErr:false
                                })) } } 
                            />
                        </Box></>):null}

            </Box>
        )
    }
}