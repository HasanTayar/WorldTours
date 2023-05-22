import "./Navbar.css";
import { Link, NavLink, useLocation } from "react-router-dom";
const token = localStorage.getItem("token");
export default function Navbar({ isLoggedIn, user, onLogout }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          WorldTours
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className={`nav-link ${isActive("/about")}`} to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={`nav-link ${isActive("/tours")}`} to="/tours">
                Tours
              </NavLink>
            </li>

            {isLoggedIn && user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className={`nav-link ${isActive(`/chat/${user._id}`)}`}
                    to={`/chat/${user._id}`}
                  >
                    Chat
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.photo && (
                      <img
                        src={`${user.photo}`}
                        alt="User"
                        className="rounded-circle"
                        style={{ width: "30px", height: "30px" }}
                      />
                    )}
                    {user.firstName} {user.lastName}
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                    <Link className="dropdown-item" to="/Orders">
                      Orders
                    </Link>
                    {user.isOrganizer && (
                      <Link className="dropdown-item" to="/add-new-tours/">
                        Add Tour
                      </Link>
                    )}

                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={onLogout}>
                      Logout
                    </button>
                  </div>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${isActive("/login")}`}
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
