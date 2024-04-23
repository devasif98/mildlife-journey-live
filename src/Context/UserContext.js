import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
import app from '../firebase/firebase.config';


export const AuthContext = createContext(null);
const auth = getAuth(app);
const UserContext = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleProvider = new GoogleAuthProvider();

    const googleSignIn = ()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const gitProvider = new GithubAuthProvider();
    const gitSignIn = ()=>{
        setLoading(true)
        return signInWithPopup(auth, gitProvider)
    }

    const logOut =()=>{
        
        return signOut(auth).then(() => {
            setUser("")
          }).catch((error) => {
            
          });
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            
            setUser(currentUser);
        });
        return () =>{
            return unsubscribe();
        }
        
    },[])
    const authInfo ={
        user,
        loading,
        createUser,
        login,
        logOut,
        googleSignIn,
        gitSignIn,
        auth
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
        
    );
};

export default UserContext;