import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const NoteCard = ({ note }) => {
  const netVotes = (note.upvotes || 0) - (note.downvotes || 0);
  const uploadDate = new Date(note.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const isPdf = note.fileType === "pdf";

  return (
    <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:shadow-primary-100/40 hover:border-primary-200/60 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* File type banner */}
      <div
        className={`h-1.5 w-full transition-all duration-300 group-hover:h-2 ${
          isPdf
            ? "bg-gradient-to-r from-red-400 via-rose-400 to-red-500"
            : "bg-gradient-to-r from-emerald-400 via-green-400 to-teal-500"
        }`}
      />

      <div className="p-5 flex flex-col flex-1">
        {/* Header: file type badge + title */}
        <div className="flex items-start gap-3 mb-3">
          {/* File type badge */}
          <div
            className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${
              isPdf
                ? "bg-red-50 text-red-500"
                : "bg-emerald-50 text-emerald-500"
            }`}
          >
            {isPdf ? "PDF" : "IMG"}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-primary-700 transition-colors duration-200">
              {note.title}
            </h3>
            <p className="text-sm text-gray-500 truncate">{note.subject}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {note.subjectCode && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 border border-primary-100">
              {note.subjectCode}
            </span>
          )}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
            Sem {note.semester}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-50 text-sky-700 border border-sky-100">
            {note.branch}
          </span>
        </div>

        {/* Uploader + date */}
        <div className="flex items-center gap-2 mb-4 text-xs text-gray-400">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary-300 to-primary-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0 ring-1 ring-primary-200">
            {note.uploadedBy?.name?.charAt(0).toUpperCase() || "?"}
          </div>
          <span className="truncate text-gray-500">{note.uploadedBy?.name || "Unknown"}</span>
          <span className="text-gray-300">·</span>
          <span>{uploadDate}</span>
        </div>

        {/* Footer: votes + actions */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100/80">
          {/* Vote count */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-emerald-500">▲</span>
              <span className="text-xs font-medium text-emerald-600">{note.upvotes || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-red-400">▼</span>
              <span className="text-xs font-medium text-red-500">{note.downvotes || 0}</span>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                netVotes > 0
                  ? "bg-emerald-50 text-emerald-600"
                  : netVotes < 0
                  ? "bg-red-50 text-red-500"
                  : "bg-gray-50 text-gray-500"
              }`}
            >
              {netVotes > 0 ? "+" : ""}
              {netVotes}
            </span>
          </div>

          {/* View / Download */}
          <div className="flex items-center gap-1.5">
            <Link
              to={`/notes/${note._id}`}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-primary-600 hover:bg-primary-50 transition-all"
            >
              View
            </Link>
            <a
              href={note.fileUrl.startsWith("http") ? note.fileUrl : `${API_URL}${note.fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              download={`${note.title}.${isPdf ? "pdf" : "jpg"}`}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-sm hover:shadow-md transition-all duration-200"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton card for loading state
export const NoteCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="h-1.5 w-full bg-gray-200 animate-pulse" />
    <div className="p-5 space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gray-200 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded-lg w-3/4 animate-pulse" />
          <div className="h-3 bg-gray-100 rounded-lg w-1/2 animate-pulse" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-5 bg-gray-100 rounded-full w-16 animate-pulse" />
        <div className="h-5 bg-gray-100 rounded-full w-12 animate-pulse" />
        <div className="h-5 bg-gray-100 rounded-full w-10 animate-pulse" />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse" />
        <div className="h-3 bg-gray-100 rounded w-20 animate-pulse" />
      </div>
      <div className="pt-4 border-t border-gray-100 flex justify-between">
        <div className="flex gap-3">
          <div className="h-4 bg-gray-100 rounded w-8 animate-pulse" />
          <div className="h-4 bg-gray-100 rounded w-8 animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="h-7 bg-gray-100 rounded-lg w-12 animate-pulse" />
          <div className="h-7 bg-gray-200 rounded-lg w-18 animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

export default NoteCard;
