

function PasswordStrength({ passwordStrength }) {
    return (
        <div className="progress mt-2">
            <div
                className={`progress-bar ${
                    passwordStrength < 2
                        ? "bg-danger"
                        : passwordStrength < 4
                        ? "bg-warning"
                        : "bg-success"
                }`}
                role="progressbar"
                style={{ width: `${(passwordStrength / 4) * 100}%` }}
                aria-valuemin="0"
                aria-valuemax="100"
            ></div>
        </div>
    );
}

export default PasswordStrength;
