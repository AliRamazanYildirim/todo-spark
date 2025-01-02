import { useState } from "react";

const Auth = () => {
    const [error, setError] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const viewLogin = (status) => {
        setIsLogin(status);
        setError(null);
    }

    return(
    <div className="auth-container">
        <div className="auth-container-box">
            <form>
                <h2>{isLogin ? 'Please log in' : 'Please sign up!'}</h2>
                <input type="email" placeholder="email"/>
                <input type="password" placeholder="password"/>
                {!isLogin && <input type="password" placeholder="confirm password"/>}
                <input type="submit" className="create" />
                { error && <p>{error}</p>}
            </form>
            <div className="auth-options">
                <button onClick={() => viewLogin(false)}
                    style={{backgroundColor : !isLogin ? '#f9f9f9' : 'rgb(188, 188, 188)'}}
                    >Sign Up</button>
                <button onClick={() => viewLogin(true)}
                    style={{backgroundColor : !isLogin ? '#f9f9f9' : 'rgb(188, 188, 188)'}}
                    >Login</button>
            </div>
        </div>
    </div>
    )
}

export default Auth;