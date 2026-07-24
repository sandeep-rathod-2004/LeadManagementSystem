import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function LeadDetails() {

  const { id } = useParams();

  const [lead, setLead] = useState({});
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");

  const loadLead = async () => {
    const res = await api.get(`/leads/${id}`);

    setLead(res.data);
    setStatus(res.data.status);
  };

  const loadNotes = async () => {
    const res = await api.get(`/notes/${id}`);
    setNotes(res.data);
  };

  useEffect(() => {
    loadLead();
    loadNotes();
  }, []);

  const updateLead = async () => {
    await api.put(`/leads/${id}`, {
      status,
      assigned_to: lead.assigned_to,
    });

    alert("Updated");
    loadLead();
  };

  const addNote = async () => {
    await api.post("/notes/", {
      lead_id: Number(id),
      note,
    });

    setNote("");
    loadNotes();
  };

  return (
    <div style={{ padding: 30 }}>

      <h1>{lead.name}</h1>

      <p>{lead.email}</p>

      <p>{lead.company}</p>

      <h2>Status</h2>

      <select
        value={status}
        onChange={(e)=>setStatus(e.target.value)}
      >
        <option>New</option>
        <option>Qualified</option>
        <option>Closed</option>
      </select>

      <button onClick={updateLead}>
        Update
      </button>

      <hr />

      <h2>Notes</h2>

      {notes.map((n)=>(
        <div key={n.id}>
          {n.note}
          <hr/>
        </div>
      ))}

      <textarea
        value={note}
        onChange={(e)=>setNote(e.target.value)}
      />

      <br/>

      <button onClick={addNote}>
        Add Note
      </button>

    </div>
  );
}

export default LeadDetails;