import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import NoteCard, { NoteCardSkeleton } from "../components/NoteCard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("uploads");

  // My Uploads
  const [myNotes, setMyNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [notesError, setNotesError] = useState("");

  // My Votes
  const [myVotes, setMyVotes] = useState([]);
  const [votesLoading, setVotesLoading] = useState(false);
  const [votesError, setVotesError] = useState("");
  const [voteFilter, setVoteFilter] = useState("all"); // all | upvote | downvote

  // Fetch user's uploaded notes
  const fetchMyNotes = async () => {
    setNotesLoading(true);
    setNotesError("");
    try {
      const res = await axios.get(`${API_URL}/api/notes/my-uploads`);
      setMyNotes(res.data.notes);
    } catch (err) {
      setNotesError("Failed to load your notes.");
      console.error(err);
    } finally {
      setNotesLoading(false);
    }
  };

  // Fetch user's vote history
  const fetchMyVotes = async () => {
    setVotesLoading(true);
    setVotesError("");
    try {
      const res = await axios.get(`${API_URL}/api/notes/my-votes`);
      setMyVotes(res.data.votes);
    } catch (err) {
      setVotesError("Failed to load your voting history.");
      console.error(err);
    } finally {
      setVotesLoading(false);
    }
  };

  useEffect(() => {
    fetchMyNotes();
  }, []);

  useEffect(() => {
    if (activeTab === "votes" && myVotes.length === 0 && !votesLoading) {
      fetchMyVotes();
    }
  }, [activeTab]);

  // Delete note handler
  const handleDelete = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await axios.delete(`${API_URL}/api/notes/${noteId}`);
      setMyNotes((prev) => prev.filter((n) => n._id !== noteId));
      toast.success("Note deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete note");
    }
  };

  // Stats
  const totalUploads = myNotes.length;
  const totalUpvotesReceived = myNotes.reduce((acc, n) => acc + (n.upvotes || 0), 0);
  const totalDownvotesReceived = myNotes.reduce((acc, n) => acc + (n.downvotes || 0), 0);
  const netScore = totalUpvotesReceived - totalDownvotesReceived;

  // Filtered votes
  const filteredVotes =
    voteFilter === "all"
      ? myVotes
      : myVotes.filter((v) => v.voteType === voteFilter);

  const tabs = [
    { key: "uploads", label: "My Uploads", count: totalUploads },
    { key: "votes", label: "My Votes", count: myVotes.length },
  ];

  return (
    <div className="dashboard-page">
      {/* Hero header */}
      <div className="dashboard-hero">
        <div className="dashboard-hero-pattern" />
        <div className="dashboard-hero-content">
          <h1 className="dashboard-hero-title">
            My Dashboard
          </h1>
          <p className="dashboard-hero-subtitle">
            Track your uploads, votes, and contributions
          </p>
        </div>
      </div>

      <div className="dashboard-container">
        {/* Stats Row */}
        <div className="dashboard-stats-grid">
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon dashboard-stat-icon--uploads">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="12" y2="12" />
                <line x1="15" y1="15" x2="12" y2="12" />
              </svg>
            </div>
            <div className="dashboard-stat-info">
              <span className="dashboard-stat-value">{totalUploads}</span>
              <span className="dashboard-stat-label">Notes Uploaded</span>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon dashboard-stat-icon--upvotes">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </div>
            <div className="dashboard-stat-info">
              <span className="dashboard-stat-value">{totalUpvotesReceived}</span>
              <span className="dashboard-stat-label">Upvotes Received</span>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon dashboard-stat-icon--downvotes">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            <div className="dashboard-stat-info">
              <span className="dashboard-stat-value">{totalDownvotesReceived}</span>
              <span className="dashboard-stat-label">Downvotes Received</span>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className={`dashboard-stat-icon ${netScore >= 0 ? "dashboard-stat-icon--score-pos" : "dashboard-stat-icon--score-neg"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className="dashboard-stat-info">
              <span className="dashboard-stat-value">
                {netScore > 0 ? "+" : ""}{netScore}
              </span>
              <span className="dashboard-stat-label">Net Score</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="dashboard-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`dashboard-tab ${activeTab === tab.key ? "dashboard-tab--active" : ""}`}
            >
              {tab.label}
              <span className={`dashboard-tab-count ${activeTab === tab.key ? "dashboard-tab-count--active" : ""}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="dashboard-content">
          {/* ─── My Uploads Tab ─── */}
          {activeTab === "uploads" && (
            <>
              {notesError && (
                <div className="dashboard-error">
                  {notesError}
                  <button onClick={fetchMyNotes} className="dashboard-retry-btn">
                    Retry
                  </button>
                </div>
              )}

              {notesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <NoteCardSkeleton key={i} />
                  ))}
                </div>
              ) : myNotes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {myNotes.map((note) => (
                    <div key={note._id} className="dashboard-upload-card-wrapper">
                      <NoteCard note={note} />
                      <button
                        onClick={() => handleDelete(note._id)}
                        className="dashboard-delete-btn"
                        title="Delete this note"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="dashboard-empty">
                  <div className="dashboard-empty-icon">📄</div>
                  <h3 className="dashboard-empty-title">No uploads yet</h3>
                  <p className="dashboard-empty-text">
                    You haven't uploaded any notes yet. Share your knowledge with others!
                  </p>
                  <Link to="/upload" className="dashboard-empty-cta">
                    Upload Your First Note
                  </Link>
                </div>
              )}
            </>
          )}

          {/* ─── My Votes Tab ─── */}
          {activeTab === "votes" && (
            <>
              {/* Vote filter pills */}
              <div className="dashboard-vote-filters">
                {[
                  { key: "all", label: "All Votes" },
                  { key: "upvote", label: "Upvoted" },
                  { key: "downvote", label: "Downvoted" },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setVoteFilter(f.key)}
                    className={`dashboard-vote-pill ${voteFilter === f.key ? "dashboard-vote-pill--active" : ""}`}
                  >
                    {f.key === "upvote" && "▲ "}
                    {f.key === "downvote" && "▼ "}
                    {f.label}
                  </button>
                ))}
              </div>

              {votesError && (
                <div className="dashboard-error">
                  {votesError}
                  <button onClick={fetchMyVotes} className="dashboard-retry-btn">
                    Retry
                  </button>
                </div>
              )}

              {votesLoading ? (
                <div className="dashboard-vote-list">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="dashboard-vote-skeleton animate-pulse">
                      <div className="w-10 h-10 rounded-xl bg-gray-200" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded-lg w-3/4" />
                        <div className="h-3 bg-gray-100 rounded-lg w-1/2" />
                      </div>
                      <div className="h-6 w-16 bg-gray-200 rounded-full" />
                    </div>
                  ))}
                </div>
              ) : filteredVotes.length > 0 ? (
                <div className="dashboard-vote-list">
                  {filteredVotes.map((vote) => {
                    const note = vote.noteId;
                    const isPdf = note.fileType === "pdf";
                    const isUp = vote.voteType === "upvote";
                    return (
                      <Link
                        key={vote._id}
                        to={`/notes/${note._id}`}
                        className="dashboard-vote-item"
                      >
                        {/* File type badge */}
                        <div
                          className={`dashboard-vote-file-badge ${
                            isPdf ? "dashboard-vote-file-badge--pdf" : "dashboard-vote-file-badge--img"
                          }`}
                        >
                          {isPdf ? "PDF" : "IMG"}
                        </div>

                        {/* Note info */}
                        <div className="dashboard-vote-info">
                          <h4 className="dashboard-vote-title">{note.title}</h4>
                          <div className="dashboard-vote-meta">
                            <span>{note.subject}</span>
                            {note.subjectCode && (
                              <>
                                <span className="dashboard-vote-dot">·</span>
                                <span>{note.subjectCode}</span>
                              </>
                            )}
                            <span className="dashboard-vote-dot">·</span>
                            <span>Sem {note.semester}</span>
                            <span className="dashboard-vote-dot">·</span>
                            <span>{note.branch}</span>
                          </div>
                        </div>

                        {/* Vote badge */}
                        <div
                          className={`dashboard-vote-badge ${
                            isUp ? "dashboard-vote-badge--up" : "dashboard-vote-badge--down"
                          }`}
                        >
                          {isUp ? "▲ Upvoted" : "▼ Downvoted"}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="dashboard-empty">
                  <div className="dashboard-empty-icon">🗳️</div>
                  <h3 className="dashboard-empty-title">No votes yet</h3>
                  <p className="dashboard-empty-text">
                    {voteFilter !== "all"
                      ? `You haven't ${voteFilter === "upvote" ? "upvoted" : "downvoted"} any notes yet.`
                      : "You haven't voted on any notes yet. Browse and vote to help the community!"}
                  </p>
                  <Link to="/" className="dashboard-empty-cta">
                    Browse Notes
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
