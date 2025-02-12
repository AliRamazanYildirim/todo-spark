import useAuthStore from "../../stores/useAuthStore";

const AuthOptions = () => {
  const { isLogin, setIsLogin, setError } = useAuthStore();

  const handleToggle = (status) => {
    setIsLogin(status);
    setError(null);
  };

  return (
    <div className="auth-options">
      <button
        onClick={() => handleToggle(false)}
        style={{
          backgroundColor: !isLogin ? "#f9f9f9" : "rgb(188, 188, 188)",
        }}
      >
        Sign Up
      </button>
      <button
        onClick={() => handleToggle(true)}
        style={{
          backgroundColor: isLogin ? "#f9f9f9" : "rgb(188, 188, 188)",
        }}
      >
        Login
      </button>
    </div>
  );
};

export default AuthOptions;