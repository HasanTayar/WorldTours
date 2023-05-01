import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "qs";
import Spinner from "react-bootstrap/esm/Spinner";
import axios from "axios";
export default function Verify() {
  const { search } = useLocation();
  const { token } = qs.parse(search, { ignoreQueryPrefix: true });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post("/api/verify-email", { token });
        setLoading(false);
        if (!response.ok) {
          setError(response.data.message);
          throw new Error(response.data.message);
        }
        setSuccess(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        setLoading(false);
        setError("An error occurred while verifying your email");
      }
    };
  
    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center my-4">Email Verification</h2>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status" className="my-3">
                <span className="sr-only">Verifying...</span>
              </Spinner>
            </div>
          ) : success ? (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
