import "./AdminDashboard.css";

const AdminSidebar = ({ active, setActive }) => {
  return (
    <aside className="admin-sidebar">
      <h3 className="admin-logo">GYM ADMIN</h3>

      <button onClick={() => setActive("stats")} className={active==="stats"?"active":""}>
        Dashboard
      </button>

      <button onClick={() => setActive("users")} className={active==="users"?"active":""}>
        Users
      </button>

      <button onClick={() => setActive("plans")} className={active==="plans"?"active":""}>
        Plans
      </button>

      <button onClick={() => setActive("payments")} className={active==="payments"?"active":""}>
        Payments
      </button>

      <button onClick={() => setActive("feedback")} className={active==="feedback"?"active":""}>
        Feedback
      </button>
    </aside>
  );
};

export default AdminSidebar;