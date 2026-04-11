import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? "active-link" : "");

  return (
    <nav className="navbar navbar-expand-lg shadow-sm py-3 sticky-top custom-navbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="logo" className="navbar-logo" />
          <span className="fw-bold text-white">12Fit</span>
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav me-auto ms-lg-4">
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/")}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/dashboard")}`} to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/workout")}`} to="/workout">Workout</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/diet")}`} to="/diet">Diet</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/products")}`} to="/products">Products</Link>
            </li>
          </ul>

          <div className="d-flex gap-2">
            <Link className="btn btn-outline-light" to="/login">Login</Link>
            <Link className="btn btn-primary" to="/register">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
