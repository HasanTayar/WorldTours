
const EmailForm = ({ email, setEmail, setError, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Next
      </button>
    </form>
  );
};

export default EmailForm;
