import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ButtonLogin from '../../../components/button/login/login'
import GoogleButton from '../../../components/button/google/google'
import Email from '../../../components/input/email/email'
import style from './login.module.css'
import { Link } from 'react-router-dom'
// import { login } from '../../../configs/redux/actions/userActions'
import io from 'socket.io-client'
import axios from 'axios'
import { useFormik } from "formik";
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { login } from '../../../configs/redux/actions/userActions'


toast.configure()
function Login({ setSocket, ...props }) {

    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')

    const history = useHistory()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            // username: '',
            email: '',
            password: ''
        },
        onSubmit: values => {
            dispatch(login(values, setSocket, history))

        },
        validationSchema: Yup.object({

            email: Yup.string().required('Email is required').email('Please enter your correct email'),
            password: Yup.string().required('Password is required').min(8, "Password must contain at least 8 letters")
        })


    })

    // const handleLogin = (setSocket, { email, password }) => {

    //     dispatch(login(setSocket, { email, password }, history))
    // }

    // const validationSchema = Yup.object({

    //     email: Yup.string().required('Email is required').email('Please enter your correct email'),
    //     password: Yup.string().required('Password is required').min(8, "Password must contain at least 8 letters")
    // })
    return (
        <>
            <div className={style.container}>
                <div className={style.body}>
                    <div className={style.bodycontent}>
                        <form onSubmit={formik.handleSubmit}>

                            <h2>Login</h2>
                            <h5>Hi, Welcome Back</h5>
                            <h6>Email</h6>
                            <Email name="email" type="text" placeholder="Email" value={formik.values.email} onChange={formik.handleChange}/>
                            {formik.errors.email && formik.touched.email && (<p className={style.valids}>{formik.errors.email}</p>)}
                            <h6>Password</h6>
                            <Email name="password" type="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} />
                            {formik.errors.password && formik.touched.password && (<p className={style.valids}>{formik.errors.password}</p>)}
                            <h5><Link to="/forgot">Forgot Password</Link></h5>
                            <ButtonLogin title="Login" type="submit" />
                            <h4>Login with</h4>
                            <GoogleButton />
                            <h5 className={style.register}>Don't have an account? Register <Link to="/register">here</Link>  </h5>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}


export default Login
