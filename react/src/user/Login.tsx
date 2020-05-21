import React, { useState } from "react";
import DangerLabel from "../common/components/DangerLabel";
import { useErrorHandler } from "../common/utils/ErrorHandler";
import { DefaultProps, goHome } from "../common/utils/Tools";
import { login } from "../store/sessionStore";
import "../styles.css";
import FormInput from "../common/components/FormInput";
import FormPassword from "../common/components/FormPassword";
import FormButtonBar from "../common/components/FormButtonBar";
import FormAcceptButton from "../common/components/FormAcceptButton";
import FormButton from "../common/components/FormButton";
import FormTitle from "../common/components/FormTitle";
import Form from "../common/components/Form";
import GlobalContent from "../common/components/GlobalContent";

export default function Login(props: DefaultProps) {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const errorHandler = useErrorHandler()

    const loginClick = async () => {
        errorHandler.cleanRestValidations();
        if (!login) {
            errorHandler.addError("login", "No puede estar vacío");
        }
        if (!password) {
            errorHandler.addError("password", "No puede estar vacío");
        }

        try {
            await login({
                login: userName,
                password
            });
            props.history.push("/");
        } catch (error) {
            errorHandler.processRestValidations(error);
        }
    }

    return (
        <GlobalContent>
            <FormTitle>Login</FormTitle>

            <Form>
                <FormInput
                    label="Usuario"
                    name="login"
                    errorHandler={errorHandler}
                    onChange={(event) => setUserName(event.target.value)} />

                <FormPassword
                    label="Password"
                    name="password"
                    errorHandler={errorHandler}
                    onChange={(event) => setPassword(event.target.value)} />

                <DangerLabel message={errorHandler.errorMessage} />

                <FormButtonBar>
                    <FormAcceptButton label="Login" onClick={loginClick} />
                    <FormButton label="Cancelar" onClick={() => goHome(props)} />
                </FormButtonBar>
            </Form >
        </GlobalContent >
    );
}
