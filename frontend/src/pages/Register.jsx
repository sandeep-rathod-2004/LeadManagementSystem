import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await API.post(
        "/auth/register",
        form
      );

      alert(res.data.message);

      navigate("/login");

    } catch (err) {

      alert(
        err.response?.data?.detail ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="container">

      <div className="row justify-content-center mt-5">

        <div className="col-md-5">

          <div className="card shadow">

            <div className="card-header bg-primary text-white">

              <h3 className="text-center">

                Register

              </h3>

            </div>

            <div className="card-body">

              <form onSubmit={register}>

                <input
                  className="form-control mb-3"
                  placeholder="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />

                <select
                  className="form-select mb-3"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                >

                  <option value="member">
                    Member
                  </option>

                  <option value="admin">
                    Admin
                  </option>

                </select>

                <button
                  className="btn btn-success w-100"
                  disabled={loading}
                >

                  {loading
                    ? "Registering..."
                    : "Register"}

                </button>

              </form>

            </div>

            <div className="card-footer text-center">

              Already have an account?

              <Link to="/login">

                Login

              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Register;