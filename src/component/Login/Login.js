import React, { useContext, useState } from 'react';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { getAuth,
    signInWithPopup,
    FacebookAuthProvider,
    GoogleAuthProvider,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    } from "firebase/auth";
import {UserContext} from '../../App'
import { useHistory, useLocation } from 'react-router';


const app = initializeApp(firebaseConfig);

// React Component
const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: "",
        email: "",
        password: "",
        img: "",
        error: false,
        success: false,
    });

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const GoogleProvider = new GoogleAuthProvider();
    const fbProvider = new FacebookAuthProvider();
    const auth = getAuth();

    // Sign In With Facebook
    const handleFbSignIn = () => {
        signInWithPopup(auth, fbProvider)
        .then((result) => {
            const user = result.user;
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            console.log(user);
            console.log(accessToken);
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    // Sign In With Google
    const handleSignIn = () =>{
        signInWithPopup(auth, GoogleProvider)
        .then(res => {
            const {displayName, email, photoURL} = res.user;
            const signInUser ={
                isSignIn: true,
                name: displayName,
                email: email,
                img: photoURL,
            }
            setUser(signInUser);
            history.replace(from);
        })
        .catch(error => {
            console.log(error);
            console.log(error.message);
        })
    }
         // Sing Out 
    const handleSignOut = () => {
        signOut(auth)
        .then(res => {
            const signOutUser = {
                isSignIn: false,
                name: "",
                email: "",
                img: "",
            }
            setUser(signOutUser)
        })
        .catch(err => {
            console.log("err", err.message);
        })

    }

    // module 42 practice start from here

    const handleBlur = (event) =>{
        let isInputValid = true;
        // if(event.target.name === "name") isFormValid = true
        
        if(event.target.name === "email"){
            isInputValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if(event.target.name === "password"){
            const isPasswordValid = event.target.value.length >= 6;
            const isPasswordHasNum = /\d+/.test(event.target.value)
            isInputValid = isPasswordValid && isPasswordHasNum
        }
        if(isInputValid){
            const userInfo = {...user}
            userInfo[event.target.name] = event.target.value;
            setUser(userInfo)
        }
    }

    // Form Submit

    const handleSubmit = (event) => {
        console.log(user.email, user.password);
        // Creating a new user
        if(newUser && user.email && user.password) {
            createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((res) => {
              console.log(res);
              const newUserInfo = {...user};
              newUserInfo.error = "";
              newUserInfo.success = true;
              setUser(newUserInfo);
              updateUserName(user.name)
            })
            .catch((error) => {
                const newUserInfo = {...user};
                newUserInfo.error = true;
                newUserInfo.success = "";
                setUser(newUserInfo);
            });
        }
        // Login with email and password
        if(!newUser && user.email && user.password){
            signInWithEmailAndPassword(auth, user.email, user.password)
            .then((res) => {
                const newUser = {...user};
                newUser.error = false;
                newUser.success = true;
                setUser(newUser);
                setLoggedInUser(newUser);
                history.replace(from);
                console.log(res.user);
            })
            .catch((error) => {
                const newUser = {...user};
                newUser.error = true;
                newUser.success = false;
                setUser(newUser);
            });
        }
        event.preventDefault()
    }

    const updateUserName = name =>{
        updateProfile(auth.currentUser, {
            displayName: name
          }).then(() => {
            console.log("user name updated successfully");
          }).catch((error) => {
            console.log(error);
          });
    }

    return (
        <div style={{textAlign:"center"}}>
            <br />
            {
                user.isSignIn ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>google sign in</button>
            }
            <br />
            <button onClick={handleFbSignIn}>sign in with facebook</button>
            {
                user.isSignIn &&
                <div>
                    <p>Welcome, {user.name}</p>
                    <p>You're login by: {user.email}</p>
                    <img style={{width:"25%"}} src={user.img} alt="" />
                </div>
            }
            <br />
            <br />

            {/* module 42 practice starts from here */}
            <p>Your Name: {user.name}</p>
            <p>Your Email: {user.email}</p>
            <p>Your Password: {user.password}</p>
            <form onSubmit={handleSubmit} action="">
                <input onChange={() => setNewUser(!newUser)} type="checkbox" name="newUser" id="" />
                <label htmlFor="newUser">New user sign up</label>
                <br />
                {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="name"/>}
                <br />
                <input type="text" name="email"  onBlur={handleBlur} required placeholder="Your Email"/>
                <br />
                <input type="password" name="password" id="" onBlur={handleBlur} required placeholder="password"/>
                <br />
                <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
            </form>
            {
                user.error && <p style={{color:"red"}}>This email is already in use</p>
            }
            {
                user.success && <p style={{color:"green"}}>User {newUser ? "created" : "login"} successfully</p>
            }
            
        </div>
    );
};

export default Login;