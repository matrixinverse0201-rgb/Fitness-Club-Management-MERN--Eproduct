import { useState, useEffect } from "react";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user, setUser } = useAuth();
  
  console.log("USER FROM AUTH CONTEXT:-",user);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // ✅ Sync form when user loads
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await API.put("/users/profile", form);

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setSuccess("Profile updated successfully");
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Prevent render before user exists
  if (!user) return null;

  return (
    <div className="dashboard-card">
      <h2>My Profile</h2>

      {success && <p className="success-msg">{success}</p>}

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <label>Email</label>
        <input value={user.email} disabled />

        <label>Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <label>Address</label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Profile;