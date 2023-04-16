import '../css/signup.css';
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
function getPasswordStrength(password) {
    let strength = 0;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
}
function RegisterForm() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [userPhoto, setUserPhoto] = useState(null);
    const [previewPhoto, setPreviewPhoto] = useState('https://via.placeholder.com/150');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError("Password must contain at least one capital letter");
            return;
        }
        if (password.length < 8 || password.length > 16) {
            setError("Password must be between 8 and 16 characters");
            return;
        }

        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("phoneNumber", phoneNumber);
        formData.append("password", password);
        if (userPhoto) {
            formData.append("photo", userPhoto);
        } else {
            formData.append("photo", 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E');
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: formData,
        };

        try {
            const response = await fetch('/api/signup', requestOptions);
            const data = await response.json();
            console.log(data);
            setSuccess(data.message);
            setTimeout(() => {
                setLoading(false); // Set loading to false when done
                navigate("/verification", { state: { email } });
            }, 4000);

        } catch (error) {
            setLoading(false); // Set loading to false if there's an error
            console.log(error);
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserPhoto(file);
            setPreviewPhoto(URL.createObjectURL(file));
        } else {
            setUserPhoto(null);
            setPreviewPhoto(null);
        }
    };

    const passwordStrength = getPasswordStrength(password);

    return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
            <form onSubmit={handleSubmit} className="card-body">
                            <h2 className="text-center mb-4">Sign Up</h2>
                            <div className="d-flex justify-content-center">
                                {previewPhoto ? (
                                    <div className="position-relative">
                                        <img
                                            src={previewPhoto}
                                            alt="User"
                                            className="img-thumbnail rounded-circle"
                                            style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }}
                                        />
                                        <div className="position-absolute top-0 end-0">
                                            <label htmlFor="user-photo-input" className="btn btn-secondary btn-sm">
                                                Change Photo
                                            </label>
                                            <input
                                                id="user-photo-input"
                                                type="file"
                                                className="d-none"
                                                name="userPhoto"
                                                onChange={handlePhotoChange}
                                                accept="image/*"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="position-relative">
                                        <img
                                            src={defaultUserPhoto}
                                            alt="Default User"
                                            className="img-thumbnail rounded-circle"
                                            style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }}
                                        />
                                        <div className="position-absolute top-0 end-0">
                                            <label htmlFor="user-photo-input" className="btn btn-secondary btn-sm">
                                                Upload Photo
                                            </label>
                                            <input
                                                id="user-photo-input"
                                                type="file"
                                                className="d-none"
                                                name="userPhoto"
                                                onChange={handlePhotoChange}
                                                accept="image/*"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="first-name-input" className="form-label">
                                    First Name:
                                </label>
                                <input
                                    id="first-name-input"
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="last-name-input" className="form-label">
                                    Last Name:
                                </label>
                                <input
                                    id="last-name-input"
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email-input" className="form-label">
                                    Email:
                                </label>
                                <input
                                    id="email-input"
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone-number-input" className="form-label">
                                    Phone Number:
                                </label>
                                <input
                                    id="phone-number-input"
                                    type="tel"
                                    className="form-control"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    pattern="[0-9]{10}"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password-input" className="form-label">
                                    Password:
                                </label>
                                <input
                                    id="password-input"
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="progress mt-2">
                                    <div
                                        className={`progress-bar ${passwordStrength < 2 ? "bg-danger" : passwordStrength < 4 ? "bg-warning" : "bg-success"}`}
                                        role="progressbar"
                                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    ></div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirm-password-input" className="form-label">
                                    Confirm Password:
                                </label>
                                <input
                                    id="confirm-password-input"
                                    type="password"
                                    className="form-control"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="alert alert-success" role="alert">
                                    {success}
                                </div>
                            )}
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? (
                                    <Spinner animation="border" role="status" size="sm">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                ) : (
                                    "Register"
                                )}
                            </button>
                            <div className="text-center mt-3">
                                Already have an account? <a href="/login">Login here</a>
                            </div>

                        </form>
            </div>
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <div>
                <img
                  src="https://source.unsplash.com/random/800x600?travel"
                  alt="Random travel photo"
                  className="img-thumbnail rounded"
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      );
      
}
export default RegisterForm;