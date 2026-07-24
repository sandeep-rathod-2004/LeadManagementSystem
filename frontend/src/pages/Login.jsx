import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const login = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const body = new URLSearchParams();

      body.append("username", form.email);

      body.append("password", form.password);

      const res = await API.post(
        "/auth/login",
        body,
        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
        }
      );

      localStorage.setItem(
        "token",
        res.data.access_token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (err) {

      alert(
        err.response?.data?.detail ||
        "Login Failed"
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

            <div className="card-header bg-success text-white">

              <h3 className="text-center">

                Login

              </h3>

            </div>

            <div className="card-body">

              <form onSubmit={login}>

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

                <button
                  className="btn btn-primary w-100"
                  disabled={loading}
                >

                  {loading
                    ? "Logging In..."
                    : "Login"}

                </button>

              </form>

            </div>

            <div className="card-footer text-center">

              Don't have an account?

              <Link to="/register">

                Register

              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Login;