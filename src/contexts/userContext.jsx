// A decoupled way to share user data (via React context )
import React, { useContext, useEffect, useState } from 'react'
import { getUser, auth } from '../utilities/firebase';

const AuthContext = React.createContext();

// custom hook (a react function that lets us reuse stateful logic like useState which wouldn't be possible in a normal function)
// essentially, this useAuth function is what we use to get the user data in other components
export function useAuth(){
    return useContext(AuthContext);
}

// this function sets up the provider ("parent" which allows for a value to be shared to all it's children) and state logic to share and update user data
// the {children} being passsed as an argument here refer to the componenents that are wrapped by this function
// see App.js component to see the above point
export function AuthProvider({children}) {
  
    const [currentUser, setCurrentUser] = useState(false);
    const [loading, setLoading] = useState(true);

    // checks and handles login, logout and signup actions when the component using this function is alive
    // unsubscribes and stops listening to auth changes after navigated away (component unmounted)
    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {

            setLoading(false);
            console.log(user);

            // get user data
            const setUserdata = async () => {
                try{
                    const userFound = await getUser(user.uid);
                    if(userFound){
                        setCurrentUser(userFound);
                    }
                    
                    // console.log(userFound);
                }catch(error){
                    // this will be triggered if user is logged out (evey request will be directed to the login page!)
                    console.log("no user logged in (prolly) " + error)
                    setCurrentUser(false);
                }
            }
            // setCurrentUser(user);
            // console.log("this user");
            setUserdata();

        })

        return () => {
            unsubscribe(); 
        };
    },[])

    const value = {
        currentUser,
        setCurrentUser
    }

    return(
        <AuthContext.Provider value={value}>
            {/* if not in loading state then render children, ensures that the component that need currentUser will only be shown after currentUser has been loaded since after page refresh the state is null */}
            {/* this also allows us to know when the user is or isn't logged in */}
            {!loading && children}
        </AuthContext.Provider>
    )
}
