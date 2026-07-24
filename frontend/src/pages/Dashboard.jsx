import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    closed: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      const res = await API.get("/dashboard/stats");

      setStats(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">

          <h2 className="mb-4">Dashboard</h2>

          <div className="alert alert-primary">
            Welcome <strong>{user?.name}</strong>
            <br />
            Role: <strong>{user?.role}</strong>
          </div>

          {loading ? (
            <div className="alert alert-info">
              Loading dashboard...
            </div>
          ) : (
            <div className="row g-4">

              <Card
                title="Total Leads"
                value={stats.total}
                bg="primary"
              />

              <Card
                title="New Leads"
                value={stats.new}
                bg="info"
              />

              <Card
                title="Contacted"
                value={stats.contacted}
                bg="warning"
                textDark
              />

              <Card
                title="Qualified"
                value={stats.qualified}
                bg="success"
              />

              <Card
                title="Closed"
                value={stats.closed}
                bg="secondary"
              />

            </div>
          )}

        </div>
      </div>
    </>
  );
}

function Card({
  title,
  value,
  bg,
  textDark = false,
}) {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6">

      <div
        className={`card shadow border-0 bg-${bg} ${
          textDark ? "text-dark" : "text-white"
        }`}
      >
        <div className="card-body text-center">

          <h6 className="mb-2">{title}</h6>

          <h1 className="fw-bold">{value}</h1>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;