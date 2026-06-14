import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StatusBadge } from "@/components/StatusBadge";
import { SummaryCard } from "@/components/SummaryCard";
import { ExpertCard } from "@/components/ExpertCard";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { currentTicket, matchedExpert } from "@/lib/mock-data";
import { useEffect, useState } from "react";
import { Check, RefreshCw, Send, Sparkles, ArrowLeft } from "lucide-react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit
} from "firebase/firestore";
import VideoCall from "@/components/VideoCall";

export const Route = createFileRoute("/user")({
  head: () => ({
    meta: [
      { title: "User Portal · SkillNow" },
      { name: "description", content: "Your AI-generated ticket and matched expert." },
    ],
  }),
  component: UserPortal,
});

function UserPortal() {
  const [matched, setMatched] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  // const [ticket, setTicket] = useState<any>(null);
  // const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState<any>(null);
const [loading, setLoading] = useState(true);

const [showAlternatives, setShowAlternatives] = useState(false);
const [showExpertSearch, setShowExpertSearch] = useState(false);
const [isSearchingExperts, setIsSearchingExperts] = useState(false);
const [connectingExpert, setConnectingExpert] = useState<any>(null);
const [joinCall, setJoinCall] = useState(false);

// const hardcodedExperts = [
//   {
//     id: 1,
//     name: "Rahul Sharma",
//     title: "GATE CSE Mentor",
//     expertise: ["GATE", "DSA", "Operating Systems"],
//     rating: 4.9,
//   },
//   {
//     id: 2,
//     name: "Priya Reddy",
//     title: "Craked GATE in 2025",
//     expertise: ["Algorithms", "DBMS", "CN"],
//     rating: 4.8,
//   },
//   {
//     id: 3,
//     name: "Arjun Kumar",
//     title: "System Design Mentor for GATE",
//     expertise: ["System Design", "Backend", "Interview Prep"],
//     rating: 4.7,
//   },
// ];

const hardcodedExperts = [
  {
    id: 1,
    name: "Rahul Sharma",
    title: "AIR 428 - GATE CSE 2024",
    company: "Software Engineer @ TCS",
    experience: "3 Years",
    rating: 4.9,
    sessions: 186,
    price: 249,
    languages: ["English", "Hindi"],
    expertise: [
      "Operating Systems",
      "DBMS",
      "Computer Networks"
    ],
    availability: "Available Now",
    responseTime: "< 5 mins"
  },

  {
    id: 2,
    name: "Priya Reddy",
    title: "AIR 612 - GATE CSE 2025",
    company: "M.Tech, IIIT Hyderabad",
    experience: "2 Years Mentoring",
    rating: 4.8,
    sessions: 132,
    price: 199,
    languages: ["English", "Telugu"],
    expertise: [
      "Algorithms",
      "Data Structures",
      "Discrete Mathematics"
    ],
    availability: "Available in 10 mins",
    responseTime: "< 10 mins"
  },

  {
    id: 3,
    name: "Arjun Kumar",
    title: "Ex-Unacademy Educator",
    company: "Senior Backend Engineer",
    experience: "5 Years",
    rating: 4.7,
    sessions: 241,
    price: 299,
    languages: ["English", "Hindi"],
    expertise: [
      "System Design",
      "Backend Development",
      "Interview Preparation"
    ],
    availability: "Available Today",
    responseTime: "< 15 mins"
  }
];

const handleConnectToExpert = () => {
  setShowExpertSearch(true);
  setIsSearchingExperts(true);

  setTimeout(() => {
    setMatched(true);
    setIsSearchingExperts(false);
  }, 2000);
};

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const q = query(
  collection(db, "tickets"),
  orderBy("createdAt", "desc"),
  limit(1)
);

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const ticketData = snapshot.docs[0].data();

          console.log("FIREBASE TICKET:", ticketData);

          setTicket(ticketData);

          if (ticketData.expertMatched) {
            setMatched(true);
          }
        }
      } catch (error) {
        console.error("Firestore Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, []);

  const handleRegenerate = () => {
    setRegenerating(true);

    setTimeout(() => {
      setRegenerating(false);
    }, 1500);
  };

  
if (joinCall) {
  return (
    <VideoCall roomName="skillnow-gate-demo" />
  );
}
  if (connectingExpert) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050b2c] text-white">
      <div className="text-center max-w-xl px-6">

        <div className="mx-auto mb-8 h-28 w-28 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>

        <h1 className="text-4xl font-bold mb-4">
          Connecting to {connectingExpert.name}...
        </h1>

        <p className="text-slate-300 text-lg">
          Please wait while we establish a secure connection
        </p>

        <div className="mt-10 space-y-3 text-left rounded-xl border border-purple-500/20 p-6">
          <p>✓ AI Match Score Verified</p>
          <p>✓ Expert Availability Confirmed</p>
          <p>✓ Session Room Created</p>
          <p>✓ Initializing Video Conference</p>
        </div>
      </div>
    </div>
  );
}

