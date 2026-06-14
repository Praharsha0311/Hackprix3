import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("skillnowTicket");

    if (stored) {
      setTicket(JSON.parse(stored));
    }
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>SkillNow Dashboard</h1>

      {ticket ? (
        <pre>
          {JSON.stringify(ticket, null, 2)}
        </pre>
      ) : (
        <h2>No ticket found</h2>
      )}
    </div>
  );
}