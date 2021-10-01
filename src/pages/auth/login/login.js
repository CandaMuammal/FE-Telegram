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


toast.configure()
function Login({ setSocket, ...props }) {

    // const history = useHistory()
    // const dispatch = useDispatch()
    // const [form, setForm] = useState({
    //     email: '',
    //     password: ''
    // })
    // const handleForm = (e) => {
    //     setForm({
    //         ...form,
    //         [e.target.name]: e.target.value
    //     })
    // }
    // const handleLogin = () => {
    //     dispatch(login(form, history))
    //     try {
    //         history.push('/chatroom')
    //         // alert ('benar')
    //     } catch (error) {
    //         alert('password anda salah')
    //     }
    // }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // const formik = useFormik({
    //     initialValues: {
    //         email: '',
    //         password: ''
    //     },
    //     onSubmit: ({email, password}) => {
    //         axios.post(`${process.env.REACT_APP_API_URL}user/login`, { email: email, password: password })

    //             .then((res) => {
    //                 toast('login successfully..')
    //                 const result = res.data.data
    //                 const token = result.token
    //                 const username = result.username
    //                 const email = result.email
    //                 const phone = result.phone
    //                 const image = result.image
    //                 const id = result.id


    //                 localStorage.setItem('token', token)
    //                 localStorage.setItem('username', username)
    //                 localStorage.setItem('email', email)
    //                 localStorage.setItem('phone', phone)
    //                 localStorage.setItem('image', image)
    //                 localStorage.setItem('id', id)

    //                 const resultSocket = io('http://localhost:4000', {
    //                     query: {
    //                         token: token
    //                     }
    //                 })
    //                 setSocket(resultSocket)
    //                 props.history.push('/chatroom')
    //             })
    //             .catch((err) => {
    //                 // console.log(err);
    //                 toast('Login failed')
    //             })
    //     },
    //     validationSchema: Yup.object({

    //         email: Yup.string().required('Email is required').email('Please enter your correct email'),
    //         password: Yup.string().required('Password is required').min(8, "Password must contain at least 8 letters")
    //     })

    // })

    const handleLogin = () => {

        // axios.post('http://localhost:4000/v1/user/login', { email: email, password: password })
        axios.post(`${process.env.REACT_APP_API_URL}v1/user/login`, { email: email, password: password })

            .then((res) => {
                toast('Login successfully..')
                const result = res.data.data
                const token = result.token
                const username = result.username
                const email = result.email
                const phone = result.phone
                const image = result.image
                const id = result.id


                localStorage.setItem('token', token)
                localStorage.setItem('username', username)
                localStorage.setItem('email', email)
                localStorage.setItem('phone', phone)
                localStorage.setItem('image', image)
                localStorage.setItem('id', id)

                const resultSocket = io(`http://backend-chat-realtime-telegram.herokuapp.com`, {
                    query: {
                        token: token
                    }
                })
                setSocket(resultSocket)
                props.history.push('/chatroom')
            })
            .catch((err) => {
                // console.log(err);
                toast('Login failed')
            })

    }

    const validationSchema = Yup.object({

                email: Yup.string().required('Email is required').email('Please enter your correct email'),
                password: Yup.string().required('Password is required').min(8, "Password must contain at least 8 letters")
    })
    return (
        <>
            <div className={style.container}>
                <div className={style.body}>
                    <div className={style.bodycontent}>
                        {/* <form onSubmit={formik.handleSubmit}> */}

                        <h2>Login</h2>
                        <h5>Hi, Welcome Back</h5>
                        <h6>Email</h6>
                        <Email name="email" type ="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                         {/* {formik.errors.email && formik.touched.email && (<p className={style.valids}>{formik.errors.email}</p>)} */}
                        <h6>Password</h6>
                        <Email name="password" type ="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                         {/* {formik.errors.password && formik.touched.password && (<p className={style.valids}>{formik.errors.password}</p>)} */}
                        <h5><Link to="/forgot">Forgot Password</Link></h5>
                        <ButtonLogin title="Login" onClick={handleLogin}/>
                        <h4>Login with</h4>
                        <GoogleButton />
                        <h5 className={style.register}>Don't have an account? Register <Link to="/register">here</Link>  </h5>
                        {/* </form> */}
                    </div>
                </div>
            </div>

        </>
    )
}


export default Login
