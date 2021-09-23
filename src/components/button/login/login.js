import React from 'react'
import style from './login.module.css'

function ButtonLogin(props) {
    return (
        <div>
            <button className={style.btnlogin} error={props.error} type={props.type} onClick={props.onClick}>{props.title}</button>
        </div>
    )
}

export default ButtonLogin
