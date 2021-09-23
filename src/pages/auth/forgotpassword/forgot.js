import React from 'react'
import ButtonLogin from '../../../components/button/login/login'
import GoogleButton from '../../../components/button/google/google'
import Email from '../../../components/input/email/email'
import style from './forgot.module.css'
import {Link} from 'react-router-dom'


function ForgotPass() {
    return (
        <>  
        <div className={style.container}>
            <div className={style.body}>
                <div className={style.bodycontent}>
                <h2>Forgot Password</h2>
                <h5>You'll get email soon to reset your password</h5>
                <h6>Email</h6>
                <Email type="text" placeholder="Email"/>
                <ButtonLogin title="Send"/>
                </div>
            </div>
        </div>
            
        </>
    )
}

export default ForgotPass
