import AuthForm from './AuthForm';
import AuthOptions from './AuthOptions';

const Auth = () => {
  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <AuthForm />
        <AuthOptions />
      </div>
    </div>
  );
};

export default Auth;