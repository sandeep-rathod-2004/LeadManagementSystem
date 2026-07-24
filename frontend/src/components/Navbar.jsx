import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {

    if (window.confirm("Are you sure you want to logout?")) {

      localStorage.clear();

      navigate("/login");

    }

  };

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow">

      <span className="navbar-brand fw-bold">

        Lead Management System

      </span>

      <div className="ms-auto d-flex align-items-center">

        <span className="text-white me-3">

          Welcome, {user?.name}

        </span>

        <button
          className="btn btn-danger btn-sm"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>

  );

}

export default Navbar;