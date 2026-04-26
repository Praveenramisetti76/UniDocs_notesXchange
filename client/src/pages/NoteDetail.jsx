import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [myVote, setMyVote] = useState(null);
  const [voting, setVoting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Fetch note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/notes/${id}`);
        setNote(res.data);
      } catch (err) {
        setError("Note not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  // Fetch user's vote
  useEffect(() => {
    const fetchMyVote = async () => {
      if (!isAuthenticated) return;
      try {
        const res = await axios.get(`${API_URL}/api/notes/${id}/myvote`);
        setMyVote(res.data.voteType);
      } catch (err) {
        console.error("Failed to fetch vote status");
      }
    };
    fetchMyVote();
  }, [id, isAuthenticated]);

  const handleVote = async (voteType) => {
    if (!isAuthenticated) {
      toast.error("Please log in to vote");
      return;
    }

    setVoting(true);
    try {
      const res = await axios.post(`${API_URL}/api/notes/${id}/vote`, { voteType });
      setNote((prev) => ({
        ...prev,
        upvotes: res.data.upvotes,
        downvotes: res.data.downvotes,
      }));
      // Toggle logic: if same vote, remove; otherwise set new
      const newVote = myVote === voteType ? null : voteType;
      setMyVote(newVote);

      if (newVote === null) {
        toast.success("Vote removed");
      } else {
        toast.success(newVote === "upvote" ? "Upvoted!" : "Downvoted!");
      }
    } catch (err) {
      toast.error("Vote failed. Try again.");
    } finally {
      setVoting(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`${API_URL}/api/notes/${id}`);
      toast.success("Note deleted successfully");
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      toast.error("Failed to delete note");
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const isOwner = user && note?.uploadedBy?._id === user.id;
  const isPdf = note?.fileType === "pdf";
  const fileUrl = note
    ? note.fileUrl.startsWith("http") ? note.fileUrl : `${API_URL}${note.fileUrl}`
    : "";
  // Google Docs Viewer URL for rendering PDFs inline (Cloudinary raw URLs auto-download)
  const pdfPreviewUrl = isPdf && fileUrl
    ? `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`
    : "";
  const netVotes = note ? (note.upvotes || 0) - (note.downvotes || 0) : 0;

  const uploadDate = note
    ? new Date(note.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  // Loading skeleton
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="h-6 bg-gray-200 rounded-lg w-32 mb-6 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 animate-pulse">
              <div className="h-2 w-full bg-gray-200 rounded-full" />
              <div className="h-7 bg-gray-200 rounded-lg w-3/4" />
              <div className="flex gap-2">
                <div className="h-6 bg-gray-100 rounded-full w-16" />
                <div className="h-6 bg-gray-100 rounded-full w-20" />
                <div className="h-6 bg-gray-100 rounded-full w-14" />
              </div>
              <div className="h-4 bg-gray-100 rounded w-48" />
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
              <div className="p-4 border-b border-gray-100">
                <div className="h-4 bg-gray-200 rounded w-16" />
              </div>
              <div className="p-4">
                <div className="h-96 bg-gray-100 rounded-xl" />
              </div>
            </div>
          </div>
          <div className="space-y-6 animate-pulse">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-24" />
              <div className="flex justify-center gap-6">
                <div className="h-20 w-16 bg-gray-100 rounded-xl" />
                <div className="h-8 w-8 bg-gray-100 rounded self-center" />
                <div className="h-20 w-16 bg-gray-100 rounded-xl" />
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-20" />
              <div className="flex gap-3">
                <div className="w-11 h-11 bg-gray-200 rounded-full" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                  <div className="h-3 bg-gray-100 rounded w-20" />
                </div>
              </div>
            </div>
            <div className="h-12 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-red-50 rounded-2xl flex items-center justify-center">
          <span className="text-3xl">⚠️</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Something went wrong</h2>
        <p className="text-sm text-gray-400 mb-6">{error}</p>
        <Link to="/" className="px-5 py-2 rounded-xl text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 transition-all">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete this note?</h3>
            <p className="text-sm text-gray-500 mb-6">This action cannot be undone. The file will be permanently removed.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 transition-all cursor-pointer"
              >
                {deleting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                    Deleting...
                  </span>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600 transition-colors mb-6"
      >
        <span className="text-lg leading-none">←</span>
        Back to notes
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content — left 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Note header card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Color banner */}
            <div
              className={`h-2 w-full ${
                isPdf
                  ? "bg-gradient-to-r from-red-400 to-red-500"
                  : "bg-gradient-to-r from-emerald-400 to-teal-500"
              }`}
            />
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{note.title}</h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {note.subjectCode && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 border border-primary-100">
                    {note.subjectCode}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                  Semester {note.semester}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-700 border border-sky-100">
                  {note.branch}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isPdf
                      ? "bg-red-50 text-red-600 border border-red-100"
                      : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  }`}
                >
                  {isPdf ? "PDF" : "Image"}
                </span>
              </div>

              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Subject:</span> {note.subject}
              </p>
            </div>
          </div>

          {/* File Preview */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-700">Preview</h2>
            </div>
            <div className="p-4">
              {isPdf ? (
                <div className="w-full rounded-xl overflow-hidden bg-gray-100" style={{ height: "600px" }}>
                  <iframe
                    src={pdfPreviewUrl}
                    title={note.title}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                  />
                </div>
              ) : (
                <div className="flex justify-center bg-gray-50 rounded-xl p-4">
                  <img
                    src={fileUrl}
                    alt={note.title}
                    className="max-w-full max-h-[600px] rounded-lg object-contain shadow-sm"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar — right column */}
        <div className="space-y-6">
          {/* Voting Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Rate this note</h3>

            <div className="flex items-center justify-center gap-6 mb-4">
              {/* Upvote */}
              <button
                onClick={() => handleVote("upvote")}
                disabled={voting}
                className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  myVote === "upvote"
                    ? "bg-emerald-50 border-2 border-emerald-300 text-emerald-600"
                    : "bg-gray-50 border-2 border-transparent hover:border-emerald-200 hover:bg-emerald-50 text-gray-400 hover:text-emerald-500"
                }`}
              >
                <span className="text-2xl font-bold leading-none">▲</span>
                <span className="text-lg font-bold">{note.upvotes || 0}</span>
              </button>

              {/* Net score */}
              <div
                className={`text-2xl font-extrabold ${
                  netVotes > 0
                    ? "text-emerald-500"
                    : netVotes < 0
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {netVotes > 0 ? "+" : ""}
                {netVotes}
              </div>

              {/* Downvote */}
              <button
                onClick={() => handleVote("downvote")}
                disabled={voting}
                className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  myVote === "downvote"
                    ? "bg-red-50 border-2 border-red-300 text-red-500"
                    : "bg-gray-50 border-2 border-transparent hover:border-red-200 hover:bg-red-50 text-gray-400 hover:text-red-500"
                }`}
              >
                <span className="text-2xl font-bold leading-none">▼</span>
                <span className="text-lg font-bold">{note.downvotes || 0}</span>
              </button>
            </div>

            {!isAuthenticated && (
              <p className="text-xs text-gray-400 text-center">
                <Link to="/login" className="text-primary-600 hover:underline">Log in</Link> to vote
              </p>
            )}
          </div>

          {/* Uploader Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Uploaded by</h3>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold shadow-md shadow-primary-200">
                {note.uploadedBy?.name?.charAt(0).toUpperCase() || "?"}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {note.uploadedBy?.name || "Unknown"}
                </p>
                <p className="text-xs text-gray-400">{uploadDate}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              download={`${note.title}.${isPdf ? "pdf" : "jpg"}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-md shadow-primary-200 hover:shadow-lg transition-all"
            >
              <span className="text-base">⬇</span>
              Download
            </a>

            {isOwner && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium text-red-600 border-2 border-red-200 hover:bg-red-50 transition-all cursor-pointer"
              >
                <span className="text-base">🗑</span>
                Delete Note
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
