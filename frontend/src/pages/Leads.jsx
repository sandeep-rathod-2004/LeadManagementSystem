import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Leads() {

  const role = localStorage.getItem("role");

  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [editLead, setEditLead] = useState(null);

  const [note, setNote] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    status: "New",
    assigned_to: "",
  });

  useEffect(() => {

    fetchLeads();

    if (role === "admin") {
      fetchUsers();
    }

  }, []);

  const fetchLeads = async () => {

    try {

      setLoading(true);

      const res = await API.get("/leads");

      setLeads(res.data);

    } catch (err) {

      console.log(err);

      alert("Unable to fetch leads.");

    } finally {

      setLoading(false);

    }

  };

  const fetchUsers = async () => {

    try {

      const res = await API.get("/users/members");

      setUsers(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: name === "assigned_to" && value !== ""
      ? Number(value)
      : value,
  }));
};

  const resetForm = () => {

    setForm({

      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      status: "New",
      assigned_to: "",

    });

    setEditLead(null);

  };

  const createLead = async (e) => {
  e.preventDefault();

  const data = { ...form };

  // Members should not send assigned_to
  if (role !== "admin") {
    delete data.assigned_to;
  }

  // If admin leaves "Assign Member" empty
  if (role === "admin" && data.assigned_to === "") {
    data.assigned_to = null;
  }

  console.log(data);

  try {
    await API.post("/leads", data);

    alert("Lead Created Successfully");
    resetForm();
    fetchLeads();
  } catch (err) {
    console.error(err);
    console.log(err.response?.data);

    alert(err.response?.data?.detail || "Unable to create lead.");
  }
};

  const updateLead = async () => {

    try {

      await API.put(`/leads/${editLead.id}`, form);

      alert("Lead Updated Successfully");

      resetForm();

      fetchLeads();

    } catch (err) {

      console.log(err);

      alert(err.response?.data?.detail || "Unable to update lead.");

    }

  };

  const deleteLead = async (id) => {

    if (!window.confirm("Delete this lead?")) return;

    try {

      await API.delete(`/leads/${id}`);

      alert("Lead Deleted");

      fetchLeads();

    } catch (err) {

      console.log(err);

      alert(err.response?.data?.detail || "Delete failed.");

    }

  };

  const startEdit = (lead) => {

    setEditLead(lead);

    setForm({

      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      message: lead.message,
      status: lead.status,
      assigned_to: lead.assigned_to || "",

    });

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  };

  const addNote = async (leadId) => {

    if (!note.trim()) return;

    try {

      await API.post("/notes", {

        lead_id: leadId,

        note,

      });

      alert("Note Added");

      setNote("");

      fetchLeads();

    } catch (err) {

      console.log(err);

      alert("Unable to add note.");

    }

  };

  const filteredLeads = leads.filter((lead) =>

    lead.name.toLowerCase().includes(search.toLowerCase()) ||

    lead.email.toLowerCase().includes(search.toLowerCase()) ||

    lead.company.toLowerCase().includes(search.toLowerCase())

  );

  return (<>
  <Navbar />

  <div className="d-flex">

    <Sidebar />

    <div className="container-fluid p-4">

      <h2 className="mb-4">
        Lead Management
      </h2>

      <div className="card shadow mb-4">

        <div className="card-header bg-primary text-white">

          {editLead ? "Edit Lead" : "Create Lead"}

        </div>

        <div className="card-body">

          <form onSubmit={editLead ? (e) => {
            e.preventDefault();
            updateLead();
          } : createLead}>

            <div className="row">

              <div className="col-md-4 mb-3">
                <input
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <input
                  className="form-control"
                  placeholder="Phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <input
                  className="form-control"
                  placeholder="Company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-3">
                <input
                  className="form-control"
                  placeholder="Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-3">

                <select
                  className="form-select"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >

                  <option>New</option>
                  <option>Contacted</option>
                  <option>Qualified</option>
                  <option>Closed</option>

                </select>

              </div>

              {role === "admin" && (

                <div className="col-md-4 mb-3">

                  <select
                    className="form-select"
                    name="assigned_to"
                    value={form.assigned_to}
                    onChange={handleChange}
                  >

                    <option value="">
                      Assign Member
                    </option>

                    {users.map((user) => (

                      <option
                        key={user.id}
                        value={user.id}
                      >

                        {user.name}

                      </option>

                    ))}

                  </select>

                </div>

              )}

            </div>

            <button
              className={`btn ${editLead ? "btn-warning" : "btn-success"}`}
            >

              {editLead ? "Update Lead" : "Create Lead"}

            </button>

            {editLead && (

              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={resetForm}
              >

                Cancel

              </button>

            )}

          </form>

        </div>

      </div>

      <div className="d-flex justify-content-between mb-3">

        <h4>All Leads</h4>

        <input
          className="form-control"
          placeholder="Search..."
          style={{ width: "300px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {loading ? (

        <div className="alert alert-info">

          Loading...

        </div>

      ) : (

        <table className="table table-bordered table-striped">

          <thead className="table-dark">

            <tr>

              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Status</th>
              <th>Assigned</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredLeads.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center"
                >

                  No Leads Found

                </td>

              </tr>

            ) : (

              filteredLeads.map((lead) => (

                <tr key={lead.id}>

                  <td>{lead.name}</td>

                  <td>{lead.email}</td>

                  <td>{lead.phone}</td>

                  <td>{lead.company}</td>

                  <td>

                    <span
                      className={`badge ${
                        lead.status === "New"
                          ? "bg-primary"
                          : lead.status === "Contacted"
                          ? "bg-warning text-dark"
                          : lead.status === "Qualified"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >

                      {lead.status}

                    </span>

                  </td>

                  <td>

                    {users.find(
                      (u) => u.id === lead.assigned_to
                    )?.name || "-"}

                  </td>

                  <td>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => startEdit(lead)}
                    >

                      Edit

                    </button>

                    {role === "admin" && (

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteLead(lead.id)}
                      >

                        Delete

                      </button>

                    )}

                    <div className="mt-2">

                      <input
                        className="form-control form-control-sm mb-2"
                        placeholder="Add Note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />

                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => addNote(lead.id)}
                      >

                        Add Note

                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      )}

    </div>

  </div>

</>
);

}

export default Leads;