const LoginForm = ({
  email,
  password,
  setPassword,
  setError,
  localUser,
  onSubmit,
  onForgotPassword,
}) => {
  return (
    <form onSubmit={(e) => onSubmit(e, email, password)}>
      <div className="user-profile mb-3">
        <img
          className="profile-image"
          src={`${localUser.photo}`}
          alt="Profile"
        />
        <div className="welcome-text">
          <p>
            <strong>Welcome back,</strong>
          </p>
          <h2>
            {localUser.firstName} {localUser.lastName}!
          </h2>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
      <button type="button" className="btn btn-link" onClick={()=> onForgotPassword()}>
        Forgot password?
      </button>
    </form>
  );
};

export default LoginForm;
