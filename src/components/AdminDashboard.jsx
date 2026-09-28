import React, { useEffect, useMemo, useState } from "react";

import keycloak from "../../keycloak";
import { PM_ROOT_API_URL } from "../api/urls";

export default function AdminDashboard() {
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | ok | error
  const [error, setError] = useState("");

  const sortedLogs = useMemo(() => {
    return [...logs].sort((a, b) => {
      const ta = new Date(a.timestamp).getTime();
      const tb = new Date(b.timestamp).getTime();
      return tb - ta;
    });
  }, [logs]);

  async function loadLogs() {
    setStatus("loading");
    setError("");

    try {
      const res = await fetch(`${PM_ROOT_API_URL}/access-logs`, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed (${res.status})`);
      }

      const data = await res.json();
      setLogs(Array.isArray(data) ? data : []);
      setStatus("ok");
    } catch (e) {
      setStatus("error");
      setError(e?.message ?? "Failed to load logs");
    }
  }

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <div className="admin-card">
      <div className="admin-header">
        <div>
          <h2 className="admin-title">Admin Dashboard</h2>
          <div className="admin-muted">
            Access logs: {sortedLogs.length} event{sortedLogs.length === 1 ? "" : "s"}
          </div>
        </div>

        <div className="admin-actions">
          <button onClick={loadLogs} disabled={status === "loading"}>
            {status === "loading" ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {status === "error" && <div className="admin-error">{error}</div>}

      <section style={{ marginTop: "0.5rem" }}>
        <div className="admin-section-title">Audit Events</div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Actor</th>
                <th>Action</th>
                <th>Resource</th>
                <th>Resource Id</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {sortedLogs.map((log) => (
                <tr key={log.id}>
                  <td className="mono">{formatTime(log.timestamp)}</td>
                  <td>{log.actor ?? "—"}</td>
                  <td className="mono">{log.action ?? "—"}</td>
                  <td>{log.resource ?? "—"}</td>
                  <td className="mono">{log.resourceId ?? "—"}</td>
                  <td className="mono">{log.status ?? "—"}</td>
                </tr>
              ))}

              {status === "ok" && sortedLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="admin-muted" style={{ padding: "0.9rem" }}>
                    No logs yet.
                  </td>
                </tr>
              )}

              {status === "loading" && (
                <tr>
                  <td colSpan={6} className="admin-muted" style={{ padding: "0.9rem" }}>
                    Loading…
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-footnote admin-muted">
          Tip: create a duck (POST /ducks), then hit Refresh.
        </div>
      </section>
    </div>
  );
}

function formatTime(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}