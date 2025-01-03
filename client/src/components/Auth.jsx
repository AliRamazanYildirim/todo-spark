import { useState } from "react";

const Auth = () => {
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  console.log(email, password, confirmPassword);
  

  const viewLogin = (status) => {
    setIsLogin(status);
    setError(null);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    !isLogin && password !== confirmPassword
      ? setError("Passwords do not match")
      : setError(null);
    
      try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || "Failed to fetch data");
    }

      const data = await response.json();
      console.log(data);
      
    } catch (error) {
      console.error("Error:", error);
      setError(data.detail);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogin ? "Please log in" : "Please sign up!"}</h2>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && <input
           type="password"
            placeholder="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)} />}
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
          />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogin ? "#f9f9f9" : "rgb(188, 188, 188)",
            }}
          >
            Sign Up
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: !isLogin ? "#f9f9f9" : "rgb(188, 188, 188)",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
