import { createFileRoute, Link } from "@tanstack/react-router";
import { Sidebar } from "@/components/Sidebar";
import { ArrowLeft, Bell, CheckCircle2, Activity, TrendingUp } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/expert")({
  component: ExpertDashboard,
});

function ExpertDashboard() {
  const [available, setAvailable] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [connecting, setConnecting] = useState(false);

  const requests = [
    {
      id: "REQ-001",
      title: "GATE CSE Preparation Guidance",
      match: "97%",
      student: "Praharsha",
      level: "Beginner",
      duration: "45 Minutes",
      summary:
        "Student wants structured guidance for GATE CSE preparation including study planning, DSA, Operating Systems, DBMS and Computer Networks."
    }
    // {
    //   id: "REQ-002",
    //   title: "Backend Interview Preparation",
    //   match: "92%",
    //   student: "Rohit",
    //   level: "Intermediate",
    //   duration: "60 Minutes",
    //   summary:
    //     "Candidate preparing for backend interviews and seeking help with system design, databases, caching and scalable architecture."
    // }
  ];

  if (connecting && selectedRequest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050b2c] text-white">
        <div className="text-center max-w-xl px-6">
          <div className="mx-auto mb-8 h-28 w-28 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>

          <h1 className="text-4xl font-bold mb-4">
            Connecting with {selectedRequest.student}
          </h1>

          <p className="text-slate-300">
            Establishing secure mentorship session...
          </p>

          <div className="mt-8 space-y-3 text-left border border-purple-500/20 rounded-xl p-6">
            <p>✓ AI Match Verified</p>
            <p>✓ Student Availability Confirmed</p>
            <p>✓ Session Room Created</p>
            <p>✓ Initializing Video Conference</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero-glow">
      <div className="mx-auto flex max-w-7xl gap-4 px-4 py-4">
        <Sidebar />

        <div className="flex-1">

          <header className="glass mb-6 flex items-center justify-between rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <Link to="/" className="text-muted-foreground lg:hidden">
                <ArrowLeft className="h-4 w-4" />
              </Link>

              <div>
                <p className="text-xs text-muted-foreground">Welcome back</p>
                <p className="font-semibold text-lg">Rahul Sharma</p>
              </div>
            </div>

            <button
              onClick={() => setAvailable(!available)}
              className="rounded-full border px-4 py-2"
            >
              {available ? "Available" : "Away"}
            </button>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Pending Requests" value="1" icon={<Activity />} />
            <StatCard label="Sessions Completed" value="186" icon={<CheckCircle2 />} />
            <StatCard label="Success Rate" value="98%" icon={<TrendingUp />} />
            <StatCard label="Notifications" value="1" icon={<Bell />} />
          </div>

          <div className="mt-8 rounded-2xl border border-primary/20 p-5">
            <h2 className="text-xl font-bold">🔔 New AI Match Found</h2>
            <p className="text-muted-foreground mt-2">
              Student requires help with GATE CSE Preparation.
            </p>
            <div className="mt-3 inline-block rounded-full bg-green-500/20 px-3 py-1">
              97% Match Score
            </div>
          </div>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Mentorship Requests</h2>

            <div className="grid gap-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-2xl border border-primary/20 p-5"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{request.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Student: {request.student}
                      </p>
                    </div>

                    <div className="font-bold text-green-400">
                      {request.match} Match
                    </div>
                  </div>

                  <div className="mt-4">
                    <p><strong>Student Level:</strong> {request.level}</p>
                    <p><strong>Session Duration:</strong> {request.duration}</p>
                  </div>

                  <div className="mt-4 rounded-xl bg-muted/20 p-4">
                    <h4 className="font-semibold mb-2">
                      AI Generated Summary
                    </h4>
                    <p>{request.summary}</p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedRequest(request);
                      setConnecting(true);
                    }}
                    className="mt-4 rounded-xl bg-primary px-5 py-2 text-primary-foreground"
                  >
                    Accept Request
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: any) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex justify-between">
        <span>{label}</span>
        {icon}
      </div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
    </div>
  );
}
