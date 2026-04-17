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
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary-100/50 hover:border-primary-200 transition-all duration-300 flex flex-col overflow-hidden">
      {/* File type banner */}
      <div
        className={`h-2 w-full ${
          isPdf
            ? "bg-gradient-to-r from-red-400 to-red-500"
            : "bg-gradient-to-r from-emerald-400 to-teal-500"
        }`}
      />

      <div className="p-5 flex flex-col flex-1">
        {/* Header: file icon + title */}
        <div className="flex items-start gap-3 mb-3">
          {/* File type icon */}
          <div
            className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
              isPdf
                ? "bg-red-50 text-red-500"
                : "bg-emerald-50 text-emerald-500"
            }`}
          >
            {isPdf ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                <path d="M8 12h2v2H8v3h2v-1h1v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1zm5 0h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1v2h-1v-6zm1 3h1v-2h-1v2z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-primary-700 transition-colors">
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
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isPdf
                ? "bg-red-50 text-red-600 border border-red-100"
                : "bg-emerald-50 text-emerald-600 border border-emerald-100"
            }`}
          >
            {isPdf ? "PDF" : "Image"}
          </span>
        </div>

        {/* Uploader + date */}
        <div className="flex items-center gap-2 mb-4 text-xs text-gray-400">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary-300 to-primary-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
            {note.uploadedBy?.name?.charAt(0).toUpperCase() || "?"}
          </div>
          <span className="truncate text-gray-500">{note.uploadedBy?.name || "Unknown"}</span>
          <span>·</span>
          <span>{uploadDate}</span>
        </div>

        {/* Footer: votes + actions */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Vote count */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84C7 18.95 8.05 20 9.34 20h8.11c.7 0 1.36-.37 1.72-.97l2.66-6.15z" />
              </svg>
              <span className="text-xs font-medium text-emerald-600">{note.upvotes || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 4h-2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h2V4zM2.17 11.12c-.11.25-.17.52-.17.8V13c0 1.1.9 2 2 2h5.5l-.92 4.65c-.05.22-.02.46.08.66.23.45.52.86.88 1.22L10 22l6.41-6.41c.38-.38.59-.89.59-1.42V6.34C17 5.05 15.95 4 14.66 4h-8.1c-.71 0-1.36.37-1.72.97L2.17 11.12z" />
              </svg>
              <span className="text-xs font-medium text-red-500">{note.downvotes || 0}</span>
            </div>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
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
              href={`${API_URL}${note.fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-sm transition-all"
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
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
    <div className="h-2 w-full bg-gray-200" />
    <div className="p-5 space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded-lg w-3/4" />
          <div className="h-3 bg-gray-100 rounded-lg w-1/2" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-5 bg-gray-100 rounded-full w-16" />
        <div className="h-5 bg-gray-100 rounded-full w-12" />
        <div className="h-5 bg-gray-100 rounded-full w-10" />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-gray-200" />
        <div className="h-3 bg-gray-100 rounded w-20" />
      </div>
      <div className="pt-4 border-t border-gray-100 flex justify-between">
        <div className="flex gap-3">
          <div className="h-4 bg-gray-100 rounded w-8" />
          <div className="h-4 bg-gray-100 rounded w-8" />
        </div>
        <div className="flex gap-2">
          <div className="h-7 bg-gray-100 rounded-lg w-12" />
          <div className="h-7 bg-gray-200 rounded-lg w-18" />
        </div>
      </div>
    </div>
  </div>
);

export default NoteCard;
