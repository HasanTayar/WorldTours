
const Footer = ( {handleSignupClick} ) => {
    return (
        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <a href="#" onClick={()=>handleSignupClick()}>
              Sign up
            </a>
          </p>
        </div>
    )
}
export default Footer;