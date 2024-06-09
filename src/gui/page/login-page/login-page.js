import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../component/login-form/login-form";
import { useAuthorizationDispatcher, useIsAuthorizedListener, usePasswordDispatcher, usePasswordListener, useUsernameDispatcher, useUsernameListener } from "../../../vm/redux/api";

function LoginPage() {

    const navigate = useNavigate();


    const username = useUsernameListener();
    const password = usePasswordListener();
    console.log(username, password)

    const usernameDispatcher = useUsernameDispatcher();
    const passwordDispatcher = usePasswordDispatcher();
    const authorizationDispatcher = useAuthorizationDispatcher();
    const isAuth = useIsAuthorizedListener();

    useEffect(() => {
        if(isAuth){
            navigate('/main');
        }
    }, [isAuth, navigate]);

    return (
        <div>
            <LoginForm usernameValue={username} passwordValue={password} 
            onUsernameChange={(event) => usernameDispatcher(event.target.value)} onPasswordChange={(event) => passwordDispatcher(event.target.value)}
            usernameTitle={"Имя пользователя"} passwordTitle={"Пароль"}
            onClick={() => authorizationDispatcher()} buttonTitle={"Вход"}></LoginForm>
        </div>
    )

}

export default LoginPage