import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const role = localStorage.getItem("role");

  const location = useLocation();

  const active = (path) =>
    location.pathname === path
      ? "text-warning fw-bold"
      : "text-white";

  return (

    <div
      className="bg-dark text-white p-3"
      style={{
        width: "230px",
        minHeight: "100vh",
      }}
    >

      <h4 className="text-center">

        CRM

      </h4>

      <hr />

      <Link
        className={`d-block mb-3 text-decoration-none ${active("/dashboard")}`}
        to="/dashboard"
      >
        Dashboard
      </Link>

      <Link
        className={`d-block mb-3 text-decoration-none ${active("/leads")}`}
        to="/leads"
      >
        Leads
      </Link>

      {role === "admin" && (

        <Link
          className={`d-block mb-3 text-decoration-none ${active("/activity")}`}
          to="/activity"
        >
          Activity
        </Link>

      )}

    </div>

  );

}

export default Sidebar;