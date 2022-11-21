import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        //send request to the server
        await login(email, password);
    }

    return (
        <form className="login" onSubmit={onSubmitForm}>
            <h3>Login</h3>

            <label>Email:</label>
            <input
            type="email"
            onChange={onChangeEmail}
            value={email}
            />
            <label>Password:</label>
            <input
            type="password"
            onChange={onChangePassword}
            value={password}
            />
            <button disabled={isLoading}>Log in</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login;