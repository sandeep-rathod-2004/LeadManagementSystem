import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import API from "../services/api";

function Activity() {
  const [activities, setActivities] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role === "admin") {
      fetchActivities();
    }
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await API.get("/activity");
      setActivities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (role !== "admin") {
    return (
      <>
        <Navbar />

        <div className="container mt-5">
          <div className="alert alert-danger">
            Access Denied
          </div>

          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">
          <h2 className="mb-4">
            Activity Log
          </h2>

          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Lead ID</th>
                <th>User ID</th>
                <th>Action</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Activity Found
                  </td>
                </tr>
              ) : (
                activities.map((activity) => (
                  <tr key={activity.id}>
                    <td>{activity.id}</td>
                    <td>{activity.lead_id}</td>
                    <td>{activity.user_id}</td>
                    <td>{activity.action}</td>
                    <td>{activity.timestamp}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default Activity;