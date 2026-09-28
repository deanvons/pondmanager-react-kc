import React from "react";
import keycloak from "../../../keycloak";
import AdminDashboard from "../AdminDashboard";


export default function AdminPage() {
  const isAuthed = !!keycloak.authenticated;
  const roles = keycloak.tokenParsed?.realm_access?.roles ?? [];
  const isAdmin = roles.includes("DuckAdmin");

  if (!isAuthed) {
    return (
      <div className="admin-card">
        <h2 className="admin-title">Admin</h2>
        <p className="admin-muted">Please log in to access admin tools.</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-card">
        <h2 className="admin-title">Admin</h2>
        <p className="admin-muted">You don’t have permission to view this page.</p>
        <p className="admin-muted" style={{ marginTop: 6 }}>
          Required role: <code>Admin</code>
        </p>
      </div>
    );
  }

  return <AdminDashboard />;
}