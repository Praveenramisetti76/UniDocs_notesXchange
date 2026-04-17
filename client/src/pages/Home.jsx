import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import NoteCard, { NoteCardSkeleton } from "../components/NoteCard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
const BRANCHES = ["CSE", "ECE", "MECH", "CIVIL", "EEE"];

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters
  const [semester, setSemester] = useState(searchParams.get("semester") || "");
  const [branch, setBranch] = useState(searchParams.get("branch") || "");
  const [subject, setSubject] = useState(searchParams.get("subject") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // Data
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalNotes, setTotalNotes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  // Filter panel visibility on mobile
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Debounce ref
  const debounceRef = useRef(null);

  const fetchNotes = useCallback(
    async (pageNum = 1, append = false) => {
      try {
        if (append) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }
        setError("");

        const params = { page: pageNum, limit: 12 };
        if (semester) params.semester = semester;
        if (branch) params.branch = branch;
        if (subject) params.subject = subject;
        if (search) params.search = search;

        const res = await axios.get(`${API_URL}/api/notes`, { params });

        if (append) {
          setNotes((prev) => [...prev, ...res.data.notes]);
        } else {
          setNotes(res.data.notes);
        }
        setTotalPages(res.data.totalPages);
        setTotalNotes(res.data.totalNotes);
        setPage(pageNum);
      } catch (err) {
        setError("Failed to load notes. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [semester, branch, subject, search]
  );

  // Fetch on filter change
  useEffect(() => {
    fetchNotes(1, false);
  }, [fetchNotes]);

  // Sync filters to URL params
  useEffect(() => {
    const params = {};
    if (semester) params.semester = semester;
    if (branch) params.branch = branch;
    if (subject) params.subject = subject;
    if (search) params.search = search;
    setSearchParams(params, { replace: true });
  }, [semester, branch, subject, search, setSearchParams]);

  // Debounced search
  const handleSearchChange = (value) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      // fetchNotes will be triggered by the useEffect above
    }, 500);
  };

  // Actually debounce the search input itself
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      fetchNotes(page + 1, true);
    }
  };

  const clearFilters = () => {
    setSemester("");
    setBranch("");
    setSubject("");
    setSearchInput("");
    setSearch("");
  };

  const hasActiveFilters = semester || branch || subject || search;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent mb-3">
          University Notes, Shared
        </h1>
        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
          Browse, upload, and vote on the best notes across all branches and semesters.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 mb-8">
        {/* Mobile toggle */}
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="sm:hidden flex items-center justify-between w-full text-sm font-medium text-gray-700 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters {hasActiveFilters && <span className="ml-1 w-2 h-2 rounded-full bg-primary-500"></span>}
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${filtersOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Filter controls */}
        <div className={`${filtersOpen ? "mt-4" : "hidden"} sm:block`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by subject code (e.g. CS301)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Semester */}
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="">All Semesters</option>
              {SEMESTERS.map((s) => (
                <option key={s} value={s}>
                  Semester {s}
                </option>
              ))}
            </select>

            {/* Branch */}
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="">All Branches</option>
              {BRANCHES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            {/* Subject */}
            <div className="flex gap-2">
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject name..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all shrink-0 cursor-pointer"
                  title="Clear all filters"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      {!loading && (
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            {totalNotes > 0 ? (
              <>
                Showing <span className="font-semibold text-gray-700">{notes.length}</span> of{" "}
                <span className="font-semibold text-gray-700">{totalNotes}</span> notes
              </>
            ) : (
              "No notes found"
            )}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm text-center">
          {error}
          <button
            onClick={() => fetchNotes(1, false)}
            className="ml-2 underline hover:no-underline cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Notes Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <NoteCardSkeleton key={i} />
          ))}
        </div>
      ) : notes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>

          {/* Load More */}
          {page < totalPages && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-8 py-3 rounded-xl text-sm font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 border border-primary-100 disabled:opacity-50 transition-all cursor-pointer"
              >
                {loadingMore ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  `Load more (${totalNotes - notes.length} remaining)`
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-2xl flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No notes found</h3>
          <p className="text-sm text-gray-400 max-w-sm mx-auto">
            {hasActiveFilters
              ? "Try adjusting your filters or search terms."
              : "Be the first to upload notes and help your peers!"}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-4 px-5 py-2 rounded-xl text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 transition-all cursor-pointer"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
