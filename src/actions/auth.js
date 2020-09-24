
import Swal from 'sweetalert2'

import { types } from "../types/types"
import { firebase, googleAuthProvaider } from '../firebase/firebase-config'
import { finishLoading, startLoading } from "./ui"
import { noteLogout } from './notes'




//asyncrona

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch(startLoading())

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {

                dispatch(
                    login(user.uid, user.displayName)
                )

                dispatch(finishLoading())
            })
            .catch(e => {
                console.log(e)
                dispatch(finishLoading())
                Swal.fire('error',e.message, 'error')
            })


    }
}

export const StarRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                console.log(user)
                await user.updateProfile({ displayName: name })
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch(
                console.log(e => (
                    
                    Swal.fire('error',e.message, 'error')
                ))
            )
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvaider)
            .then(({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
    }
}

// syncrona
export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startLogout = () => {
    return (dispatch) => {
        firebase.auth().signOut()
        dispatch(logout())
        dispatch(noteLogout())
    }

}

export const logout = () => ({
    type: types.logout
})