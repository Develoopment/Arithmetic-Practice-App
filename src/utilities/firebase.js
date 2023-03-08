// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
} from 'firebase/auth'

import {
    getFirestore,
    setDoc,
    doc,
    getDoc
} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs3WkzHRQCx6tie-xyjtfoFyXejOu1Un4",
  authDomain: "mathpracticeapp.firebaseapp.com",
  projectId: "mathpracticeapp",
  storageBucket: "mathpracticeapp.appspot.com",
  messagingSenderId: "42071341502",
  appId: "1:42071341502:web:e9f442626e2f59df10e1ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// using the global app object to initialize firestore db and auth services
const auth = getAuth(app);
const db = getFirestore(app);

// authentication logic
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    
    const res = await signInWithPopup(auth, provider);

    const name = res.user.displayName;
    const email = res.user.email;
    const uid = res.user.uid;

    return{name, email, uid};
}

const addUser = async (uid, name, email) => {

    try{
        //check if user exists, if not creates a new user
        await setDoc(doc(db, "Users", uid),{
            name: name,
            email: email,
            scores:[]
        })

        alert("sucess");

    }catch(error){
        console.log(error);
        alert(error.message);
    }
    
}

const getUser = async (uid) =>{
    const user = await getDoc(doc(db, "Users", uid));
    let foundUser = {};
    if(user.exists){
        foundUser = {
            "uid" : uid,
            ...user.data()
        }
        console.log(foundUser);
        return foundUser;
    }else{
        return false;
    }
}

const logout = async() => {
    await signOut(auth);
};

// write the scores and it's data 
const addScore = async (uid, newScore) => {
    let scores = await getDoc(doc(db, "Users", uid));
    
    scores = scores.data().scores;
    scores.push(newScore);
    
    try{
        await setDoc(doc(db, "Users", uid), {
            scores: scores
        }, {merge:true})
    }catch(error){
        console.log(`firebase error : ${error}`)
    }
    
}

export{
    logout,
    addUser,
    getUser,
    signInWithGoogle,
    auth,
    addScore
}