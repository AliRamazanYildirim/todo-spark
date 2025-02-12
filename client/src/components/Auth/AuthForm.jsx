import useAuthStore from "../../stores/useAuthStore";

const AuthForm = () => {
  const {
    email,
    password,
    confirmPassword,
    error,
    isLogin,
    setEmail,
    setPassword,
    setConfirmPassword
  } = useAuthStore();

  const handleSubmit = useAuthStore(state => state.handleSubmit);

  return (
    <form onSubmit={(e) => handleSubmit(e, isLogin ? "login" : "signup")}>
      <h2>{isLogin ? "Please log in" : "Please sign up!"}</h2>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {!isLogin && (
        <input
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      )}
      <input
        type="submit"
        className="create"
        value={isLogin ? "Login" : "Sign Up"}
      />
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default AuthForm;