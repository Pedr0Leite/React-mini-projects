import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        //send request to the server
        console.log(email, password);
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
            <button>Log in</button>
        </form>
    )
}

export default Login;