import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui'
import { StarRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch()

    const { msgError } = useSelector(state => state.ui)

    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formValues

    const handelRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(StarRegisterWithEmailPasswordName( email, password, name))
        }

    }

    const isFormValid = () => {

        if (name.trim().length === 0) {
            dispatch(setError('Name is required'))
            return false

        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email is not valid'))
            return false

        } else if (password !== password2 || password.length < 5 || password.trim().length === 0) {
            dispatch(setError('Password should be at least 6 characters and match earch other'))
            return false

        }
        dispatch(removeError())
        return true
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form 
            className="animate__animated animate__fadeIn"
            onSubmit={handelRegister}>

                {
                    msgError && <div className="auth__alert-error"> {msgError} </div>

                }

                <input
                    type="text"
                    placeholder='Name...'
                    name='name'
                    value={name}
                    className="auth__input"
                    autoComplete='off'
                    onChange={handleInputChange}
                />

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
                    type="password"
                    placeholder='Password...'
                    name='password'
                    value={password}
                    className="auth__input"
                    autoComplete='off'
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder='Confirm...'
                    name='password2'
                    value={password2}
                    className="auth__input"
                    autoComplete='off'
                    onChange={handleInputChange}
                />


                <button
                    className="btn btn-primary btn-block mb-5"
                    type='submit'
                >
                    Register
            </button>



                <Link className="link" to='/auth/login'> Already created ?  </Link>
            </form>


        </>
    )
}

