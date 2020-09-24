import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Switch
} from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRoutes } from './AuthRoutes'
import { firebase } from '../firebase/firebase-config'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';

import { loading } from '../assets/loading.gif'
import {  startLadingNotes } from '../actions/notes';


export const AppRouter = () => {

    const dispatch = useDispatch()
    const [isLogedIn, setisLogedIn] = useState(false)
    const [checking, setchecking] = useState(true)

    useEffect(() => {

        firebase.auth().onAuthStateChanged(async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setisLogedIn(true)
                dispatch(startLadingNotes(user.uid))
            } else {
                setisLogedIn(false)
            }
            setchecking(false)
        })

    }, [dispatch, setchecking])

    if (checking) {
        return (
            <img src={loading} alt="loading..." />
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoutes isLogedIn={isLogedIn} path='/auth' component={AuthRoutes} />
                    <PrivateRoutes isLogedIn={isLogedIn} exact path='/' component={JournalScreen} />
                    <Redirect to='/auth/login' />
                </Switch>
            </div>
        </Router>
    )
}
