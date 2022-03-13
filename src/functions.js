import { Alert, LinearProgress } from "@mui/material";
import { styleSign_InUp } from './styles';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, set, ref, child, get, update, onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, updatePassword, updateEmail } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import '@firebase/auth';

export function checkBeforeRequest( setState, email, password, navigate, reducer, userName, IMG ){
    let answer = true;
    if( password.length < 8 ){
        answer=false;
        setState( prevState => ({
            ...prevState,
            passwordErr:true,
            alert:<Alert severity="error" sx={ styleSign_InUp.alert }>Wrong! password</Alert>
        }) ) 
    };
    if( IMG!=null && !new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(IMG) ){ 
        answer=false;
        setState( prevState => ({ 
            ...prevState,
            IMGErr:true,
            alert:<Alert severity="error" sx={ styleSign_InUp.alert }>Wrong! image URL</Alert> 
        }) ) 
    };
    if( !email.toLowerCase().match(/^\S+@\S+\.\S+$/) ){ 
        answer=false;
        setState( prevState => ({ 
            ...prevState,
            emailErr:true,
            alert:<Alert severity="error" sx={ styleSign_InUp.alert }>Wrong! Email address</Alert> 
        }) ) 
    };
    if( userName!=null && userName.length < 3 ){
        answer=false;
        setState( prevState => ({
            ...prevState,
            userNameErr:true,
            alert:<Alert severity="error" sx={ styleSign_InUp.alert }>Wrong! Name</Alert> 
        }) ) 
    };
    if( answer ){ setState( prevState => ({
        ...prevState,
        alert:(<Alert severity="success" color="info" sx={ styleSign_InUp.alert } >Success{userName?'the account was created!':'you sign in'}<LinearProgress/></Alert>) }) ) 
        if( userName!=null && IMG!=null )newUserRegistaration( email, userName, IMG, password, reducer, setState, navigate )
        if( userName==null && IMG==null ){UserSignIn( email, password, reducer, navigate, setState )}
    };
}

const firebaseConfig = {
    apiKey: "AIzaSyBXw8SY0-pXCKQWinbF91w-_dB9GqSFR0I",
    authDomain: "react-hooks-2f215.firebaseapp.com",
    // For databases not in the us-central1 location, databaseURL will be of the
    // form https://[databaseName].[region].firebasedatabase.app.
    // For example, https://your-database-123.europe-west1.firebasedatabase.app
    databaseURL: "https://react-hooks-2f215-default-rtdb.firebaseio.com/",
};

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export const auth = firebase.auth();

function newUserRegistaration(email, name, IMG, password, reducer, setState, navigate){
    const getAuthConstwithargument = getAuth(app);

    createUserWithEmailAndPassword(getAuthConstwithargument, email, password)
      .then((res) => {
        
        const user = auth.currentUser;

        reducer({ type:'registration', user:user })

        setTimeout( () => { navigate("./post", { replace: true }) }, 15);

        return user.updateProfile({
          displayName: name,
          photoURL: IMG
        });

      }, error => {
        setState( prevState => ({ ...prevState, alert:<Alert severity="error" sx={ styleSign_InUp.alert }>{error.message}</Alert>}) )
    });
  }

  function UserSignIn(email, password, reducer, navigate, setState){
  
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      reducer({ type:'registration', user:userCredential.user })
      
      //console.log('user >>> ',userCredential)
      
      setTimeout( () => {navigate("./post", { replace: true }) }, 1500);

    }, error => {
      
        setState( prevState => ({ ...prevState, alert:<Alert severity="error" sx={ styleSign_InUp.alert }>{error.message}</Alert>}) )
      
    });

}

export function createPost( title, content, IMG, author, uid ){
    
    const postListRef = ref(db, 'posts');
      
    const newPostRef = push(postListRef);
      
    set( newPostRef, {
        authorName:author,
        authorUid:uid,  
        content:content,
        date:new Date().toString(),
        imageURL:IMG,
        likes:[ 'uid of account who liked a post' ],
        title:title
    });

}

export function getHistory( setState ){
    
    const dbRef = ref(getDatabase(app));
    
    get(child(dbRef, `posts`)).then( async (snapshot) => {
        if (snapshot.exists()) {
            setState({ posts:Object.entries(snapshot.val()) })
            return snapshot.val();
        } else { return{ message:'post not found' }
    }
    }).catch((error) => {

        console.error(error);

    });
}

export function changePost( title, content, postId, setState ){
    let answer = true;
    if( title.split(' ').length < 5 ){
        setState(prevState => ({ ...prevState, titleErr:true }))
        answer = false;
    };
    if( content.split(' ').length < 20 ){
        setState(prevState => ({ ...prevState, contentErr:true }))
        answer = false;
    };
    if( answer === true ){
        setState(prevState => ({ ...prevState, showChangeBar:false }))
        const updates = {};
        updates['/posts/' + postId + '/title' ] = title;
        updates['/posts/' + postId + '/content' ] = content;
        update(ref(db), updates);
    }
}

    const starCountRef = ref(db, 'posts');
    
    let data;

    onValue(starCountRef, async (snapshot) => {
        data = snapshot.val()
    })

