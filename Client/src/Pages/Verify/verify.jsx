import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "qs";
import Spinner from "react-bootstrap/esm/Spinner";
import { verifyEmail } from "../../Services/userService.js";
export default function Verify() {
  const { search } = useLocation();
  const { token } = qs.parse(search, { ignoreQueryPrefix: true });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verify() {
      const { success, message } = await verifyEmail(token);
      setLoading(false);
      if (!success) {
        setError(message);
      } else {
        setSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    }
    verify();
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
