import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ButtonLogin from '../../../components/button/login/login'
import GoogleButton from '../../../components/button/google/google'
import Email from '../../../components/input/email/email'
import style from './register.module.css'
import { Link } from 'react-router-dom'
import { register } from '../../../configs/redux/actions/userActions'
import { useFormik } from "formik";
import * as Yup from 'yup';



function Register() {

    // const [form, setForm] = useState({
    //     username: "",
    //     email: "",
    //     // phoneNumber: "",
    //     password: "",
    // });
    const dispatch = useDispatch();
    const history = useHistory();

    // const handleForm = (e) => {
    //     setForm({ ...form, [e.target.name]: e.target.value });
    // };
    // const handleSubmit = () => {
    //     dispatch(register(form, history))
    //     try {
    //         history.push('/home')
    //         // alert ('benar')
    //     } catch (error) {
    //         alert('password anda salah')
    //     }
    // };

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        onSubmit: initialValues => {
            dispatch(register(initialValues, history))
        },
        validationSchema: Yup.object({

            username: Yup.string().required('Username is required'),
            email: Yup.string().required('Email is required').email('Please enter your correct email'),
            password: Yup.string().required('Password is required').min(8, "Password must contain at least 8 letters")
        })

    })


    return (
        <>
            <div className={style.container}>
                <div className={style.body}>
                        <div className={style.bodycontent}>
                    <form onSubmit={formik.handleSubmit}>

                            <h2>Register</h2>
                            <h5>Let's create your account</h5>
                            <h6>Name</h6>
                            <Email name="username" type="text" placeholder="Name" onChange={formik.handleChange} value={formik.values.username} error={formik.errors.username} />
                            {formik.errors.username && formik.touched.username && (<p className={style.valids}>{formik.errors.username}</p>)}
                            <h6>Email</h6>
                            <Email name="email" type="text" placeholder="Email" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email} />
                            {formik.errors.email && formik.touched.email && (<p className={style.valids}>{formik.errors.email}</p>)}
                            <h6>Password</h6>
                            <Email name="password" type="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password} />
                            {formik.errors.password && formik.touched.password && (<p className={style.valids}>{formik.errors.password}</p>)}
                            <ButtonLogin type="submit" title="Register"/>
                            <h4>Register with</h4>
                            <GoogleButton />
                    </form>

                        </div>
                </div>
            </div>

        </>
    )
}

export default Register