export async function like( userId, postId, data, setState, navigate ){
    if( !userId ){ 
       if( window.confirm('Please sign in to like posts') ) navigate("/", { replace: true })
    }
    else{
        if(!data.includes(userId)){
            const updates = {};
            updates['/posts/' + postId + '/likes' ] = [ ...data, userId ];
            update(ref(db), updates);
            setState( prevState =>  ({ ...prevState, wasLiked:true, likes:[ ...data, userId ] }))
        }
        else{
            const updates = {};
            updates['/posts/' + postId + '/likes' ] = data.filter( item => item !== userId );
            update(ref(db), updates);
            setState( prevState =>  ({ ...prevState, wasLiked:false, likes:data.filter( item => item !== userId ) }))
        }
    }
}

export function changeUserInfo( userId, value, type, setState, navigate ){
    
    if( type === 'password' ){ 
        const user = auth.currentUser;
        if(value.length < 8){ setState( prevState => ({ 
            ...prevState,
            passwordErr:true,
            alert:<Alert severity="error">Wrong! Password</Alert>
        })) }
        else{                
            updatePassword(user, value).then(() => {
                // Update successful.
                setState( prevState => ({ 
                    ...prevState,
                    password:'',
                    alert:(
                    <Alert severity="success" color="info" sx={{ marginTop:'30px' }}>
                        Your profile name was successfully changed
                        <LinearProgress/>
                    </Alert>)
                }))
                setTimeout( () => { navigate("../post", { replace: true }) }, 1500);
            }).catch((error) => {
                console.error( error )
                setState( prevState => ({ 
                    ...prevState,
                    passwordErr:true,
                    alert:<Alert severity="error">
                        the token has expired, please log out of your account and log in again to renew the token
                    </Alert>
                }))
                // An error ocurred
                // ...
            })
        }
    }
    else if( type === 'email' ){ 
        if( !value.toLowerCase().match(/^\S+@\S+\.\S+$/) ){ setState( prevState => ({ 
            ...prevState,
            emailErr:true, 
            alert:<Alert severity="error">Wrong! email</Alert>
        })) }
        else{
            updateEmail(auth.currentUser, value).then(() => {
                setState( prevState => ({ 
                    ...prevState,
                    email:'',
                    alert:<Alert severity="success" color="info" sx={{ marginTop:'30px' }}>
                        Your profile email was successfully changed
                        <LinearProgress/>
                    </Alert>
                }))
                setTimeout( () => { navigate("../post", { replace: true }) }, 1500);
              }).catch((error) => {
                setState( prevState => ({ 
                    ...prevState,
                    nameErr:true,
                    alert:<Alert severity="error">{error.message}</Alert>
                }))
                // An error occurred
                // ...
              });
        }
    }
    
    else if( type === 'name' ){
        if( value.length < 3 ){ setState( prevState => ({ 
            ...prevState,
            nameErr:true,
            alert:<Alert severity="error">Wrong! you can't set your profile "{value}" as name</Alert>
        })) }
        else{
            updateProfile(auth.currentUser, {
                displayName: value
              }).then(() => {
                setState( prevState => ({ 
                    ...prevState,
                    name:'',
                    alert:<Alert severity="success" color="info" sx={{ marginTop:'30px' }}>
                        Your profile name was successfully changed
                        <LinearProgress/>
                    </Alert>
                }))
                setTimeout( () => { navigate("../post", { replace: true }) }, 1500);
                // Profile updated!
                // ...
              }).catch((error) => {
                setState( prevState => ({ 
                    ...prevState,
                    nameErr:true,
                    alert:<Alert severity="error">{error.message}</Alert>
                }))
                // An error occurred
                // ...
              });
        }
    }
    
    else if( type === 'picture' ){
        if( !new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(value) ){
            setState( prevState => ({ 
                ...prevState,
                pictureErr:true,
                alert:<Alert severity="error">Wrong! URL</Alert>
            }))
        }
        else{
            updateProfile(auth.currentUser, {
                photoURL: value
              }).then(() => {
                setState( prevState => ({ 
                    ...prevState,
                    picture:'',
                    alert:<Alert severity="success" color="info" sx={{ marginTop:'30px' }}>
                        Your profile picture was successfully changed
                        <LinearProgress/>
                    </Alert>
                }))
                setTimeout( () => { navigate("../post", { replace: true }) }, 1500);
                // Profile updated!
                // ...
              }).catch((error) => {
                setState( prevState => ({ 
                    ...prevState,
                    pictureErr:true,
                    alert:<Alert severity="error">{error.message}</Alert>
                }))
                // An error occurred
                // ...
              });
        }
    }

}