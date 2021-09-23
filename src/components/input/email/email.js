import React from 'react'
import style from "./email.module.css"

function Email(props) {
    return (
        <>
           <input 
           type={props.type} 
           placeholder={props.placeholder} 
           style={props.style} 
           name={props.name}  
           value={props.value} 
           onChange={ props.onChange}/>  
        </>
    )
}

export default Email