if (loading) {
    return (
      <div className="min-h-screen bg-hero-glow flex items-center justify-center">
        <div className="text-lg">Loading ticket...</div>
      </div>
    );
  }

  const techStack =
    ticket?.technologiesAndTools ||
    [
      "Docker",
      "Spring Boot",
      "AWS ECS",
      "PostgreSQL",
    ];

  const attempts =
  ticket?.previousAttempts ||
  ticket?.attempts ||
  [];
  const alternatives =
ticket?.alternativeSolutions || [];

  return (
    <div className="min-h-screen bg-hero-glow">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 pt-10 pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-mono text-muted-foreground">
              {ticket?.ticketId || "SKN-2041"}
            </p>

            <h1 className="font-display text-2xl font-bold md:text-3xl">
              {ticket?.title || "Untitled Issue"}
            </h1>
          </div>

          <StatusBadge
            status={matched ? "matched" : "open"}
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* MAIN SECTION */}

          <div className="space-y-6 lg:col-span-2">
            <div className="glass rounded-2xl p-6">
  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
    <Sparkles className="h-3.5 w-3.5 text-primary" />
    AI Generated Alternative Solutions
  </div>

  {alternatives.length === 0 ? (
    <div className="mt-4">
      <p className="text-sm text-muted-foreground">
        No alternative solutions found.
      </p>

      <p className="mt-2 text-sm text-muted-foreground">
        This issue appears to require expert assistance.
      </p>

      <button
        onClick={handleConnectToExpert}
        className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground"
      >
        Connect To Expert
      </button>
    </div>
  ) : (
    <>
      {!showAlternatives ? (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            The AI identified {alternatives.length} possible solution(s).
          </p>

          <button
            onClick={() => setShowAlternatives(true)}
            className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground"
          >
            View Alternatives
          </button>
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          {alternatives.map((solution: any, index: number) => (
            <div
              key={index}
              className="rounded-xl border border-primary/20 p-4"
            >
              <h3 className="font-semibold">
                {solution.title}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {solution.description}
              </p>

              <div className="mt-3 flex gap-2 text-xs">
                <span className="rounded-full border px-2 py-1">
                  Difficulty: {solution.difficulty}
                </span>

                <span className="rounded-full border px-2 py-1">
                  Success: {solution.estimatedSuccessRate}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )}
</div>

            {/* SUMMARY */}

            <div className="relative">
              {regenerating ? (
                <div className="glass flex items-center justify-center rounded-2xl py-12">
                  <LoadingAnimation label="Regenerating summary..." />
                </div>
              ) : (
                <SummaryCard
                  summary={
                    ticket?.summary ||
                    "No AI summary available."
                  }
                />
              )}
            </div>

            {/* ALTERNATIVE SOLUTIONS */}

<div className="glass rounded-2xl p-6">
  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
    <Sparkles className="h-3.5 w-3.5 text-primary" />
    AI Generated Alternative Solutions
  </div>

  {!showAlternatives ? (
    <div className="mt-4">
      <p className="text-sm text-muted-foreground">
        The AI has identified {alternatives.length} possible alternative solution(s)
        before consulting an expert.
      </p>

      <button
        onClick={() => setShowAlternatives(true)}
        className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground"
      >
        View Alternatives
      </button>
    </div>
  ) : (
    <div className="mt-4 space-y-4">
      {alternatives.length > 0 ? (
        alternatives.map((solution: any, index: number) => (
          <div
            key={index}
            className="rounded-xl border border-primary/20 p-4"
          >
            <h3 className="font-semibold">
              {solution.title}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {solution.description}
            </p>

            <div className="mt-3 flex gap-2 text-xs">
              <span className="rounded-full border px-2 py-1">
                Difficulty: {solution.difficulty}
              </span>

              <span className="rounded-full border px-2 py-1">
                Success: {solution.estimatedSuccessRate}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground">
          No alternative solutions available.
        </p>
      )}
    </div>
  )}
</div>

{/* <div className="glass rounded-2xl p-6">
  <h3 className="font-semibold">
    What would you like to do next?
  </h3>

  <p className="mt-2 text-sm text-muted-foreground">
    You can first try the AI-generated alternatives or connect directly with an expert.
  </p>

  <div className="mt-4 flex gap-3">
    <button
      onClick={() => setShowAlternatives(true)}
      className="rounded-xl border px-4 py-2 text-sm"
    >
      Try Alternatives
    </button>

    <button
      onClick={handleConnectToExpert}
      className="rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground"
    >
      Connect To Expert
    </button>
  </div>
</div> */}

            {/* PREVIOUS ATTEMPTS */}

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Previous Attempts
              </div>

              <ul className="mt-4 space-y-2.5">
  {attempts.length > 0 ? (
    attempts.map((attempt: string, index: number) => (
      <li
        key={index}
        className="flex items-start gap-3 text-sm"
      >
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/20 text-success">
          <Check className="h-3 w-3" />
        </span>

        <span className="text-foreground/90">
          {attempt}
        </span>
      </li>
    ))
  ) : (
    <li className="text-sm text-muted-foreground italic">
      No attempts made yet.
    </li>
  )}
</ul>
            </div>

            {/* ACTIONS */}

            <div className="flex flex-wrap gap-3">
              <button
                disabled={!matched}
                className="bg-gradient-brand inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                Request Help
              </button>

              <button
                onClick={handleRegenerate}
                className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted/30"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    regenerating ? "animate-spin" : ""
                  }`}
                />

                Regenerate Summary
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
{/* RIGHT SIDE */}

{/* RIGHT SIDE */}

<div className="space-y-6">
  {showExpertSearch && (
    <div className="glass-strong rounded-2xl p-6">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        Expert Search
      </p>

      {isSearchingExperts ? (
        <div className="mt-4">
          <LoadingAnimation label="Searching for matching experts..." />

          <div className="mt-5 space-y-2 text-xs text-muted-foreground">
            <SearchLine
              label="Parsing AI conversation"
              done
            />

            <SearchLine
              label="Extracting stack & context"
              done
            />

            <SearchLine
              label="Scoring experts"
            />
          </div>
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          <div className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            3 Experts Found
          </div>

          {hardcodedExperts.map((expert) => (
            <div
              key={expert.id}
              className="rounded-xl border border-primary/20 p-4"
            >
              <h3 className="font-semibold">{expert.name}</h3>
              <p className="text-sm text-muted-foreground">{expert.title}</p>

              <div className="mt-2 flex flex-wrap gap-2">
                {expert.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border px-2 py-1 text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm">⭐ {expert.rating}</span>

                <button
                  onClick={() => {
  setConnectingExpert(expert);

  setTimeout(() => {
    setJoinCall(true);
  }, 4000);
}}
                  className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
                >
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )}
</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className="mt-1.5 text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}

function SearchLine({ label, done }: { label: string; done?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-1.5 w-1.5 rounded-full ${done ? "bg-success" : "animate-pulse bg-primary"}`}
      />
      <span className={done ? "text-foreground/80 line-through decoration-success/50" : ""}>{label}</span>
    </div>
  );
}
