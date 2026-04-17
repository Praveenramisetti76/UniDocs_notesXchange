import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
const BRANCHES = ["CSE", "ECE", "MECH", "CIVIL", "EEE"];
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

const Upload = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    subjectCode: "",
    semester: "",
    branch: "",
  });
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;

    if (!ACCEPTED_TYPES.includes(selectedFile.type)) {
      setErrors({ ...errors, file: "Only PDF, JPG, JPEG, and PNG files are allowed" });
      return;
    }
    if (selectedFile.size > MAX_SIZE) {
      setErrors({ ...errors, file: "File size must be less than 10MB" });
      return;
    }

    setFile(selectedFile);
    setErrors({ ...errors, file: "" });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.semester) newErrors.semester = "Select a semester";
    if (!formData.branch) newErrors.branch = "Select a branch";
    if (!file) newErrors.file = "Please upload a file";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setUploading(true);
    setProgress(0);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("subject", formData.subject);
    data.append("subjectCode", formData.subjectCode);
    data.append("semester", formData.semester);
    data.append("branch", formData.branch);
    data.append("file", file);

    try {
      await axios.post(`${API_URL}/api/notes/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const pct = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(pct);
        },
      });

      setToast({ type: "success", message: "Notes uploaded successfully!" });
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      const msg = err.response?.data?.message || "Upload failed. Please try again.";
      setToast({ type: "error", message: msg });
      setUploading(false);
      setProgress(0);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const isPdf = file?.type === "application/pdf";

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed top-20 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-[slideIn_0.3s_ease] ${
            toast.type === "success"
              ? "bg-emerald-500 text-white"
              : "bg-red-500 text-white"
          }`}
          style={{ animation: "slideIn 0.3s ease" }}
        >
          <div className="flex items-center gap-2">
            {toast.type === "success" ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {toast.message}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Upload Notes</h1>
        <p className="text-gray-500 mt-2">Share your study material with fellow students</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Data Structures Complete Notes"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                errors.title ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"
              }`}
            />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
          </div>

          {/* Subject + Subject Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                Subject <span className="text-red-400">*</span>
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Data Structures"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                  errors.subject ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"
                }`}
              />
              {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
            </div>
            <div>
              <label htmlFor="subjectCode" className="block text-sm font-medium text-gray-700 mb-1.5">
                Subject Code
              </label>
              <input
                id="subjectCode"
                name="subjectCode"
                type="text"
                value={formData.subjectCode}
                onChange={handleChange}
                placeholder="e.g. CS301"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Semester + Branch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1.5">
                Semester <span className="text-red-400">*</span>
              </label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none cursor-pointer ${
                  errors.semester ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"
                } ${!formData.semester ? "text-gray-400" : "text-gray-700"}`}
              >
                <option value="">Select semester</option>
                {SEMESTERS.map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
              {errors.semester && <p className="mt-1 text-xs text-red-500">{errors.semester}</p>}
            </div>
            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1.5">
                Branch <span className="text-red-400">*</span>
              </label>
              <select
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none cursor-pointer ${
                  errors.branch ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"
                } ${!formData.branch ? "text-gray-400" : "text-gray-700"}`}
              >
                <option value="">Select branch</option>
                {BRANCHES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              {errors.branch && <p className="mt-1 text-xs text-red-500">{errors.branch}</p>}
            </div>
          </div>

          {/* File Upload Drop Zone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              File <span className="text-red-400">*</span>
            </label>

            {!file ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                  dragActive
                    ? "border-primary-400 bg-primary-50"
                    : errors.file
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 bg-gray-50 hover:border-primary-300 hover:bg-primary-50/50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    dragActive ? "bg-primary-100" : "bg-gray-100"
                  }`}>
                    <svg
                      className={`w-7 h-7 ${dragActive ? "text-primary-500" : "text-gray-400"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      <span className="text-primary-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PDF, JPG, JPEG, PNG — up to 10MB</p>
                  </div>
                </div>
              </div>
            ) : (
              /* Selected file preview */
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200 bg-gray-50">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isPdf ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-500"
                  }`}
                >
                  {isPdf ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                  <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {errors.file && <p className="mt-1 text-xs text-red-500">{errors.file}</p>}
          </div>

          {/* Progress Bar */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={uploading}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-md shadow-primary-200 hover:shadow-lg disabled:opacity-50 transition-all cursor-pointer"
          >
            {uploading ? "Uploading..." : "Upload Notes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
