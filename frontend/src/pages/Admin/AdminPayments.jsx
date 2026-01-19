import React, { useEffect, useState } from "react";
import "./AdminPayments.css";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const storedPayments =
      JSON.parse(localStorage.getItem("payments")) || [];
    setPayments(storedPayments);
  }, []);

  return (
    <div className="admin-payments">
      <h2>Payment Records</h2>

      {payments.length === 0 ? (
        <p className="empty">No payments found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Payment ID</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((pay) => (
              <tr key={pay.id}>
                <td>{pay.name}</td>
                <td>{pay.email}</td>
                <td>{pay.plan}</td>
                <td>₹{pay.amount}</td>
                <td>{pay.id}</td>
                <td>{pay.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPayments;