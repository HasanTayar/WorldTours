import { useState , useEffect} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import Spinner from "react-bootstrap/esm/Spinner";
export default function Verify(){
  const {search} = useLocation();
  const {token} = qs.parse(search , { ignoreQueryPrefix : true});
  const navigate = useNavigate();
  const [error , setError] = useState("");
  const [success , setSuccess] = useState("");
  console.log(token);
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch("/api/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message);
          throw new Error(errorData.message);
        }
        const responseData = await response.json();
        setSuccess(responseData.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
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
          {success ? (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            <div className="text-center">
              <Spinner animation="border" role="status" className="my-3">
                <span className="sr-only">Verifying...</span>
              </Spinner>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}