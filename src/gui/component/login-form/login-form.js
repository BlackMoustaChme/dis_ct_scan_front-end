import React from "react";

function LoginForm({onUsernameChange, onPasswordChange, usernameTitle, passwordTitle, onClick, buttonTitle, usernameValue, passwordValue}){

    return (
        <>
        <div>
            <div>{usernameTitle}</div>
            <input onChange={onUsernameChange} value={usernameValue} type="text"></input>
        </div>
        <div>
            <div>{passwordTitle}</div>
            <input onChange={onPasswordChange} value={passwordValue} type="password"></input>
        </div>
        <button onClick={onClick}>{buttonTitle}</button>
        </>
    )
}

export default LoginForm