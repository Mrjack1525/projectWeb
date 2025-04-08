import React from "react";

function AdminPanel() {
  const role = localStorage.getItem("role");

  if (role !== "admin") return <p>Access denied: Admins only</p>;

  return (
    <div>
      <h2>Admin Panel</h2>
      <p>Only visible to users with the 'admin' role.</p>
    </div>
  );
}

export default AdminPanel;