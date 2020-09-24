import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const dispatch = useDispatch()

    const { msgError, loading } = useSelector(state => state.ui)

    const [formValues, handleInputChange] = useForm({
        email: 'lazaro0089@gmail.com',
        password: '123456'
    });

    const { email, password } = formValues



    const handelGoogleLogin = () => {
        dispatch(startGoogleLogin())
    }

    const handelLogin = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startLoginEmailPassword(email , password))
        }

    }

    const isFormValid = () => {

        if (!validator.isEmail(email)) {
            dispatch(setError('Email is not valid'))
            return false

        } else if (password.length < 5 || password.trim().length === 0) {
            dispatch(setError('Password should be at least 6 characters and match earch other'))
            return false

        }
        dispatch(removeError())
        return true
    }

    
    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form
            className="animate__animated animate__fadeIn"
            onSubmit={handelLogin}>


                {
                    msgError && <div className="auth__alert-error"> {msgError} </div>

                }

                <input
                    type="text"
                    placeholder='Email...'
                    name='email'
                    value={email}
                    className="auth__input"
                    autoComplete='off'
                    onChange={handleInputChange}
                />


                <input
                    type="Password"
                    placeholder='Password...'
                    name='password'
                    value={password}
                    className="auth__input"
                    autoComplete='off'
                    onChange={handleInputChange}
                />


           {     <button
                    className="btn btn-primary btn-block"
                    type='submit'
                    disabled= {loading}
                >
                    Login
            </button>}


                <div className="auth__social-networks" >
                    <p>Login with social networks</p>

                    <div
                        className="google-btn"
                        onClick={handelGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link className="link" to='/auth/register'> Create new account  </Link>
            </form>


        </>
    )
}
